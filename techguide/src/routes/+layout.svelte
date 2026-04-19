<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import '../app.css';

  const GA_MEASUREMENT_ID = 'G-MS3VSF32XF';

  let { children }: { children: Snippet } = $props();

  $effect(() => {
    page.url.pathname;
    page.url.search;

    if (!browser || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${page.url.pathname}${page.url.search}`
    });
  });
</script>

{@render children()}
