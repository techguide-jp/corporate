import { CHIGASAKI_PATHS } from '../local-seo/chigasaki/paths.ts';

const ATTRIBUTION_PAGES = [
  '/',
  '/services/',
  '/contact/',
  ...Object.values(CHIGASAKI_PATHS),
  'other',
];
const VISIT_STORAGE_KEY = 'techguide.visit.v1';
const VISIT_TIMEOUT_MS = 30 * 60 * 1000;

export interface ContactAttribution {
  landingPage: string;
  sourcePage: string;
}

interface Visit {
  landingPage: string;
  currentPage: string;
  previousPage: string;
  updatedAt: number;
}

type VisitStorage = Pick<Storage, 'getItem' | 'setItem'>;

// 任意のURL・クエリ・個人情報をフォームやGAへ転送しない。
export function normalizeAttributionPage(value: unknown): string {
  return typeof value === 'string' && ATTRIBUTION_PAGES.includes(value) ? value : '';
}

export function createVisitTracker(storage?: VisitStorage, now = Date.now) {
  let visit: Visit | undefined;

  function restoreVisit(): Visit | undefined {
    try {
      const raw = storage?.getItem(VISIT_STORAGE_KEY);
      if (!raw) return;
      const candidate = JSON.parse(raw) as Visit;
      if (
        normalizeAttributionPage(candidate.landingPage) &&
        normalizeAttributionPage(candidate.currentPage) &&
        (candidate.previousPage === '' || normalizeAttributionPage(candidate.previousPage)) &&
        Number.isFinite(candidate.updatedAt)
      ) {
        return candidate;
      }
    } catch {
      // 保存制限・破損データがあってもフォーム利用を妨げない。
    }
  }

  return (pathname: string): ContactAttribution => {
    visit ??= restoreVisit();
    const time = now();
    const currentPage = normalizeAttributionPage(pathname) || 'other';
    if (!visit || time - visit.updatedAt >= VISIT_TIMEOUT_MS || time < visit.updatedAt) {
      visit = { landingPage: currentPage, currentPage, previousPage: '', updatedAt: time };
    } else {
      if (visit.currentPage !== currentPage) {
        visit.previousPage = visit.currentPage;
        visit.currentPage = currentPage;
      }
      visit.updatedAt = time;
    }

    try {
      storage?.setItem(VISIT_STORAGE_KEY, JSON.stringify(visit));
    } catch {
      // 同一画面内ではメモリの値を利用する。
    }

    return {
      landingPage: visit.landingPage,
      sourcePage: currentPage === '/contact/' ? visit.previousPage : currentPage,
    };
  };
}

export function sanitizeAnalyticsUrl(value: string): string {
  if (!value) return value;
  try {
    const url = new URL(value, 'https://techguide.jp');
    if (url.pathname === '/contact/' || url.pathname === '/contact') {
      url.search = '';
      url.hash = '';
    }
    return value.startsWith('/') ? `${url.pathname}${url.search}${url.hash}` : url.href;
  } catch {
    return '';
  }
}
