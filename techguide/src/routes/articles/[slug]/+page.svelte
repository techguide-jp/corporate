<script lang="ts">
  import { browser } from '$app/environment';
  import { trackEvent } from '$lib/analytics';
  import { getArticleCategoryLabel } from '$lib/articles/categories';
  import ArticleContent from '$lib/components/articles/ArticleContent.svelte';
  import ArticleCta from '$lib/components/articles/ArticleCta.svelte';
  import CategoryBadge from '$lib/components/articles/CategoryBadge.svelte';
  import RelatedArticles from '$lib/components/articles/RelatedArticles.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import {
    buildArticleJsonLd,
    buildBreadcrumbJsonLd,
    buildWebPageJsonLd,
    serializeJsonLd,
  } from '$lib/seo';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const article = $derived(data.article);
  const articlePath = $derived(`/articles/${article.slug}/`);
  const categoryLabel = $derived(getArticleCategoryLabel(article.category));
  const articleStructuredData = $derived(
    [
      buildWebPageJsonLd({
        name: article.seo.title,
        description: article.seo.description,
        path: articlePath,
      }),
      buildArticleJsonLd({
        headline: article.title,
        description: article.description,
        path: articlePath,
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt,
        image: article.seo.ogImage,
      }),
      buildBreadcrumbJsonLd([
        { name: 'ホーム', path: '/' },
        { name: '記事', path: pageSeo.articles.path },
        { name: article.title, path: articlePath },
      ]),
    ].map((item) => serializeJsonLd(item)),
  );

  $effect(() => {
    if (!browser) {
      return;
    }

    trackEvent('article_detail_view', {
      slug: article.slug,
      category: article.category,
      tags: article.tags.join(','),
    });
  });
</script>

<SeoHead
  title={article.seo.title}
  description={article.seo.description}
  path={articlePath}
  image={article.seo.ogImage}
  imageAlt={article.seo.imageAlt}
  type="article"
  jsonLd={articleStructuredData}
/>

<Header items={navItems} />

<main>
  <article class="article-detail">
    <div class="container article-detail__container">
      {#if article.thumbnail}
        <header class="article-detail__hero">
          <img src={article.thumbnail.src} alt={article.thumbnail.alt} />
          <div class="article-detail__hero-overlay">
            <div class="article-detail__meta article-detail__meta--overlay">
              <CategoryBadge category={article.category} variant="overlay" />
              <time datetime={article.publishedAt}>{article.publishedAt}</time>
              {#if article.readingTimeMinutes}
                <span>{article.readingTimeMinutes}分</span>
              {/if}
            </div>

            <h1>{article.title}</h1>
            <p>{article.lead}</p>

            <div class="article-detail__tags article-detail__tags--overlay" aria-label="タグ">
              {#each article.tags as tag (tag)}
                <span>{tag}</span>
              {/each}
            </div>
          </div>
        </header>
      {:else}
        <header class="article-detail__header">
          <div class="article-detail__meta">
            <CategoryBadge category={article.category} />
            <span>{categoryLabel}</span>
            <time datetime={article.publishedAt}>{article.publishedAt}</time>
            {#if article.readingTimeMinutes}
              <span>{article.readingTimeMinutes}分</span>
            {/if}
          </div>

          <h1>{article.title}</h1>
          <p>{article.lead}</p>

          <div class="article-detail__tags" aria-label="タグ">
            {#each article.tags as tag (tag)}
              <span>{tag}</span>
            {/each}
          </div>
        </header>
      {/if}

      <ArticleContent {article} />

      {#if article.primaryCta || article.secondaryCta}
        <section class="article-detail__ctas" aria-label="次の行動">
          {#if article.primaryCta}
            <ArticleCta cta={article.primaryCta} slug={article.slug} category={article.category} />
          {/if}
          {#if article.secondaryCta}
            <ArticleCta
              cta={article.secondaryCta}
              slug={article.slug}
              category={article.category}
            />
          {/if}
        </section>
      {/if}

      <RelatedArticles articles={data.relatedArticles} />
    </div>
  </article>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .article-detail {
    padding-block: clamp(44px, 6vw, 72px) clamp(72px, 9vw, 112px);
  }

  .article-detail__container {
    max-width: 860px;
  }

  .article-detail__header {
    display: grid;
    gap: 18px;
    margin-bottom: clamp(34px, 5vw, 52px);
    text-align: left;
  }

  .article-detail__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    color: var(--color-ink-soft);
    font-size: 0.88rem;
    font-weight: 800;
  }

  h1 {
    font-family: var(--font-heading);
    font-size: clamp(1.9rem, 3.6vw, 3rem);
    line-height: 1.14;
    letter-spacing: 0;
  }

  .article-detail__header p {
    color: var(--color-ink-soft);
    font-size: clamp(1.02rem, 1.5vw, 1.16rem);
  }

  .article-detail__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .article-detail__tags span {
    min-height: 30px;
    padding: 5px 11px;
    border: 1px solid rgba(117, 92, 56, 0.12);
    border-radius: var(--radius-pill);
    background: rgba(250, 246, 236, 0.88);
    color: var(--color-ink-soft);
    font-size: 0.82rem;
    font-weight: 700;
  }

  .article-detail__hero {
    display: grid;
    position: relative;
    overflow: hidden;
    margin: 0 0 clamp(34px, 5vw, 52px);
    border-radius: var(--radius-card);
    background: rgba(76, 55, 31, 0.88);
    box-shadow: var(--shadow-soft);
  }

  .article-detail__hero img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: rgba(250, 246, 236, 0.9);
  }

  .article-detail__hero-overlay {
    display: grid;
    position: relative;
    gap: 18px;
    align-content: end;
    min-height: clamp(480px, 56vw, 640px);
    padding: clamp(24px, 5vw, 54px);
    background:
      linear-gradient(
        180deg,
        rgba(27, 22, 16, 0.18) 0%,
        rgba(27, 22, 16, 0.5) 42%,
        rgba(27, 22, 16, 0.9) 100%
      ),
      linear-gradient(
        90deg,
        rgba(27, 22, 16, 0.7) 0%,
        rgba(27, 22, 16, 0.22) 60%,
        rgba(27, 22, 16, 0.52) 100%
      );
    color: rgba(255, 255, 255, 0.95);
  }

  .article-detail__meta--overlay {
    color: rgba(255, 255, 255, 0.84);
  }

  .article-detail__hero-overlay h1 {
    max-width: 780px;
    color: rgba(255, 255, 255, 0.98);
    text-shadow: 0 2px 20px rgba(15, 12, 8, 0.3);
  }

  .article-detail__hero-overlay p {
    max-width: 720px;
    color: rgba(255, 255, 255, 0.84);
    font-size: clamp(1.02rem, 1.5vw, 1.16rem);
  }

  .article-detail__tags--overlay span {
    border-color: rgba(255, 255, 255, 0.56);
    background: rgba(255, 255, 255, 0.86);
    color: rgba(48, 35, 21, 0.96);
    font-weight: 800;
    backdrop-filter: blur(8px);
  }

  .article-detail__ctas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
    margin-top: clamp(38px, 6vw, 58px);
  }

  @media (max-width: 560px) {
    .article-detail__hero-overlay {
      min-height: 560px;
      padding: 22px;
    }

    .article-detail__hero-overlay h1 {
      font-size: 1.68rem;
    }
  }
</style>
