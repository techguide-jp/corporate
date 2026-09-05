# 地域SEO・受託相談の計測と公開後確認

対象: #45（茅ヶ崎の内容・相談導線）、#51（発見導線・登録確認）。

## ページの役割

| URL                                | 役割                                                                          |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| `/chigasaki/`                      | Web・IT相談の入口。課題から専門ページを案内                                   |
| `/chigasaki/homepage/`             | 「茅ヶ崎 ホームページ制作」「茅ヶ崎 Web制作」。制作範囲・実績・見積条件・相談 |
| `/chigasaki/system-development/`   | 予約・申込・管理などの業務に合わせたシステム開発                              |
| `/chigasaki/business-improvement/` | 転記・集計・定型連絡の改善、既存ツール・AI活用                                |

トップと支援内容は `RegionalSupportSection.svelte` を共有する。地域URLは `chigasaki/paths.ts`、案内文は `chigasaki/shared.ts`、公開実績と担当範囲は `data/works.ts` を正とする。トップ・フッター・地域ページのリンクは通常の `a href` としてSSRで出力する。

公開実績に茅ヶ崎の顧客であるとの表示や、未確認の成果数値を加えない。用途ページ #52（イベント）、#53（予約）、#54（会員）の詳細リンクは、そのページの公開を確認してから追加する。

## 登録状態・検索の初期値

確認日: **2026-09-05**。プロパティ: `sc-domain:techguide.jp`。Google URL Inspection APIの結果。

| URL                                | 登録状態                     | 最終クロール（UTC） | 初回公開の基準日     | 改善の本番公開日 |
| ---------------------------------- | ---------------------------- | ------------------- | -------------------- | ---------------- |
| `/chigasaki/`                      | Submitted and indexed / PASS | 2026-09-05 06:03:32 | 2026-08-28（PR #46） | 未公開           |
| `/chigasaki/homepage/`             | Submitted and indexed / PASS | 2026-09-05 06:05:33 | 2026-08-28（PR #46） | 未公開           |
| `/chigasaki/system-development/`   | Submitted and indexed / PASS | 2026-09-05 06:05:33 | 2026-08-28（PR #46） | 未公開           |
| `/chigasaki/business-improvement/` | Submitted and indexed / PASS | 2026-09-05 06:07:40 | 2026-08-28（PR #46） | 未公開           |

4 URLとも `INDEXING_ALLOWED`。登録リクエストは2026-09-05に実施済み。正確なクリック時刻の保存記録はなく、クロール時刻で代用しない。登録済みのため同じリクエストを繰り返さない。初回公開の基準日はマージ日であり、デプロイの正確な完了時刻は配信記録で確認する。

| 指標                    | 取得条件                                                            | 初期値・状態                                                                   |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| GSC query × page        | 2026-08-28〜2026-09-02、web、pageに`/chigasaki/`を含む、上限1,000行 | API応答0行。確定データは9月2日まで。検索需要ゼロ・将来の露出ゼロとは解釈しない |
| 地域ページのGA4イベント | 同期間、pagePathに`/chigasaki/`を含む                               | GSC WizardのGA4接続権限未設定（`no_scope`）で未取得。0件と記録しない           |
| `generate_lead`         | 本実装の本番公開日以降                                              | 計測開始待ち。過去の問い合わせ完了は復元できない                               |

## 問い合わせ計測

| イベント              | 発火条件                                                       | 主なパラメータ                                                             |
| --------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `regional_link_click` | トップ・支援内容・フッター・地域ページの支援リンクをクリック   | `placement`, `source_page`, `destination_page`, `landing_page`             |
| `contact_cta_click`   | 相談CTAをクリック                                              | `placement`, `source_page`, `landing_page`                                 |
| `outbound_link_click` | 公開実績の外部リンクをクリック                                 | `section`, `link_label`, `destination_host`, `source_page`, `landing_page` |
| `contact_page_view`   | 問い合わせ画面を表示                                           | `source_page`, `landing_page`                                              |
| `generate_lead`       | サーバーが管理者宛メールの送信成功を確認し、受付IDを返したとき | `contact_category`, `source_page`, `landing_page`                          |

- ボタンクリックやフォーム送信開始を問い合わせ完了と数えない。入力エラー、Turnstile失敗、管理者宛メール送信失敗、迷惑投稿のダミー成功では `generate_lead` を発火しない。
- 自動返信だけが失敗した場合、管理者宛の受付は成功しているため完了に含める。受付IDは同じ画面内の再描画による二重発火の防止にだけ使い、GA4へ送信しない。サーバーへの再POST自体の重複排除を保証するものではない。
- `contact_category` の `discovery`, `lp`, `improvement`, `development`, `ai` を受託相談の主な集計対象とし、採用・営業・プロダクト問い合わせ等を分ける。ページ閲覧やCTAのKey event数を問い合わせ件数に合算しない。
- `landing_page` は同じタブで最初に見たページ。ページ遷移・計測イベントの間隔が30分以上空けば新たな訪問として扱う。GA4標準のセッション定義とは独立した補助情報であり、標準のLanding pageディメンションも併用する。
- `source_page` は相談CTA元、または問い合わせ画面直前のページ。地域CTAのURLパラメータを優先し、JavaScriptが無効でもサーバーへ引き継ぐ。流入ページはJavaScript無効時には不明。
- 保存するパスはトップ・支援内容・問い合わせ・茅ヶ崎4ページの許可リストだけ。それ以外は `other`。入力由来の不明な値は空欄。新たな地域・用途ページの公開時に許可リストを追加する。
- セッション保存が禁止されていてもフォームは動作する。ブラウザーに保存できない場合、再読み込みをまたぐ流入情報は失われることがある。導線情報は送信者が変更できる参考情報であり、本人確認・不正判定には使わない。
- 氏名、メール、会社、件名、相談本文はイベントに含めない。問い合わせURLのクエリ・ハッシュはGA4のpage location/path/referrerから除外する。管理者宛メールにだけ導線情報を添え、相談者への控えには含めない。
- GA4は本番ホストだけで有効。広告ブロックやJavaScript無効時の未計測を考慮し、実際の受付は管理者宛メールと照合する。

GA4側は `pnpm ga:sync:dry` で対象を確認後、`pnpm ga:sync` で `generate_lead` のKey eventと4つのディメンションを設定する。本PR作成時点でプロパティの設定変更・本番データ送信は未実施。

## 公開・再確認

1. `pnpm validate` を通し、390px程度とPC幅でトップ→地域→CTA→フォームの流れを確認する。`pnpm dev` のモック送信で入力エラーと受付完了を確認し、外部メールへテスト送信しない。
2. 本番公開後、上表の改善公開日を実際のデプロイ完了日で更新する。4 URLのHTTP 200、自己参照canonical、noindexなし、生HTMLのH1・本文・内部リンクを確認する。トップと共通フッターに4 URLへの到達経路があることを確認する。
3. robots.txtとsitemap.xmlを確認する。4 URLが重複なく掲載され、GSCで取得エラーがないことを確認する。今回lastmodは追加しない。運用できる実質更新日がある場合だけ追加し、ビルド日時を一律に使わない。
4. GA4の権限・設定を確認し、本番で計測可能になった日を記録する。実際の受付完了から `generate_lead` とカテゴリ・相談元・流入ページを照合する。入力エラーや単なる送信クリックで増えないことも確認する。
5. 改善公開の7日後・14日後を目安に、URL検査の登録状態・最終クロールと、公開後の確定日までのquery × pageを確認する。これは運用上の目安であり、登録・順位の期限ではない。
6. 非指名の表示・クリック、LP別CTA、問い合わせ完了を別々に記録する。#48に公開・実装状況、#47に観測結果を反映する。データ取得失敗・未計測・少量データは0と区別する。

再び未登録になった場合は、URL検査の理由に応じて確認する。発見待ちはリンクとsitemap、取得失敗はGSCクロール統計・検証済みGooglebotの配信ログ・WAF/CDN、クロール済み未登録はページ独自の内容、重複はcanonicalと類似ページを調べる。特定の原因をURL検査だけで断定しない。

## 参照

- [Google Analytics: generate_lead](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead)
- [SvelteKit: Form actions](https://svelte.dev/docs/kit/form-actions)
- [Google: クロール可能なリンク](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google: サイトマップ](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: 再クロールのリクエスト](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
