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

`pnpm build` 後は、静的成果物が `build/` に出力されます。

## ページ構成

- `/`  
  コーポレートトップ
- `/services`  
  支援内容の詳細ページ
- `/contact`  
  Tayori の問い合わせフォームを iframe で表示するページ

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

問い合わせフォームの埋め込み先は [src/routes/contact/+page.svelte](./src/routes/contact/+page.svelte) の `contactFormUrl` で管理しています。  
Tayori のフォーム差し替えが必要な場合はここを更新してください。

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
- SvelteKit 側の adapter は [svelte.config.js](./svelte.config.js) で `adapter-static` に切り替え済みです
- ルートの [src/routes/+layout.ts](./src/routes/+layout.ts) で `prerender = true` と `trailingSlash = 'always'` を固定しています
- repo root の [../amplify.yml](../amplify.yml) と [../.npmrc](../.npmrc) を使って Amplify Hosting の monorepo build を構成しています
- GitHub Actions は [../.github/workflows/techguide-quality.yml](../.github/workflows/techguide-quality.yml) で `pnpm validate` を実行します

### 運用メモ

- `/redirects` は同一ドメインで維持する
- 旧 URL の redirect / rewrite は Amplify コンソール側で維持する
- 日常運用では `techguide/` を更新すれば本番と `redirects` に反映される
- GA4 は `PUBLIC_GA_MEASUREMENT_ID` を設定し、`techguide.jp` / `www.techguide.jp` の本番ホストでのみ有効化する
- `design/TechGuide/` と `events/` は legacy / rollback 参照用として残している

## 補足

旧実装の参照や rollback の検討が必要な場合は、`design/TechGuide/` と `events/` を確認してください。通常の公開運用では `techguide/` を正とします。
