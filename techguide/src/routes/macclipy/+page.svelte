<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import './macclipy.css';

  const downloadHref = 'https://github.com/techguide-jp/mac-clipy/releases/latest';
  const sourceHref = 'https://github.com/techguide-jp/mac-clipy';
  const companyHref = resolve('/#company');
  const contactHref = resolve('/contact/?category=macclipy&subject=MacClipyについて');
  const images = {
    hero: '/images/macclipy/macclipy-web-hero-rich.webp',
    workflow: '/images/macclipy/macclipy-workflow-rich.webp',
    features: '/images/macclipy/macclipy-features-rich.webp',
    privacy: '/images/macclipy/macclipy-privacy-rich.webp',
    install: '/images/macclipy/macclipy-install-rich.webp',
  };

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

  function trackContact() {
    trackEvent('contact_cta_click', { placement: 'macclipy_support' });
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
    <div class="hero__media" aria-hidden="true">
      <img src={asset(images.hero)} alt="" width="1920" height="1080" fetchpriority="high" />
    </div>
    <div class="hero__ambient" aria-hidden="true"></div>

    <div class="container hero__inner">
      <img
        class="hero__badge"
        src={asset('/images/macclipy/app-icon.png')}
        alt=""
        width="1024"
        height="1024"
      />
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

      <figure class="section-visual section-visual--raised">
        <img
          src={asset(images.workflow)}
          alt="MacBook上でMacClipyのコピー履歴パネルを開いている操作イメージ"
          width="1600"
          height="1000"
          loading="lazy"
        />
      </figure>
    </div>
  </section>

  <section class="section features" aria-labelledby="features-title">
    <div class="container">
      <div class="features__heading">
        <p class="section-label">Features</p>
        <h2 id="features-title">毎日のコピーを、<span class="nowrap">もっと軽く。</span></h2>
      </div>

      <div class="features__layout">
        <figure class="section-visual">
          <img
            src={asset(images.features)}
            alt="検索、お気に入り、フォルダ整理、除外アプリを並べたMacClipyの機能イメージ"
            width="1600"
            height="1000"
            loading="lazy"
          />
        </figure>

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
    </div>
  </section>

  <section class="section privacy" aria-labelledby="privacy-title">
    <div class="container privacy__inner">
      <div class="privacy__copy">
        <p class="section-label">Local first</p>
        <h2 id="privacy-title">履歴はMac内に。<br />残したくないアプリは除外。</h2>
        <p>
          コピー履歴データはMac内に保存されます。パスワード管理アプリやプライベートな作業アプリは、履歴保存の対象外に設定できます。
        </p>
      </div>

      <figure class="section-visual">
        <img
          src={asset(images.privacy)}
          alt="Mac内保存と除外アプリ設定を表すMacClipyの安心機能イメージ"
          width="1600"
          height="1000"
          loading="lazy"
        />
      </figure>
    </div>
  </section>

  <section class="section install" aria-labelledby="install-title">
    <div class="container install__inner">
      <div>
        <p class="section-label">Get started</p>
        <h2 id="install-title">3ステップで使い始められます。</h2>
      </div>

      <figure class="section-visual install__visual">
        <img
          src={asset(images.install)}
          alt="MacClipyのDMGをApplicationsフォルダへドラッグしてインストールする画面イメージ"
          width="1600"
          height="1000"
          loading="lazy"
        />
      </figure>

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

  <section class="section support" aria-labelledby="support-title">
    <div class="container support__inner">
      <div class="support__copy">
        <p class="section-label">Operator &amp; support</p>
        <h2 id="support-title">運営・サポート</h2>
        <p>
          MacClipyは、{companyProfile.name}が開発・運営しています。不具合、使い方、機能へのご要望は専用フォームからお問い合わせいただけます。
        </p>
      </div>

      <div class="support__actions">
        <a class="support__company-link" href={companyHref}>運営者情報を見る</a>
        <a class="download-button" href={contactHref} onclick={trackContact}>
          MacClipyについて問い合わせる
        </a>
      </div>
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />
