import { dev } from '$app/environment';
import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';
import { analyticsPagePath, sanitizeAnalyticsUrl } from './privacy';

export const GA_MEASUREMENT_ID = PUBLIC_GA_MEASUREMENT_ID.trim();

const PRODUCTION_HOSTS = new Set(['techguide.jp', 'www.techguide.jp']);
let initialized = false;

type GtagCommand = 'config' | 'event' | 'js';
type GtagParams = Record<string, string | number | boolean | undefined>;

export interface AnalyticsMetadata {
  eventName:
    | 'article_card_click'
    | 'article_category_filter_click'
    | 'article_cta_click'
    | 'article_detail_view'
    | 'article_list_view'
    | 'article_related_click'
    | 'contact_cta_click'
    | 'contact_page_view'
    | 'generate_lead'
    | 'form_view'
    | 'form_start'
    | 'form_submit_attempt'
    | 'form_submit_error'
    | 'service_view'
    | 'service_cta_click'
    | 'contact_form_fallback_click'
    | 'business_automation_click'
    | 'form_flow_click'
    | 'general_contact_click'
    | 'instagram_contact_click'
    | 'lpboost_click'
    | 'macclipy_click'
    | 'outbound_link_click'
    | 'ready_mock_click'
    | 'ready_mock_outbound_click'
    | 'work_academy_fes_click'
    | 'work_aromine_click'
    | 'work_shusei_click';
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

export function initializeGa(): boolean {
  if (typeof window === 'undefined' || !isGaEnabled(window.location.hostname)) return false;
  if (initialized) return true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // Google's loader expects the standard gtag IArguments queue entries.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    page_location: sanitizeAnalyticsUrl(window.location.href),
    page_referrer: sanitizeAnalyticsUrl(document.referrer),
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  initialized = true;
  return true;
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
  if (!initializeGa()) {
    return;
  }

  callGtag('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID,
    page_title: pageTitle,
    page_location: sanitizeAnalyticsUrl(pageLocation),
    page_path: analyticsPagePath(pageLocation) || pagePath,
    page_referrer: pageReferrer ? sanitizeAnalyticsUrl(pageReferrer) : undefined,
  });
}

export function trackEvent(eventName: AnalyticsMetadata['eventName'], params?: GtagParams) {
  if (!initializeGa()) {
    return;
  }

  callGtag('event', eventName, {
    ...params,
    send_to: GA_MEASUREMENT_ID,
    page_location: sanitizeAnalyticsUrl(window.location.href),
    page_path: analyticsPagePath(window.location.href),
  });
}
