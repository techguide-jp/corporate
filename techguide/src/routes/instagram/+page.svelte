<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { trackEvent, type AnalyticsMetadata } from '$lib/analytics';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { companyProfile, instagramProfileUrl, pageSeo, profilePageContent } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';

  interface ChoiceItem {
    label: string;
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
    eventName: AnalyticsMetadata['eventName'];
  }

  interface WorkItem {
    title: string;
    category: string;
    description: string;
    image: string;
    imageAlt: string;
    href: string;
    eventName: AnalyticsMetadata['eventName'];
  }

  const choices: ChoiceItem[] = [
    {
      label: '3分診断',
      title: '毎月の手作業を減らしたい',
      description:
        '集計、請求書作成、LINE・メールの転記、申込管理など、今の業務で自動化できるところを確認できます。',
      ctaLabel: '業務自動化できるか診断する',
      href: 'https://www.ready-mock.com/business-automation-check',
      eventName: 'business_automation_click',
    },
    {
      label: '無料相談あり',
      title: '申し込み・予約導線を見直したい',
      description:
        '投稿、プロフィール、リンク、フォーム、送信後案内までを確認し、お客様が迷いやすい場所を整理します。',
      ctaLabel: '申し込み導線を見直す',
      href: 'https://form-flow-diagnosis-yuchan.tashua314.chatgpt.site/',
      eventName: 'form_flow_click',
    },
    {
      label: 'LP制作・改善',
      title: 'LPを作りたい・改善したい',
      description:
        '原稿やデザインだけでなく、フォームや相談につながる流れ、公開後の計測まで含めて整えます。',
      ctaLabel: 'LP制作の内容を見る',
      href: 'https://lpboost-prod.lpboost.workers.dev/',
      eventName: 'lpboost_click',
    },
    {
      label: '本開発前の試作',
      title: 'アイデアを小さく試したい',
      description:
        '新しいサービスや業務改善のアイデアを、本開発へ進む前に小さな試作として形にします。',
      ctaLabel: '小さな試作を相談する',
      href: 'https://www.ready-mock.com/',
      eventName: 'ready_mock_click',
    },
  ];

  const works: WorkItem[] = [
    {
      title: 'AROMINE',
      category: 'Web・申込導線',
      description:
        'ブランドの世界観、制作クラス、認定講師、申込・問い合わせまでをまとめたWebサイト。',
      image: '/images/showcase/aromine-hero.webp',
      imageAlt: 'AROMINE Webサイト',
      href: 'https://www.aromine33.com/',
      eventName: 'work_aromine_click',
    },
    {
      title: '守成クラブ品川グループ',
      category: '団体・コミュニティサイト',
      description: '活動内容や参加案内を整理した、団体・コミュニティ向けWebサイト。',
      image: '/images/showcase/shusei-shinagawa-hero.webp',
      imageAlt: '守成クラブ品川グループ Webサイト',
      href: 'https://www.shusei-tokyoshinagawa.com/',
      eventName: 'work_shusei_click',
    },
    {
      title: 'Academy Fes',
      category: 'イベントシステム',
      description:
        'イベントの参加者導線、出展者情報、受付、周遊、動画閲覧などをまとめたイベントポータル。',
      image: '/images/showcase/academy-fes-2026-hero.webp',
      imageAlt: 'Academy Fes イベントポータル',
      href: 'https://staging-fes.kitaharatakahiko-academy.com/',
      eventName: 'work_academy_fes_click',
    },
  ];

  const instagramStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.instagram.title,
      description: pageSeo.instagram.description,
      path: pageSeo.instagram.path,
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: '仕事と申し込み導線を整える', path: pageSeo.instagram.path },
    ]),
  ].map((item) => serializeJsonLd(item));

  const currentYear = new Date().getFullYear();

  function handleTrackedClick(eventName: AnalyticsMetadata['eventName'], placement: string) {
    trackEvent(eventName, { placement });
  }
</script>

<SeoHead
  title={pageSeo.instagram.title}
  description={pageSeo.instagram.description}
  path={pageSeo.instagram.path}
  image={pageSeo.instagram.image}
  imageAlt={pageSeo.instagram.imageAlt}
  jsonLd={instagramStructuredData}
  preloadImage={true}
/>

<header class="instagram-header">
  <div class="instagram-shell instagram-header__inner">
    <a class="instagram-header__brand" href={resolve('/')} aria-label="TechGuide ホームへ移動">
      TechGuide
    </a>
  </div>
</header>

<main class="instagram-page">
  <section class="instagram-hero" aria-labelledby="instagram-hero-heading">
    <div class="instagram-shell instagram-hero__inner">
      <h1 class="sr-only" id="instagram-hero-heading">仕事や申し込み導線を、小さく整えたい方へ</h1>
      <p class="sr-only">
        毎月の手作業、申し込みフォーム、LP、新しいサービスの試作まで。今の困りごとに近いものを選んでください。
      </p>
      <img
        class="instagram-hero__image"
        src={asset('/images/instagram/instagram-hero.webp')}
        alt=""
        width="1536"
        height="1024"
        fetchpriority="high"
        decoding="async"
      />
    </div>
  </section>

  <section class="choice-section" aria-labelledby="choice-heading">
    <div class="instagram-shell">
      <div class="section-heading section-heading--compact">
        <p>Choose by concern</p>
        <h2 id="choice-heading">困りごとから選ぶ</h2>
      </div>

      <div class="choice-grid">
        {#each choices as item, index (item.eventName)}
          <article class="choice-card">
            <div class="choice-card__topline">
              <span class="choice-card__number" aria-hidden="true">0{index + 1}</span>
              <span class="choice-card__label">{item.label}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a
              class="choice-card__action"
              href={item.href}
              rel="external noreferrer"
              onclick={() => handleTrackedClick(item.eventName, 'problem_choices')}
            >
              <span>{item.ctaLabel}</span>
              <span class="arrow-icon" aria-hidden="true">→</span>
            </a>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="guidance-section" aria-labelledby="guidance-heading">
    <div class="instagram-shell guidance-section__inner">
      <div>
        <h2 id="guidance-heading">どれを選べばよいか分からなくても大丈夫です</h2>
        <p>まだ相談内容がまとまっていない場合は、今困っていることをそのまま送ってください。</p>
      </div>
      <div class="guidance-section__actions">
        <a
          class="primary-action primary-action--instagram"
          href={instagramProfileUrl}
          rel="external noreferrer"
          onclick={() => handleTrackedClick('instagram_contact_click', 'mid_page')}
        >
          <img src={asset('/images/social/instagram.svg')} alt="" aria-hidden="true" />
          <span>Instagramで相談する</span>
        </a>
        <a
          class="text-action"
          href={resolve('/contact/')}
          onclick={() => handleTrackedClick('general_contact_click', 'mid_page')}
        >
          その他の相談を見る
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>

  <section class="works-section" aria-labelledby="works-heading">
    <div class="instagram-shell">
      <div class="section-heading">
        <p>Selected works</p>
        <h2 id="works-heading">こんな仕組みやページを作ってきました</h2>
      </div>

      <div class="works-grid">
        {#each works as item (item.eventName)}
          <article class="work-card">
            <a
              class="work-card__image-link"
              href={item.href}
              rel="external noreferrer"
              aria-label={`${item.title}を見る`}
              onclick={() => handleTrackedClick(item.eventName, 'work_image')}
            >
              <img
                src={asset(item.image)}
                alt={item.imageAlt}
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </a>
            <div class="work-card__body">
              <p class="work-card__category">
                <strong>受託制作</strong><span>/</span>{item.category}
              </p>
              <h3>{item.title}</h3>
              <p class="work-card__description">{item.description}</p>
              <a
                class="work-card__action"
                href={item.href}
                rel="external noreferrer"
                onclick={() => handleTrackedClick(item.eventName, 'work_text')}
              >
                制作事例を見る
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="profile-section" aria-labelledby="profile-heading">
    <div class="instagram-shell profile-section__inner">
      <div class="profile-section__image">
        <img
          src={asset(profilePageContent.hero.image)}
          alt={profilePageContent.hero.imageAlt}
          width="2808"
          height="3255"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="profile-section__copy">
        <p class="profile-section__eyebrow">About</p>
        <h2 id="profile-heading">高橋雄太 / TechGuide合同会社</h2>
        <p>
          右脳派・感覚派の個人事業主や小規模事業者に向けて、<br
            class="profile-section__desktop-break"
          />Web、AI、フォーム、業務の仕組み化を支援しています。
        </p>
      </div>
    </div>
  </section>

  <section class="final-cta" aria-labelledby="final-cta-heading">
    <div class="instagram-shell final-cta__inner">
      <h2 id="final-cta-heading">今の困りごとから、小さく整えていきましょう</h2>
      <div class="final-cta__actions">
        <a
          class="primary-action primary-action--instagram"
          href={instagramProfileUrl}
          rel="external noreferrer"
          onclick={() => handleTrackedClick('instagram_contact_click', 'bottom')}
        >
          <img src={asset('/images/social/instagram.svg')} alt="" aria-hidden="true" />
          <span>Instagramで相談する</span>
        </a>
        <a
          class="text-action"
          href={resolve('/contact/')}
          onclick={() => handleTrackedClick('general_contact_click', 'bottom')}
        >
          その他のお問い合わせ
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</main>

<footer class="instagram-footer">
  <div class="instagram-shell instagram-footer__inner">
    <a class="instagram-footer__company" href={resolve('/')}>{companyProfile.name}</a>
    <nav class="instagram-footer__links" aria-label="フッターリンク">
      <a href={resolve('/#company')}>会社概要</a>
      <span>プライバシーポリシー</span>
      <span>特定商取引法に基づく表記</span>
    </nav>
    <p>© {currentYear} {companyProfile.name}</p>
  </div>
</footer>

<style>
  :global(body) {
    background: #fffdf8;
  }

  .instagram-shell {
    width: min(100% - 32px, 1040px);
    margin-inline: auto;
  }

  .instagram-header {
    position: relative;
    z-index: 10;
    border-bottom: 1px solid var(--color-line);
    background: rgba(255, 253, 248, 0.96);
  }

  .instagram-header__inner {
    min-height: 64px;
    display: flex;
    align-items: center;
  }

  .instagram-header__brand {
    padding-block: 8px;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .instagram-header__brand:focus-visible,
  .instagram-footer a:focus-visible,
  .text-action:focus-visible,
  .work-card__action:focus-visible,
  .work-card__image-link:focus-visible {
    outline: 3px solid rgba(214, 151, 76, 0.45);
    outline-offset: 4px;
  }

  .instagram-page {
    overflow: hidden;
  }

  .instagram-hero {
    padding-block: clamp(18px, 3vw, 30px);
    background: #fffdf8;
  }

  .instagram-hero__inner {
    max-width: 800px;
  }

  .section-heading > p,
  .profile-section__eyebrow {
    margin-bottom: 10px;
    color: #9c6629;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .instagram-hero__image {
    width: 100%;
    height: auto;
    border: 1px solid rgba(117, 92, 56, 0.12);
    border-radius: 8px;
    background: #fffdf8;
    box-shadow: 0 12px 30px rgba(111, 83, 41, 0.06);
  }

  .choice-section,
  .works-section {
    padding-block: clamp(50px, 8vw, 84px);
  }

  .choice-section {
    padding-top: clamp(34px, 5vw, 54px);
  }

  .section-heading {
    max-width: 720px;
    margin-bottom: 28px;
  }

  .section-heading--compact {
    margin-bottom: 22px;
  }

  .section-heading h2,
  .guidance-section h2,
  .profile-section h2,
  .final-cta h2 {
    font-family: var(--font-heading);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.35;
    text-wrap: balance;
  }

  .section-heading h2 {
    font-size: clamp(1.55rem, 4vw, 2.25rem);
  }

  .choice-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .choice-card {
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: clamp(22px, 3vw, 30px);
    border: 1px solid rgba(117, 92, 56, 0.18);
    border-top: 4px solid var(--color-primary);
    border-radius: 8px;
    background: var(--color-surface);
    box-shadow: 0 12px 28px rgba(111, 83, 41, 0.07);
  }

  .choice-card__topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
  }

  .choice-card__number {
    color: rgba(106, 90, 72, 0.48);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.1em;
  }

  .choice-card__label {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding-inline: 10px;
    border: 1px solid rgba(214, 151, 76, 0.26);
    border-radius: 6px;
    background: #fff8e8;
    color: #83521f;
    font-size: 0.76rem;
    font-weight: 800;
  }

  .choice-card h3 {
    font-family: var(--font-heading);
    font-size: clamp(1.22rem, 2.5vw, 1.55rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.4;
    text-wrap: balance;
  }

  .choice-card > p {
    margin-top: 12px;
    margin-bottom: 24px;
    color: var(--color-ink-soft);
    font-size: 0.94rem;
    line-height: 1.8;
  }

  .choice-card__action,
  .primary-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 54px;
    border-radius: 8px;
    font-weight: 800;
    text-align: center;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      background-color 0.18s ease;
  }

  .choice-card__action {
    width: 100%;
    margin-top: auto;
    padding: 12px 16px;
    background: var(--color-ink);
    color: var(--color-white);
    font-size: 0.91rem;
    overflow-wrap: anywhere;
  }

  .choice-card__action:hover {
    background: #463522;
    box-shadow: 0 8px 18px rgba(47, 36, 24, 0.2);
    transform: translateY(-1px);
  }

  .choice-card__action:active,
  .primary-action:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  .choice-card__action:focus-visible,
  .primary-action:focus-visible {
    outline: 3px solid rgba(214, 151, 76, 0.5);
    outline-offset: 3px;
  }

  .arrow-icon {
    flex: 0 0 auto;
    font-size: 1.15rem;
  }

  .guidance-section {
    padding-block: clamp(42px, 7vw, 66px);
    border-block: 1px solid rgba(117, 92, 56, 0.14);
    background: var(--color-surface-soft);
  }

  .guidance-section__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: clamp(28px, 5vw, 64px);
  }

  .guidance-section h2 {
    max-width: 620px;
    font-size: clamp(1.45rem, 3.4vw, 2rem);
  }

  .guidance-section p {
    max-width: 650px;
    margin-top: 12px;
    color: var(--color-ink-soft);
  }

  .guidance-section__actions,
  .final-cta__actions {
    min-width: min(100%, 280px);
    display: grid;
    justify-items: center;
    gap: 16px;
  }

  .primary-action {
    width: 100%;
    padding: 12px 20px;
    background: #d6974c;
    color: #261a0e;
    box-shadow: 0 7px 16px rgba(190, 123, 44, 0.2);
  }

  .primary-action img {
    width: 24px;
    height: 24px;
    border-radius: 6px;
  }

  .primary-action:hover {
    background: #e3a75f;
    box-shadow: 0 9px 20px rgba(190, 123, 44, 0.26);
    transform: translateY(-1px);
  }

  .text-action,
  .work-card__action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #74461b;
    font-size: 0.9rem;
    font-weight: 800;
    text-decoration: underline;
    text-decoration-color: rgba(116, 70, 27, 0.38);
    text-underline-offset: 5px;
  }

  .text-action:hover,
  .work-card__action:hover {
    color: #a66020;
    text-decoration-color: currentColor;
  }

  .works-section {
    background: #fffdf8;
  }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .work-card {
    min-width: 0;
    overflow: hidden;
    border: 1px solid rgba(117, 92, 56, 0.16);
    border-radius: 8px;
    background: var(--color-surface);
  }

  .work-card__image-link {
    display: block;
    overflow: hidden;
    border-bottom: 1px solid rgba(117, 92, 56, 0.12);
  }

  .work-card__image-link img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    transition: transform 0.25s ease;
  }

  .work-card__image-link:hover img {
    transform: scale(1.02);
  }

  .work-card__body {
    display: flex;
    flex-direction: column;
    min-height: 248px;
    padding: 20px;
  }

  .work-card__category {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    color: var(--color-ink-soft);
    font-size: 0.72rem;
    line-height: 1.5;
  }

  .work-card__category strong {
    color: #8a541f;
  }

  .work-card h3 {
    margin-top: 10px;
    font-family: var(--font-heading);
    font-size: 1.16rem;
    font-weight: 800;
    line-height: 1.45;
  }

  .work-card__description {
    margin-block: 10px 18px;
    color: var(--color-ink-soft);
    font-size: 0.88rem;
    line-height: 1.75;
  }

  .work-card__action {
    margin-top: auto;
    align-self: flex-start;
  }

  .profile-section {
    padding-block: clamp(48px, 8vw, 80px);
    background: #f7f0dd;
  }

  .profile-section__inner {
    max-width: 900px;
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    align-items: center;
    gap: clamp(26px, 5vw, 52px);
  }

  .profile-section__image {
    overflow: hidden;
    border-radius: 8px;
    background: #e9ddc7;
  }

  .profile-section__image img {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: center 24%;
  }

  .profile-section h2 {
    font-size: clamp(1.45rem, 3.2vw, 2rem);
  }

  .profile-section__copy > p:last-child {
    max-width: 620px;
    margin-top: 14px;
    color: var(--color-ink-soft);
    line-height: 1.9;
  }

  .final-cta {
    padding-block: clamp(52px, 9vw, 88px);
    background: var(--color-ink);
    color: var(--color-white);
  }

  .final-cta__inner {
    display: grid;
    justify-items: center;
    gap: 28px;
    text-align: center;
  }

  .final-cta h2 {
    max-width: 700px;
    font-size: clamp(1.55rem, 4vw, 2.45rem);
  }

  .final-cta .text-action {
    color: #f2d59d;
    text-decoration-color: rgba(242, 213, 157, 0.48);
  }

  .instagram-footer {
    padding-block: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    background: #21180f;
    color: rgba(255, 255, 255, 0.72);
  }

  .instagram-footer__inner {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 24px;
    font-size: 0.78rem;
  }

  .instagram-footer__company {
    color: var(--color-white);
    font-size: 0.9rem;
    font-weight: 800;
  }

  .instagram-footer__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 18px;
  }

  .instagram-footer__links a:hover {
    color: var(--color-white);
  }

  @media (max-width: 820px) {
    .works-grid {
      grid-template-columns: 1fr;
    }

    .work-card {
      display: grid;
      grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    }

    .work-card__image-link {
      border-right: 1px solid rgba(117, 92, 56, 0.12);
      border-bottom: 0;
    }

    .work-card__image-link img {
      height: 100%;
      aspect-ratio: auto;
    }

    .work-card__body {
      min-height: 230px;
    }

    .guidance-section__inner {
      grid-template-columns: 1fr;
    }

    .guidance-section__actions {
      width: min(100%, 340px);
      justify-self: start;
    }

    .instagram-footer__inner {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
    }
  }

  @media (max-width: 640px) {
    .instagram-shell {
      width: min(100% - 28px, 1040px);
    }

    .instagram-header__inner {
      min-height: 58px;
    }

    .instagram-header__brand {
      font-size: 1.12rem;
    }

    .instagram-hero__image {
      height: calc((100vw - 28px) * 0.78);
      object-fit: cover;
      object-position: left center;
    }

    .profile-section__desktop-break {
      display: none;
    }

    .choice-grid {
      grid-template-columns: 1fr;
    }

    .choice-card {
      padding: 21px 18px 20px;
    }

    .choice-card__topline {
      margin-bottom: 16px;
    }

    .choice-card > p {
      margin-bottom: 20px;
    }

    .choice-card__action {
      padding-inline: 13px;
      font-size: 0.88rem;
    }

    .guidance-section__actions,
    .final-cta__actions {
      width: 100%;
      min-width: 0;
    }

    .works-grid {
      gap: 14px;
    }

    .work-card {
      display: block;
    }

    .work-card__image-link {
      border-right: 0;
      border-bottom: 1px solid rgba(117, 92, 56, 0.12);
    }

    .work-card__image-link img {
      height: auto;
      aspect-ratio: 16 / 10;
    }

    .work-card__body {
      min-height: 0;
    }

    .profile-section__inner {
      grid-template-columns: 108px minmax(0, 1fr);
      align-items: start;
      gap: 20px;
    }

    .profile-section__eyebrow {
      margin-bottom: 7px;
    }

    .profile-section h2 {
      font-size: 1.24rem;
    }

    .profile-section__copy > p:last-child {
      font-size: 0.9rem;
      line-height: 1.75;
    }

    .instagram-footer__links {
      flex-direction: column;
    }
  }

  @media (max-width: 410px) {
    .profile-section__inner {
      grid-template-columns: 1fr;
    }

    .profile-section__image {
      width: 112px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .choice-card__action,
    .primary-action,
    .work-card__image-link img {
      transition: none;
    }
  }
</style>
