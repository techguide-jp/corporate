<script lang="ts">
  import { resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import type { ArticleCta as ArticleCtaType, ArticleCategory } from '$lib/articles/types';
  import { getResolveArgs, isInternalHref } from '$lib/utils/paths';

  interface Props {
    cta: ArticleCtaType;
    slug: string;
    category: ArticleCategory;
    variant?: 'panel' | 'compact';
  }

  let { cta, slug, category, variant = 'panel' }: Props = $props();

  const destinationHost = $derived.by(() => {
    if (isInternalHref(cta.href)) {
      return undefined;
    }

    return new URL(cta.href).hostname;
  });

  const resolvedHref = $derived(
    isInternalHref(cta.href) ? resolve(...getResolveArgs(cta.href)) : cta.href,
  );

  function handleClick() {
    trackEvent(cta.eventName, {
      slug,
      category,
      cta_label: cta.label,
      cta_href: cta.href,
      placement: cta.placement,
      destination_host: destinationHost,
      cta_target: cta.target,
    });
  }
</script>

<div class={`article-cta article-cta--${variant}`}>
  {#if cta.description}
    <p>{cta.description}</p>
  {/if}

  <a
    class={`article-cta__button article-cta__button--${cta.tone ?? 'warm'}`}
    href={resolvedHref}
    target={cta.isExternal ? '_blank' : undefined}
    rel={cta.isExternal ? 'external noreferrer' : undefined}
    onclick={handleClick}
  >
    {cta.label}
  </a>
</div>

<style>
  .article-cta {
    display: grid;
    gap: 14px;
    align-items: center;
  }

  .article-cta--panel {
    padding: clamp(20px, 3vw, 28px);
    border: 1px solid rgba(117, 92, 56, 0.14);
    border-radius: var(--radius-card);
    background: linear-gradient(
      180deg,
      rgba(255, 252, 246, 0.98) 0%,
      rgba(250, 243, 229, 0.98) 100%
    );
    box-shadow: var(--shadow-soft);
  }

  .article-cta--compact {
    justify-items: start;
  }

  p {
    color: var(--color-ink-soft);
  }

  .article-cta__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    min-width: 210px;
    min-height: 52px;
    padding-inline: 24px;
    border-radius: var(--radius-pill);
    font-weight: 800;
    text-align: center;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .article-cta__button:hover {
    transform: translateY(-1px);
  }

  .article-cta__button--warm {
    color: rgba(255, 255, 255, 0.96);
    background: linear-gradient(
      180deg,
      rgba(248, 187, 114, 1) 0%,
      rgba(235, 162, 86, 1) 56%,
      rgba(214, 132, 58, 1) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.32),
      0 6px 0 rgba(181, 113, 53, 0.72),
      0 14px 24px rgba(224, 164, 91, 0.2);
  }

  .article-cta__button--light {
    color: var(--color-ink);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(250, 243, 231, 0.98) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92),
      0 6px 0 rgba(194, 173, 143, 0.95),
      0 14px 24px rgba(104, 72, 28, 0.14);
  }

  @media (max-width: 560px) {
    .article-cta__button {
      width: 100%;
      min-width: 0;
      white-space: normal;
    }
  }
</style>
