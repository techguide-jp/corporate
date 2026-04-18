<script lang="ts">
  import { asset } from '$app/paths';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ContactCta from '$lib/components/sections/ContactCta.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import {
    companyProfile,
    contactInfo,
    navItems,
    serviceDetails
  } from '$lib/data/site';
</script>

<svelte:head>
  <title>支援内容 | TechGuide</title>
  <meta
    name="description"
    content="テックガイド合同会社の支援内容。ITコンサル・導線設計、LP制作・受託開発、AI活用・技術指導・採用支援を詳しく紹介します。"
  />
</svelte:head>

<Header items={navItems} />

<main>
  <section class="section service-detail-list">
    <div class="container">
      <SectionHeading
        title="支援内容"
        subtitle="課題や事業フェーズに応じて、必要な支援を詳しくご覧いただけます。"
      />

      <div class="service-detail-list__items">
        {#each serviceDetails as detail, index}
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
                  <a href={detail.visual.href} target="_blank" rel="noreferrer">
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
                      {#each detail.issues as item}
                        <li>{item}</li>
                      {/each}
                    </ul>
                  </section>

                  <section>
                    <h3 class="service-detail__section-title">支援内容</h3>
                    <ul>
                      {#each detail.offerings as item}
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
                  {#each detail.relatedItems as item}
                    <a
                      class="service-detail__related-card"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
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
    background:
      linear-gradient(180deg, rgba(244, 231, 203, 0.9) 0%, rgba(252, 247, 239, 0.82) 58%, rgba(255, 252, 246, 0.74) 100%);
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
