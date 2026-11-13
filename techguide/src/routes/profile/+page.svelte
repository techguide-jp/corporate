<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import ActionButton from '$lib/components/ui/ActionButton.svelte';
  import { getContactCategoryLabel, UBM_CATEGORY_ID } from '$lib/contact/form';
  import { companyProfile, navItems, pageSeo, profilePageContent } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import type { ProfileEventItem, ShowcaseItem } from '$lib/types/content';
  import { getResolveArgs, isInternalHref } from '$lib/utils/paths';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const {
    hero,
    background,
    values,
    valuesTitle,
    pastEvents: recordedEvents,
    portfolioTitle,
    portfolioItems,
    contactItems,
  } = profilePageContent;
  const featuredWorks = portfolioItems.slice(0, 3);
  const otherWorks = portfolioItems.slice(3);
  const portfolioUrl = 'https://portfolio-site-sage-seven.vercel.app/';
  const eventListUrl = 'https://ticketcraft.jp/organizers/techguide';

  const ubmUrl = 'https://m.ubm.school/l/c/pu1ifRjY/XT9b8czm';
  const ubmContactSearch = new URLSearchParams({
    category: UBM_CATEGORY_ID,
    subject: getContactCategoryLabel(UBM_CATEGORY_ID),
  });
  const ubmLinkLabel = 'UBMの内容・入会案内を見る';

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

  const eventDateFormatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const eventTimeFormatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
  const upcomingEvents = $derived(data.ticketcraftEvents?.upcoming ?? []);
  const pastEvents = $derived(
    [...recordedEvents, ...(data.ticketcraftEvents?.past ?? [])].sort(
      (first, second) => Date.parse(second.dateIso) - Date.parse(first.dateIso),
    ),
  );

  function trackOutbound(section: string, label: string, href: string) {
    if (isInternalHref(href)) return;
    trackEvent('outbound_link_click', {
      section,
      link_label: label,
      destination_host: new URL(href).hostname,
    });
  }
</script>

<SeoHead
  title={pageSeo.profile.title}
  description={pageSeo.profile.description}
  path={pageSeo.profile.path}
  image={pageSeo.profile.image}
  imageAlt={pageSeo.profile.imageAlt}
  jsonLd={profileStructuredData}
/>

{#snippet workCardContent(item: ShowcaseItem)}
  <img
    src={item.image.startsWith('https://') ? item.image : asset(item.image)}
    alt=""
    width="400"
    height="225"
    loading="lazy"
    decoding="async"
  />
  <div class="work-copy">
    <h4>{item.title}</h4>
    <p>{item.description}</p>
    <span>{item.ctaLabel}</span>
  </div>
{/snippet}

{#snippet workCards(items: ShowcaseItem[])}
  <div class="work-grid">
    {#each items as item (item.href)}
      {@const href = item.href}
      {#if isInternalHref(href)}
        <a class="work-card" href={resolve(...getResolveArgs(href))}>
          {@render workCardContent(item)}
        </a>
      {:else}
        <a
          class="work-card"
          {href}
          target="_blank"
          rel="external noreferrer"
          onclick={() => trackOutbound('profile_portfolio', item.title, href)}
        >
          {@render workCardContent(item)}
        </a>
      {/if}
    {/each}
  </div>
{/snippet}

{#snippet eventList(items: ProfileEventItem[])}
  <ul class="event-list">
    {#each items as item (item.href ?? item.dateIso + item.title)}
      {@const href = item.href}
      {@const date = new Date(item.dateIso)}
      <li>
        <time datetime={item.dateIso}>{eventDateFormatter.format(date)}</time>
        <div>
          <p class="event-title">{item.title}</p>
          {#if item.status || item.description}
            <p>
              {#if item.status}{eventTimeFormatter.format(date)}開始{/if}
              {#if item.status && item.description}・{/if}{item.description}
            </p>
          {/if}
          {#if href && isInternalHref(href)}
            <a class="text-link" href={resolve(...getResolveArgs(href))}>紹介ページを見る</a>
          {:else if href}
            <a
              class="text-link"
              {href}
              target="_blank"
              rel="external noreferrer"
              onclick={() => trackOutbound('profile_events', item.title, href)}
              >{item.status === '申込受付中' ? '詳細・申込み' : 'イベント詳細'}</a
            >
          {/if}
        </div>
        {#if item.status}
          <span class="event-status" class:event-status--accepting={item.status === '申込受付中'}>
            {item.status}
          </span>
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

<Header items={navItems} />

<main class="profile-page">
  <section class="container profile-hero" aria-labelledby="profile-name">
    <div class="hero-copy">
      <p class="hero-role">{hero.role}</p>
      <h1 id="profile-name">{hero.name}</h1>
      <p class="hero-lead">{hero.lead}</p>
      <p class="hero-experience">{hero.experience}</p>
      <nav aria-label="プロフィール内の案内" class="profile-nav">
        <a href="#profile-work">仕事・実績</a>
        <a href="#ubm">UBMで学ぶ</a>
        <a href="#profile-events">活動・発信</a>
        <a href="#contact">お問い合わせ</a>
      </nav>
    </div>
    <img
      class="profile-portrait"
      src={asset(hero.image)}
      alt={hero.imageAlt}
      width="2808"
      height="3255"
      fetchpriority="high"
    />
  </section>

  <section class="profile-section" id="profile-work" aria-labelledby="profile-work-heading">
    <div class="container section-stack">
      <h2 id="profile-work-heading">仕事・実績</h2>

      <div class="section-group">
        <h3>{valuesTitle}</h3>
        <div class="value-grid">
          {#each values as item (item.title)}
            {@const { href, label } = item.cta}
            <div class="value-card">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              {#if isInternalHref(href)}
                <a class="text-link" href={resolve(...getResolveArgs(href))}>{label}</a>
              {:else}
                <a
                  class="text-link"
                  {href}
                  target="_blank"
                  rel="external noreferrer"
                  onclick={() => trackOutbound('profile_value', label, href)}>{label}</a
                >
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <div class="section-group" id="profile-portfolio">
        <h3>{portfolioTitle}</h3>
        {@render workCards(featuredWorks)}
        {#if otherWorks.length}
          <details class="profile-details">
            <summary>ほかの制作・開発事例</summary>
            <div class="details-body">
              {@render workCards(otherWorks)}
            </div>
          </details>
        {/if}
        <a
          class="text-link"
          href={portfolioUrl}
          target="_blank"
          rel="external noreferrer"
          onclick={() =>
            trackOutbound('profile_portfolio', 'ポートフォリオ一覧を見る', portfolioUrl)}
          >ポートフォリオ一覧を見る</a
        >
      </div>
    </div>
  </section>

  <section class="profile-section ubm-section" id="ubm" aria-labelledby="profile-ubm-heading">
    <div class="container ubm-panel">
      <div class="ubm-copy">
        <p class="ubm-name">ビジネス行動管理大学（UBM）</p>
        <h2 id="profile-ubm-heading">UBMで、一緒に<span>事業づくり</span>を学びませんか？</h2>
        <p>
          僕がUBMに入ったのは、技術を通じて役に立てる人を増やすために、事業の育て方も学びたかったからです。今は、事業で何に取り組むかを決めて、日々の行動に落とし込むことを学んでいます。
        </p>
        <p>お互いの事業で試したことを持ち寄って、話せる仲間が増えたらうれしいです。</p>
        <div class="ubm-action">
          <ActionButton
            href={ubmUrl}
            label={ubmLinkLabel}
            analytics={{
              eventName: 'outbound_link_click',
              params: {
                section: 'profile_ubm',
                link_label: ubmLinkLabel,
                destination_host: new URL(ubmUrl).hostname,
              },
            }}
          />
        </div>
        <p class="ubm-note">
          普段の学び方や、参加して感じたことは、僕の経験からお答えします。オンラインで少し話してみたい方は、フォームにその旨を添えてください。
        </p>
        <a class="text-link" href={resolve(`/contact/?${ubmContactSearch}#contact-form`)}
          >UBMについて問い合わせる</a
        >
      </div>
      <figure class="ubm-photo">
        <img
          src={asset('/images/profile/ubm-with-kitahara.webp')}
          alt="北原孝彦さんと高橋雄太が、背中合わせに座って笑っている写真"
          width="960"
          height="1280"
          loading="lazy"
          decoding="async"
        />
        <figcaption>北原孝彦さんと</figcaption>
      </figure>
    </div>
  </section>

  <section class="profile-section" id="profile-events" aria-labelledby="profile-activity-heading">
    <div class="container section-stack">
      <div class="activity-heading">
        <h2 id="profile-activity-heading">活動・発信</h2>
        <p class="muted">習慣づくりや対話に関心があります。好きな作品の一つは『宇宙兄弟』です。</p>
      </div>
      <div class="activity-grid">
        <div class="section-group">
          <h3>イベント</h3>
          {#if !data.ticketcraftEvents}
            <p class="muted">開催予定と受付状況はTicketCraftでご確認ください。</p>
          {:else if upcomingEvents.length}
            {@render eventList(upcomingEvents)}
          {:else}
            <p class="muted">現在、開催予定のイベントはありません。</p>
          {/if}
          <a
            class="text-link"
            href={eventListUrl}
            target="_blank"
            rel="external noreferrer"
            onclick={() => trackOutbound('profile_events', '最新の開催予定を見る', eventListUrl)}
            >TicketCraftで最新の開催予定を見る</a
          >
          {#if pastEvents.length}
            <details class="profile-details">
              <summary>過去のイベント</summary>
              <div class="details-body">
                {@render eventList(pastEvents)}
              </div>
            </details>
          {/if}
        </div>
        <div class="section-group">
          <h3>SNS・LINE</h3>
          <ul class="social-list">
            {#each contactItems as item (item.href)}
              <li>
                <a
                  href={item.href}
                  target="_blank"
                  rel="external noreferrer"
                  onclick={() => trackOutbound('profile_contact', item.title, item.href)}
                >
                  <span class="social-name">
                    {#if item.platformImage}
                      <img src={asset(item.platformImage)} alt="" width="16" height="16" />
                    {/if}
                    {item.platformLabel}
                  </span>
                  <span class="social-title">{item.title}</span>
                  <span class="muted">{item.description}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <details class="profile-details">
        <summary>{background.title}</summary>
        <div class="background-grid details-body">
          <div class="background-group">
            <h3>経歴</h3>
            {#each background.careerItems as item (item.title)}
              <div>
                <h4>{item.title}</h4>
                {#if item.description}
                  <p class="muted">{item.description}</p>
                {/if}
              </div>
            {/each}
          </div>
          <div class="background-group">
            <h3>関心・活動</h3>
            {#each background.personalGroups as group (group.title)}
              <div>
                <h4>{group.title}</h4>
                <ul>
                  {#each group.items as item (item)}
                    <li>{item}</li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        </div>
      </details>
    </div>
  </section>

  <section
    class="profile-section contact-section"
    id="contact"
    aria-labelledby="profile-contact-heading"
  >
    <div class="container contact-inner">
      <div>
        <h2 id="profile-contact-heading">お問い合わせ</h2>
        <p>困っていることや、試してみたいことを、分かる範囲でお聞かせください。</p>
      </div>
      <ActionButton
        href="/contact/"
        label="お問い合わせフォームへ"
        tone="light"
        analytics={{ eventName: 'contact_cta_click', params: { placement: 'bottom_cta' } }}
      />
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .profile-page {
    background: var(--color-bg);
  }

  .profile-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.65fr);
    align-items: center;
    gap: clamp(24px, 7vw, 100px);
    padding-block: clamp(32px, 6vw, 82px);
  }

  .hero-copy {
    display: grid;
    gap: 14px;
  }

  .hero-role,
  .ubm-name {
    color: #74552d;
    font-size: 0.9rem;
    font-weight: 750;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-heading);
    line-height: 1.35;
    font-weight: 800;
  }

  h1 {
    font-size: clamp(1.95rem, 4.6vw, 3.65rem);
    letter-spacing: -0.04em;
  }

  h2 {
    font-size: clamp(1.55rem, 3vw, 2.35rem);
    letter-spacing: -0.025em;
  }

  h3 {
    font-size: 1.22rem;
  }

  h4 {
    font-size: 1.05rem;
  }

  .hero-lead {
    max-width: 37rem;
    font-size: clamp(0.98rem, 1.5vw, 1.12rem);
  }

  .hero-lead,
  .hero-experience,
  .value-card p,
  .work-copy p,
  .ubm-copy > p:not(.ubm-name),
  .muted {
    color: var(--color-ink-soft);
  }

  .hero-experience {
    font-size: 0.92rem;
  }

  .profile-portrait {
    width: 100%;
    max-width: 360px;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: 50% 36%;
    border-radius: var(--radius-large);
    justify-self: end;
  }

  .profile-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  .profile-nav a {
    display: inline-flex;
    min-height: 42px;
    align-items: center;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-pill);
    padding: 6px 13px;
    background: var(--color-surface);
    font-size: 0.88rem;
    font-weight: 700;
  }

  .profile-nav a:hover,
  .work-card:hover {
    background: var(--color-surface-soft);
  }

  .profile-section {
    padding-block: clamp(32px, 5vw, 66px);
    border-top: 1px solid var(--color-line);
  }

  .section-stack {
    display: grid;
    gap: clamp(22px, 3.4vw, 38px);
  }

  .section-group {
    display: grid;
    align-content: start;
    gap: 14px;
    min-width: 0;
  }

  .activity-heading {
    display: grid;
    gap: 8px;
  }

  .value-grid,
  .work-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }

  .value-card {
    display: grid;
    align-content: start;
    gap: 7px;
    border-top: 2px solid var(--color-primary);
    padding: 12px 4px 0;
  }

  .text-link {
    width: fit-content;
    color: #755124;
    font-weight: 750;
    text-decoration: underline;
    text-underline-offset: 0.24em;
  }

  .work-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--color-line);
    border-radius: 16px;
    background: var(--color-surface);
  }

  .work-card img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: var(--color-surface-soft);
  }

  .work-copy {
    display: grid;
    grid-template-rows: auto 1fr auto;
    flex: 1;
    gap: 7px;
    padding: 14px;
  }

  .work-copy p {
    font-size: 0.92rem;
  }

  .work-copy span {
    color: #755124;
    font-size: 0.88rem;
    font-weight: 750;
  }

  .profile-details {
    border-block: 1px solid var(--color-line);
  }

  .profile-details summary {
    padding: 12px 2px;
    cursor: pointer;
    font-weight: 750;
  }

  .details-body {
    padding-bottom: 16px;
  }

  .ubm-section {
    background: var(--color-surface-soft);
  }

  .ubm-panel {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
    gap: clamp(24px, 6vw, 80px);
    align-items: center;
  }

  .ubm-copy {
    display: grid;
    gap: 12px;
    max-width: 38rem;
  }

  .ubm-copy h2 {
    text-wrap: balance;
  }

  .ubm-copy h2 span {
    white-space: nowrap;
  }

  .ubm-action {
    margin-block: 4px 10px;
  }

  .ubm-action :global(.action-button) {
    color: var(--color-ink);
  }

  .ubm-note {
    font-size: 0.92rem;
  }

  .ubm-photo {
    margin: 0;
  }

  .ubm-photo img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center 90%;
    border-radius: var(--radius-card);
  }

  .ubm-photo figcaption {
    margin-top: 8px;
    color: var(--color-ink-soft);
    font-size: 0.84rem;
    text-align: center;
  }

  .activity-grid,
  .background-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(18px, 4vw, 52px);
  }

  .event-list,
  .social-list {
    display: grid;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .event-list li {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    gap: 5px 12px;
    border-bottom: 1px solid var(--color-line);
    padding-block: 8px;
  }

  .event-list li > div {
    flex: 1 1 12rem;
  }

  .event-title,
  .social-title {
    font-weight: 750;
  }

  .event-list time,
  .event-title + p {
    color: var(--color-ink-soft);
    font-size: 0.9rem;
  }

  .event-status {
    color: var(--color-ink-soft);
    font-size: 0.83rem;
  }

  .event-status--accepting {
    color: #53672e;
    font-weight: 750;
  }

  .social-list a {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    gap: 1px 12px;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-line);
  }

  .social-list a:hover .social-title {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .social-name {
    display: inline-flex;
    gap: 5px;
    align-items: center;
    align-self: start;
    min-height: 1.65rem;
    font-size: 0.81rem;
    font-weight: 750;
  }

  .social-list .muted {
    grid-column: 2;
    font-size: 0.88rem;
  }

  .background-group {
    display: grid;
    align-content: start;
    gap: 12px;
  }

  .background-group ul {
    margin: 4px 0 0;
    padding-inline-start: 1.25rem;
    color: var(--color-ink-soft);
  }

  .contact-section {
    background: var(--color-surface-soft);
  }

  .contact-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 18px 30px;
    padding-bottom: 8px;
  }

  .contact-inner p {
    margin-top: 7px;
    color: var(--color-ink-soft);
  }

  @media (max-width: 730px) {
    .profile-hero {
      grid-template-columns: minmax(0, 1fr) minmax(88px, 0.4fr);
    }

    .profile-portrait {
      align-self: start;
      border-radius: 20px;
    }

    .value-grid,
    .work-grid,
    .ubm-panel,
    .activity-grid,
    .background-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 460px) {
    .profile-hero {
      grid-template-columns: minmax(0, 1fr);
      gap: 18px;
    }

    .profile-portrait {
      grid-row: 1;
      width: 112px;
      justify-self: start;
    }
  }
</style>
