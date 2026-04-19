<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { GA_MEASUREMENT_ID, isGaEnabled, trackPageView } from '$lib/analytics';
  import type { Snippet } from 'svelte';
  import '../app.css';

  let { children }: { children: Snippet } = $props();
  let previousUrl = $state('');
  let gaInitialized = false;

  function initializeGa() {
    if (!browser || gaInitialized || !GA_MEASUREMENT_ID || !isGaEnabled(window.location.hostname)) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args) => {
      window.dataLayer?.push(args);
    };

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
    gaInitialized = true;
  }

  function sendPageView() {
    if (!browser || !isGaEnabled(window.location.hostname)) {
      return;
    }

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

    initializeGa();

    if (!gaInitialized) {
      return;
    }

    sendPageView();
  });
</script>

{@render children()}
