# 問い合わせ導線・計測の改善運用

2026-09-06実装。公開日とGA4での初回観測日は別に確認する。

## 計測の正本と範囲

- 本番Webは `techguide.jp` と `www.techguide.jp`。同じプロパティのMacClipyアプリ利用は別集計する。
- PVは `afterNavigate` から正規化したURLごとに送信する。初期化前のカスタムイベントも捨てない。
- `contact_page_view` は閲覧。成果はサーバー受付票がある `generate_lead` のみ。受付票ID自体、氏名、メール、本文はGA4へ送らない。
- サーバーの入力検証、Turnstile、通知先への受付処理は維持する。件名省略時はカテゴリ名を採用する。

## フォームの段階

| イベント            | 条件                                   | 主な分類                                                             |
| ------------------- | -------------------------------------- | -------------------------------------------------------------------- |
| form_view           | 入力フォームが画面に入った時に1回      | form_name, inquiry_type                                              |
| form_start          | 最初の入力または変更に1回              | form_name, inquiry_type                                              |
| form_submit_attempt | ネイティブ検証または送信開始           | form_name, inquiry_type                                              |
| form_submit_error   | 入力検証・迷惑投稿対策・受付処理の失敗 | error_kind                                                           |
| generate_lead       | 正常受付票ごとに1回                    | form_name, inquiry_type, contact_category, landing_page, source_page |
| service_view        | 支援項目の表示                         | service_id                                                           |
| service_cta_click   | 支援項目の相談導線                     | service_id, placement                                                |

`error_kind`: validation / turnstile_load / turnstile / server / request。requestはブラウザが受け取った一般的なリクエスト失敗であり、ネットワーク障害と断定しない。

カテゴリに採用・MacClipyサポート・営業提案も含む。営業相談の成果だけを見る場合は対象カテゴリを固定し、問い合わせ総数を商談数にしない。

## 登録と検証

- `pnpm ga:sync:dry` で不足を確認し、権限がある環境で `pnpm ga:sync`。デフォルトkey eventはgenerate_leadのみ。既存MacClipy定義を維持する。
- API定義の追加後は反映待ちがあり、過去に未収集の値を復元できるとは扱わない。
- `pnpm check`、`pnpm lint`、`pnpm test`、`pnpm build`。
- ブラウザ検証はGA送信と外部通知を遮断し、初期表示・内部遷移のPV、フォーム表示/開始、入力エラー、受付票の重複排除を確認する。本番への合成問い合わせは送らない。

## 4〜8週間の評価

1. 公開後の完了日から週次で、対象ホストと営業カテゴリを固定して母数・エラー件数を確認する。
2. トップの支援内容、目的別CTA、フォームへの近道、件名任意化を一つの導線改善として評価する。個々の変更の因果効果は分離できない。
3. 有効相談、面談成立、提案、受注は業務側の正本を使う。GA4のイベント回数比をユーザー単位の転換率にしない。
4. 本番Webの平均セッション時間と前景表示時間を併記し、MacClipy DAUやダウンロード導線と混ぜない。
5. 小さい母数でA/Bテストの勝敗を断定しない。操作観察と相談内容の定性的な確認は別途、本人の同意・公開範囲に従って行う。
