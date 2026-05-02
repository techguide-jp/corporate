<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import Footer from '$lib/components/layout/Footer.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { companyProfile, navItems } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';

  const pageSeo = {
    title: '北原孝彦Academy Fes 2026 | ゆーちゃん参加紹介 | TechGuide',
    description:
      '北原孝彦Academy Fes 2026に関わるゆーちゃんの紹介ページ。UBM所属・アカデミー参加の背景、来場者向けアプリ開発、セミナー、ロボで遊ぶ未来体験ブースを紹介します。',
    path: '/profile/academy-fes-2026',
    image: '/images/profile/academy-fes-2026/yuchan-hero.webp',
    imageAlt: '北原孝彦Academy Fes 2026に関わるゆーちゃん',
  };

  const cta = {
    label: 'ゆーちゃんのブースを見に行く',
    href: 'https://s.lmes.jp/landing-qr/2009291141-5wwelfTJ?uLand=dCtUnJ',
  };

  const eventFacts = [
    { label: '開催日', value: '2026年6月4日（木）' },
    { label: '会場', value: '東京流通センター 第一展示場' },
    { label: 'テーマ', value: 'Enrich the world 〜世界を豊かに〜' },
    { label: '参加', value: '1ブース・1セミナー・アプリ開発' },
  ];

  const involvementItems = [
    {
      label: 'App',
      title: '来場者向けアプリを開発',
      description:
        '会場を回る体験が少しでも楽しく、迷わず、つながりやすくなるように。ブースやセミナーを「探す」「知る」「行ってみる」ハードルを下げるアプリとして準備しています。',
    },
    {
      label: 'Booth',
      title: 'ロボで遊ぶ未来体験',
      description:
        'ロボットやIoTの実演を通して、プログラミングでできることを楽しく体験できるブースを出展します。AIロボ体験デモを中心に、その場で触れて分かる時間にします。',
    },
    {
      label: 'Seminar',
      title: 'AI・目標達成・自動化のテーマで準備中',
      description:
        'ChatGPTの使い方、やる気に頼らない行動設計、1人ビジネスでも始められる小さなシステム化など、持ち帰ってすぐ試せる内容を検討しています。',
    },
  ];

  const boothItems = [
    {
      title: 'AIロボ体験デモ',
      description: 'その場でAIロボとの関わりを体験できる無償コンテンツです。',
    },
    {
      title: 'AI/IT活用プチ相談',
      description: '業務や活動にAI・ITをどう使えるか、短い時間で方向性を整理します。',
    },
    {
      title: 'Webサービス企画設計相談予約',
      description: 'アイデアを試作サービスとして形にするための相談につなげます。',
    },
  ];

  const seminarThemes = [
    'AIを使いこなす人・使われる人の違い',
    'やる気に頼らない目標達成法',
    'あなたの仕事は、どこまで自動化できるのか？',
  ];

  const seminarTakeaways = [
    '目的から逆算してChatGPTへの指示を設計する方法',
    'やる気に頼らず、行動が続く環境をつくる考え方',
    '業務フローを可視化して、自動化できるポイントを見つける視点',
  ];

  const officialLinks = [
    { label: 'アカデミーとは', href: 'https://kitaharatakahiko.jp/academy/' },
    { label: '北原孝彦さんのYouTube', href: 'https://www.youtube.com/@kitahara64' },
    { label: '会場公式サイト', href: 'https://www.trc-event.jp/hall/' },
  ];

  const kitaharaPoints = [
    '美容師としてキャリアを始め、店舗ビジネスとオンラインビジネスを広げてきた連続起業家です。',
    'UBMは北原さんの考え方や行動を学ぶ場、アカデミーは同じ視座で実践を重ねる場として位置づけられています。',
    'ゆーちゃんはUBMに所属し、アカデミーにもジョイン。今回のFesには、アプリ開発・ブース出展・セミナー登壇で関わります。',
  ];

  const galleryImages = [
    {
      src: '/images/profile/academy-fes-2026/yuchan-hero.webp',
      alt: 'ゆーちゃんのプロフィール写真',
      caption: 'ゆーちゃんが体験を届ける入口',
    },
    {
      src: '/images/profile/academy-fes-2026/fes-moment.webp',
      alt: 'イベント会場前で撮影したメンバー写真',
      caption: '当日の体験づくりにも関わります',
    },
    {
      src: '/images/profile/academy-fes-2026/fes-community.webp',
      alt: 'コミュニティメンバーで撮影した集合写真',
      caption: '仲間と一緒に豊かさを広げる1日',
    },
  ];

  const pageStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.title,
      description: pageSeo.description,
      path: pageSeo.path,
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'プロフィール', path: '/profile/' },
      { name: '北原孝彦Academy Fes 2026', path: pageSeo.path },
    ]),
  ].map((item) => serializeJsonLd(item));

  function handleOutboundClick(section: string, label: string, href: string) {
    trackEvent('outbound_link_click', {
      section,
      link_label: label,
      destination_host: new URL(href).hostname,
    });
  }
</script>

<svelte:head>
  <link
    rel="preload"
    as="image"
    href={asset('/images/profile/academy-fes-2026/yuchan-hero.webp')}
  />
  <link
    rel="preload"
    as="image"
    href={asset('/images/profile/academy-fes-2026/fes-community.webp')}
  />
  <link
    rel="preload"
    as="image"
    href={asset('/images/profile/academy-fes-2026/yuchan-kitahara.webp')}
  />
</svelte:head>

<SeoHead
  title={pageSeo.title}
  description={pageSeo.description}
  path={pageSeo.path}
  image={pageSeo.image}
  imageAlt={pageSeo.imageAlt}
  jsonLd={pageStructuredData}
/>

<main class="academy-fes-page">
  <section class="academy-hero" aria-labelledby="academy-fes-title">
    <img
      class="academy-hero__image"
      src={asset('/images/profile/academy-fes-2026/yuchan-hero.webp')}
      alt=""
      aria-hidden="true"
      loading="eager"
      decoding="async"
    />
    <div class="academy-hero__shade"></div>

    <div class="container academy-hero__content">
      <p class="academy-hero__eyebrow">ゆーちゃん参加紹介ページ</p>
      <h1 id="academy-fes-title">北原孝彦Academy Fes 2026</h1>
      <p class="academy-hero__lead">
        当日来場者向けアプリの開発、セミナー登壇、ブース出展。ゆーちゃんがこのフェスで届けたい体験をまとめました。
      </p>

      <div class="academy-hero__actions" aria-label="主要アクション">
        <a
          class="academy-button academy-button--primary"
          href={cta.href}
          target="_blank"
          rel="external noreferrer"
          onclick={() => handleOutboundClick('academy_fes_hero', cta.label, cta.href)}
        >
          {cta.label}
        </a>
        <a class="academy-button academy-button--quiet" href={resolve('/profile')}
          >プロフィールへ戻る</a
        >
      </div>

      <p class="academy-hero__note">
        このページは、北原孝彦Academy Fes 2026に参加するゆーちゃん個人の紹介ページです。
      </p>
    </div>
  </section>

  <section class="event-strip" aria-label="イベント概要">
    <div class="container event-strip__grid">
      {#each eventFacts as item (item.label)}
        <div class="event-strip__item">
          <p>{item.label}</p>
          <strong>{item.value}</strong>
        </div>
      {/each}
    </div>
  </section>

  <section class="section intro-section">
    <div class="container intro-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">About this page</p>
        <h2>公式情報ではなく、ゆーちゃん視点でフェスとの関わりを紹介します。</h2>
      </div>
      <div class="intro-section__text">
        <p>
          北原孝彦アカデミーで学ぶメンバーが年に1回集まり、仲間とのつながりを育む場。テーマは「Enrich
          the world 〜世界を豊かに〜」です。
        </p>
        <p>
          このページでは、イベント全体の案内だけでなく、ゆーちゃんがどんな想いでアプリを作り、どんなブースやセミナーを準備しているかを中心に紹介します。
        </p>
      </div>
    </div>
  </section>

  <section class="section kitahara-section">
    <div class="container kitahara-section__inner">
      <figure class="kitahara-photo">
        <img
          src={asset('/images/profile/academy-fes-2026/yuchan-kitahara.webp')}
          alt="北原孝彦さんとゆーちゃんの2ショット"
          loading="eager"
          decoding="async"
        />
        <figcaption>北原孝彦さんと。UBMで学び、アカデミーにもジョインしました。</figcaption>
      </figure>

      <div class="section-copy">
        <p class="section-eyebrow">Who is Kitahara?</p>
        <h2>北原孝彦さんって誰？という方へ。</h2>
        <p>
          北原孝彦さんは、事業づくり・経営・行動の積み上げ方を実践ベースで発信している連続起業家です。
        </p>
        <ul class="kitahara-points">
          {#each kitaharaPoints as point (point)}
            <li>{point}</li>
          {/each}
        </ul>
        <a
          class="text-link"
          href="https://www.youtube.com/@kitahara64"
          target="_blank"
          rel="external noreferrer"
          onclick={() =>
            handleOutboundClick(
              'academy_fes_kitahara',
              '北原孝彦さんのYouTube',
              'https://www.youtube.com/@kitahara64',
            )}
        >
          北原孝彦さんのYouTubeを見る
        </a>
      </div>
    </div>
  </section>

  <section class="section involvement-section">
    <div class="container">
      <div class="section-copy section-copy--center">
        <p class="section-eyebrow">Yuchan at Fes</p>
        <h2>アプリ、ブース、セミナーの3つで関わります。</h2>
      </div>

      <div class="involvement-grid">
        {#each involvementItems as item (item.label)}
          <article class="involvement-card">
            <p class="involvement-card__label">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section app-section">
    <div class="container app-section__inner">
      <div class="app-section__media">
        <img
          src={asset('/images/profile/academy-fes-2026/fes-community.webp')}
          alt="北原孝彦Academy Fesに関わるメンバーの集合写真"
          loading="eager"
          decoding="async"
        />
      </div>

      <div class="section-copy">
        <p class="section-eyebrow">App development</p>
        <h2>会場で「行ってみたい」が増えるアプリを作っています。</h2>
        <p>
          たくさんのブースとセミナーが並ぶ1日だからこそ、来場者が迷わず、興味を持った場所に動けることが大事だと考えています。
        </p>
        <p>
          技術を目立たせるためではなく、人と人、人と体験がつながる確率を上げるためのアプリとして、フェス全体の体験を支えます。
        </p>
        <a
          class="text-link"
          href="https://github.com/techguide-jp/akademy_fes"
          target="_blank"
          rel="external noreferrer"
          onclick={() =>
            handleOutboundClick(
              'academy_fes_app',
              '当日来場者向けアプリのリポジトリ',
              'https://github.com/techguide-jp/akademy_fes',
            )}
        >
          当日来場者向けアプリのリポジトリを見る
        </a>
      </div>
    </div>
  </section>

  <section class="section booth-section">
    <div class="container booth-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">Booth</p>
        <h2>ロボで遊ぶ未来体験</h2>
        <p>
          ロボットやIoTの実演を通して、プログラミングでできることを楽しく体験できるブースです。AIロボ体験デモは、その場でAIロボとの関わりを体験できます。
        </p>
      </div>

      <div class="booth-list">
        {#each boothItems as item (item.title)}
          <article class="booth-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section seminar-section">
    <div class="container seminar-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">Seminar</p>
        <h2>持ち帰ってすぐ試せるテーマを検討中です。</h2>
        <p>
          正式テーマは調整中です。AI、目標達成、自動化を軸に、聞いて終わりではなく、自分の仕事や行動に落とし込める内容として準備しています。
        </p>
      </div>

      <div class="seminar-panel">
        <div>
          <h3>テーマ候補</h3>
          <ul class="plain-list">
            {#each seminarThemes as theme (theme)}
              <li>{theme}</li>
            {/each}
          </ul>
        </div>
        <div>
          <h3>持ち帰れること</h3>
          <ul class="plain-list">
            {#each seminarTakeaways as takeaway (takeaway)}
              <li>{takeaway}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section gallery-section">
    <div class="container">
      <div class="section-copy section-copy--center">
        <p class="section-eyebrow">Scenes</p>
        <h2>写真で見る、つながりのある場づくり。</h2>
      </div>

      <div class="gallery-grid">
        {#each galleryImages as image (image.src)}
          <figure class="gallery-item">
            <img src={asset(image.src)} alt={image.alt} loading="eager" decoding="async" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        {/each}
      </div>
    </div>
  </section>

  <section class="section related-section">
    <div class="container related-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">Official and related links</p>
        <h2>公式・関連情報はこちら。</h2>
      </div>

      <div class="related-links">
        {#each officialLinks as link (link.href)}
          <a
            class="related-link"
            href={link.href}
            target="_blank"
            rel="external noreferrer"
            onclick={() => handleOutboundClick('academy_fes_related', link.label, link.href)}
          >
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section class="final-cta" aria-labelledby="academy-fes-cta-title">
    <div class="container final-cta__inner">
      <p class="section-eyebrow">Join booth</p>
      <h2 id="academy-fes-cta-title">当日は、ゆーちゃんのブースで会いましょう。</h2>
      <p>
        AIロボ体験、AI/IT活用の相談、Webサービスの企画設計に興味がある方は、まずブースへの導線からチェックしてください。
      </p>
      <a
        class="academy-button academy-button--primary"
        href={cta.href}
        target="_blank"
        rel="external noreferrer"
        onclick={() => handleOutboundClick('academy_fes_final', cta.label, cta.href)}
      >
        {cta.label}
      </a>
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .academy-fes-page {
    --fes-ink: #241b16;
    --fes-muted: #635449;
    --fes-green: #1e7569;
    --fes-blue: #285c8f;
    --fes-coral: #c9573d;
    --fes-gold: #d59749;
    --fes-line: rgba(50, 42, 33, 0.14);
    --fes-surface: rgba(255, 255, 255, 0.92);

    color: var(--fes-ink);
    background: #fffdf8;
  }

  .academy-fes-page :global(.container) {
    width: min(var(--container-width), calc(100% - 40px));
  }

  .academy-hero {
    position: relative;
    isolation: isolate;
    display: grid;
    align-items: center;
    min-height: max(520px, calc(100svh - 72px));
    overflow: hidden;
    background: #1f261e;
  }

  .academy-hero__image,
  .academy-hero__shade {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
  }

  .academy-hero__image {
    object-fit: cover;
    object-position: center 42%;
  }

  .academy-hero__shade {
    z-index: -1;
    background:
      linear-gradient(
        90deg,
        rgba(17, 18, 15, 0.78) 0%,
        rgba(22, 21, 17, 0.58) 45%,
        rgba(22, 21, 17, 0.18) 100%
      ),
      linear-gradient(0deg, rgba(17, 18, 15, 0.72) 0%, rgba(17, 18, 15, 0) 42%);
  }

  .academy-hero__content {
    display: grid;
    gap: 20px;
    max-width: 680px;
    padding-block: 64px;
    color: white;
  }

  .academy-hero__eyebrow,
  .section-eyebrow {
    margin: 0;
    color: var(--fes-green);
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .academy-hero__eyebrow {
    color: #a7f0d9;
  }

  .academy-hero h1,
  .section-copy h2,
  .final-cta h2 {
    margin: 0;
    font-family: var(--font-heading);
    font-weight: 900;
    letter-spacing: 0;
    line-height: 1.12;
  }

  .academy-hero h1 {
    max-width: 13ch;
    font-size: 3.5rem;
  }

  .academy-hero__lead {
    max-width: 37rem;
    margin: 0;
    font-size: 1.08rem;
    font-weight: 700;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.92);
  }

  .academy-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  .academy-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 54px;
    padding: 0 22px;
    border-radius: 999px;
    font-weight: 900;
    line-height: 1.3;
    text-align: center;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .academy-button:hover {
    transform: translateY(-2px);
  }

  .academy-button--primary {
    color: white;
    background: linear-gradient(135deg, var(--fes-coral), var(--fes-gold));
    box-shadow: 0 16px 28px rgba(95, 45, 29, 0.28);
  }

  .academy-button--quiet {
    border: 1px solid rgba(255, 255, 255, 0.42);
    color: white;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
  }

  .academy-hero__note {
    max-width: 42rem;
    margin: 6px 0 0;
    color: rgba(255, 255, 255, 0.76);
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .event-strip {
    border-block: 1px solid var(--fes-line);
    background: linear-gradient(90deg, rgba(255, 253, 248, 1), rgba(238, 247, 244, 0.98));
  }

  .event-strip__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .event-strip__item {
    display: grid;
    gap: 5px;
    min-height: 110px;
    padding: 22px 20px;
    border-right: 1px solid var(--fes-line);
  }

  .event-strip__item:first-child {
    border-left: 1px solid var(--fes-line);
  }

  .event-strip__item p {
    margin: 0;
    color: var(--fes-green);
    font-size: 0.78rem;
    font-weight: 900;
  }

  .event-strip__item strong {
    color: var(--fes-ink);
    font-size: 1rem;
    line-height: 1.45;
  }

  .section {
    padding-block: 88px;
  }

  .section-copy {
    display: grid;
    gap: 14px;
  }

  .section-copy--center {
    max-width: 740px;
    margin-inline: auto;
    text-align: center;
  }

  .section-copy h2,
  .final-cta h2 {
    max-width: 18ch;
    font-size: 2.4rem;
  }

  .section-copy--center h2 {
    margin-inline: auto;
  }

  .section-copy p:not(.section-eyebrow),
  .intro-section__text p,
  .involvement-card p,
  .booth-item p,
  .final-cta p {
    margin: 0;
    color: var(--fes-muted);
    line-height: 1.85;
  }

  .intro-section__inner,
  .kitahara-section__inner,
  .app-section__inner,
  .booth-section__inner,
  .seminar-section__inner,
  .related-section__inner {
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: 42px;
    align-items: start;
  }

  .intro-section__text {
    display: grid;
    gap: 16px;
    padding-top: 4px;
  }

  .kitahara-section {
    background: linear-gradient(180deg, rgba(255, 253, 248, 1), rgba(247, 252, 250, 0.96));
  }

  .kitahara-photo {
    overflow: hidden;
    display: grid;
    margin: 0;
    border: 1px solid var(--fes-line);
    border-radius: 8px;
    background: white;
    box-shadow: 0 20px 36px rgba(38, 32, 24, 0.08);
  }

  .kitahara-photo img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .kitahara-photo figcaption {
    padding: 14px 16px;
    color: var(--fes-muted);
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.6;
  }

  .kitahara-points {
    display: grid;
    gap: 12px;
    margin: 2px 0 0;
    padding: 0;
    list-style: none;
  }

  .kitahara-points li {
    position: relative;
    padding-left: 18px;
    color: var(--fes-muted);
    line-height: 1.7;
  }

  .kitahara-points li::before {
    content: '';
    position: absolute;
    top: 0.72em;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--fes-green);
  }

  .involvement-section,
  .gallery-section,
  .related-section {
    background: linear-gradient(180deg, rgba(238, 247, 244, 0.9), rgba(255, 253, 248, 1));
  }

  .involvement-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-top: 36px;
  }

  .involvement-card,
  .booth-item,
  .seminar-panel,
  .related-link {
    border: 1px solid var(--fes-line);
    border-radius: 8px;
    background: var(--fes-surface);
    box-shadow: 0 20px 36px rgba(38, 32, 24, 0.08);
  }

  .involvement-card {
    display: grid;
    gap: 14px;
    min-height: 100%;
    padding: 24px;
  }

  .involvement-card__label {
    width: fit-content;
    margin: 0;
    color: var(--fes-blue);
    font-size: 0.8rem;
    font-weight: 900;
  }

  .involvement-card h3,
  .booth-item h3,
  .seminar-panel h3 {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 1.28rem;
    line-height: 1.35;
    letter-spacing: 0;
  }

  .app-section__media,
  .gallery-item {
    overflow: hidden;
    border-radius: 8px;
    background: rgba(238, 247, 244, 0.94);
  }

  .app-section__media img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .text-link {
    display: inline-flex;
    width: fit-content;
    color: var(--fes-blue);
    font-weight: 900;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .booth-section {
    background:
      linear-gradient(90deg, rgba(255, 253, 248, 0.96), rgba(255, 253, 248, 0.82)),
      url('/images/profile/academy-fes-2026/fes-moment.webp') center / cover fixed;
  }

  .booth-list {
    display: grid;
    gap: 14px;
  }

  .booth-item {
    display: grid;
    gap: 8px;
    padding: 20px;
  }

  .seminar-panel {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    padding: 24px;
  }

  .plain-list {
    display: grid;
    gap: 12px;
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
  }

  .plain-list li {
    position: relative;
    padding-left: 18px;
    color: var(--fes-muted);
    line-height: 1.65;
  }

  .plain-list li::before {
    content: '';
    position: absolute;
    top: 0.72em;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--fes-coral);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr 1fr;
    gap: 18px;
    align-items: stretch;
    margin-top: 36px;
  }

  .gallery-item {
    display: grid;
    align-content: start;
    margin: 0;
    border: 1px solid var(--fes-line);
    background: white;
  }

  .gallery-item img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .gallery-item:nth-child(2) img {
    aspect-ratio: 3 / 4;
  }

  .gallery-item figcaption {
    padding: 14px 16px;
    color: var(--fes-muted);
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.6;
  }

  .related-links {
    display: grid;
    gap: 12px;
  }

  .related-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 58px;
    padding: 16px 18px;
    color: var(--fes-ink);
    font-weight: 900;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .related-link::after {
    content: '↗';
    color: var(--fes-green);
  }

  .related-link:hover {
    transform: translateY(-2px);
    border-color: rgba(30, 117, 105, 0.36);
    box-shadow: 0 22px 38px rgba(38, 32, 24, 0.12);
  }

  .final-cta {
    padding-block: 84px;
    color: white;
    background:
      linear-gradient(90deg, rgba(17, 24, 26, 0.88), rgba(17, 24, 26, 0.64)),
      url('/images/profile/academy-fes-2026/fes-community.webp') center / cover;
  }

  .final-cta__inner {
    display: grid;
    gap: 18px;
    max-width: 680px;
    margin-inline: auto;
    text-align: center;
  }

  .final-cta .section-eyebrow {
    color: #a7f0d9;
  }

  .final-cta h2 {
    margin-inline: auto;
  }

  .final-cta p {
    color: rgba(255, 255, 255, 0.86);
  }

  .final-cta .academy-button {
    justify-self: center;
  }

  @media (max-width: 980px) {
    .academy-hero__shade {
      background:
        linear-gradient(90deg, rgba(17, 18, 15, 0.82), rgba(17, 18, 15, 0.42)),
        linear-gradient(0deg, rgba(17, 18, 15, 0.82), rgba(17, 18, 15, 0.08) 58%);
    }

    .event-strip__grid,
    .involvement-grid,
    .gallery-grid,
    .intro-section__inner,
    .kitahara-section__inner,
    .app-section__inner,
    .booth-section__inner,
    .seminar-section__inner,
    .related-section__inner {
      grid-template-columns: 1fr;
    }

    .event-strip__item,
    .event-strip__item:first-child {
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid var(--fes-line);
    }

    .event-strip__item:last-child {
      border-bottom: 0;
    }

    .seminar-panel {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .academy-fes-page :global(.container) {
      width: min(var(--container-width), calc(100% - 28px));
    }

    .academy-hero {
      min-height: max(560px, calc(100svh - 56px));
    }

    .academy-hero__image {
      object-position: 58% 45%;
    }

    .academy-hero__shade {
      background:
        linear-gradient(90deg, rgba(17, 18, 15, 0.78), rgba(17, 18, 15, 0.32)),
        linear-gradient(0deg, rgba(17, 18, 15, 0.9), rgba(17, 18, 15, 0.1) 66%);
    }

    .academy-hero__content {
      gap: 16px;
      padding-block: 44px;
    }

    .academy-hero h1 {
      max-width: 11ch;
      font-size: 2.36rem;
    }

    .academy-hero__lead {
      font-size: 1rem;
    }

    .academy-button {
      width: 100%;
      padding-inline: 18px;
    }

    .section {
      padding-block: 64px;
    }

    .section-copy h2,
    .final-cta h2 {
      max-width: none;
      font-size: 1.9rem;
    }

    .involvement-grid,
    .gallery-grid {
      margin-top: 28px;
    }

    .involvement-card,
    .seminar-panel {
      padding: 18px;
    }

    .booth-section {
      background:
        linear-gradient(180deg, rgba(255, 253, 248, 0.97), rgba(255, 253, 248, 0.88)),
        url('/images/profile/academy-fes-2026/fes-moment.webp') center / cover;
    }

    .final-cta {
      padding-block: 66px;
    }
  }
</style>
