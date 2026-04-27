<script lang="ts">
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import RecruitBackground from '$lib/components/sections/recruit/RecruitBackground.svelte';
  import RecruitBenefits from '$lib/components/sections/recruit/RecruitBenefits.svelte';
  import RecruitCta from '$lib/components/sections/recruit/RecruitCta.svelte';
  import RecruitFit from '$lib/components/sections/recruit/RecruitFit.svelte';
  import RecruitFlow from '$lib/components/sections/recruit/RecruitFlow.svelte';
  import RecruitHero from '$lib/components/sections/recruit/RecruitHero.svelte';
  import RecruitOpportunities from '$lib/components/sections/recruit/RecruitOpportunities.svelte';
  import RecruitStack from '$lib/components/sections/recruit/RecruitStack.svelte';
  import RecruitWork from '$lib/components/sections/recruit/RecruitWork.svelte';
  import RecruitWorkStyle from '$lib/components/sections/recruit/RecruitWorkStyle.svelte';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import { recruitContent } from '$lib/data/recruit';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';

  const recruitStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.recruit.title,
      description: pageSeo.recruit.description,
      path: pageSeo.recruit.path,
      type: 'WebPage',
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: '採用', path: pageSeo.recruit.path },
    ]),
  ].map((item) => serializeJsonLd(item));
</script>

<SeoHead
  title={pageSeo.recruit.title}
  description={pageSeo.recruit.description}
  path={pageSeo.recruit.path}
  jsonLd={recruitStructuredData}
/>

<Header items={navItems} />

<main>
  <RecruitHero
    lead={recruitContent.hero.lead}
    title={recruitContent.hero.title}
    description={recruitContent.hero.description}
  />
  <RecruitBackground title={recruitContent.background.title} items={recruitContent.background.items} />
  <RecruitOpportunities
    title={recruitContent.opportunities.title}
    items={recruitContent.opportunities.items}
  />
  <RecruitWork title={recruitContent.work.title} items={recruitContent.work.items} />
  <RecruitStack
    title={recruitContent.stack.title}
    frontend={recruitContent.stack.frontend}
    platform={recruitContent.stack.platform}
  />
  <RecruitWorkStyle title={recruitContent.workStyle.title} items={recruitContent.workStyle.items} />
  <RecruitFit
    title={recruitContent.fit.title}
    good={recruitContent.fit.good}
    notGood={recruitContent.fit.notGood}
  />
  <RecruitBenefits title={recruitContent.benefits.title} items={recruitContent.benefits.items} />
  <RecruitFlow title={recruitContent.flow.title} steps={recruitContent.flow.steps} />
  <RecruitCta
    title={recruitContent.cta.title}
    description={recruitContent.cta.description}
    buttonLabel={recruitContent.cta.buttonLabel}
    href={recruitContent.cta.href}
  />
</main>

<Footer companyName={companyProfile.name} items={navItems} />
