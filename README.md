# corporate

TechGuide コーポレートサイト関連の資産をまとめているリポジトリです。  
現在は旧サイトと新サイトが同居しています。

## ディレクトリの役割

- [`techguide/`](./techguide/)  
  新コーポレートサイト本体です。SvelteKit で実装しています。
- [`design/TechGuide/`](./design/TechGuide/)  
  旧静的サイトのソースです。現時点の本番公開はこちらが基準です。
- [`events/`](./events/)  
  旧 `/redirects?event=...` 用のリダイレクトページです。
- [`.github/workflows/main.yml`](./.github/workflows/main.yml)  
  現行の本番配備 workflow です。

## どこを編集するか

- 新サイトの改善・実装を進めるとき: [`techguide/`](./techguide/)
- 旧公開サイトに今すぐ反映したい修正を入れるとき: [`design/TechGuide/`](./design/TechGuide/)
- 現在の `/redirects?event=...` の遷移先を変えるとき: [`events/index.html`](./events/index.html)

## 現在の公開方式

現時点では、`main` ブランチへの push をトリガーに、[`.github/workflows/main.yml`](./.github/workflows/main.yml) が以下を S3 に同期しています。

- `design/TechGuide` -> `s3://techguide.jp`
- `events` -> `s3://techguide.jp/redirects`

つまり、**今の公開サイトはまだ `techguide/` ではなく、旧 `design/TechGuide/` が本番**です。  
`techguide/` の変更だけでは、現行本番には反映されません。

一方で、新サイト側の静的化と Amplify 用設定は repo に追加済みです。

- [amplify.yml](./amplify.yml)
- [.npmrc](./.npmrc)
- [techguide/svelte.config.js](./techguide/svelte.config.js)
- [techguide/src/routes/+layout.ts](./techguide/src/routes/+layout.ts)
- [techguide/static/redirects/index.html](./techguide/static/redirects/index.html)

つまり現在は、**配備設定は新方式に寄せ始めているが、本番の配信経路だけはまだ旧 S3 のまま**という段階です。

## redirects の現状

`https://techguide.jp/redirects?event=<keyword>` は、**現在の live では** [events/index.html](./events/index.html) の `eventToUrl` マップで制御しています。

例:

- `https://techguide.jp/redirects?event=20230522_talk_seminar`

この導線を変更する場合は、**本番切替前は** `events/index.html` を更新してください。  
現行運用では、その変更が `main` push で `/redirects` に配備されます。

なお、新サイト側にも将来の移行先として [techguide/static/redirects/index.html](./techguide/static/redirects/index.html) を追加しています。  
切替完了後は、こちらを正とする前提です。

## 今後の移行方針

新サイト公開時は、`techguide/` を `adapter-static + AWS Amplify Hosting` で配備する前提です。  
このための repo 内設定は、すでに入っています。

方針としては以下です。

- `techguide/` を新しい本番サイトにする
- `/redirects?event=...` は同一ドメインで維持する
- `redirects` のロジックは切替後 `techguide/static/redirects/index.html` 側を正にする
- GitHub Actions は、Amplify 本番確認が終わるまで現行 S3 配備を維持し、その後 `techguide` 向け CI に寄せる
- Amplify コンソール側では custom domain、PR preview、redirect / rewrite を別途設定する

詳細な運用メモは [`techguide/README.md`](./techguide/README.md) を参照してください。
