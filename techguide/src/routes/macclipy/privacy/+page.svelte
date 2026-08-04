<script lang="ts">
  import { resolve } from '$app/paths';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';

  const productHref = resolve('/macclipy/');
  const contactHref = resolve('/contact/?category=macclipy&subject=MacClipyのプライバシーについて');
  const structuredData = [
    buildWebPageJsonLd({
      name: pageSeo.macclipyPrivacy.title,
      description: pageSeo.macclipyPrivacy.description,
      path: pageSeo.macclipyPrivacy.path,
      type: 'WebPage',
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'MacClipy', path: pageSeo.macclipy.path },
      { name: 'プライバシーポリシー', path: pageSeo.macclipyPrivacy.path },
    ]),
  ].map((item) => serializeJsonLd(item));
</script>

<SeoHead
  title={pageSeo.macclipyPrivacy.title}
  description={pageSeo.macclipyPrivacy.description}
  path={pageSeo.macclipyPrivacy.path}
  jsonLd={structuredData}
/>

<Header items={navItems} />

<main class="privacy-page">
  <header class="privacy-hero">
    <div class="container privacy-hero__inner">
      <p class="privacy-hero__eyebrow">MacClipy</p>
      <h1>プライバシーポリシー</h1>
      <p>MacClipyが取り扱うデータと、匿名の利用状況を送信する目的・範囲・停止方法を説明します。</p>
      <p class="privacy-hero__date">制定：2026年7月20日／最終更新：2026年8月4日</p>
    </div>
  </header>

  <div class="container privacy-layout">
    <nav class="privacy-toc" aria-label="このページの目次">
      <p>目次</p>
      <ol>
        <li><a href="#local-data">Mac内に保存するデータ</a></li>
        <li><a href="#analytics-data">送信する匿名データ</a></li>
        <li><a href="#purpose">利用目的</a></li>
        <li><a href="#opt-out">送信を停止する方法</a></li>
        <li><a href="#processors">外部サービス</a></li>
        <li><a href="#retention">保存期間</a></li>
        <li><a href="#contact">お問い合わせ</a></li>
      </ol>
    </nav>

    <article class="privacy-content">
      <section class="privacy-summary" aria-labelledby="summary-title">
        <h2 id="summary-title">要点</h2>
        <ul>
          <li>
            クリップボード本文、検索文字列、お気に入り本文、利用アプリ名、個人情報は外部へ送信しません。
          </li>
          <li>製品改善のため、個人を直接特定しない最小限の利用状況を初期設定で送信します。</li>
          <li>送信はMacClipyの設定からいつでも停止できます。</li>
          <li>広告目的の利用、他サービスをまたぐ追跡、データ販売は行いません。</li>
        </ul>
      </section>

      <section id="local-data">
        <h2>1. Mac内に保存するデータ</h2>
        <p>
          コピー履歴、お気に入り、フォルダ、除外アプリなど、MacClipyの主要な機能に必要なデータは利用者のMac内に保存します。これらの内容をTechGuideのサーバーやGoogle
          Analyticsへ送信することはありません。
        </p>
        <p>
          匿名計測に使うランダムなインストールIDはmacOSのキーチェーンに保存します。このIDには、氏名、メールアドレス、端末名、Apple
          IDなどを含めません。
        </p>
      </section>

      <section id="analytics-data">
        <h2>2. 送信する匿名データ</h2>
        <p>匿名の利用状況が有効な場合、次の情報だけを送信します。</p>
        <ul>
          <li>ランダムに生成したインストールID</li>
          <li>イベント種別（初回利用、1日1回の常駐確認、明示的な利用）</li>
          <li>
            機能別の日次利用件数（履歴・お気に入り画面の表示、項目の利用、検索、
            お気に入り管理）と、その集計日
          </li>
          <li>アプリのバージョンとビルド番号</li>
          <li>macOSのメジャーバージョン</li>
          <li>CPUアーキテクチャ（Apple SiliconまたはIntel）</li>
          <li>イベントの発生日時</li>
        </ul>
        <p>
          クリップボード本文、検索文字列、お気に入り本文、ファイル、ウインドウ名、利用中のアプリ名、氏名、メールアドレス、端末名、正確なOSバージョンは送信しません。機能別の件数には、入力内容や保存した内容を含めません。WebサイトのCookieとインストールIDを結び付けることもありません。
        </p>
      </section>

      <section id="purpose">
        <h2>3. 利用目的</h2>
        <p>送信されたデータは、次の目的に限って利用します。</p>
        <ul>
          <li>おおよそのインストール数、日次・週次・月次の利用状況を把握するため</li>
          <li>常駐している利用と、実際に操作された利用を区別して製品改善を判断するため</li>
          <li>各機能の日次の利用量を集計し、使いやすさや優先する改善を判断するため</li>
          <li>利用中のバージョンや環境を把握し、更新・互換性対応を判断するため</li>
          <li>不具合や利用率の変化を検知し、製品とサポートを改善するため</li>
        </ul>
      </section>

      <section id="opt-out">
        <h2>4. 送信を停止する方法</h2>
        <p>
          匿名の利用状況は初期設定で有効です。MacClipyの「設定」→「一般」→「匿名の利用状況を送信する」をオフにすると、常駐確認、明示的な利用、機能別の日次利用件数を含むすべての匿名イベントの送信を停止できます。オフにした状態でも、クリップボード履歴などの機能はそのまま利用できます。
        </p>
        <p>
          設定をオフにしても、Mac内のキーチェーンに保存されたインストールIDは自動では削除されません。ただし、オフの間はそのIDを読み出して送信しません。
        </p>
      </section>

      <section id="processors">
        <h2>5. 外部サービスとデータの取扱い</h2>
        <p>
          アプリはTechGuideが管理する受信APIへデータを送信し、受信APIからGoogle Analytics
          4へサーバー間で転送します。Googleへ利用者のIPアドレスを転送せず、広告関連の同意状態を「拒否」として送信します。
        </p>
        <p>
          受信APIはAWS Amplify
          Hosting上で動作します。通信の提供や障害対応のため、GoogleおよびAWSのインフラでデータが処理される場合があります。各社の取扱いは、
          <a href="https://policies.google.com/privacy" rel="external noreferrer"
            >Google プライバシーポリシー</a
          >
          および
          <a href="https://aws.amazon.com/jp/privacy/" rel="external noreferrer">AWS プライバシー</a
          >
          をご確認ください。
        </p>
        <p>当社は、この匿名データを販売せず、広告配信や他社サービスをまたぐ追跡に利用しません。</p>
      </section>

      <section id="retention">
        <h2>6. 保存期間と安全管理</h2>
        <p>
          Google
          Analytics上のイベント単位・ユーザー単位データは14か月で削除する設定とします。集計済みの統計値は、個々のインストールを識別しない形でそれより長く残る場合があります。
        </p>
        <p>
          受信APIは、送信されたイベントを独自のデータベースへ保存しません。不正な連続送信を抑えるため、接続元IPアドレスをプロセスのメモリ内だけで最長60秒間利用し、Google
          Analyticsへは転送しません。障害・不正利用の調査でホスティングのアクセスログを保管する場合は、30日以内に削除します。
        </p>
        <p>
          個人情報と結び付かないランダムIDであるため、当社は特定の利用者のデータを検索できません。今後の送信は、上記の設定をオフにすることで停止できます。
        </p>
      </section>

      <section>
        <h2>7. ポリシーの変更</h2>
        <p>
          送信項目や利用目的を変更する場合は、このページを更新し、重要な変更はアプリまたは配布ページでお知らせします。変更後の内容は、このページに表示した更新日から適用します。
        </p>
      </section>

      <section id="contact">
        <h2>8. お問い合わせ</h2>
        <p>
          本ポリシーやMacClipyのデータ取扱いについては、<a href={contactHref}
            >お問い合わせフォーム</a
          >からご連絡ください。
        </p>
      </section>

      <a class="back-link" href={productHref}>MacClipyのページへ戻る</a>
    </article>
  </div>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .privacy-page {
    color: var(--color-ink);
  }

  .privacy-hero {
    padding-block: clamp(64px, 9vw, 110px);
    border-bottom: 1px solid var(--color-line);
    background:
      radial-gradient(circle at 80% 20%, rgba(230, 184, 92, 0.2), transparent 34%),
      linear-gradient(145deg, #fffdf8 0%, #faf3e2 100%);
  }

  .privacy-hero__inner {
    max-width: 900px;
  }

  .privacy-hero__eyebrow {
    margin-bottom: 12px;
    color: var(--color-primary-deep);
    font-size: 0.84rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .privacy-hero h1 {
    font-family: var(--font-heading);
    font-size: clamp(2.25rem, 6vw, 4.5rem);
    line-height: 1.15;
    letter-spacing: -0.04em;
  }

  .privacy-hero h1 + p {
    max-width: 720px;
    margin-top: 24px;
    color: var(--color-ink-soft);
    font-size: clamp(1rem, 2vw, 1.15rem);
  }

  .privacy-hero__date {
    margin-top: 18px;
    color: var(--color-ink-soft);
    font-size: 0.88rem;
  }

  .privacy-layout {
    display: grid;
    grid-template-columns: minmax(180px, 250px) minmax(0, 760px);
    gap: clamp(44px, 7vw, 92px);
    justify-content: center;
    padding-block: clamp(56px, 8vw, 100px);
  }

  .privacy-toc {
    position: sticky;
    top: calc(var(--header-height) + 28px);
    align-self: start;
    padding: 24px;
    border: 1px solid var(--color-line);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: var(--shadow-soft);
  }

  .privacy-toc > p {
    font-weight: 800;
  }

  .privacy-toc ol {
    display: grid;
    gap: 10px;
    margin: 14px 0 0;
    padding-left: 1.25rem;
    color: var(--color-ink-soft);
    font-size: 0.86rem;
  }

  .privacy-toc a:hover,
  .privacy-content a:hover {
    color: var(--color-primary-deep);
  }

  .privacy-content {
    min-width: 0;
  }

  .privacy-content section {
    scroll-margin-top: calc(var(--header-height) + 28px);
  }

  .privacy-content section + section {
    margin-top: 54px;
  }

  .privacy-content h2 {
    margin-bottom: 18px;
    font-family: var(--font-heading);
    font-size: clamp(1.35rem, 3vw, 1.8rem);
    line-height: 1.4;
    letter-spacing: -0.02em;
  }

  .privacy-content p,
  .privacy-content li {
    color: var(--color-ink-soft);
  }

  .privacy-content p + p,
  .privacy-content p + ul,
  .privacy-content ul + p {
    margin-top: 14px;
  }

  .privacy-content ul {
    display: grid;
    gap: 8px;
    margin-bottom: 0;
    padding-left: 1.4rem;
  }

  .privacy-content a {
    color: #9b612b;
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: rgba(155, 97, 43, 0.35);
    text-underline-offset: 4px;
  }

  .privacy-summary {
    padding: clamp(24px, 4vw, 34px);
    border: 1px solid rgba(214, 151, 76, 0.22);
    border-radius: 24px;
    background: var(--color-surface-accent);
  }

  .privacy-summary h2 {
    font-size: 1.25rem;
  }

  .back-link {
    display: inline-flex;
    margin-top: 64px;
  }

  @media (max-width: 820px) {
    .privacy-layout {
      grid-template-columns: 1fr;
    }

    .privacy-toc {
      position: static;
    }
  }
</style>
