<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import ActionButton from '$lib/components/ui/ActionButton.svelte';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';
  import { getNewsCategoryLabel } from '$lib/news/categories';
  import { formatNewsDate } from '$lib/news/get-news';
  import {
    buildArticleJsonLd,
    buildBreadcrumbJsonLd,
    buildWebPageJsonLd,
    serializeJsonLd,
  } from '$lib/seo';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const item = $derived(data.item);
  const itemPath = $derived(`/news/${item.slug}/`);
  const categoryLabel = $derived(getNewsCategoryLabel(item.category));
  const newsStructuredData = $derived(
    [
      buildWebPageJsonLd({
        name: `${item.title} | TechGuide`,
        description: item.description,
        path: itemPath,
      }),
      buildArticleJsonLd({
        headline: item.title,
        description: item.description,
        path: itemPath,
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
        image: item.image?.src,
        type: 'NewsArticle',
      }),
      buildBreadcrumbJsonLd([
        { name: 'ホーム', path: '/' },
        { name: 'お知らせ', path: pageSeo.news.path },
        { name: item.title, path: itemPath },
      ]),
    ].map((structuredItem) => serializeJsonLd(structuredItem)),
  );
</script>

<SeoHead
  title={`${item.title} | TechGuide`}
  description={item.description}
  path={itemPath}
  image={item.image?.src}
  imageAlt={item.image?.alt}
  type="article"
  jsonLd={newsStructuredData}
/>

<Header items={navItems} />

<main>
  <article class="news-detail">
    <div class="container news-detail__container">
      <header class="news-detail__header">
        <div class="news-detail__meta">
          <time datetime={item.publishedAt}>{formatNewsDate(item.publishedAt)}</time>
          <span>{categoryLabel}</span>
        </div>
        <h1>{item.title}</h1>
        <p>{item.lead}</p>
      </header>

      {#if item.image}
        <figure class="news-detail__image">
          <img
            src={asset(item.image.src)}
            alt={item.image.alt}
            style:object-position={item.image.position ?? 'center'}
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      {/if}

      <div class="news-detail__content">
        {#each item.sections as section (section.title)}
          <section>
            <h2>{section.title}</h2>
            {#each section.paragraphs as paragraph (paragraph)}
              <p>{paragraph}</p>
            {/each}
            {#if section.points}
              <ul>
                {#each section.points as point (point)}
                  <li>{point}</li>
                {/each}
              </ul>
            {/if}
          </section>
        {/each}
      </div>

      {#if item.links?.length}
        <div class="news-detail__actions" aria-label="関連リンク">
          {#each item.links as link (link.href)}
            <ActionButton
              href={link.href}
              label={link.label}
              tone={link.tone}
              analytics={link.href.startsWith('/contact/')
                ? {
                    eventName: 'contact_cta_click',
                    params: { placement: `news_${item.slug}` },
                  }
                : undefined}
            />
          {/each}
        </div>
      {/if}

      <a class="news-detail__back" href={resolve('/news/')}>お知らせ一覧へ戻る</a>
    </div>
  </article>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .news-detail {
    padding-block: clamp(44px, 6vw, 72px) clamp(72px, 9vw, 112px);
  }

  .news-detail__container {
    max-width: 820px;
  }

  .news-detail__header {
    display: grid;
    gap: 18px;
    padding-bottom: clamp(30px, 5vw, 48px);
    border-bottom: 1px solid var(--color-line);
  }

  .news-detail__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    color: var(--color-ink-soft);
    font-size: 0.86rem;
    font-weight: 800;
  }

  .news-detail__meta span {
    padding: 4px 11px;
    border-radius: var(--radius-pill);
    background: rgba(230, 184, 92, 0.18);
    color: rgba(120, 84, 35, 0.96);
  }

  h1 {
    font-family: var(--font-heading);
    font-size: clamp(1.9rem, 3.8vw, 3.1rem);
    line-height: 1.2;
    letter-spacing: 0;
  }

  .news-detail__header > p {
    color: var(--color-ink-soft);
    font-size: clamp(1.02rem, 1.6vw, 1.18rem);
    line-height: 1.85;
  }

  .news-detail__image {
    overflow: hidden;
    aspect-ratio: 16 / 9;
    margin-top: clamp(30px, 5vw, 48px);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-card);
    background: rgba(250, 246, 236, 0.94);
    box-shadow: var(--shadow-soft);
  }

  .news-detail__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .news-detail__content {
    display: grid;
    gap: clamp(34px, 5vw, 52px);
    padding-block: clamp(34px, 5vw, 52px);
  }

  .news-detail__content section {
    display: grid;
    gap: 16px;
  }

  .news-detail__content h2 {
    padding-left: 14px;
    border-left: 4px solid var(--color-primary);
    font-family: var(--font-heading);
    font-size: clamp(1.35rem, 2.2vw, 1.75rem);
    line-height: 1.4;
    letter-spacing: 0;
  }

  .news-detail__content p,
  .news-detail__content ul {
    color: var(--color-ink-soft);
    line-height: 1.95;
  }

  .news-detail__content ul {
    display: grid;
    gap: 8px;
    margin: 0;
    padding-left: 1.4rem;
  }

  .news-detail__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    padding: clamp(24px, 4vw, 34px);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-card);
    background: rgba(250, 246, 236, 0.82);
  }

  .news-detail__back {
    display: inline-flex;
    margin-top: clamp(34px, 5vw, 52px);
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .news-detail__back::before {
    margin-right: 8px;
    content: '←';
  }

  @media (max-width: 560px) {
    .news-detail__actions {
      display: grid;
    }
  }
</style>
