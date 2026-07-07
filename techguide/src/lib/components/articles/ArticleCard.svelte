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

    <div class="article-card__overlay">
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
    position: relative;
    height: 100%;
    min-height: 430px;
    overflow: hidden;
    border: 1px solid rgba(117, 92, 56, 0.14);
    border-radius: var(--radius-card);
    background: rgba(76, 55, 31, 0.88);
    box-shadow: var(--shadow-soft);
    color: rgba(255, 255, 255, 0.95);
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
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: rgba(250, 246, 236, 0.9);
    transition: transform 0.35s ease;
  }

  .article-card__link-wrapper:hover .article-card__thumbnail {
    transform: scale(1.03);
  }

  .article-card__overlay {
    display: grid;
    position: relative;
    gap: 18px;
    align-content: end;
    min-height: inherit;
    padding: clamp(20px, 3vw, 28px);
    background:
      linear-gradient(180deg, rgba(34, 28, 20, 0.14) 0%, rgba(34, 28, 20, 0.42) 45%, rgba(34, 28, 20, 0.82) 100%),
      linear-gradient(90deg, rgba(34, 28, 20, 0.52) 0%, rgba(34, 28, 20, 0.14) 55%, rgba(34, 28, 20, 0.42) 100%);
  }

  .article-card__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 0.86rem;
    font-weight: 700;
  }

  .article-card__body {
    display: grid;
    gap: 10px;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: 1.55rem;
    line-height: 1.28;
    letter-spacing: 0;
  }

  .article-card__link-wrapper:hover h2 {
    color: rgba(255, 236, 198, 0.98);
  }

  p {
    color: rgba(255, 255, 255, 0.82);
  }

  .article-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .article-card__tags span {
    min-height: 28px;
    padding: 4px 10px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.14);
    color: rgba(255, 255, 255, 0.84);
    font-size: 0.78rem;
    font-weight: 700;
    backdrop-filter: blur(8px);
  }

  .article-card__read-more {
    align-self: end;
    width: fit-content;
    color: rgba(255, 238, 204, 0.96);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  @media (max-width: 560px) {
    .article-card__link-wrapper {
      min-height: 440px;
    }

    h2 {
      font-size: 1.34rem;
    }
  }
</style>
