import type {
  MacClipyAnalyticsEventName,
  MacClipyAnalyticsPayload,
} from './analyticsValidation.ts';

interface GaMeasurementConfiguration {
  measurementId: string;
  apiSecret: string;
}

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

const GA_EVENT_NAMES: Record<MacClipyAnalyticsEventName, string> = {
  install: 'macclipy_install',
  daily_active: 'macclipy_daily_running',
  daily_running: 'macclipy_daily_running',
  daily_engaged: 'macclipy_daily_engaged',
  feature_usage: 'macclipy_feature_usage',
};

export async function sendMacClipyAnalyticsEvent(
  payload: MacClipyAnalyticsPayload,
  configuration: GaMeasurementConfiguration,
  fetcher: Fetcher = fetch,
): Promise<void> {
  const measurementId = configuration.measurementId.trim();
  const apiSecret = configuration.apiSecret.trim();
  if (!measurementId || !apiSecret) {
    throw new Error('ga_measurement_not_configured');
  }

  const url = new URL('https://www.google-analytics.com/mp/collect');
  url.searchParams.set('measurement_id', measurementId);
  url.searchParams.set('api_secret', apiSecret);

  const eventName = GA_EVENT_NAMES[payload.eventName];
  const sessionId = Math.floor(payload.occurredAt.getTime() / 1_000);
  const eventParams: Record<string, string | number> = {
    app_version: payload.appVersion,
    build_number: payload.buildNumber,
    macos_major_version: payload.macOSMajorVersion,
    architecture: payload.architecture,
    session_id: sessionId,
    engagement_time_msec: 1,
  };
  if (payload.eventName === 'feature_usage') {
    eventParams.feature = payload.feature;
    eventParams.usage_count = payload.usageCount;
    eventParams.usage_date = payload.usageDate;
  }

  const body = {
    client_id: convertUuidToGaClientId(payload.installationId),
    timestamp_micros: payload.occurredAt.getTime() * 1_000,
    consent: {
      ad_user_data: 'DENIED',
      ad_personalization: 'DENIED',
    },
    events: [
      {
        name: eventName,
        params: eventParams,
      },
    ],
  };

  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(3_000),
  });
  if (!response.ok) {
    throw new Error('ga_measurement_failed');
  }
}

function convertUuidToGaClientId(installationId: string): string {
  const hex = installationId.replaceAll('-', '');
  const upperBits = BigInt(`0x${hex.slice(0, 16)}`).toString();
  const lowerBits = BigInt(`0x${hex.slice(16)}`).toString();
  return `${upperBits}.${lowerBits}`;
}
