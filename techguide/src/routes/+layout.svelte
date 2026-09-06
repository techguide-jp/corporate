<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { trackPageView } from '$lib/analytics';
  import { sanitizeAnalyticsUrl } from '$lib/analytics/privacy';
  import type { Snippet } from 'svelte';
  import '../app.css';

  let { children }: { children: Snippet } = $props();
  let previousUrl = '';
  // Navigation is the trigger; updating the referrer must not trigger another PV.
  afterNavigate(() => {
    const location = sanitizeAnalyticsUrl(window.location.href);
    if (location === previousUrl) return;
    trackPageView({
      pageTitle: document.title,
      pageLocation: location,
      pagePath: window.location.pathname,
      pageReferrer: previousUrl || document.referrer || undefined,
    });
    previousUrl = location;
  });
</script>

{@render children()}
