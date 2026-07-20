export type MacClipyAnalyticsEventName = 'install' | 'daily_active';
export type MacClipyArchitecture = 'arm64' | 'x86_64';

export interface MacClipyAnalyticsPayload {
  schemaVersion: 1;
  installationId: string;
  eventName: MacClipyAnalyticsEventName;
  appVersion: string;
  buildNumber: string;
  macOSMajorVersion: number;
  architecture: MacClipyArchitecture;
  occurredAt: Date;
}

export type MacClipyAnalyticsValidationResult =
  | { ok: true; payload: MacClipyAnalyticsPayload }
  | { ok: false; reason: 'invalid_schema' };

const REQUIRED_KEYS = new Set([
  'schema_version',
  'installation_id',
  'event_name',
  'app_version',
  'build_number',
  'macos_major_version',
  'architecture',
  'occurred_at',
]);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const VERSION_PATTERN = /^\d{1,4}(?:\.\d{1,4}){1,3}(?:[-+][0-9A-Za-z.-]{1,24})?$/;
const BUILD_PATTERN = /^[0-9A-Za-z._-]{1,32}$/;
const MAX_EVENT_AGE_MS = 72 * 60 * 60 * 1_000;
const MAX_FUTURE_SKEW_MS = 5 * 60 * 1_000;

export function parseMacClipyAnalyticsPayload(
  value: unknown,
  now: Date = new Date(),
): MacClipyAnalyticsValidationResult {
  if (!isRecord(value) || !hasExactKeys(value)) {
    return invalid();
  }

  const schemaVersion = value.schema_version;
  const installationId = value.installation_id;
  const eventName = value.event_name;
  const appVersion = value.app_version;
  const buildNumber = value.build_number;
  const macOSMajorVersion = value.macos_major_version;
  const architecture = value.architecture;
  const occurredAtValue = value.occurred_at;

  if (
    schemaVersion !== 1 ||
    typeof installationId !== 'string' ||
    !UUID_PATTERN.test(installationId) ||
    (eventName !== 'install' && eventName !== 'daily_active') ||
    typeof appVersion !== 'string' ||
    !VERSION_PATTERN.test(appVersion) ||
    typeof buildNumber !== 'string' ||
    !BUILD_PATTERN.test(buildNumber) ||
    !Number.isInteger(macOSMajorVersion) ||
    typeof macOSMajorVersion !== 'number' ||
    macOSMajorVersion < 14 ||
    macOSMajorVersion > 99 ||
    (architecture !== 'arm64' && architecture !== 'x86_64') ||
    typeof occurredAtValue !== 'string'
  ) {
    return invalid();
  }

  const occurredAt = new Date(occurredAtValue);
  const eventAge = now.getTime() - occurredAt.getTime();
  if (
    !Number.isFinite(occurredAt.getTime()) ||
    eventAge > MAX_EVENT_AGE_MS ||
    eventAge < -MAX_FUTURE_SKEW_MS
  ) {
    return invalid();
  }

  return {
    ok: true,
    payload: {
      schemaVersion,
      installationId: installationId.toLowerCase(),
      eventName,
      appVersion,
      buildNumber,
      macOSMajorVersion,
      architecture,
      occurredAt,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>): boolean {
  const keys = Object.keys(value);
  return keys.length === REQUIRED_KEYS.size && keys.every((key) => REQUIRED_KEYS.has(key));
}

function invalid(): MacClipyAnalyticsValidationResult {
  return { ok: false, reason: 'invalid_schema' };
}
