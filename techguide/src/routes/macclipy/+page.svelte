<script lang="ts">
  import { asset } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import './macclipy.css';

  const downloadHref = 'https://github.com/techguide-jp/mac-clipy/releases/latest';
  const sourceHref = 'https://github.com/techguide-jp/mac-clipy';

  const features = [
    {
      number: '01',
      title: 'コピー履歴をすぐ検索',
      description:
        'Shift + Command + Vで履歴を開き、文字を入力するだけで過去のコピーを絞り込めます。',
    },
    {
      number: '02',
      title: 'よく使う内容をお気に入りに',
      description:
        '定型文やURLをお気に入りとフォルダで整理。Option + Command + Vから直接呼び出せます。',
    },
    {
      number: '03',
      title: '保存したくないアプリを除外',
      description:
        'パスワード管理アプリなどを履歴保存の対象外にできます。履歴データはMac内に保存されます。',
    },
  ];

  const steps = [
    'DMGをダウンロードして開く',
    'MacClipyをApplicationsへドラッグ',
    '起動後、メニューバーのクリップボードアイコンから使い始める',
  ];

  const macClipyStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.macclipy.title,
      description: pageSeo.macclipy.description,
      path: pageSeo.macclipy.path,
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'MacClipy', path: pageSeo.macclipy.path },
    ]),
  ].map((item) => serializeJsonLd(item));

  function trackDownload(placement: string) {
    trackEvent('outbound_link_click', {
      section: placement,
      link_label: 'MacClipyを無料でダウンロード',
      destination_host: 'github.com',
    });
  }
</script>

<SeoHead
  title={pageSeo.macclipy.title}
  description={pageSeo.macclipy.description}
  path={pageSeo.macclipy.path}
  image={pageSeo.macclipy.image}
  imageAlt={pageSeo.macclipy.imageAlt}
  jsonLd={macClipyStructuredData}
  preloadImage
/>

<Header items={navItems} />

<main class="macclipy-page">
  <section class="hero">
    <img
      class="hero__icon"
      src={asset('/images/macclipy/app-icon.png')}
      alt=""
      width="1024"
      height="1024"
    />
    <div class="hero__ambient" aria-hidden="true"></div>

    <div class="container hero__inner">
      <p class="hero__eyebrow">TechGuide Product</p>
      <h1>MacClipy</h1>
      <p class="hero__lead">コピーしたものを、<br />必要な瞬間にすぐ取り出す。</p>
      <p class="hero__description">
        MacClipyは、コピー履歴をメニューバーやショートカットから呼び出せる<br
          class="desktop-only"
        />macOS用クリップボード管理アプリです。
      </p>

      <div class="hero__actions">
        <a class="download-button" href={downloadHref} onclick={() => trackDownload('hero')}>
          MacClipyを無料でダウンロード
        </a>
        <a class="source-link" href={sourceHref} rel="external noreferrer">GitHubで詳細を見る</a>
      </div>

      <ul class="hero__facts" aria-label="動作環境と配布情報">
        <li>macOS 14以降</li>
        <li>Apple Silicon・Intel対応</li>
        <li>署名・公証済み</li>
      </ul>
    </div>
  </section>

  <section class="section workflow" aria-labelledby="workflow-title">
    <div class="container workflow__inner">
      <div class="workflow__copy">
        <p class="section-label">Fast access</p>
        <h2 id="workflow-title">
          キーボードから、<br /><span class="nowrap">コピー履歴へ一直線。</span>
        </h2>
        <p>
          アプリを探して開く必要はありません。いつもの作業中にショートカットを押すと、マウス位置に履歴が現れます。
        </p>
      </div>

      <div class="app-preview" aria-label="MacClipyの操作イメージ">
        <div class="app-preview__bar">
          <span class="window-dot window-dot--red"></span>
          <span class="window-dot window-dot--yellow"></span>
          <span class="window-dot window-dot--green"></span>
          <span class="app-preview__title">MacClipy</span>
          <span class="key-hint">⇧⌘V</span>
        </div>
        <div class="app-preview__search">
          <span aria-hidden="true">⌕</span>
          <span>履歴を検索</span>
        </div>
        <div class="app-preview__tabs" aria-hidden="true">
          <span class="app-preview__tab app-preview__tab--active">すべて</span>
          <span class="app-preview__tab">お気に入り</span>
        </div>
        <ul class="history-list">
          <li class="history-list__item history-list__item--active">
            <span class="history-list__content">次回のミーティングは金曜日の10時からです。</span>
            <span class="history-list__meta">たった今</span>
          </li>
          <li class="history-list__item">
            <span class="history-list__content">https://techguide.jp/</span>
            <span class="history-list__meta">2分前</span>
          </li>
          <li class="history-list__item">
            <span class="history-list__content">確認後、改めてご連絡します。</span>
            <span class="history-list__meta">8分前</span>
          </li>
        </ul>
        <div class="app-preview__footer">
          <span>↑↓ 選択</span>
          <span>Return 貼り付け</span>
          <span>⌘D お気に入り</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section features" aria-labelledby="features-title">
    <div class="container">
      <div class="features__heading">
        <p class="section-label">Features</p>
        <h2 id="features-title">毎日のコピーを、<span class="nowrap">もっと軽く。</span></h2>
      </div>

      <div class="features__grid">
        {#each features as feature (feature.number)}
          <article class="feature">
            <span class="feature__number">{feature.number}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section install" aria-labelledby="install-title">
    <div class="container install__inner">
      <div>
        <p class="section-label">Get started</p>
        <h2 id="install-title">3ステップで使い始められます。</h2>
      </div>

      <ol class="install__steps">
        {#each steps as step, index (step)}
          <li>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{step}</p>
          </li>
        {/each}
      </ol>

      <div class="install__download">
        <a class="download-button" href={downloadHref} onclick={() => trackDownload('install')}>
          最新版をダウンロード
        </a>
        <p>Developer ID署名・Apple公証済みのDMGをGitHub Releasesから配布しています。</p>
      </div>
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />
