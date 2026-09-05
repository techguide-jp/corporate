import { createVisitTracker, normalizeAttributionPage } from './attribution';

let trackVisit: ReturnType<typeof createVisitTracker> | undefined;

export function getBrowserAttribution() {
  if (typeof window === 'undefined') return { landingPage: '', sourcePage: '' };
  if (!trackVisit) {
    let storage: Storage | undefined;
    try {
      storage = window.sessionStorage;
    } catch {
      // ブラウザーで保存が制限されている場合はメモリだけで動作する。
    }
    trackVisit = createVisitTracker(storage);
  }
  const attribution = trackVisit(window.location.pathname);
  if (window.location.pathname === '/contact/') {
    const source = new URLSearchParams(window.location.search).get('source_page');
    attribution.sourcePage = normalizeAttributionPage(source) || attribution.sourcePage;
  }
  return attribution;
}
