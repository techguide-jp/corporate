export type MacClipyAnalyticsEventName =
  | 'install'
  | 'daily_active'
  | 'daily_running'
  | 'daily_engaged'
  | 'feature_usage';
export type MacClipyArchitecture = 'arm64' | 'x86_64';
export const MACCLIPY_FEATURES = [
  'history_panel',
  'favorites_panel',
  'history_item_use',
  'favorite_item_use',
  'search_session',
  'favorite_management',
] as const;
export type MacClipyFeature = (typeof MACCLIPY_FEATURES)[number];

interface MacClipyAnalyticsPayloadBase {
  schemaVersion: 1;
  installationId: string;
  appVersion: string;
  buildNumber: string;
  macOSMajorVersion: number;
  architecture: MacClipyArchitecture;
  occurredAt: Date;
}

export type MacClipyAnalyticsPayload = MacClipyAnalyticsPayloadBase &
  (
    | {
        eventName: Exclude<MacClipyAnalyticsEventName, 'feature_usage'>;
      }
    | {
        eventName: 'feature_usage';
        feature: MacClipyFeature;
        usageCount: number;
        usageDate: string;
      }
  );

export type MacClipyAnalyticsValidationResult =
  | { ok: true; payload: MacClipyAnalyticsPayload }
  | { ok: false; reason: 'invalid_schema' };

const COMMON_KEYS = new Set([
  'schema_version',
  'installation_id',
  'event_name',
  'app_version',
  'build_number',
  'macos_major_version',
  'architecture',
  'occurred_at',
]);
const FEATURE_USAGE_KEYS = new Set([...COMMON_KEYS, 'feature', 'usage_count', 'usage_date']);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const VERSION_PATTERN = /^\d{1,4}(?:\.\d{1,4}){1,3}(?:[-+][0-9A-Za-z.-]{1,24})?$/;
const BUILD_PATTERN = /^[0-9A-Za-z._-]{1,32}$/;
const USAGE_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ALLOWED_FEATURES: ReadonlySet<string> = new Set(MACCLIPY_FEATURES);
const MAX_EVENT_AGE_MS = 72 * 60 * 60 * 1_000;
const MAX_FUTURE_SKEW_MS = 5 * 60 * 1_000;

export function parseMacClipyAnalyticsPayload(
  value: unknown,
  now: Date = new Date(),
): MacClipyAnalyticsValidationResult {
  if (!isRecord(value) || !isEventName(value.event_name)) {
    return invalid();
  }

  const eventName = value.event_name;
  const allowedKeys = eventName === 'feature_usage' ? FEATURE_USAGE_KEYS : COMMON_KEYS;
  if (!hasExactKeys(value, allowedKeys)) {
    return invalid();
  }

  const schemaVersion = value.schema_version;
  const installationId = value.installation_id;
  const appVersion = value.app_version;
  const buildNumber = value.build_number;
  const macOSMajorVersion = value.macos_major_version;
  const architecture = value.architecture;
  const occurredAtValue = value.occurred_at;

  if (
    schemaVersion !== 1 ||
    typeof installationId !== 'string' ||
    !UUID_PATTERN.test(installationId) ||
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

  const commonPayload: MacClipyAnalyticsPayloadBase = {
    schemaVersion,
    installationId: installationId.toLowerCase(),
    appVersion,
    buildNumber,
    macOSMajorVersion,
    architecture,
    occurredAt,
  };

  if (eventName === 'feature_usage') {
    const feature = value.feature;
    const usageCount = value.usage_count;
    const usageDate = value.usage_date;
    if (
      !isAllowedFeature(feature) ||
      typeof usageCount !== 'number' ||
      !Number.isSafeInteger(usageCount) ||
      usageCount <= 0 ||
      !isValidUsageDate(usageDate)
    ) {
      return invalid();
    }

    return {
      ok: true,
      payload: {
        ...commonPayload,
        eventName,
        feature,
        usageCount,
        usageDate,
      },
    };
  }

  return {
    ok: true,
    payload: {
      ...commonPayload,
      eventName,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, allowedKeys: ReadonlySet<string>): boolean {
  const keys = Object.keys(value);
  return keys.length === allowedKeys.size && keys.every((key) => allowedKeys.has(key));
}

function isEventName(value: unknown): value is MacClipyAnalyticsEventName {
  return (
    value === 'install' ||
    value === 'daily_active' ||
    value === 'daily_running' ||
    value === 'daily_engaged' ||
    value === 'feature_usage'
  );
}

function isAllowedFeature(value: unknown): value is MacClipyFeature {
  return typeof value === 'string' && ALLOWED_FEATURES.has(value);
}

function isValidUsageDate(value: unknown): value is string {
  if (typeof value !== 'string' || !USAGE_DATE_PATTERN.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function invalid(): MacClipyAnalyticsValidationResult {
  return { ok: false, reason: 'invalid_schema' };
}
