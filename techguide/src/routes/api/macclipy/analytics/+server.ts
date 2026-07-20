import { dev } from '$app/environment';
import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';
import { getServerEnv } from '$lib/server/env';
import {
  handleMacClipyAnalyticsRequest,
  MAX_ANALYTICS_BODY_BYTES,
} from '$lib/server/macclipy/analyticsEndpoint';
import { createAnalyticsRateLimiter } from '$lib/server/macclipy/analyticsRateLimit';
import { sendMacClipyAnalyticsEvent } from '$lib/server/macclipy/gaMeasurementClient';
import type { RequestHandler } from './$types';

export const prerender = false;

const rateLimiter = createAnalyticsRateLimiter({
  limit: 10,
  windowMs: 60_000,
  maxEntries: 10_000,
});

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const declaredLength = readContentLength(request.headers.get('content-length'));
  if (declaredLength !== null && declaredLength > MAX_ANALYTICS_BODY_BYTES) {
    return new Response(null, { status: 413 });
  }

  const bodyText = await readBoundedBody(request);
  if (bodyText === null) {
    return new Response(null, { status: 413 });
  }

  const result = await handleMacClipyAnalyticsRequest(
    {
      contentType: request.headers.get('content-type'),
      contentLength: declaredLength,
      bodyText,
      clientAddress: getClientAddress(),
    },
    {
      consumeRateLimit: (clientAddress) => rateLimiter.consume(clientAddress),
      forward: async (payload) => {
        if (dev) {
          return;
        }

        const apiSecret = await getServerEnv('MACCLIPY_GA_API_SECRET');
        await sendMacClipyAnalyticsEvent(payload, {
          measurementId: PUBLIC_GA_MEASUREMENT_ID,
          apiSecret: apiSecret ?? '',
        });
      },
    },
  );

  return new Response(null, { status: result.status, headers: result.headers });
};

async function readBoundedBody(request: Request): Promise<string | null> {
  if (!request.body) {
    return '';
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    totalBytes += value.byteLength;
    if (totalBytes > MAX_ANALYTICS_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

function readContentLength(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
}
