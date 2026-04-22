<script lang="ts">
  import { browser } from '$app/environment';
  import { asset } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import ContactCta from '$lib/components/sections/ContactCta.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import {
    companyProfile,
    contactInfo,
    navItems,
    pageSeo,
    profilePageContent,
  } from '$lib/data/site';
  import type { ProfileEventItem } from '$lib/types/content';

  function handleOutboundClick(section: string, label: string, href: string) {
    trackEvent('outbound_link_click', {
      section,
      link_label: label,
      destination_host: new URL(href).hostname,
    });
  }

  function resolveImageSrc(src: string) {
    return /^https?:\/\//.test(src) ? src : asset(src);
  }

  function getTokyoTodayIso(date = new Date()) {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const parts = formatter.formatToParts(date);
    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;

    return year && month && day ? `${year}-${month}-${day}` : '';
  }

  type ProfileEventView = ProfileEventItem & {
    computedStatus: string;
    statusTone: 'accepting' | 'upcoming' | 'ended';
    isEnded: boolean;
    isInteractive: boolean;
    metaLabel: string;
  };

  function getEventView(item: ProfileEventItem, todayTokyoIso: string): ProfileEventView {
    const canJudge = todayTokyoIso !== '';
    const isEnded = todayTokyoIso !== '' && item.dateIso < todayTokyoIso;

    return {
      ...item,
      computedStatus: isEnded ? '終了' : item.status,
      statusTone: isEnded ? 'ended' : item.isAccepting ? 'accepting' : 'upcoming',
      isEnded,
      isInteractive: canJudge && !isEnded,
      metaLabel: isEnded ? '終了しました' : item.ctaLabel,
    };
  }

  const profileStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.profile.title,
      description: pageSeo.profile.description,
      path: pageSeo.profile.path,
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'プロフィール', path: pageSeo.profile.path },
    ]),
  ].map((item) => serializeJsonLd(item));

  const heroTaglineLines = profilePageContent.hero.tagline.split('\n');

  function getInitialTodayTokyoIso() {
    if (!browser) {
      return getTokyoTodayIso();
    }

    return document.documentElement.dataset.profileTodayIso || getTokyoTodayIso();
  }

  // Static HTML uses the prerender/build date so event links remain usable without JS.
  // Browsers then upgrade this with the boot script's current Tokyo date before hydration.
  const todayTokyoIso = getInitialTodayTokyoIso();
</script>

<svelte:head>
  <script type="module" src={asset('/scripts/profile-events-boot.js')}></script>
</svelte:head>

<SeoHead
  title={pageSeo.profile.title}
  description={pageSeo.profile.description}
  path={pageSeo.profile.path}
  image={pageSeo.profile.image}
  imageAlt={pageSeo.profile.imageAlt}
  jsonLd={profileStructuredData}
/>

<Header items={navItems} />

<main class="profile-page">
  <section class="section profile-hero">
    <div class="container profile-hero__inner">
      <div class="profile-hero__copy">
        <p class="profile-hero__eyebrow">{profilePageContent.hero.eyebrow}</p>
        <ul class="profile-hero__specialties" aria-label="主な支援領域">
          {#each profilePageContent.hero.specialties as specialty (specialty)}
            <li>{specialty}</li>
          {/each}
        </ul>
        <h1 class="profile-hero__tagline" aria-label={heroTaglineLines.join(' ')}>
          {#each heroTaglineLines as line (line)}
            <span class="profile-hero__tagline-line">{line}</span>
          {/each}
        </h1>

        <div class="profile-hero__identity">
          <p class="profile-hero__name">{profilePageContent.hero.name}</p>
          <p class="profile-hero__role">{profilePageContent.hero.role}</p>
        </div>

        <p class="profile-hero__lead">{profilePageContent.hero.lead}</p>

        <ul class="profile-hero__highlights">
          {#each profilePageContent.hero.highlights as highlight (highlight)}
            <li>{highlight}</li>
          {/each}
        </ul>
      </div>

      <div class="profile-hero__visual">
        <div class="profile-hero__image-frame">
          <img
            src={asset(profilePageContent.hero.image)}
            alt={profilePageContent.hero.imageAlt}
            loading="eager"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="profile-reading-heading">
        <SectionHeading
          eyebrow="Overview"
          title={profilePageContent.overviewTitle}
          subtitle={profilePageContent.overviewSubtitle}
        />
      </div>

      <div class="profile-overview">
        <div class="profile-overview__story">
          {#each profilePageContent.overviewParagraphs as paragraph (paragraph)}
            <p>{paragraph}</p>
          {/each}
        </div>

        <aside class="profile-overview__focus">
          <p class="profile-overview__focus-eyebrow">Focus</p>
          <h2>{profilePageContent.overviewFocusTitle}</h2>
          <ul>
            {#each profilePageContent.overviewFocusItems as item (item)}
              <li>{item}</li>
            {/each}
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <section class="section section--tight profile-background-section">
    <div class="container">
      <div class="profile-reading-heading">
        <SectionHeading
          eyebrow="Background"
          title={profilePageContent.background.title}
          subtitle={profilePageContent.background.subtitle}
        />
      </div>

      <div class="profile-background">
        <section class="profile-background__career" aria-labelledby="profile-career-heading">
          <div class="profile-section-label">
            <p class="profile-background__eyebrow">Career</p>
            <h3 id="profile-career-heading">仕事につながる経歴</h3>
          </div>

          <div class="profile-background__timeline">
            {#each profilePageContent.background.careerItems as item (item.title)}
              <article class="profile-career-item">
                {#if item.meta}
                  <p class="profile-career-item__meta">{item.meta}</p>
                {/if}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            {/each}
          </div>
        </section>

        <section class="profile-background__personal" aria-labelledby="profile-personal-heading">
          <div class="profile-section-label">
            <p class="profile-background__eyebrow">Personal</p>
            <h3 id="profile-personal-heading">人となりと関心</h3>
          </div>

          <div class="profile-background__groups">
            {#each profilePageContent.background.personalGroups as group (group.title)}
              <article class="profile-info-group">
                <h3>{group.title}</h3>
                <ul>
                  {#each group.items as item (item)}
                    <li>{item}</li>
                  {/each}
                </ul>
              </article>
            {/each}
          </div>
        </section>
      </div>
    </div>
  </section>

  <section class="section surface-soft">
    <div class="container">
      <SectionHeading
        eyebrow="Value"
        title={profilePageContent.valuesTitle}
        subtitle={profilePageContent.valuesSubtitle}
      />

      <div class="profile-values">
        {#each profilePageContent.values as item (item.id)}
          <article class="profile-value-card">
            <div class="profile-value-card__body">
              <h2>{item.title}</h2>
              <p class="profile-value-card__description">{item.description}</p>

              <ul>
                {#each item.points as point (point)}
                  <li>{point}</li>
                {/each}
              </ul>

              <p class="profile-value-card__closing">{item.closing}</p>
            </div>

            {#if item.cta}
              {@const cta = item.cta}
              <a
                class={cta.image ? 'profile-value-card__preview' : 'profile-value-card__cta'}
                href={cta.href}
                target="_blank"
                rel="external noreferrer"
                onclick={() => handleOutboundClick('profile_value', cta.label, cta.href)}
              >
                {#if cta.image}
                  <span class="profile-value-card__preview-media">
                    <img
                      src={resolveImageSrc(cta.image)}
                      alt={cta.imageAlt ?? `${cta.label} のサムネイル`}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span class="profile-value-card__preview-body">
                    <span class="profile-value-card__preview-label">{cta.label}</span>
                    <span class="profile-value-card__preview-meta">外部サイトを開く</span>
                  </span>
                {:else}
                  {cta.label}
                {/if}
              </a>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <SectionHeading
        eyebrow="Events"
        title={profilePageContent.events.title}
        subtitle={profilePageContent.events.subtitle}
      />

      <div class="profile-events">
        {#each profilePageContent.events.items as rawItem (rawItem.dateIso + rawItem.title)}
          {@const item = getEventView(rawItem, todayTokyoIso)}
          <a
            class={`profile-events__card${item.isEnded ? ' profile-events__card--ended' : ''}`}
            data-profile-event-card
            data-event-date-iso={rawItem.dateIso}
            data-event-href={rawItem.href}
            data-event-accepting={rawItem.isAccepting}
            data-event-status-label={rawItem.status}
            data-event-cta-label={rawItem.ctaLabel}
            href={item.isInteractive ? item.href : undefined}
            target={item.isInteractive ? '_blank' : undefined}
            rel="external noreferrer"
            onclick={() =>
              item.isInteractive && handleOutboundClick('profile_events', item.title, item.href)}
          >
            <div class="profile-events__date-block">
              <p class="profile-events__date">{item.date}</p>
              <span
                class={`profile-events__status profile-events__status--${item.statusTone}`}
                data-event-status
              >
                {item.computedStatus}
              </span>
            </div>

            <div class="profile-events__body">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>

            <span
              class={`profile-events__meta${item.isEnded ? ' profile-events__meta--ended' : ''}`}
              data-event-meta
            >
              {item.metaLabel}
            </span>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section id="profile-portfolio" class="section section--tight">
    <div class="container">
      <SectionHeading
        eyebrow="Portfolio"
        title={profilePageContent.portfolioTitle}
        subtitle={profilePageContent.portfolioSubtitle}
      />

      <div class="profile-portfolio">
        {#each profilePageContent.portfolioItems as item (item.href)}
          <a
            class="profile-portfolio__card"
            href={item.href}
            target="_blank"
            rel="external noreferrer"
            onclick={() => handleOutboundClick('profile_portfolio', item.title, item.href)}
          >
            <div class="profile-portfolio__media">
              <img
                src={resolveImageSrc(item.image)}
                alt={`${item.title} のサムネイル`}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="profile-portfolio__body">
              <div class="profile-portfolio__copy">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>

              <span class="profile-portfolio__meta">{item.ctaLabel}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section class="section profile-stance">
    <div class="container">
      <div class="profile-reading-heading">
        <SectionHeading eyebrow="Stance" title={profilePageContent.stanceTitle} />
      </div>

      <div class="profile-stance__panel">
        <p class="profile-stance__lead">{profilePageContent.stanceLead}</p>

        <ul class="profile-stance__list">
          {#each profilePageContent.stanceItems as item (item)}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--tight surface-soft">
    <div class="container">
      <SectionHeading eyebrow="Audience" title={profilePageContent.audienceTitle} />

      <div class="profile-audience">
        {#each profilePageContent.audienceItems as item (item)}
          <article class="profile-audience__card">
            <p>{item}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <SectionHeading
        eyebrow="Contact"
        title={profilePageContent.contactTitle}
        subtitle={profilePageContent.contactLead}
      />

      <div class="profile-contact">
        {#each profilePageContent.contactItems as item (item.title)}
          <article class="profile-contact__card">
            <div class="profile-contact__card-body">
              <h2>{item.title}</h2>
              <p>
                {#if item.descriptionSegments}
                  {#each item.descriptionSegments as segment, index (segment.text + index)}
                    {#if segment.strong}
                      <strong>{segment.text}</strong>
                    {:else}
                      {segment.text}
                    {/if}
                  {/each}
                {:else}
                  {item.description}
                {/if}
              </p>
            </div>

            {#if item.href}
              <div class="profile-contact__actions">
                <a
                  class={item.buttonImage
                    ? 'profile-contact__button profile-contact__button--image'
                    : 'profile-contact__button'}
                  href={item.href}
                  target="_blank"
                  rel="external noreferrer"
                  onclick={() =>
                    handleOutboundClick('profile_contact', item.title, item.href ?? '')}
                >
                  {#if item.buttonImage}
                    <img
                      src={resolveImageSrc(item.buttonImage)}
                      alt={item.buttonImageAlt ?? item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  {:else}
                    {item.ctaLabel ?? '外部サイトを開く'}
                  {/if}
                </a>
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
  .profile-page :global(.container) {
    width: min(var(--container-width), calc(100% - 36px));
  }

  .profile-hero {
    overflow: hidden;
    padding-top: clamp(44px, 7vw, 84px);
    background:
      radial-gradient(circle at top left, rgba(244, 231, 161, 0.3) 0%, transparent 34%),
      linear-gradient(180deg, rgba(255, 252, 246, 0.98) 0%, rgba(250, 244, 232, 0.94) 100%);
  }

  .profile-hero__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
    gap: clamp(28px, 4vw, 44px);
    align-items: center;
  }

  .profile-hero__copy {
    display: grid;
    gap: 18px;
  }

  .profile-hero__eyebrow,
  .profile-overview__focus-eyebrow,
  .profile-background__eyebrow {
    color: rgba(135, 99, 45, 0.88);
    font-family: var(--font-heading);
    font-size: 0.92rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .profile-hero__specialties {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: -6px 0 0;
    padding: 0;
    list-style: none;
  }

  .profile-hero__specialties li {
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.76);
    border: 1px solid rgba(117, 92, 56, 0.12);
    color: rgba(114, 80, 32, 0.95);
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .profile-reading-heading :global(.section-heading) {
    max-width: 46rem;
    justify-items: start;
    margin-bottom: clamp(24px, 3vw, 36px);
    text-align: left;
  }

  .profile-reading-heading :global(.section-heading__subtitle) {
    max-width: 46rem;
  }

  .profile-hero__tagline,
  .profile-section-label h3,
  .profile-career-item h3,
  .profile-info-group h3,
  .profile-value-card h2,
  .profile-events__body h2,
  .profile-portfolio__copy h2,
  .profile-stance__lead,
  .profile-contact__card h2,
  .profile-overview__focus h2 {
    font-family: var(--font-heading);
    letter-spacing: -0.04em;
  }

  .profile-hero__tagline {
    display: grid;
    gap: 0.04em;
    max-width: 10ch;
    font-size: clamp(2.1rem, 3.3vw, 3.35rem);
    line-height: 1.08;
    font-weight: 800;
  }

  .profile-hero__tagline-line {
    display: block;
    white-space: nowrap;
  }

  .profile-hero__identity {
    display: grid;
    gap: 4px;
  }

  .profile-hero__name {
    font-size: clamp(1.55rem, 2.1vw, 2rem);
    font-weight: 800;
  }

  .profile-hero__role,
  .profile-hero__lead,
  .profile-overview__story p,
  .profile-career-item p,
  .profile-value-card__description,
  .profile-value-card__closing,
  .profile-contact__card p,
  .profile-audience__card p,
  .profile-info-group li {
    color: var(--color-ink-soft);
    line-height: 1.72;
  }

  .profile-hero__role {
    font-weight: 700;
  }

  .profile-hero__lead {
    max-width: 40rem;
    font-size: 1.05rem;
  }

  .profile-hero__highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 4px 0 0;
    padding: 0;
    list-style: none;
  }

  .profile-hero__highlights li {
    padding: 10px 14px;
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(117, 92, 56, 0.14);
    box-shadow: var(--shadow-soft);
    font-size: 0.95rem;
    font-weight: 700;
  }

  .profile-hero__visual {
    position: relative;
  }

  .profile-hero__visual::before {
    content: '';
    position: absolute;
    inset: auto -16px -18px 18%;
    height: 72%;
    border-radius: 32px;
    background: linear-gradient(
      180deg,
      rgba(246, 228, 180, 0.9) 0%,
      rgba(228, 179, 103, 0.72) 100%
    );
    filter: blur(18px);
    z-index: 0;
  }

  .profile-hero__image-frame {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-radius: 34px;
    border: 1px solid rgba(117, 92, 56, 0.14);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: var(--shadow-card);
  }

  .profile-hero__image-frame img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: center top;
  }

  .profile-overview {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    gap: clamp(22px, 3vw, 32px);
    align-items: start;
  }

  .profile-value-card,
  .profile-events__card,
  .profile-portfolio__card,
  .profile-contact__card {
    border: 1px solid rgba(117, 92, 56, 0.12);
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: var(--shadow-card);
  }

  .profile-overview__story {
    display: grid;
    gap: 16px;
    padding: 0 clamp(18px, 2.6vw, 28px) 0 0;
    border-right: 1px solid rgba(117, 92, 56, 0.14);
  }

  .profile-overview__focus {
    display: grid;
    gap: 14px;
    padding: 2px 0 2px clamp(18px, 2.6vw, 28px);
    border-left: 2px solid rgba(214, 151, 76, 0.28);
  }

  .profile-overview__focus h2 {
    font-size: clamp(1.35rem, 2vw, 1.8rem);
    line-height: 1.2;
    font-weight: 800;
  }

  .profile-overview__focus ul,
  .profile-info-group ul,
  .profile-value-card ul,
  .profile-stance__list {
    display: grid;
    gap: 12px;
    margin: 0;
    padding-left: 1.2rem;
  }

  .profile-background {
    display: grid;
    grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
    gap: clamp(24px, 3.2vw, 40px);
    align-items: start;
  }

  .profile-background__career {
    display: grid;
    gap: 18px;
    padding-right: clamp(14px, 2vw, 24px);
    border-right: 1px solid rgba(117, 92, 56, 0.14);
  }

  .profile-background__personal {
    display: grid;
    gap: 18px;
    padding-left: clamp(14px, 2vw, 24px);
  }

  .profile-section-label {
    display: grid;
    gap: 8px;
  }

  .profile-section-label h3 {
    font-size: clamp(1.28rem, 2vw, 1.72rem);
    font-weight: 800;
    line-height: 1.2;
  }

  .profile-background__timeline,
  .profile-background__groups {
    display: grid;
    gap: 16px;
  }

  .profile-career-item {
    position: relative;
    display: grid;
    gap: 8px;
    padding: 0 0 18px 18px;
    border-left: 1px solid rgba(117, 92, 56, 0.18);
  }

  .profile-career-item::before {
    content: '';
    position: absolute;
    top: 0.4rem;
    left: -5px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(214, 151, 76, 0.95);
    box-shadow: 0 0 0 4px rgba(244, 231, 161, 0.34);
  }

  .profile-career-item:last-child {
    padding-bottom: 0;
  }

  .profile-career-item__meta {
    color: rgba(135, 99, 45, 0.88);
    font-family: var(--font-heading);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .profile-career-item h3,
  .profile-info-group h3 {
    color: var(--color-ink);
    font-size: clamp(1.02rem, 1.6vw, 1.2rem);
    font-weight: 800;
    line-height: 1.35;
  }

  .profile-info-group {
    display: grid;
    gap: 10px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(117, 92, 56, 0.14);
  }

  .profile-info-group:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .profile-values {
    display: grid;
    gap: 18px;
  }

  .profile-value-card {
    display: grid;
    gap: 18px;
    padding: clamp(18px, 2.6vw, 28px);
  }

  .profile-value-card__body {
    display: grid;
    gap: 14px;
  }

  .profile-value-card h2 {
    font-size: clamp(1.45rem, 2vw, 1.95rem);
    line-height: 1.2;
    font-weight: 800;
  }

  .profile-value-card__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .profile-value-card__preview {
    display: grid;
    grid-template-columns: minmax(0, 190px) minmax(0, 1fr);
    gap: 16px;
    align-items: center;
    padding: 14px;
    border-radius: 22px;
    border: 1px solid rgba(214, 151, 76, 0.24);
    background: linear-gradient(
      180deg,
      rgba(255, 251, 243, 0.98) 0%,
      rgba(252, 247, 237, 0.96) 100%
    );
    color: inherit;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .profile-value-card__preview:hover,
  .profile-events__card:hover,
  .profile-portfolio__card:hover {
    transform: translateY(-2px);
    border-color: rgba(214, 151, 76, 0.42);
    box-shadow: 0 26px 42px rgba(111, 83, 41, 0.16);
  }

  .profile-value-card__preview-media {
    overflow: hidden;
    border-radius: 18px;
    background: rgba(237, 226, 208, 0.55);
  }

  .profile-value-card__preview-media img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }

  .profile-value-card__preview-body {
    display: grid;
    gap: 6px;
  }

  .profile-value-card__preview-label {
    color: var(--color-ink);
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-weight: 800;
    line-height: 1.25;
  }

  .profile-value-card__preview-meta,
  .profile-events__meta,
  .profile-portfolio__meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    font-size: 0.95rem;
    font-weight: 800;
    color: rgba(135, 99, 45, 0.95);
  }

  .profile-value-card__cta::after,
  .profile-value-card__preview-meta::after,
  .profile-events__meta::after,
  .profile-portfolio__meta::after,
  .profile-contact__button:not(.profile-contact__button--image)::after {
    content: '↗';
    font-size: 0.95em;
  }

  .profile-events {
    display: grid;
    gap: 14px;
  }

  .profile-events__card {
    display: grid;
    grid-template-columns: minmax(112px, 132px) minmax(0, 1fr) auto;
    gap: 14px 20px;
    align-items: center;
    padding: clamp(16px, 2.3vw, 22px);
    color: inherit;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .profile-events__card:not([href]) {
    cursor: default;
  }

  .profile-events__date-block {
    display: grid;
    gap: 8px;
    align-content: start;
  }

  .profile-events__date {
    color: var(--color-ink);
    font-family: var(--font-heading);
    font-size: clamp(1.12rem, 1.7vw, 1.38rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.1;
  }

  .profile-events__status {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.02em;
  }

  .profile-events__status--accepting {
    background: rgba(233, 247, 237, 0.96);
    border: 1px solid rgba(72, 136, 92, 0.2);
    color: rgba(44, 96, 60, 0.96);
  }

  .profile-events__status--upcoming {
    background: rgba(255, 247, 228, 0.9);
    border: 1px solid rgba(214, 151, 76, 0.18);
    color: rgba(135, 99, 45, 0.95);
  }

  .profile-events__status--ended {
    background: rgba(241, 240, 236, 0.96);
    border: 1px solid rgba(142, 133, 118, 0.16);
    color: rgba(109, 101, 90, 0.9);
  }

  .profile-events__body {
    display: grid;
    gap: 8px;
    min-width: 0;
  }

  .profile-events__body h2 {
    color: var(--color-ink);
    font-size: clamp(1.16rem, 1.8vw, 1.48rem);
    line-height: 1.2;
    font-weight: 800;
  }

  .profile-events__body p {
    color: var(--color-ink-soft);
    line-height: 1.68;
  }

  .profile-events__meta {
    justify-self: end;
    white-space: nowrap;
  }

  .profile-events__card:not([href]) .profile-events__meta::after {
    content: none;
  }

  .profile-events__card--ended {
    color: inherit;
    background: rgba(250, 248, 244, 0.94);
  }

  .profile-events__card:not([href]):hover,
  .profile-events__card--ended:hover {
    transform: none;
    border-color: rgba(117, 92, 56, 0.12);
    box-shadow: var(--shadow-card);
  }

  .profile-events__card--ended .profile-events__date,
  .profile-events__card--ended .profile-events__body h2 {
    color: rgba(89, 83, 75, 0.92);
  }

  .profile-events__card--ended .profile-events__body p,
  .profile-events__meta--ended {
    color: rgba(109, 101, 90, 0.88);
  }

  .profile-events__meta--ended::after {
    content: none;
  }

  .profile-portfolio {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(18px, 2vw, 24px);
  }

  .profile-portfolio__card {
    display: grid;
    overflow: hidden;
    min-height: 100%;
    color: inherit;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .profile-portfolio__media {
    overflow: hidden;
    background: rgba(242, 235, 221, 0.68);
  }

  .profile-portfolio__media img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .profile-portfolio__body {
    display: grid;
    gap: 16px;
    padding: clamp(16px, 2.4vw, 24px);
  }

  .profile-portfolio__copy {
    display: grid;
    gap: 10px;
  }

  .profile-portfolio__copy h2 {
    font-size: clamp(1.35rem, 1.9vw, 1.72rem);
    line-height: 1.2;
    font-weight: 800;
    color: var(--color-ink);
  }

  .profile-portfolio__copy p {
    color: var(--color-ink-soft);
  }

  .profile-stance {
    background:
      radial-gradient(circle at top right, rgba(246, 228, 180, 0.22) 0%, transparent 30%),
      linear-gradient(180deg, rgba(255, 251, 244, 0.92) 0%, rgba(255, 254, 250, 1) 100%);
  }

  .profile-stance__panel {
    display: grid;
    gap: 18px;
    max-width: 56rem;
    padding-top: clamp(16px, 2vw, 22px);
    border-top: 1px solid rgba(117, 92, 56, 0.16);
  }

  .profile-stance__lead {
    max-width: 24ch;
    font-size: clamp(1.4rem, 2vw, 1.95rem);
    line-height: 1.22;
    font-weight: 800;
    color: var(--color-ink);
  }

  .profile-stance__list {
    padding-left: 0;
    list-style: none;
    gap: 0;
  }

  .profile-stance__list li {
    padding: 14px 0;
    border-bottom: 1px solid rgba(117, 92, 56, 0.14);
  }

  .profile-audience,
  .profile-contact {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 22px);
  }

  .profile-audience__card {
    min-height: 100%;
    padding: 0 0 18px;
    border: 0;
    border-bottom: 1px solid rgba(117, 92, 56, 0.16);
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .profile-audience__card {
    display: block;
  }

  .profile-audience__card p {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-ink);
  }

  .profile-contact__card {
    display: grid;
    gap: 16px;
    min-height: 100%;
    padding: clamp(16px, 2.4vw, 22px);
  }

  .profile-contact__card-body {
    display: grid;
    gap: 8px;
  }

  .profile-contact__card-body p :global(strong) {
    color: var(--color-ink);
    font-weight: 800;
  }

  .profile-contact__card h2 {
    font-size: clamp(1.35rem, 1.9vw, 1.7rem);
    line-height: 1.2;
    font-weight: 800;
  }

  .profile-contact__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 14px;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid rgba(117, 92, 56, 0.14);
  }

  .profile-contact__button {
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: none;
  }

  .profile-contact__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 42px;
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid rgba(214, 151, 76, 0.28);
    background: rgba(255, 249, 236, 0.92);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .profile-contact__button:hover {
    transform: translateY(-1px);
    border-color: rgba(214, 151, 76, 0.42);
    box-shadow: 0 18px 28px rgba(111, 83, 41, 0.1);
  }

  .profile-contact__button--image {
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .profile-contact__button--image:hover {
    transform: none;
    box-shadow: none;
  }

  .profile-contact__button--image img {
    display: block;
    height: 36px;
    width: auto;
  }

  @media (max-width: 920px) {
    .profile-hero__inner,
    .profile-overview,
    .profile-background,
    .profile-portfolio,
    .profile-audience,
    .profile-contact {
      grid-template-columns: 1fr;
    }

    .profile-hero__visual {
      max-width: 560px;
      margin-inline: auto;
      width: 100%;
    }

    .profile-overview__story {
      padding: 0 0 22px;
      border-right: 0;
      border-bottom: 1px solid rgba(117, 92, 56, 0.14);
    }

    .profile-overview__focus {
      padding: 18px 0 0 14px;
    }

    .profile-background__career {
      padding: 0 0 22px;
      border-right: 0;
      border-bottom: 1px solid rgba(117, 92, 56, 0.14);
    }

    .profile-background__personal {
      padding: 0;
    }

    .profile-events__card {
      grid-template-columns: minmax(0, 1fr);
      align-items: start;
    }

    .profile-events__meta {
      justify-self: start;
    }
  }

  @media (max-width: 720px) {
    .profile-page :global(.container) {
      width: min(var(--container-width), calc(100% - 24px));
    }

    .profile-hero__tagline {
      max-width: 9ch;
      font-size: clamp(1.9rem, 9.8vw, 2.7rem);
      line-height: 1.14;
    }

    .profile-hero__specialties {
      gap: 6px;
    }

    .profile-hero__specialties li {
      padding: 5px 10px;
      font-size: 0.82rem;
    }

    .profile-reading-heading :global(.section-heading) {
      margin-bottom: 22px;
    }

    .profile-overview__story {
      gap: 14px;
      padding-bottom: 18px;
    }

    .profile-overview__focus {
      gap: 12px;
      padding-left: 12px;
    }

    .profile-background__timeline,
    .profile-background__groups {
      gap: 14px;
    }

    .profile-career-item {
      padding-left: 14px;
      padding-bottom: 16px;
    }

    .profile-value-card {
      padding: 16px;
    }

    .profile-events {
      gap: 12px;
    }

    .profile-events__card {
      gap: 12px;
      padding: 14px;
    }

    .profile-events__date-block {
      gap: 6px;
    }

    .profile-value-card__preview {
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 12px;
    }

    .profile-portfolio__body {
      padding: 16px;
    }

    .profile-hero__highlights {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
</style>
