# TechGuide 新コーポレートサイト

このディレクトリは、TechGuide の新コーポレートサイト本体です。  
SvelteKit で実装しています。

注意点として、**現時点ではまだこの `techguide/` が本番公開されているわけではありません。**  
現行本番は旧 `design/TechGuide/` が S3 配備されており、公開運用の全体像は [../README.md](../README.md) にまとめています。

ただし、このディレクトリはすでに **静的書き出し + Amplify 配備前提の設定** に切り替え済みです。

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

`https://techguide.jp/redirects?event=<keyword>` の導線は、**live では今も** [../events/index.html](../events/index.html) で管理しています。

実体:

- live の `eventToUrl` マップ: [../events/index.html](../events/index.html)
- 新サイト移行後の `eventToUrl` マップ: [static/redirects/index.html](./static/redirects/index.html)
- URL 仕様: `https://techguide.jp/redirects?event=<keyword>`
- 例: `https://techguide.jp/redirects?event=20230522_talk_seminar`

遷移先を追加・変更する場合は、**本番切替前は** `events/index.html` の `eventToUrl` を更新してください。  
Amplify 切替後は、`static/redirects/index.html` を更新対象にします。

### 今後の方針

新サイトを本番化する際は、`/redirects?event=...` を同一ドメインで維持する前提です。  
そのため、移行先として `techguide/static/redirects/index.html` はすでに追加済みです。

重要なのは、**現時点では `techguide/` を更新しても live の `/redirects` には反映されない** という点です。  
この挙動が切り替わるのは、Amplify 側に custom domain を向けた後です。

## 旧 URL 互換

旧サイトでは、少なくとも以下のパスが存在していました。

- `/contact/index.html`
- `/examples.html`
- `/event.html`

新サイト公開時は、ホスティング側の redirect / rewrite 設定で互換維持する前提です。  
そのため、新サイト移行時にはページ本体の差し替えだけでなく、旧 URL の転送設定も合わせて確認してください。

## デプロイ方針

### 現状

- 本番公開はまだ旧方式です
- [../.github/workflows/main.yml](../.github/workflows/main.yml) が `design/TechGuide` を S3 配備しています
- `techguide/` は本番未切替です
- SvelteKit 側の adapter は [svelte.config.js](./svelte.config.js) で `adapter-static` に切り替え済みです
- ルートの [src/routes/+layout.ts](./src/routes/+layout.ts) で `prerender = true` と `trailingSlash = 'always'` を固定しています
- repo root の [../amplify.yml](../amplify.yml) と [../.npmrc](../.npmrc) を使って Amplify Hosting の monorepo build を構成する前提です

### 今後の予定

- `AWS Amplify Hosting` で Git デプロイする
- `/redirects` は同一ドメインで維持する
- Amplify の default domain 上で `/`, `/services`, `/contact`, `/redirects?event=...` を確認する
- `techguide.jp` を Amplify の custom domain に切り替える
- 旧 URL の redirect / rewrite を Amplify コンソール側で設定する
- GitHub Actions は、cutover 完了後に「S3 配備」ではなく `techguide` 向け CI only に切り替える

### Amplify コンソールで手動設定するもの

repo 内だけでは完結しないものとして、以下は Amplify コンソール側で設定します。

- GitHub 連携
- production branch を `main` に設定
- PR preview を有効化
- custom domain に `techguide.jp` を設定
- redirect / rewrite ルールを設定

主に必要な redirect / rewrite:

- `/index.html` -> `/`
- `/contact/index.html` -> `/contact/`
- `/examples.html` -> `/#works`
- `/event.html` -> `/`

## 補足

公開中のサイトに今すぐ反映が必要な修正であれば、`techguide/` だけでなく、旧 `design/TechGuide/` や `events/` にも修正が必要かを必ず確認してください。
