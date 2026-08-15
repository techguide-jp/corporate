<script lang="ts">
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import NewsList from '$lib/components/news/NewsList.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';
  import { getPublishedNewsItems } from '$lib/news/get-news';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';

  const items = getPublishedNewsItems();
  const newsStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.news.title,
      description: pageSeo.news.description,
      path: pageSeo.news.path,
      type: 'CollectionPage',
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'お知らせ', path: pageSeo.news.path },
    ]),
  ].map((item) => serializeJsonLd(item));
</script>

<SeoHead
  title={pageSeo.news.title}
  description={pageSeo.news.description}
  path={pageSeo.news.path}
  jsonLd={newsStructuredData}
/>

<Header items={navItems} />

<main>
  <section class="news-index section">
    <div class="container news-index__inner">
      <SectionHeading
        eyebrow="News"
        title="お知らせ"
        subtitle="TechGuideのサービス、プロダクト、制作実績、イベント、採用などの最新情報をお届けします。"
        level={1}
      />

      <NewsList {items} />
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .news-index {
    padding-top: clamp(44px, 6vw, 72px);
  }

  .news-index__inner {
    max-width: 940px;
  }
</style>
