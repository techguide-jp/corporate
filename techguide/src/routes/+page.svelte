<script lang="ts">
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import About from '$lib/components/sections/About.svelte';
  import Company from '$lib/components/sections/Company.svelte';
  import ContactCta from '$lib/components/sections/ContactCta.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Services from '$lib/components/sections/Services.svelte';
  import ShowcaseSection from '$lib/components/sections/ShowcaseSection.svelte';
  import {
    accessInfo,
    companyProfile,
    contactInfo,
    hero,
    navItems,
    productItems,
    services,
    story,
    workItems,
  } from '$lib/data/site';
</script>

<svelte:head>
  <title>TechGuide | IT導入・LP制作・AI活用まで伴走するパートナー</title>
  <meta
    name="description"
    content="テックガイド合同会社のコーポレートサイト。導入前整理・IT活用支援、LP制作・受託開発、AI活用・技術教育・組織支援まで事業フェーズに合わせて伴走します。"
  />
</svelte:head>

<Header items={navItems} />

<main>
  <Hero content={hero} />
  <About content={story} />
  <Services items={services} />
  <ShowcaseSection
    id="products"
    title="プロダクト"
    subtitle="イベント運営や制作実績の把握に役立つプロダクト・アーカイブです。"
    items={productItems}
  />
  <ShowcaseSection
    id="works"
    title="実績"
    subtitle="実際の公開サイトで、構成や導線整理まで含めた制作実績をご覧いただけます。"
    items={workItems}
    surface="soft"
  />
  <Company profile={companyProfile} access={accessInfo} contact={contactInfo} />
  <ContactCta contact={contactInfo} />
</main>

<Footer companyName={companyProfile.name} items={navItems} />
