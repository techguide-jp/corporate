# TechGuide 新コーポレートサイト

このディレクトリは、TechGuide の新コーポレートサイト本体です。  
SvelteKit で実装しています。

現在の本番は、この `techguide/` を AWS Amplify Hosting で配備しているサイトです。  
公開運用の全体像は [../README.md](../README.md) にまとめています。

## ローカル開発

このディレクトリで実行します。

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

`pnpm build` 後は、Amplify Hosting 向けのビルド成果物が `build/` に出力されます。

## ページ構成

- `/`  
  コーポレートトップ
- `/services`  
  支援内容の詳細ページ
- `/contact`  
  Resend を使った独自問い合わせフォーム

## 主な編集ポイント

### コンテンツ編集

主要文言、会社情報、外部リンク、サービス詳細、プロダクト、実績カードは [src/lib/data/site.ts](./src/lib/data/site.ts) に集約しています。

ここで管理している主な内容:

- ヘッダー/フッターのナビゲーション
- ヒーロー文言
- About の文言
- 支援領域カード
- `/services` の詳細データ
- プロダクト・実績カード
- 会社情報、住所、地図リンク

### 問い合わせフォーム

問い合わせフォームは [src/routes/contact/+page.svelte](./src/routes/contact/+page.svelte) と [src/routes/contact/+page.server.ts](./src/routes/contact/+page.server.ts) で管理しています。
送信処理は Resend を使い、管理者通知と問い合わせ者への自動返信を送ります。

採用ページからは `/contact?category=recruit` に遷移し、フォームカテゴリを「採用・パートナー応募」に初期選択します。

### 画像アセット

画像は [static/images/](./static/images/) 配下で管理しています。

- `static/images/hero/`  
  ヒーロー画像
- `static/images/about/`  
  代表写真
- `static/images/services/`  
  支援領域の画像
- `static/images/showcase/`  
  プロダクト・実績・関連サービスのカード画像

## redirects 運用

### 現状

`https://techguide.jp/redirects?event=<keyword>` の導線は、現在 [static/redirects/index.html](./static/redirects/index.html) で管理しています。

実体:

- live の `eventToUrl` マップ: [static/redirects/index.html](./static/redirects/index.html)
- legacy の旧実装: [../events/index.html](../events/index.html)
- URL 仕様: `https://techguide.jp/redirects?event=<keyword>`
- 例: `https://techguide.jp/redirects?event=20230522_talk_seminar`

遷移先を追加・変更する場合は、`static/redirects/index.html` の `eventToUrl` を更新してください。

### 今後の方針

`/redirects?event=...` は今後も同一ドメインで維持します。  
legacy の [../events/index.html](../events/index.html) は rollback や参照用として残していますが、live 配備先ではありません。

## 旧 URL 互換

旧サイトでは、少なくとも以下のパスが存在していました。

- `/contact/index.html`
- `/examples.html`
- `/event.html`

新サイト公開時は、ホスティング側の redirect / rewrite 設定で互換維持する前提です。  
そのため、新サイト移行時にはページ本体の差し替えだけでなく、旧 URL の転送設定も合わせて確認してください。

## デプロイ方針

### 現状

- 本番公開は AWS Amplify Hosting です
- SvelteKit 側の adapter は [svelte.config.js](./svelte.config.js) で `amplify-adapter` を使っています
- ルートの [src/routes/+layout.ts](./src/routes/+layout.ts) で `prerender = true` と `trailingSlash = 'always'` を固定し、`/contact` はフォーム action のため `prerender = false` にしています
- repo root の [../amplify.yml](../amplify.yml) と [../.npmrc](../.npmrc) を使って Amplify Hosting の monorepo build を構成しています
- GitHub Actions は [../.github/workflows/techguide-quality.yml](../.github/workflows/techguide-quality.yml) で `pnpm validate` を実行します

### 運用メモ

- `/redirects` は同一ドメインで維持する
- 旧 URL の redirect / rewrite は Amplify コンソール側で維持する
- 日常運用では `techguide/` を更新すれば本番と `redirects` に反映される
- GA4 は `PUBLIC_GA_MEASUREMENT_ID` を設定し、`techguide.jp` / `www.techguide.jp` の本番ホストでのみ有効化する
- Resend を使う問い合わせフォームには `RESEND_API_KEY`、`RESEND_FROM_NAME`、`RESEND_FROM_EMAIL`、`CONTACT_TO_EMAIL`、`PUBLIC_TURNSTILE_SITE_KEY`、`TURNSTILE_SECRET_KEY` が必要
- `PUBLIC_*` は SvelteKit の build 時に公開bundleへ埋め込むため、Amplifyで値を変えたら再デプロイが必要
- `RESEND_API_KEY` と `TURNSTILE_SECRET_KEY` は公開bundleへ入れず、AmplifyのシークレットまたはSSR runtime環境変数からサーバー側だけで読む
- AWS は SvelteKit 用 adapter を自社保守していないため、Amplify のSSR対応はコミュニティ adapter の `amplify-adapter` に依存しています
- `design/TechGuide/` と `events/` は legacy / rollback 参照用として残している

### Amplify ログ確認

AWS CLI の認証済み環境で、Amplify Hosting compute logs の CloudWatch Logs を確認できます。

```bash
pnpm logs:groups
pnpm logs:tail -- /aws/amplify/<app-id>
LOG_STREAM_PREFIX=main pnpm logs:tail -- /aws/amplify/<app-id>
```

`.env` に `AMPLIFY_LOG_GROUP_NAME` を設定している場合は、ロググループ名の指定を省略できます。

```bash
pnpm logs:tail
```

必要に応じて `LOG_SINCE=30m`、`LOG_FILTER_PATTERN=ERROR`、`AMPLIFY_AWS_REGION=ap-northeast-1` を指定してください。通常のAccess logsではなく、SSR/API実行ログの確認用途です。

Amplify Console の `Monitoring > Hosting compute logs` に `log-group:/aws/amplify/<app-id>:logStreamNameFilter:main` のように表示される場合、ロググループ名は `/aws/amplify/<app-id>`、ログストリームの絞り込みが `main` です。この文字列はそのまま `pnpm logs:tail -- 'log-group:/aws/amplify/<app-id>:logStreamNameFilter:main'` に渡すこともできます。

`pnpm logs:groups` でロググループが見つからない場合は、Amplify Console の `Monitoring > Hosting compute logs` に表示されるロググループ名とリージョンを確認してください。SSR app の初回デプロイ前、該当ブランチでSSRページへのアクセスがない場合、またはカスタムService roleにCloudWatch Logs権限がない場合もロググループが見つからないことがあります。

## GA4 管理スクリプト

GA4 の管理作業は、公式クライアント `@google-analytics/admin` を使う [scripts/ga-admin.mjs](./scripts/ga-admin.mjs) に寄せています。

用途:

- `contact_page_view` の Key event 化
- `placement`, `section`, `link_label`, `destination_host` の custom dimension 作成・更新

事前準備:

- Google Analytics Admin API を有効化する
- 対象プロパティに対して、サービスアカウントへ Editor 以上の権限を付ける
- [`.env.example`](./.env.example) をコピーして `.env` を作成する
- `.env` に `GOOGLE_APPLICATION_CREDENTIALS` と `GA4_PROPERTY_ID` を設定する

例:

```bash
cp .env.example .env
```

`.env` の例:

```dotenv
PUBLIC_GA_MEASUREMENT_ID=G-MS3VSF32XF
GA4_PROPERTY_ID=123456789
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account.json
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_NAME=TechGuide合同会社
RESEND_FROM_EMAIL=noreply@techguide.jp
CONTACT_TO_EMAIL=y.takahashi@techguide.jp
PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxxxxxxxx
AMPLIFY_AWS_REGION=ap-northeast-1
AMPLIFY_LOG_GROUP_NAME=/aws/amplify/your-app-id
LOG_STREAM_PREFIX=main
```

利用コマンド:

```bash
pnpm ga:list
pnpm ga:sync
pnpm ga:sync:dry
```

`ga:sync` は冪等に動く前提です。  
Realtime / DebugView の確認、Internal traffic / Developer traffic filter、Unwanted referrals などの UI 確認までは自動化していません。

## 補足

旧実装の参照や rollback の検討が必要な場合は、`design/TechGuide/` と `events/` を確認してください。通常の公開運用では `techguide/` を正とします。
