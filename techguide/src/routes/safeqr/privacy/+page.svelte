<script lang="ts">
  import { resolve } from '$app/paths';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { companyProfile, navItems, pageSeo } from '$lib/data/site';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import '../safeqr.css';

  const supportHref = resolve('/safeqr/');
  const contactHref = resolve(
    '/contact/?category=other&subject=SafeQRのプライバシーについて&source_page=/safeqr/privacy/',
  );
  const structuredData = [
    buildWebPageJsonLd({ ...pageSeo.safeqrPrivacy, name: pageSeo.safeqrPrivacy.title }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'SafeQR サポート', path: pageSeo.safeqr.path },
      { name: 'プライバシーポリシー', path: pageSeo.safeqrPrivacy.path },
    ]),
  ].map((item) => serializeJsonLd(item));
</script>

<SeoHead {...pageSeo.safeqrPrivacy} jsonLd={structuredData} />
<Header items={navItems} />

<main class="safeqr-page safeqr-policy">
  <header class="safeqr-hero">
    <div class="container">
      <a class="safeqr-back" href={supportHref}>SafeQR サポート</a>
      <p class="safeqr-eyebrow">SafeQR</p>
      <h1>プライバシーポリシー</h1>
      <p class="safeqr-lead">アプリで扱う情報と、外部への通信について。</p>
      <p>最終更新日：2026年10月16日</p>
    </div>
  </header>
  <div class="container safeqr-policy__layout">
    <nav class="safeqr-toc" aria-label="このページの目次">
      <strong>目次</strong>
      <ol>
        <li><a href="#camera">カメラ</a></li>
        <li><a href="#local">端末内の履歴・設定</a></li>
        <li><a href="#google">任意の安全性照会</a></li>
        <li><a href="#website">リンク先への通信</a></li>
        <li><a href="#support">お問い合わせ・本サイト</a></li>
        <li><a href="#operator">運営者・窓口</a></li>
      </ol>
    </nav>
    <article class="safeqr-policy__content">
      <section class="safeqr-note">
        <h2>要点</h2>
        <ul>
          <li>カメラ画像・動画をアプリから保存・アップロードする機能はありません。</li>
          <li>履歴・設定は端末内に保存します。</li>
          <li>外部の安全性チェックは初期設定でOFFです。</li>
          <li>
            外部チェックやリンクの開封では、接続先への通信が発生します。完全な匿名性や安全性は保証しません。
          </li>
        </ul>
      </section>
      <section id="camera">
        <h2>1. カメラ</h2>
        <p>
          SafeQRは、QRコードに含まれるURLの読み取りにカメラを使用します。アプリはカメラ画像・動画を保存せず、開発者や安全性照会サービスへアップロードしません。カメラの使用許可は、iOS・iPadOSの設定から変更できます。
        </p>
      </section>
      <section id="local">
        <h2>2. 端末内の履歴・設定</h2>
        <p>
          読み取ったURL、取得できたページタイトル、日時、訪問回数、危険度を、端末内の履歴に最大50件保存します。履歴画面で個別・一括削除できます。外部チェックのON/OFFと安全確認の厳しさも端末内に保存します。
        </p>
        <p>
          履歴をTechGuideへ自動送信する機能はありません。OSのバックアップ等による扱いは、端末の設定・仕様に従います。アプリから位置情報や広告識別子を取得する処理、開発者独自の利用分析送信は実装していません。OSの診断送信は、端末の設定等に従います。
        </p>
      </section>
      <section id="google">
        <h2>3. Googleへの任意の安全性照会</h2>
        <p>
          設定で外部安全性チェックをONにすると、Google Safe
          Browsingを利用します。端末でURL候補を正規化してSHA-256を計算し、各ハッシュの先頭4バイトだけをGoogleへ送信します。URL全文や完全な32バイトのハッシュは送らず、応答との照合は端末内で行います。
        </p>
        <p>
          Googleには通常の通信に伴うIPアドレス等と、サービス認証用の情報も届きます。ハッシュの一部からURL候補が推測される可能性があるため、完全な匿名性は保証しません。Googleの処理には<a
            href="https://policies.google.com/privacy"
            rel="external noreferrer">Googleのプライバシーポリシー</a
          >が適用されます。
        </p>
        <p>
          OFFの間はこの安全性照会を行いません。照会結果のキャッシュは、Googleの有効期間等に従ってアプリのメモリ内だけに保持します。判定には、危険なサイトの見逃しや安全なサイトへの誤警告が起こる可能性があります。
        </p>
      </section>
      <section id="website">
        <h2>4. タイトル取得とリンク先の表示</h2>
        <p>
          ページタイトルを取得する場合や、アプリ内ブラウザーでリンクを開く場合は、対象サイトへURLを使って通信します。サイトにはURLのパス・クエリやIP等が届き、ブラウザー上ではサイト側のCookieやプライバシーポリシー等が関係します。
        </p>
        <p>
          注意・危険・外部チェック未確認では、開封を許可するまでタイトル取得やブラウザー表示を開始しません。外部照会待ちの間も対象サイトへ接続しません。拒否した場合は新たなタイトル取得を行いません。同じURLの過去の履歴がある場合は、既存のタイトルを保持することがあります。履歴からの再訪も再評価します。タイトル取得は元URLだけに行い、HTTPリダイレクトを追いません。
        </p>
        <p>
          URLのfragmentは通常HTTP要求に含まれませんが、サイト側のスクリプトが扱う場合があります。対象サイトでの入力やデータの扱いは、そのサイトの案内もご確認ください。
        </p>
      </section>
      <section id="support">
        <h2>5. お問い合わせと本Webサイト</h2>
        <p>
          問い合わせフォームへ入力いただいた情報は、お問い合わせへの対応・連絡のために利用します。QRやURLに含まれる個人情報など、相談に必要のない情報の送付はお控えください。
        </p>
        <p>
          本Webサイトはアプリとは別に、AWSのホスティングやGoogle
          Analyticsによるアクセス解析を利用します。アプリ内のQR内容・履歴を、このWebサイトのアクセス解析へ送信する仕組みはありません。各社の処理については<a
            href="https://aws.amazon.com/jp/privacy/"
            rel="external noreferrer">AWSのプライバシー</a
          >と<a href="https://policies.google.com/privacy" rel="external noreferrer"
            >Googleのプライバシーポリシー</a
          >をご確認ください。
        </p>
      </section>
      <section id="operator">
        <h2>6. 運営者・お問い合わせ</h2>
        <p>運営者：{companyProfile.name}</p>
        <p>
          お問い合わせ：<a href={contactHref}>問い合わせフォーム</a>
        </p>
        <p>使い方や動作については、<a href={supportHref}>SafeQR サポート</a>をご覧ください。</p>
      </section>
    </article>
  </div>
</main>

<Footer companyName={companyProfile.name} items={navItems} />
