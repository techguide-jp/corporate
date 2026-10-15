<script lang="ts">
  import { resolve } from '$app/paths';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { companyProfile, contactInfo, navItems, pageSeo } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import './safeqr.css';

  const privacyHref = resolve('/safeqr/privacy/');
  const supportHref = `mailto:${contactInfo.email}?subject=${encodeURIComponent('SafeQRについて')}`;
  const structuredData = [
    buildWebPageJsonLd({ ...pageSeo.safeqr, name: pageSeo.safeqr.title, type: 'ContactPage' }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'SafeQR サポート', path: pageSeo.safeqr.path },
    ]),
  ].map((item) => serializeJsonLd(item));
</script>

<SeoHead {...pageSeo.safeqr} jsonLd={structuredData} />
<Header items={navItems} />

<main class="safeqr-page">
  <header class="safeqr-hero">
    <div class="container safeqr-hero__inner">
      <img
        class="safeqr-icon"
        src="/images/safeqr/app-icon-small.png"
        width="104"
        height="104"
        alt="SafeQRのアプリアイコン"
      />
      <div>
        <p class="safeqr-eyebrow">iPhone・iPad向け QRリーダー</p>
        <h1>SafeQR サポート</h1>
        <p class="safeqr-lead">QRのリンクを開く前に、確認を。</p>
        <p>使い方、プライバシー、動作についてのお問い合わせをご案内します。</p>
        <span class="safeqr-status">App Storeでの配布は準備中です</span>
      </div>
    </div>
  </header>

  <div class="container safeqr-body">
    <section class="safeqr-overview" aria-labelledby="about-title">
      <div>
        <p class="safeqr-eyebrow">SafeQRについて</p>
        <h2 id="about-title">リンクを確認してから、開くか選べます。</h2>
        <p>
          カメラでQRコードのURLを読み取り、端末内のルールや任意の外部情報で、危険な可能性を表示します。履歴は端末内に最大50件保存できます。
        </p>
        <p>iOS・iPadOS 18.5以降に対応。アプリの表示言語は日本語です。</p>
      </div>
      <aside class="safeqr-note" aria-label="判定について">
        <strong>判定は安全性を保証しません</strong>
        <p>
          危険なサイトの見逃しや、安全なサイトへの誤警告が起こることがあります。リンク先と入力する情報を、ご自身でも確認してください。
        </p>
      </aside>
    </section>

    <section aria-labelledby="start-title">
      <p class="safeqr-eyebrow">使い方</p>
      <h2 id="start-title">リンクを開くまでの3ステップ</h2>
      <ol class="safeqr-steps">
        <li>
          <span>01</span>
          <h3>カメラで読み取る</h3>
          <p>カメラの使用を許可し、QRコードに向けます。</p>
        </li>
        <li>
          <span>02</span>
          <h3>表示を確認する</h3>
          <p>注意・危険な可能性や、外部チェックが未確認の場合は確認画面が表示されます。</p>
        </li>
        <li>
          <span>03</span>
          <h3>開くか選ぶ</h3>
          <p>
            不安がある場合は「やめる」「ブロックする」で戻れます。続行するとリンク先へ接続します。
          </p>
        </li>
      </ol>
    </section>

    <section class="safeqr-faq" aria-labelledby="faq-title">
      <p class="safeqr-eyebrow">よくある質問</p>
      <h2 id="faq-title">困ったときは</h2>
      <details>
        <summary>カメラが映りません</summary>
        <p>
          iPhone・iPadの「設定」→「アプリ」→「SafeQR」で、カメラの使用を許可してください。許可していない状態でも、アプリ内の履歴・設定は開けます。
        </p>
      </details>
      <details>
        <summary>「外部チェックは未確認です」と表示されます</summary>
        <p>
          通信状況やサービスの利用状況などにより、外部の安全性情報を確認できていない状態です。安全が確認できたという意味ではありません。不安がある場合は開かずに戻ってください。
        </p>
      </details>
      <details>
        <summary>外部の安全性チェックは必須ですか？</summary>
        <p>
          任意の機能で、初期設定はOFFです。アプリの設定から切り替えられます。ONにした場合の通信は、<a
            href={privacyHref}>プライバシーポリシー</a
          >をご確認ください。
        </p>
      </details>
      <details>
        <summary>履歴は削除できますか？</summary>
        <p>
          履歴画面で個別に削除できるほか、全件削除にも対応しています。履歴は端末内に保存され、開発者へ自動送信する機能はありません。
        </p>
      </details>
    </section>

    <section class="safeqr-contact" aria-labelledby="contact-title">
      <div>
        <p class="safeqr-eyebrow">お問い合わせ</p>
        <h2 id="contact-title">使い方・動作についてのご相談</h2>
        <p>
          状況とアプリ・OSのバージョンをお知らせください。URLやQRの画像に個人情報が含まれる場合は、その内容を送らずにご相談ください。
        </p>
      </div>
      <div class="safeqr-contact__links">
        <a class="safeqr-button" href={supportHref}>メールで問い合わせる</a>
        <p>{contactInfo.email}</p>
        <a href={privacyHref}>プライバシーポリシー</a><small>運営：{companyProfile.name}</small>
      </div>
    </section>
  </div>
</main>

<Footer companyName={companyProfile.name} items={navItems} />
