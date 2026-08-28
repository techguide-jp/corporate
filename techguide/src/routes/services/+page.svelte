<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ContactCta from '$lib/components/sections/ContactCta.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import { companyProfile, contactInfo, navItems, pageSeo, serviceDetails } from '$lib/data/site';

  function handleOutboundClick(section: string, label: string, href: string) {
    trackEvent('outbound_link_click', {
      section,
      link_label: label,
      destination_host: new URL(href).hostname,
    });
  }

  const servicesStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.services.title,
      description: pageSeo.services.description,
      path: pageSeo.services.path,
      type: 'CollectionPage',
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: '支援内容', path: pageSeo.services.path },
    ]),
  ].map((item) => serializeJsonLd(item));
</script>

<SeoHead
  title={pageSeo.services.title}
  description={pageSeo.services.description}
  path={pageSeo.services.path}
  image={pageSeo.services.image}
  imageAlt={pageSeo.services.imageAlt}
  jsonLd={servicesStructuredData}
/>

<Header items={navItems} />

<main>
  <section class="section service-detail-list">
    <div class="container">
      <SectionHeading
        title="支援内容"
        subtitle="課題や事業フェーズに応じて、導入前整理から制作・技術教育まで必要な支援を詳しくご覧いただけます。"
        level={1}
      />

      <div class="service-detail-list__items">
        {#each serviceDetails as detail, index (detail.id)}
          <article
            class:service-detail--reverse={index === 1}
            class="service-detail"
            id={detail.id}
          >
            <div class="service-detail__intro">
              <div class="service-detail__heading">
                <p class="service-detail__eyebrow">支援領域</p>
                <h2>{detail.title}</h2>
              </div>

              <div class="service-detail__visual">
                {#if detail.visual.href}
                  <a
                    href={detail.visual.href}
                    target="_blank"
                    rel="external noreferrer"
                    onclick={() =>
                      handleOutboundClick(
                        detail.id,
                        detail.visual.ctaLabel ?? detail.title,
                        detail.visual.href ?? '',
                      )}
                  >
                    <img src={asset(detail.visual.image)} alt={detail.visual.alt} loading="lazy" />
                  </a>
                {:else}
                  <div class="service-detail__visual-image">
                    <img src={asset(detail.visual.image)} alt={detail.visual.alt} loading="lazy" />
                  </div>
                {/if}

                <div class="service-detail__visual-copy">
                  <p class="service-detail__visual-eyebrow">{detail.visual.eyebrow}</p>
                  <h3 class="service-detail__visual-title">{detail.visual.title}</h3>
                  <p>{detail.visual.description}</p>
                </div>
              </div>

              <div class="service-detail__content">
                <p class="service-detail__summary">{detail.summary}</p>
                <div class="service-detail__grid">
                  <section>
                    <h3 class="service-detail__section-title">こんな課題</h3>
                    <ul>
                      {#each detail.issues as item (item)}
                        <li>{item}</li>
                      {/each}
                    </ul>
                  </section>

                  <section>
                    <h3 class="service-detail__section-title">支援内容</h3>
                    <ul>
                      {#each detail.offerings as item (item)}
                        <li>{item}</li>
                      {/each}
                    </ul>
                  </section>
                </div>
              </div>
            </div>

            {#if detail.relatedItems?.length}
              <div class="service-detail__related">
                <p class="service-detail__related-eyebrow">関連サービス</p>

                <div class="service-detail__related-grid">
                  {#each detail.relatedItems as item (item.href)}
                    <a
                      class="service-detail__related-card"
                      href={item.href}
                      target="_blank"
                      rel="external noreferrer"
                      onclick={() => handleOutboundClick(detail.id, item.title, item.href)}
                    >
                      <img src={asset(item.image)} alt={item.title} loading="lazy" />
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span>{item.ctaLabel}</span>
                      </div>
                    </a>
                  {/each}
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section regional-support">
    <div class="container regional-support__inner">
      <div class="regional-support__visual">
        <img
          src={asset('/images/chigasaki/consultation-hero.webp')}
          alt="茅ヶ崎の海辺をイメージしたWeb・IT相談の風景"
          width="1536"
          height="864"
          loading="lazy"
        />
      </div>
      <div class="regional-support__copy">
        <p class="regional-support__eyebrow">茅ヶ崎市内で対面相談できます</p>
        <h2>茅ヶ崎で、集客と業務を整えたい方へ</h2>
        <p>
          ホームページの見直し、予約・顧客管理、転記作業の削減など、店舗や事業の現場で起きている困りごとから相談できます。
        </p>
        <div class="regional-support__tags" aria-label="地域向け支援内容">
          <span>ホームページ制作</span>
          <span>システム開発</span>
          <span>業務効率化・AI活用</span>
        </div>
        <a class="regional-support__link" href={resolve('/chigasaki/')}>
          茅ヶ崎エリア向け支援を見る
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>

  <ContactCta contact={contactInfo} />
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .service-detail-list {
    padding-top: clamp(44px, 6vw, 72px);
  }

  .service-detail__eyebrow {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(135, 99, 45, 0.88);
  }

  .service-detail-list__items {
    display: grid;
    gap: 0;
  }

  .service-detail {
    position: relative;
    isolation: isolate;
    display: grid;
    gap: 26px;
    padding: clamp(28px, 4vw, 42px) clamp(18px, 3vw, 32px);
  }

  .service-detail::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      rgba(244, 231, 203, 0.9) 0%,
      rgba(252, 247, 239, 0.82) 58%,
      rgba(255, 252, 246, 0.74) 100%
    );
    box-shadow: inset 0 1px 0 rgba(117, 92, 56, 0.12);
    z-index: -1;
    pointer-events: none;
  }

  .service-detail:last-child::before {
    box-shadow:
      inset 0 1px 0 rgba(117, 92, 56, 0.12),
      inset 0 -1px 0 rgba(117, 92, 56, 0.12);
  }

  .service-detail__intro {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
    grid-template-areas:
      'heading visual'
      'content visual';
    gap: clamp(22px, 3vw, 32px);
    align-items: start;
  }

  .service-detail__heading {
    grid-area: heading;
    display: grid;
    gap: 12px;
  }

  .service-detail__content {
    grid-area: content;
    display: grid;
    gap: 18px;
  }

  .service-detail__visual {
    grid-area: visual;
  }

  .service-detail--reverse .service-detail__visual {
    order: -1;
  }

  .service-detail--reverse .service-detail__intro {
    grid-template-areas:
      'visual heading'
      'visual content';
  }

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.55rem, 2.2vw, 2.2rem);
    line-height: 1.18;
    letter-spacing: -0.04em;
    font-weight: 800;
  }

  .service-detail__summary {
    max-width: 44rem;
    color: var(--color-ink-soft);
  }

  .service-detail__visual {
    display: grid;
    gap: 14px;
  }

  .service-detail__visual a,
  .service-detail__visual-image {
    display: block;
    overflow: hidden;
    border-radius: 24px;
    box-shadow: var(--shadow-soft);
  }

  .service-detail__visual img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top center;
  }

  .service-detail__visual-copy {
    display: grid;
    gap: 10px;
  }

  .service-detail__visual-eyebrow,
  .service-detail__related-eyebrow {
    font-family: var(--font-heading);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(135, 99, 45, 0.88);
  }

  .service-detail__visual-title {
    font-family: var(--font-heading);
    font-size: clamp(1.18rem, 1.8vw, 1.44rem);
    line-height: 1.3;
    letter-spacing: -0.03em;
    font-weight: 800;
  }

  .service-detail__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(18px, 2vw, 24px);
  }

  .service-detail__grid section {
    padding-top: 16px;
    border-top: 3px solid rgba(234, 152, 84, 0.3);
  }

  .service-detail__section-title {
    margin-bottom: 12px;
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  ul {
    display: grid;
    gap: 10px;
    margin: 0;
    padding-left: 18px;
    color: var(--color-ink-soft);
  }

  .service-detail__related {
    display: grid;
    gap: 16px;
  }

  .service-detail__related-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .service-detail__related-card {
    display: grid;
    grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
    gap: 20px;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid rgba(117, 92, 56, 0.12);
    color: inherit;
  }

  .service-detail__related-card img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top center;
    border-radius: 22px;
    box-shadow: var(--shadow-soft);
  }

  .service-detail__related-card div {
    display: grid;
    gap: 10px;
  }

  .service-detail__related-card h3 {
    font-family: var(--font-heading);
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
    line-height: 1.28;
    letter-spacing: -0.03em;
    font-weight: 800;
  }

  .service-detail__related-card p {
    color: var(--color-ink-soft);
  }

  .service-detail__related-card span {
    width: fit-content;
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .regional-support {
    background: linear-gradient(180deg, rgba(255, 253, 248, 0.92), rgba(247, 240, 213, 0.88));
  }

  .regional-support__inner {
    display: grid;
    grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(30px, 5vw, 68px);
    align-items: center;
  }

  .regional-support__visual img {
    width: 100%;
    aspect-ratio: 16 / 11;
    border-radius: 28px;
    object-fit: cover;
    object-position: top center;
    box-shadow: var(--shadow-card);
  }

  .regional-support__copy {
    display: grid;
    justify-items: start;
    gap: 18px;
  }

  .regional-support__eyebrow {
    color: rgba(38, 92, 96, 0.94);
    font-family: var(--font-heading);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .regional-support__copy > p:not(.regional-support__eyebrow) {
    color: var(--color-ink-soft);
  }

  .regional-support__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .regional-support__tags span {
    padding: 7px 12px;
    border-radius: var(--radius-pill);
    background: rgba(255, 246, 214, 0.86);
    color: rgba(100, 73, 34, 0.94);
    font-size: 0.84rem;
    font-weight: 800;
  }

  .regional-support__link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 52px;
    padding-inline: 22px;
    border-radius: var(--radius-pill);
    background: var(--color-primary);
    color: rgba(79, 54, 21, 0.96);
    font-weight: 800;
    box-shadow: var(--shadow-button);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .regional-support__link:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 26px rgba(224, 164, 91, 0.3);
  }

  @media (max-width: 900px) {
    .service-detail__intro {
      grid-template-columns: 1fr;
      grid-template-areas:
        'heading'
        'visual'
        'content';
    }

    .service-detail--reverse .service-detail__intro {
      grid-template-areas:
        'heading'
        'visual'
        'content';
    }

    .service-detail__grid {
      grid-template-columns: 1fr;
    }

    .service-detail__related-card {
      grid-template-columns: 1fr;
      padding-top: 16px;
    }

    .regional-support__inner {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .service-detail-list {
      padding-top: 28px;
    }

    .service-detail {
      padding-inline: 0;
    }
  }
</style>
