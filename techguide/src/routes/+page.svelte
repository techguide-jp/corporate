<script lang="ts">
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import About from '$lib/components/sections/About.svelte';
  import Company from '$lib/components/sections/Company.svelte';
  import ContactCta from '$lib/components/sections/ContactCta.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import Services from '$lib/components/sections/Services.svelte';
  import ShowcaseSection from '$lib/components/sections/ShowcaseSection.svelte';
  import {
    buildOrganizationJsonLd,
    buildProfessionalServiceJsonLd,
    buildWebPageJsonLd,
    buildWebSiteJsonLd,
    serializeJsonLd,
  } from '$lib/seo';
  import {
    accessInfo,
    companyProfile,
    contactInfo,
    hero,
    navItems,
    pageSeo,
    productItems,
    services,
    story,
    workItems,
  } from '$lib/data/site';

  const homeStructuredData = [
    buildWebSiteJsonLd(),
    buildOrganizationJsonLd(),
    buildProfessionalServiceJsonLd(),
    buildWebPageJsonLd({
      name: pageSeo.home.title,
      description: pageSeo.home.description,
      path: pageSeo.home.path,
    }),
  ].map((item) => serializeJsonLd(item));
</script>

<SeoHead
  title={pageSeo.home.title}
  description={pageSeo.home.description}
  path={pageSeo.home.path}
  jsonLd={homeStructuredData}
  preloadImage={true}
/>

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
