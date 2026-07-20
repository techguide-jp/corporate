import type { MacClipyAnalyticsPayload } from './analyticsValidation.ts';

interface GaMeasurementConfiguration {
  measurementId: string;
  apiSecret: string;
}

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

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

  const eventName = payload.eventName === 'install' ? 'macclipy_install' : 'macclipy_daily_active';
  const sessionId = Math.floor(payload.occurredAt.getTime() / 1_000);
  const body = {
    client_id: payload.installationId,
    timestamp_micros: payload.occurredAt.getTime() * 1_000,
    consent: {
      ad_user_data: 'DENIED',
      ad_personalization: 'DENIED',
    },
    events: [
      {
        name: eventName,
        params: {
          app_version: payload.appVersion,
          build_number: payload.buildNumber,
          macos_major_version: payload.macOSMajorVersion,
          architecture: payload.architecture,
          session_id: sessionId,
          engagement_time_msec: 1,
        },
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
