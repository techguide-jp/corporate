<script lang="ts">
  import { resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import type { ArticleCategory, ArticleTextContent, ArticleTextLink } from '$lib/articles/types';
  import { getResolveArgs, isInternalHref } from '$lib/utils/paths';

  interface Props {
    content: ArticleTextContent;
    slug: string;
    category: ArticleCategory;
  }

  let { content, slug, category }: Props = $props();
  const segments = $derived(typeof content === 'string' ? [content] : content);

  function getHref(link: ArticleTextLink) {
    if (isInternalHref(link.href)) {
      return resolve(...getResolveArgs(link.href));
    }

    return new URL(link.href).href;
  }

  function getDestinationHost(href: string) {
    if (isInternalHref(href)) {
      return undefined;
    }

    return new URL(href).hostname;
  }

  function handleClick(link: ArticleTextLink) {
    trackEvent(link.eventName, {
      slug,
      category,
      cta_label: link.text,
      cta_href: link.href,
      placement: 'inline',
      destination_host: getDestinationHost(link.href),
      cta_target: link.target,
    });
  }
</script>

{#each segments as segment, index (index)}
  {#if typeof segment === 'string'}
    {segment}
  {:else}
    <!-- eslint-disable svelte/no-navigation-without-resolve -->
    <a
      href={getHref(segment)}
      target={segment.isExternal ? '_blank' : undefined}
      rel={segment.isExternal ? 'external noreferrer' : undefined}
      onclick={() => handleClick(segment)}
    >
      {segment.text}</a
    >
    <!-- eslint-enable svelte/no-navigation-without-resolve -->
  {/if}
{/each}

<style>
  a {
    color: var(--color-primary-deep);
    font-weight: 800;
    text-decoration: underline;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.16em;
  }

  a:hover {
    color: var(--color-primary);
  }
</style>
