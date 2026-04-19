import { dev } from '$app/environment';

export const GA_MEASUREMENT_ID = String(import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '');

const PRODUCTION_HOSTS = new Set(['techguide.jp', 'www.techguide.jp']);

type GtagCommand = 'config' | 'event' | 'js';
type GtagParams = Record<string, string | number | boolean | undefined>;

export interface AnalyticsMetadata {
  eventName:
    | 'contact_cta_click'
    | 'contact_page_view'
    | 'contact_form_fallback_click'
    | 'outbound_link_click';
  params?: GtagParams;
}

function hasMeasurementId() {
  return typeof GA_MEASUREMENT_ID === 'string' && GA_MEASUREMENT_ID.length > 0;
}

export function isGaEnabled(hostname?: string) {
  if (dev || !hasMeasurementId() || !hostname) {
    return false;
  }

  return PRODUCTION_HOSTS.has(hostname);
}

export function callGtag(command: GtagCommand, target: string | Date, params?: GtagParams) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  if (command === 'js' && target instanceof Date) {
    window.gtag(command, target);
    return;
  }

  if (typeof target === 'string') {
    window.gtag(command, target, params);
  }
}

export function trackPageView({
  pageTitle,
  pageLocation,
  pagePath,
  pageReferrer,
}: {
  pageTitle: string;
  pageLocation: string;
  pagePath: string;
  pageReferrer?: string;
}) {
  if (!isGaEnabled(window.location.hostname)) {
    return;
  }

  callGtag('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID,
    page_title: pageTitle,
    page_location: pageLocation,
    page_path: pagePath,
    page_referrer: pageReferrer,
  });
}

export function trackEvent(eventName: AnalyticsMetadata['eventName'], params?: GtagParams) {
  if (!isGaEnabled(window.location.hostname)) {
    return;
  }

  callGtag('event', eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
  });
}
