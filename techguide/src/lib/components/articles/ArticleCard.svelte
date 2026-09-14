<script lang="ts">
  import { resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import type { AnalyticsMetadata } from '$lib/analytics';
  import type { Article } from '$lib/articles/types';
  import { getResolveArgs, type InternalHref } from '$lib/utils/paths';
  import CategoryBadge from './CategoryBadge.svelte';

  interface Props {
    article: Article;
    trackingEventName?: AnalyticsMetadata['eventName'];
    placement?: 'index' | 'related';
  }

  let { article, trackingEventName = 'article_card_click', placement = 'index' }: Props = $props();
  const articleHref = $derived(`/articles/${article.slug}/` as InternalHref);
  const thumbnail = $derived(
    article.thumbnail ?? {
      src: article.seo.ogImage,
      alt: article.seo.imageAlt,
    },
  );
  const visibleTags = $derived(article.tags.slice(0, 3));

  function handleClick() {
    trackEvent(trackingEventName, {
      slug: article.slug,
      category: article.category,
      tags: article.tags.join(','),
      placement,
    });
  }
</script>

<article class="article-card">
  <a
    class="article-card__link-wrapper"
    href={resolve(...getResolveArgs(articleHref))}
    onclick={handleClick}
  >
    {#if thumbnail.src && thumbnail.alt}
      <div class="article-card__image">
        <img
          class="article-card__thumbnail"
          src={thumbnail.src}
          alt={thumbnail.alt}
          loading="lazy"
        />
      </div>
    {/if}

    <div class="article-card__content">
      <div class="article-card__meta">
        <CategoryBadge category={article.category} />
        <div class="article-card__date">
          <time datetime={article.publishedAt}>{article.publishedAt}</time>
          {#if article.readingTimeMinutes}
            <span>{article.readingTimeMinutes}分</span>
          {/if}
        </div>
      </div>

      <div class="article-card__body">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>

      <div class="article-card__tags" aria-label="タグ">
        {#each visibleTags as tag (tag)}
          <span>{tag}</span>
        {/each}
      </div>

      <span class="article-card__read-more">記事を読む</span>
    </div>
  </a>
</article>

<style>
  .article-card {
    height: 100%;
  }

  .article-card__link-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-card);
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
    color: var(--color-ink);
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .article-card__link-wrapper:hover {
    border-color: rgba(198, 146, 64, 0.34);
    box-shadow: var(--shadow-card);
    transform: translateY(-2px);
  }

  .article-card__link-wrapper:focus-visible {
    outline: 3px solid #946321;
    outline-offset: 4px;
  }

  .article-card__image {
    flex-shrink: 0;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background: var(--color-surface-soft);
  }

  .article-card__thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .article-card__link-wrapper:hover .article-card__thumbnail {
    transform: scale(1.03);
  }

  .article-card__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    padding: clamp(20px, 2vw, 26px);
  }

  .article-card__meta {
    display: grid;
    justify-items: start;
    gap: 8px;
    color: var(--color-ink-soft);
    font-size: 0.82rem;
    font-weight: 700;
  }

  .article-card__date {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .article-card__body {
    display: grid;
    align-content: start;
    gap: 10px;
  }

  h2 {
    min-height: 2.9em;
    font-family: var(--font-heading);
    font-size: 1.35rem;
    line-height: 1.45;
    letter-spacing: 0;
  }

  .article-card__link-wrapper:hover h2 {
    color: #7d5120;
  }

  p {
    display: -webkit-box;
    overflow: hidden;
    color: var(--color-ink-soft);
    font-size: 0.94rem;
    line-height: 1.7;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  .article-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 30px;
    margin-top: auto;
  }

  .article-card__tags span {
    flex: 0 0 auto;
    min-height: 28px;
    padding: 4px 10px;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-pill);
    background: var(--color-surface-soft);
    color: var(--color-ink-soft);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .article-card__read-more {
    width: fit-content;
    color: #7d5120;
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  @media (max-width: 560px) {
    h2 {
      min-height: 0;
      font-size: 1.3rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .article-card__link-wrapper,
    .article-card__thumbnail,
    .article-card__link-wrapper:hover,
    .article-card__link-wrapper:hover .article-card__thumbnail {
      transition: none;
      transform: none;
    }
  }
</style>
