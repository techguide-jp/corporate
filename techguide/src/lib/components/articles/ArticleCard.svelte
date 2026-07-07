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
  <div class="article-card__meta">
    <CategoryBadge category={article.category} />
    <time datetime={article.publishedAt}>{article.publishedAt}</time>
    {#if article.readingTimeMinutes}
      <span>{article.readingTimeMinutes}分</span>
    {/if}
  </div>

  <div class="article-card__body">
    <h2>
      <a href={articleHref} onclick={handleClick}>{article.title}</a>
    </h2>
    <p>{article.description}</p>
  </div>

  <div class="article-card__tags" aria-label="タグ">
    {#each article.tags as tag (tag)}
      <span>{tag}</span>
    {/each}
  </div>

  <a class="article-card__link" href={articleHref} onclick={handleClick}>記事を読む</a>
</article>

<style>
  .article-card {
    display: grid;
    gap: 18px;
    height: 100%;
    padding: clamp(22px, 3vw, 30px);
    border: 1px solid rgba(117, 92, 56, 0.14);
    border-radius: var(--radius-card);
    background: rgba(255, 255, 255, 0.94);
    box-shadow: var(--shadow-soft);
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

  h2 a:hover {
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

  .article-card__link {
    align-self: end;
    width: fit-content;
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }
</style>
