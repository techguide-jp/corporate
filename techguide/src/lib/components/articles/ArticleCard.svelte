<script lang="ts">
  import { trackEvent } from '$lib/analytics';
  import type { AnalyticsMetadata } from '$lib/analytics';
  import type { Article } from '$lib/articles/types';
  import CategoryBadge from './CategoryBadge.svelte';

  interface Props {
    article: Article;
    trackingEventName?: AnalyticsMetadata['eventName'];
    placement?: 'index' | 'related';
  }

  let { article, trackingEventName = 'article_card_click', placement = 'index' }: Props = $props();
  const articleHref = $derived(`/articles/${article.slug}/`);
  const thumbnail = $derived(article.thumbnail ?? {
    src: article.seo.ogImage,
    alt: article.seo.imageAlt,
  });

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
  <a class="article-card__link-wrapper" href={articleHref} onclick={handleClick}>
    {#if thumbnail.src && thumbnail.alt}
      <img class="article-card__thumbnail" src={thumbnail.src} alt={thumbnail.alt} loading="lazy" />
    {/if}

    <div class="article-card__content">
      <div class="article-card__meta">
        <CategoryBadge category={article.category} />
        <time datetime={article.publishedAt}>{article.publishedAt}</time>
        {#if article.readingTimeMinutes}
          <span>{article.readingTimeMinutes}分</span>
        {/if}
      </div>

      <div class="article-card__body">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>

      <div class="article-card__tags" aria-label="タグ">
        {#each article.tags as tag (tag)}
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
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    overflow: hidden;
    border: 1px solid rgba(117, 92, 56, 0.14);
    border-radius: var(--radius-card);
    background: rgba(255, 255, 255, 0.94);
    box-shadow: var(--shadow-soft);
    color: inherit;
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .article-card__link-wrapper:hover {
    border-color: rgba(198, 146, 64, 0.34);
    box-shadow: 0 24px 48px rgba(101, 72, 31, 0.14);
    transform: translateY(-2px);
  }

  .article-card__thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: rgba(250, 246, 236, 0.9);
  }

  .article-card__content {
    display: grid;
    gap: 18px;
    padding: clamp(20px, 3vw, 28px);
  }

  .article-card__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    color: var(--color-ink-soft);
    font-size: 0.86rem;
    font-weight: 700;
  }

  .article-card__body {
    display: grid;
    gap: 10px;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.32rem, 2vw, 1.7rem);
    line-height: 1.28;
    letter-spacing: -0.03em;
  }

  .article-card__link-wrapper:hover h2 {
    color: var(--color-primary-deep);
  }

  p {
    color: var(--color-ink-soft);
  }

  .article-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .article-card__tags span {
    min-height: 28px;
    padding: 4px 10px;
    border: 1px solid rgba(117, 92, 56, 0.12);
    border-radius: var(--radius-pill);
    background: rgba(250, 246, 236, 0.88);
    color: var(--color-ink-soft);
    font-size: 0.78rem;
    font-weight: 700;
  }

  .article-card__read-more {
    align-self: end;
    width: fit-content;
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }
</style>
