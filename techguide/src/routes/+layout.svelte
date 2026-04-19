<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { GA_MEASUREMENT_ID, isGaEnabled, trackPageView } from '$lib/analytics';
  import type { Snippet } from 'svelte';
  import '../app.css';

  let { children }: { children: Snippet } = $props();
  let previousUrl = $state('');
  const gaBootstrapScript = $derived.by(() => {
    if (!GA_MEASUREMENT_ID) {
      return '';
    }

    return `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      if (['techguide.jp', 'www.techguide.jp'].includes(window.location.hostname)) {
        var gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
        document.head.appendChild(gaScript);
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
      }
    `;
  });

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
    page.url.pathname;
    page.url.search;

    if (!browser || !isGaEnabled(window.location.hostname)) {
      return;
    }

    sendPageView();
  });
</script>

<svelte:head>
  {#if GA_MEASUREMENT_ID}
    <script>{@html gaBootstrapScript}</script>
  {/if}
</svelte:head>

{@render children()}
