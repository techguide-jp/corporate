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
    image: '/images/profile/academy-fes-2026/academy-group-standing.webp',
    imageAlt: '北原孝彦アカデミーの集合記念写真',
  };

  const cta = {
    label: 'ゆーちゃんのブースを見に行く',
    href: 'https://s.lmes.jp/landing-qr/2009291141-5wwelfTJ?uLand=dCtUnJ',
  };

  const preQuestionMessage = `【北原孝彦Academy Fes 2026 事前質問】

気になっている内容：
・AIロボ体験
・AI/IT活用相談
・Webサービス企画
・セミナー内容
・その他

聞きたいこと・知りたいこと：

当日ブースで話したいこと：
`;

  const preQuestionSearch = new URLSearchParams({
    category: 'ai',
    subject: '北原孝彦Academy Fes 2026 事前質問',
    message: preQuestionMessage,
  }).toString();
  const preQuestionHref = `/contact/?${preQuestionSearch}` as `/contact/?${string}`;

  const eventFacts = [
    { label: '開催日', value: '2026年6月4日（木）' },
    { label: '会場', value: '東京流通センター 第一展示場' },
    { label: 'テーマ', value: 'Enrich the world 〜世界を豊かに〜' },
    { label: '規模', value: '100ブース・100セミナー' },
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
        'Reachy miniを置いて、AIロボとのやりとりを入り口に、楽しいだけで終わらない未来の可能性に触れられるブースを出展します。',
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
      description:
        'Reachy miniとのやりとりを通して、AIやロボットが身近な体験になる瞬間を味わえます。',
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
    { label: 'UBM公式ページ', href: 'https://ubm.school/lp/index.html' },
    { label: '北原孝彦さんのYouTube', href: 'https://www.youtube.com/@kitahara64' },
    { label: '会場公式サイト', href: 'https://www.trc-event.jp/hall/' },
  ];

  const kitaharaPoints = [
    '美容師としてキャリアを始め、店舗ビジネスとオンラインビジネスを広げてきました。',
    'UBMは北原さんの考え方や行動を学ぶ場、アカデミーは同じ視座で実践を重ねる場として位置づけられています。',
    'ゆーちゃんはUBMに所属し、アカデミーにもジョイン。今回のFesには、アプリ開発・ブース出展・セミナー登壇で関わります。',
  ];

  const kitaharaAchievements = [
    { label: 'グループ規模', value: 'グループ企業9社、全国360店舗、年間総売上60億円以上' },
    { label: 'メディア影響力', value: 'SNS総フォロワー50万人、YouTube登録者17万人' },
    { label: '店舗展開', value: '美容室Dears全国174店舗以上など、多業態で事業を展開' },
    { label: '事業支援', value: '事業顧問150社以上。実践知をもとにした支援を展開' },
  ];

  const diversityHighlights = [
    '美容室・ネイル・エステ・アイラッシュ',
    '飲食・コーヒー・料理代行・花・園芸',
    '教育・スクール・コーチング・講座',
    'IT・LP制作・SNS運用・動画制作',
    '医療福祉・訪問看護・児童福祉',
    '不動産・建築・内装・清掃・宿泊',
    'コンサル・マーケティング・採用支援',
    'ペット・フィットネス・イベント運営',
  ];

  const galleryImages = [
    {
      src: '/images/profile/academy-fes-2026/scenes-small-group.webp',
      alt: '少人数で集まって撮影したアカデミー仲間の写真',
      caption: '少人数で深く話せる関係性',
    },
    {
      src: '/images/profile/academy-fes-2026/scenes-seminar.webp',
      alt: 'セミナー会場で仲間と撮影した写真',
      caption: '学びの場で出会う仲間',
    },
    {
      src: '/images/profile/academy-fes-2026/scenes-friends.webp',
      alt: 'イベント会場で仲間と撮影した写真',
      caption: '人と人が自然につながる瞬間',
    },
    {
      src: '/images/profile/academy-fes-2026/scenes-community-meal.webp',
      alt: '食事会でアカデミー仲間と撮影した写真',
      caption: 'イベント外でも続くつながり',
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

  function handlePreQuestionClick(placement: string) {
    trackEvent('contact_cta_click', {
      placement,
      category: 'ai',
      subject: 'academy_fes_2026_pre_question',
    });
  }
</script>

<svelte:head>
  <link
    rel="preload"
    as="image"
    href={asset('/images/profile/academy-fes-2026/academy-group-standing.webp')}
  />
  <link
    rel="preload"
    as="image"
    href={asset('/images/profile/academy-fes-2026/scenes-community-meal.webp')}
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
      src={asset('/images/profile/academy-fes-2026/academy-group-standing.webp')}
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
          北原孝彦アカデミーで学ぶメンバーが年に1回集まり、仲間とのつながりを育む場。テーマは<strong
            class="text-emphasis">「Enrich the world 〜世界を豊かに〜」</strong
          >です。
        </p>
        <p>
          このページでは、イベント全体の案内だけでなく、<strong class="text-emphasis"
            >ゆーちゃんがどんな想いで関わるのか</strong
          >を中心に紹介します。
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
        <div class="kitahara-achievements" aria-label="北原さんが関わる事業の公開実績">
          <p class="kitahara-achievements__note">UBM公式ページの公開情報より、一部の実績を抜粋。</p>
          <div class="kitahara-achievement-grid">
            {#each kitaharaAchievements as item (item.label)}
              <div class="kitahara-achievement">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            {/each}
          </div>
        </div>
        <div class="join-reason">
          <h3>なぜUBMとアカデミーに入ったのか</h3>
          <p>
            技術だけで閉じず、<strong class="text-emphasis"
              >事業を通じて目の前の人を豊かにする力</strong
            >を磨きたかったからです。北原さんの実践知に触れ、同じ熱量で挑戦する仲間の中に身を置くことで、AI/ITを「便利な道具」ではなく、<strong
              class="text-emphasis">現場の未来を広げる力</strong
            >にしていきたいと考えています。
          </p>
        </div>
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

  <section class="section diversity-section">
    <div class="container diversity-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">100 Booths / 100 Seminars</p>
        <h2>多種多様な事業者が集まるから、思いがけない出会いがある。</h2>
        <p>
          当日は<strong class="text-emphasis">100ブース・100セミナー</strong
          >が実施されます。業種も、店舗ビジネス、教育、IT、医療福祉、クリエイティブ、コンサルティングまで幅広く、<strong
            class="text-emphasis">普段なら交わらない人たちの知識や経験</strong
          >に触れられる場です。
        </p>
      </div>

      <div class="diversity-panel" aria-label="参加メンバーの業界例">
        <p class="diversity-panel__label">参加メンバーの業界例</p>
        <div class="diversity-tags">
          {#each diversityHighlights as item (item)}
            <span>{item}</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section class="section app-section">
    <div class="container app-section__inner">
      <div class="app-section__media">
        <img
          src={asset('/images/profile/academy-fes-2026/app-development-focus.webp')}
          alt="当日来場者向けアプリを考えるゆーちゃん"
          loading="eager"
          decoding="async"
        />
      </div>

      <div class="section-copy">
        <p class="section-eyebrow">App development</p>
        <h2>会場での迷いを減らし、出会いを増やすアプリを作っています。</h2>
        <p>
          100ブース・100セミナーが並ぶ1日を、ただ情報量の多いイベントで終わらせない。来場者が<strong
            class="text-emphasis">「気になる」と感じた瞬間</strong
          >に、次の一歩を踏み出しやすくするためのアプリです。
        </p>
        <p>
          技術を目立たせるためではなく、<strong class="text-emphasis"
            >人と人、人と体験がつながる確率を上げること</strong
          >。多様な出展者の魅力に自然に触れられるよう、当日の体験をそっと支えます。
        </p>
      </div>
    </div>
  </section>

  <section class="section booth-section">
    <div class="container booth-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">Booth</p>
        <h2>ロボで遊ぶ未来体験</h2>
        <p>
          ただロボットを見るだけではなく、AIが現実の動きや表情を持ったときに何が起きるのかを感じられる場所にします。<strong
            class="text-emphasis">楽しさを入口</strong
          >に、<strong class="text-emphasis">これからの仕事や暮らしの可能性</strong
          >に触れてもらうブースです。
        </p>
      </div>

      <figure class="robot-card">
        <img
          src={asset('/images/profile/academy-fes-2026/reachy-mini.webp')}
          alt="Reachy miniのイメージ"
          loading="eager"
          decoding="async"
        />
        <figcaption>当日はReachy miniを置く予定です。</figcaption>
      </figure>
    </div>

    <div class="container booth-list">
      {#each boothItems as item (item.title)}
        <article class="booth-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section pre-question-section">
    <div class="container pre-question-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">Before the event</p>
        <h2>当日聞きたいことを、先に送っておけます。</h2>
        <p>
          AIロボ体験、AI/IT活用、Webサービス企画、セミナー内容など、気になっていることがあれば事前に送ってください。当日はその内容をきっかけに、<strong
            class="text-emphasis">ブースで具体的に話せる状態</strong
          >にしておきます。
        </p>
        <div class="pre-question-actions">
          <a
            class="academy-button academy-button--primary"
            href={resolve(preQuestionHref)}
            onclick={() => handlePreQuestionClick('academy_fes_pre_question')}
          >
            聞きたいことを事前に送る
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="section seminar-section">
    <div class="container seminar-section__inner">
      <div class="section-copy">
        <p class="section-eyebrow">Seminar</p>
        <h2>持ち帰ってすぐ試せるテーマを検討中です。</h2>
        <p>
          正式テーマは調整中です。AI、目標達成、自動化を軸に、聞いて終わりではなく、<strong
            class="text-emphasis">自分の仕事や行動に落とし込める内容</strong
          >として準備しています。
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
      <a
        class="academy-button academy-button--quiet"
        href={resolve(preQuestionHref)}
        onclick={() => handlePreQuestionClick('academy_fes_final_pre_question')}
      >
        聞きたいことを事前に送る
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
    object-position: center center;
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

  .text-emphasis {
    color: var(--fes-coral);
    font-weight: 900;
    background: linear-gradient(180deg, transparent 62%, rgba(213, 151, 73, 0.22) 0);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .intro-section__inner,
  .kitahara-section__inner,
  .diversity-section__inner,
  .app-section__inner,
  .booth-section__inner,
  .pre-question-section__inner,
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

  .kitahara-achievements {
    display: grid;
    gap: 12px;
    margin-top: 2px;
  }

  .kitahara-achievements__note {
    margin: 0;
    color: var(--fes-muted);
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1.6;
  }

  .kitahara-achievement-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .kitahara-achievement {
    display: grid;
    gap: 6px;
    padding: 14px;
    border: 1px solid rgba(30, 117, 105, 0.18);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.76);
  }

  .kitahara-achievement span {
    color: var(--fes-blue);
    font-size: 0.76rem;
    font-weight: 900;
  }

  .kitahara-achievement strong {
    color: var(--fes-ink);
    font-size: 0.95rem;
    line-height: 1.55;
  }

  .join-reason {
    display: grid;
    gap: 10px;
    margin-top: 4px;
    padding: 18px;
    border: 1px solid rgba(30, 117, 105, 0.18);
    border-left: 4px solid var(--fes-green);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.78);
  }

  .join-reason h3,
  .join-reason p {
    margin: 0;
  }

  .join-reason h3 {
    font-family: var(--font-heading);
    font-size: 1.12rem;
    line-height: 1.35;
    letter-spacing: 0;
  }

  .join-reason p {
    color: var(--fes-muted);
    line-height: 1.78;
  }

  .involvement-section,
  .gallery-section,
  .related-section {
    background: linear-gradient(180deg, rgba(238, 247, 244, 0.9), rgba(255, 253, 248, 1));
  }

  .diversity-section {
    background:
      linear-gradient(180deg, rgba(238, 247, 244, 0.95), rgba(255, 253, 248, 0.96)),
      url('/images/profile/academy-fes-2026/academy-group-hall.webp') center / cover;
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

  .diversity-panel {
    display: grid;
    gap: 18px;
    min-width: 0;
    padding: 24px;
    border: 1px solid var(--fes-line);
    border-radius: 8px;
    background: var(--fes-surface);
    box-shadow: 0 20px 36px rgba(38, 32, 24, 0.08);
  }

  .diversity-panel__label {
    margin: 0;
    color: var(--fes-blue);
    font-size: 0.86rem;
    font-weight: 900;
  }

  .diversity-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .diversity-tags span {
    display: inline-flex;
    align-items: center;
    min-height: 38px;
    padding: 8px 12px;
    border: 1px solid rgba(30, 117, 105, 0.22);
    border-radius: 999px;
    color: var(--fes-ink);
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.35;
    background: rgba(255, 255, 255, 0.74);
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
    background-image:
      linear-gradient(90deg, rgba(255, 253, 248, 0.96), rgba(247, 252, 250, 0.88)),
      url('/images/profile/academy-fes-2026/academy-group-hall.webp');
    background-position: center, center;
    background-size: auto, cover;
    background-attachment: scroll, fixed;
  }

  .booth-section__inner {
    align-items: center;
  }

  .robot-card {
    overflow: hidden;
    display: grid;
    margin: 0;
    border: 1px solid var(--fes-line);
    border-radius: 8px;
    background: white;
    box-shadow: 0 20px 36px rgba(38, 32, 24, 0.08);
  }

  .robot-card img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .robot-card figcaption {
    padding: 12px 14px;
    color: var(--fes-muted);
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.55;
  }

  .booth-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 22px;
  }

  .booth-item {
    display: grid;
    gap: 8px;
    padding: 20px;
  }

  .pre-question-section {
    background: linear-gradient(180deg, rgba(247, 252, 250, 0.96), rgba(255, 253, 248, 1));
  }

  .pre-question-section__inner {
    grid-template-columns: minmax(0, 760px);
    justify-content: center;
    text-align: center;
  }

  .pre-question-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-top: 4px;
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
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
    align-items: stretch;
    margin-top: 36px;
  }

  .gallery-item {
    display: grid;
    grid-template-rows: auto 1fr;
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
      url('/images/profile/academy-fes-2026/scenes-community-meal.webp') center / cover;
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
    .booth-list,
    .gallery-grid,
    .intro-section__inner,
    .kitahara-section__inner,
    .diversity-section__inner,
    .app-section__inner,
    .booth-section__inner,
    .pre-question-section__inner,
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

    .kitahara-achievement-grid {
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
      object-position: center center;
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

    .booth-section {
      background-attachment: scroll, scroll;
    }

    .involvement-grid,
    .gallery-grid {
      margin-top: 28px;
    }

    .involvement-card,
    .seminar-panel {
      padding: 18px;
    }

    .final-cta {
      padding-block: 66px;
    }
  }
</style>
