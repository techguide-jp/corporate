import {
  parseMacClipyAnalyticsPayload,
  type MacClipyAnalyticsPayload,
} from './analyticsValidation.ts';

export const MAX_ANALYTICS_BODY_BYTES = 4_096;

interface AnalyticsEndpointInput {
  contentType: string | null;
  contentLength: number | null;
  bodyText: string;
  clientAddress: string;
}

interface AnalyticsEndpointDependencies {
  now?: () => Date;
  consumeRateLimit(clientAddress: string): boolean;
  forward(payload: MacClipyAnalyticsPayload): Promise<void>;
}

export interface AnalyticsEndpointResult {
  status: 202 | 400 | 413 | 415 | 429 | 503;
  headers?: Record<string, string>;
}

export async function handleMacClipyAnalyticsRequest(
  input: AnalyticsEndpointInput,
  dependencies: AnalyticsEndpointDependencies,
): Promise<AnalyticsEndpointResult> {
  const mediaType = input.contentType?.split(';', 1)[0]?.trim().toLowerCase();
  if (mediaType !== 'application/json') {
    return { status: 415 };
  }

  const actualLength = new TextEncoder().encode(input.bodyText).byteLength;
  if (
    (input.contentLength !== null && input.contentLength > MAX_ANALYTICS_BODY_BYTES) ||
    actualLength > MAX_ANALYTICS_BODY_BYTES
  ) {
    return { status: 413 };
  }

  if (!dependencies.consumeRateLimit(input.clientAddress)) {
    return { status: 429, headers: { 'Retry-After': '60' } };
  }

  let value: unknown;
  try {
    value = JSON.parse(input.bodyText);
  } catch {
    return { status: 400 };
  }

  const validation = parseMacClipyAnalyticsPayload(value, dependencies.now?.() ?? new Date());
  if (!validation.ok) {
    return { status: 400 };
  }

  try {
    await dependencies.forward(validation.payload);
    return { status: 202 };
  } catch {
    return { status: 503 };
  }
}
