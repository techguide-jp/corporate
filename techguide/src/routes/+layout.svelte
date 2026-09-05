<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { GA_MEASUREMENT_ID, isGaEnabled, trackPageView } from '$lib/analytics';
  import { getBrowserAttribution } from '$lib/analytics/visit';
  import { sanitizeAnalyticsUrl } from '$lib/analytics/attribution';
  import type { Snippet } from 'svelte';
  import '../app.css';

  let { children }: { children: Snippet } = $props();
  // 更新してもページビュー用のeffectを再実行しない。
  let previousUrl = '';
  let gaInitialized = false;

  function initializeGa() {
    if (!browser || gaInitialized || !GA_MEASUREMENT_ID || !isGaEnabled(window.location.hostname)) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.gtag('js', new Date());
    updateGaPageContext();
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
    gaInitialized = true;
  }

  function updateGaPageContext() {
    window.gtag?.('set', {
      page_location: sanitizeAnalyticsUrl(window.location.href),
      page_referrer: sanitizeAnalyticsUrl(previousUrl || document.referrer),
    });
  }

  function sendPageView() {
    if (
      !browser ||
      !isGaEnabled(window.location.hostname) ||
      previousUrl === window.location.href
    ) {
      return;
    }

    updateGaPageContext();
    trackPageView({
      pageTitle: document.title,
      pageLocation: window.location.href,
      pagePath: `${page.url.pathname}${page.url.search}`,
      pageReferrer: previousUrl || document.referrer || undefined,
    });

    previousUrl = window.location.href;
  }

  $effect(() => {
    if (!browser) {
      return;
    }

    initializeGa();
  });

  $effect(() => {
    void page.url.pathname;
    void page.url.search;

    if (browser) getBrowserAttribution();

    initializeGa();

    if (!gaInitialized) {
      return;
    }

    sendPageView();
  });
</script>

{@render children()}
