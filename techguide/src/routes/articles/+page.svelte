<script lang="ts">
  import { browser } from '$app/environment';
  import { trackEvent } from '$lib/analytics';
  import { articleCategories } from '$lib/articles/categories';
  import { getPublishedArticles } from '$lib/articles/get-article';
  import type { ArticleCategory } from '$lib/articles/types';
  import ArticleCard from '$lib/components/articles/ArticleCard.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';

  type CategoryFilter = ArticleCategory | 'all';

  const articles = getPublishedArticles();
  const availableCategories = articleCategories.filter((category) =>
    articles.some((article) => article.category === category.id),
  );
  let selectedCategory = $state<CategoryFilter>('all');
  const filteredArticles = $derived(
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory),
  );
  const articlesStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.articles.title,
      description: pageSeo.articles.description,
      path: pageSeo.articles.path,
      type: 'CollectionPage',
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: '記事', path: pageSeo.articles.path },
    ]),
  ].map((item) => serializeJsonLd(item));

  function updateCategory(category: CategoryFilter) {
    selectedCategory = category;
    trackEvent('article_category_filter_click', {
      category,
    });
  }

  $effect(() => {
    if (!browser) {
      return;
    }

    trackEvent('article_list_view', {
      article_count: articles.length,
    });
  });
</script>

<SeoHead
  title={pageSeo.articles.title}
  description={pageSeo.articles.description}
  path={pageSeo.articles.path}
  image={pageSeo.articles.image}
  imageAlt={pageSeo.articles.imageAlt}
  jsonLd={articlesStructuredData}
/>

<Header items={navItems} />

<main>
  <section class="section articles-index">
    <div class="container">
      <SectionHeading
        eyebrow="Journal"
        title="TechGuide Journal"
        subtitle="IT導入、業務改善、AI活用、試作開発、事業と技術の橋渡しについて、TechGuideが大切にしている考え方と支援の進め方をまとめています。"
        level={1}
      />

      {#if availableCategories.length > 0}
        <div class="articles-index__filters" aria-label="記事カテゴリ">
          <button
            class:articles-index__filter--active={selectedCategory === 'all'}
            type="button"
            onclick={() => updateCategory('all')}
          >
            すべて
          </button>
          {#each availableCategories as category (category.id)}
            <button
              class:articles-index__filter--active={selectedCategory === category.id}
              type="button"
              onclick={() => updateCategory(category.id)}
            >
              {category.label}
            </button>
          {/each}
        </div>
      {/if}

      <div class="articles-index__grid">
        {#each filteredArticles as article (article.slug)}
          <ArticleCard {article} />
        {/each}
      </div>
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .articles-index {
    padding-top: clamp(44px, 6vw, 72px);
  }

  .articles-index__filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: clamp(28px, 4vw, 42px);
  }

  .articles-index__filters button {
    min-height: 42px;
    padding-inline: 18px;
    border: 1px solid rgba(117, 92, 56, 0.16);
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.92);
    color: var(--color-ink-soft);
    font-weight: 800;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .articles-index__filters button:hover,
  .articles-index__filter--active {
    color: var(--color-ink);
    background: rgba(230, 184, 92, 0.18);
    box-shadow: var(--shadow-soft);
  }

  .articles-index__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: clamp(18px, 2vw, 24px);
  }
</style>
