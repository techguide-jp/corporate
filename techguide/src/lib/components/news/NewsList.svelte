<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { getNewsCategoryLabel } from '$lib/news/categories';
  import { formatNewsDate } from '$lib/news/get-news';
  import type { NewsItem } from '$lib/news/types';
  import { getResolveArgs, type InternalHref } from '$lib/utils/paths';

  interface Props {
    items: readonly NewsItem[];
    variant?: 'default' | 'compact';
  }

  let { items, variant = 'default' }: Props = $props();

  function getNewsHref(slug: string) {
    return `/news/${slug}/` as InternalHref;
  }
</script>

<div class={`news-list news-list--${variant}`}>
  {#each items as item (item.slug)}
    <article class="news-list__item">
      <a
        class:news-list__link--without-image={!item.image}
        href={resolve(...getResolveArgs(getNewsHref(item.slug)))}
      >
        {#if item.image}
          <div class="news-list__image">
            <img
              src={asset(item.image.src)}
              alt={item.image.alt}
              style:object-position={item.image.position ?? 'center'}
              loading="lazy"
              decoding="async"
            />
          </div>
        {/if}
        <div class="news-list__meta">
          <time datetime={item.publishedAt}>{formatNewsDate(item.publishedAt)}</time>
          <span>{getNewsCategoryLabel(item.category)}</span>
        </div>
        <div class="news-list__body">
          <h2>{item.title}</h2>
          {#if variant === 'default'}
            <p>{item.description}</p>
          {/if}
        </div>
        <span class="news-list__arrow" aria-hidden="true">→</span>
      </a>
    </article>
  {/each}
</div>

<style>
  .news-list {
    overflow: hidden;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-card);
    background: rgba(255, 255, 255, 0.92);
    box-shadow: var(--shadow-soft);
  }

  .news-list__item + .news-list__item {
    border-top: 1px solid var(--color-line);
  }

  a {
    display: grid;
    grid-template-columns: 144px minmax(180px, 0.27fr) minmax(0, 1fr) auto;
    gap: clamp(14px, 2vw, 22px);
    align-items: center;
    min-height: 122px;
    padding: clamp(20px, 3vw, 28px);
    transition:
      color 0.2s ease,
      background-color 0.2s ease;
  }

  a:hover {
    color: var(--color-primary-deep);
    background: rgba(255, 248, 226, 0.78);
  }

  a.news-list__link--without-image {
    grid-template-columns: minmax(180px, 0.28fr) minmax(0, 1fr) auto;
  }

  .news-list__image {
    overflow: hidden;
    align-self: stretch;
    min-height: 92px;
    border-radius: calc(var(--radius-card) * 0.58);
    background: rgba(250, 246, 236, 0.94);
  }

  .news-list__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  a:hover .news-list__image img {
    transform: scale(1.035);
  }

  .news-list__meta {
    display: grid;
    grid-template-columns: 5.5rem max-content;
    align-items: center;
    gap: 10px;
    color: var(--color-ink-soft);
    font-size: 0.84rem;
    font-weight: 800;
  }

  .news-list__meta time {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .news-list__meta span {
    white-space: nowrap;
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    background: rgba(230, 184, 92, 0.18);
    color: rgba(120, 84, 35, 0.96);
  }

  .news-list__body {
    display: grid;
    gap: 7px;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.08rem, 1.6vw, 1.3rem);
    line-height: 1.45;
    letter-spacing: 0;
  }

  p {
    color: var(--color-ink-soft);
    line-height: 1.75;
  }

  .news-list__arrow {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 999px;
    background: rgba(250, 246, 236, 0.94);
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    transition: transform 0.2s ease;
  }

  a:hover .news-list__arrow {
    transform: translateX(3px);
  }

  .news-list--compact a {
    min-height: 96px;
    padding-block: 18px;
  }

  .news-list--compact .news-list__image {
    min-height: 78px;
  }

  @media (max-width: 820px) {
    a {
      grid-template-columns: 128px minmax(0, 1fr) auto;
      gap: 12px 16px;
    }

    .news-list__image {
      grid-column: 1;
      grid-row: 1 / 3;
    }

    .news-list__meta {
      grid-column: 2 / -1;
    }

    .news-list__body {
      grid-column: 2;
    }

    .news-list__arrow {
      grid-column: 3;
      grid-row: 2;
    }

    a.news-list__link--without-image {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .news-list__link--without-image .news-list__meta {
      grid-column: 1 / -1;
    }

    .news-list__link--without-image .news-list__body {
      grid-column: 1;
    }

    .news-list__link--without-image .news-list__arrow {
      grid-column: 2;
    }
  }

  @media (max-width: 560px) {
    a {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .news-list__image {
      grid-column: 1 / -1;
      grid-row: auto;
      aspect-ratio: 16 / 9;
    }

    .news-list__meta {
      grid-column: 1 / -1;
    }

    .news-list__body {
      grid-column: 1;
    }

    .news-list__arrow {
      grid-column: 2;
      grid-row: auto;
    }
  }
</style>
