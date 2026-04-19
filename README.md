# corporate

TechGuide コーポレートサイト関連の資産をまとめているリポジトリです。  
現在は Amplify 上の新サイトを本番運用しつつ、旧サイト資産も退避しています。

## ディレクトリの役割

- [`techguide/`](./techguide/)  
  新コーポレートサイト本体です。SvelteKit で実装しており、現在の本番もこれです。
- [`design/TechGuide/`](./design/TechGuide/)  
  旧静的サイトのソースです。legacy / rollback 参照用として残しています。
- [`events/`](./events/)  
  旧 `/redirects?event=...` 実装の退避用ファイルです。
- [`.github/workflows/techguide-quality.yml`](./.github/workflows/techguide-quality.yml)  
  現行の GitHub Actions CI です。

## どこを編集するか

- 新サイトの改善・実装を進めるとき: [`techguide/`](./techguide/)
- 現在の `/redirects?event=...` の遷移先を変えるとき: [`techguide/static/redirects/index.html`](./techguide/static/redirects/index.html)
- 旧実装や rollback 用の参照をしたいとき: [`design/TechGuide/`](./design/TechGuide/), [`events/index.html`](./events/index.html)

## 現在の公開方式

現在の本番は、`techguide/` を AWS Amplify Hosting で公開する構成です。

- Amplify の build 設定: [amplify.yml](./amplify.yml)
- pnpm / monorepo 補助設定: [.npmrc](./.npmrc)
- SvelteKit の静的出力設定: [techguide/svelte.config.js](./techguide/svelte.config.js)
- prerender / trailing slash 設定: [techguide/src/routes/+layout.ts](./techguide/src/routes/+layout.ts)
- `/redirects` の現行実装: [techguide/static/redirects/index.html](./techguide/static/redirects/index.html)

日常運用では、`techguide/` を更新すれば本番に反映されます。旧 S3 配備 workflow は廃止しています。

## redirects の現状

`https://techguide.jp/redirects?event=<keyword>` は、現在 [techguide/static/redirects/index.html](./techguide/static/redirects/index.html) の `eventToUrl` マップで制御しています。

例:

- `https://techguide.jp/redirects?event=20230522_talk_seminar`

この導線を変更する場合は、`techguide/static/redirects/index.html` を更新してください。

## 今後の移行方針

現在の方針は以下です。

- 本番サイトは `techguide/` を正とする
- `/redirects?event=...` は `techguide/static/redirects/index.html` を正とする
- GitHub Actions は [`.github/workflows/techguide-quality.yml`](./.github/workflows/techguide-quality.yml) の CI のみを残す
- `design/TechGuide/` と `events/` は legacy / rollback 参照用として保持する

詳細な運用メモは [`techguide/README.md`](./techguide/README.md) を参照してください。
