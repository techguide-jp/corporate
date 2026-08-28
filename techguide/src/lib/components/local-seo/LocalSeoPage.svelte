<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ShowcaseSection from '$lib/components/sections/ShowcaseSection.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import ActionButton from '$lib/components/ui/ActionButton.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { companyProfile, navItems, workItems } from '$lib/data/site';
  import type { LocalSeoPageContent } from '$lib/local-seo/types';
  import {
    buildAbsoluteUrl,
    buildBreadcrumbJsonLd,
    buildWebPageJsonLd,
    serializeJsonLd,
  } from '$lib/seo';
  import { buildServiceJsonLd } from '$lib/seo/service';
  import { getResolveArgs } from '$lib/utils/paths';
  import '$lib/local-seo/local-seo.css';

  interface Props {
    content: LocalSeoPageContent;
  }

  let { content }: Props = $props();

  const breadcrumbItems = $derived(
    content.kind === 'hub'
      ? [
          { name: 'ホーム', path: '/' },
          { name: content.breadcrumbLabel, path: content.seo.path },
        ]
      : [
          { name: 'ホーム', path: '/' },
          { name: '茅ヶ崎のIT相談', path: '/chigasaki/' },
          { name: content.breadcrumbLabel, path: content.seo.path },
        ],
  );

  const structuredData = $derived.by(() => {
    const items: Record<string, unknown>[] = [
      buildWebPageJsonLd({
        name: content.seo.title,
        description: content.seo.description,
        path: content.seo.path,
        type: content.kind === 'hub' ? 'CollectionPage' : 'WebPage',
      }),
      buildBreadcrumbJsonLd(breadcrumbItems),
    ];

    if (content.serviceType) {
      items.push(
        buildServiceJsonLd({
          name: content.seo.title,
          description: content.seo.description,
          url: buildAbsoluteUrl(content.seo.path),
          providerId: `${buildAbsoluteUrl('/')}#organization`,
          serviceType: content.serviceType,
          areaServed: [
            { type: 'City', name: '茅ヶ崎市' },
            { type: 'AdministrativeArea', name: '湘南エリア' },
          ],
        }),
      );
    }

    return items.map((item) => serializeJsonLd(item));
  });

  const contactHref = $derived(
    `/contact/?${new URLSearchParams({
      category: content.contact.category,
      subject: content.contact.subject,
    }).toString()}`,
  );

  const selectedWorks = workItems.slice(0, 3);
</script>

<SeoHead
  title={content.seo.title}
  description={content.seo.description}
  path={content.seo.path}
  image={content.seo.image}
  imageAlt={content.seo.imageAlt}
  jsonLd={structuredData}
  preloadImage={true}
/>

<Header items={navItems} />

<main class="local-page">
  <section class="local-hero">
    <div class="container">
      <nav class="local-breadcrumb" aria-label="パンくずリスト">
        <a href={resolve('/')}>ホーム</a>
        <span aria-hidden="true">/</span>
        {#if content.kind === 'service'}
          <a href={resolve('/chigasaki/')}>茅ヶ崎のIT相談</a>
          <span aria-hidden="true">/</span>
        {/if}
        <span aria-current="page">{content.breadcrumbLabel}</span>
      </nav>

      <div class="local-hero__grid">
        <div class="local-hero__copy">
          <p class="local-eyebrow">{content.eyebrow}</p>
          <h1>{content.heroTitle}</h1>
          <p class="local-hero__lead">{content.heroLead}</p>
          <div class="local-badges" aria-label="対応の特徴">
            {#each content.badges as badge (badge)}
              <span>{badge}</span>
            {/each}
          </div>
          <ActionButton
            href={contactHref}
            label="茅ヶ崎エリアの相談をする"
            size="lg"
            analytics={{
              eventName: 'contact_cta_click',
              params: { placement: `${content.contact.placement}_hero` },
            }}
          />
        </div>

        <div class="local-hero__visual">
          <img
            src={asset(content.seo.image)}
            alt={content.seo.imageAlt}
            width="1440"
            height="900"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="section local-problems">
    <div class="container">
      <SectionHeading title={content.problems.title} subtitle={content.problems.description} />
      <div class="local-grid local-grid--three">
        {#each content.problems.items as item (item.title)}
          <article class="local-info-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  {#if content.primaryLinks}
    <section class="section local-links-section">
      <div class="container">
        <SectionHeading
          title={content.primaryLinks.title}
          subtitle={content.primaryLinks.description}
        />
        <div class="local-grid local-grid--three">
          {#each content.primaryLinks.items as item (item.href)}
            <a class="local-link-card" href={resolve(...getResolveArgs(item.href))}>
              <img
                src={asset(item.image)}
                alt={item.imageAlt}
                width="800"
                height="500"
                loading="lazy"
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>{item.ctaLabel}</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <section class="section local-support">
    <div class="container">
      <SectionHeading title={content.support.title} subtitle={content.support.description} />
      <div class="local-grid local-grid--three">
        {#each content.support.items as item, index (item.title)}
          <article class="local-support-card">
            <span aria-hidden="true">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section local-examples">
    <div class="container local-examples__inner">
      <SectionHeading title={content.examples.title} subtitle={content.examples.description} />
      <ul class="local-examples__list">
        {#each content.examples.items as item (item)}
          <li>{item}</li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="section local-process">
    <div class="container">
      <SectionHeading title={content.process.title} subtitle={content.process.description} />
      <ol class="local-process__list">
        {#each content.process.items as step, index (step.title)}
          <li>
            <span aria-hidden="true">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  {#if content.showWorks}
    <ShowcaseSection
      id="chigasaki-works"
      title="これまでの制作・開発例"
      subtitle="地域を限定した事例ではありませんが、Web制作から業務システムまで幅広く支援しています。"
      items={selectedWorks}
      surface="soft"
    />
  {/if}

  {#if content.relatedLinks}
    <section class="section local-related">
      <div class="container">
        <SectionHeading
          title={content.relatedLinks.title}
          subtitle={content.relatedLinks.description}
        />
        <div class="local-grid local-grid--three">
          {#each content.relatedLinks.items as item (item.href)}
            <a
              class="local-link-card local-link-card--compact"
              href={resolve(...getResolveArgs(item.href))}
            >
              <img
                src={asset(item.image)}
                alt={item.imageAlt}
                width="800"
                height="500"
                loading="lazy"
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>{item.ctaLabel}</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <section class="local-contact" aria-labelledby="local-contact-title">
    <div class="container local-contact__inner">
      <div>
        <p class="local-eyebrow">Contact</p>
        <h2 id="local-contact-title">{content.contact.title}</h2>
        <p>{content.contact.description}</p>
      </div>
      <ActionButton
        href={contactHref}
        label="相談内容を送る"
        tone="light"
        size="lg"
        analytics={{
          eventName: 'contact_cta_click',
          params: { placement: `${content.contact.placement}_bottom` },
        }}
      />
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />
