# MacClipy 匿名利用状況の運用手順

`POST /api/macclipy/analytics` は、MacClipyから匿名イベントを受け取り、GA4 Measurement Protocolへ転送します。クリップボード本文、検索文字列、お気に入り本文、利用アプリ名、個人情報は受け付けません。

## 計測仕様

| アプリのイベント | GA4イベント              | 頻度                    | 主な用途                                         |
| ---------------- | ------------------------ | ----------------------- | ------------------------------------------------ |
| `install`        | `macclipy_install`       | インストールIDごとに1回 | ユニークインストールの目安                       |
| `daily_active`   | `macclipy_daily_running` | 旧クライアントで1日1回  | Running指標への後方互換入力                      |
| `daily_running`  | `macclipy_daily_running` | 1日1回                  | その日にプロセスの生存を確認できたインストール数 |
| `daily_engaged`  | `macclipy_daily_engaged` | 1日1回                  | その日に利用意図のある操作をしたインストール数   |
| `feature_usage`  | `macclipy_feature_usage` | 完了日・機能ごとに1件   | 端末内で日次集計した機能別利用回数               |

共通パラメータは `app_version`、`build_number`、`macos_major_version`、`architecture` です。`feature_usage` だけは、次の追加パラメータを持ちます。

- `feature`: 次の6値のいずれか
  - `history_panel`
  - `favorites_panel`
  - `history_item_use`
  - `favorite_item_use`
  - `search_session`
  - `favorite_management`
- `usage_count`: 正の整数
- `usage_date`: 端末内集計が完了した実在日を表す `YYYY-MM-DD`

ランダムなインストールIDは、GA4が受理する `<number>.<number>` 形式へ決定的に変換して `client_id` として使います。元のUUIDはGA4 event parameterへ入れません。広告関連の同意状態は常に拒否として転送します。インストールIDは個人やWebサイトのCookieに結び付けません。再インストール後もキーチェーンのIDが残る場合があるため、インストール数は厳密なダウンロード数ではありません。また、匿名送信を停止した利用者は集計されません。

APIはイベントごとの完全一致schemaを検証します。未許可キー、自由入力、未知のevent / feature、不正な日付・件数、72時間より古い `occurred_at`、5分より先の未来時刻は `400` で拒否します。

## 本番設定

### 1. Measurement ProtocolのAPI secret

GA4の対象データストリームでMeasurement Protocol API secretを発行します。値は公開環境変数に置かず、Amplifyの共有シークレットとして次のパスへ保存します。

```text
/amplify/shared/d1ei4wu36fr0u9/MACCLIPY_GA_API_SECRET
```

SSR Compute roleには、このパラメータに対する `ssm:GetParameter` を追加します。

```json
{
  "Effect": "Allow",
  "Action": "ssm:GetParameter",
  "Resource": "arn:aws:ssm:ap-northeast-1:953573378652:parameter/amplify/shared/d1ei4wu36fr0u9/MACCLIPY_GA_API_SECRET"
}
```

`PUBLIC_GA_MEASUREMENT_ID` は対象Webストリームの測定IDにします。API secretをresponse、通常ログ、PR、クライアントの `Info.plist`、公開bundleへ出力しないでください。

### 2. GA4 custom definition

サービスアカウントと `GA4_PROPERTY_ID` を設定し、差分確認後に反映します。

```bash
pnpm ga:sync:dry
pnpm ga:sync
pnpm ga:list
```

MacClipy向けに、次のevent-scoped custom dimensionを作成・更新します。

- `app_version`
- `build_number`
- `macos_major_version`
- `architecture`
- `feature`
- `usage_date`

次のevent-scoped custom metricを作成・更新します。

- `usage_count`（Standard）

### 3. 新指標の開始日と旧指標

- 新指標の開始日: **未開始**。本番APIとGA4で合成イベントを確認した日を `YYYY-MM-DD` でこの欄と `ga-qiita` automation履歴へ記録する。
- 過去の `macclipy_daily_active` は削除しない。
- 新しい `macclipy_daily_running` は意味とイベント名が異なるため、旧 `macclipy_daily_active` と同じ時系列の連続値として結合しない。
- API入力のlegacy `daily_active` は、移行期間もクライアントを切り捨てないため `macclipy_daily_running` へ変換する。

### 4. 保存期間

MacClipyの送信を有効にする前に、GA4プロパティのイベント単位・ユーザー単位データ保持期間を14か月に設定します。

Amplify Hosting compute logsを保持する場合は30日以内にします。CloudWatch Logsを利用している環境では次のように設定し、実際のポリシーを確認します。

```bash
aws logs put-retention-policy \
  --log-group-name /aws/amplify/<app-id> \
  --retention-in-days 30 \
  --region ap-northeast-1
```

API実装はイベントを独自DBへ保存しません。レート制限に使う接続元IPアドレスはプロセスのメモリ内だけに置き、最長60秒で期限切れにします。

## 検証

### ローカルAPI

`pnpm dev` ではGA4へ転送せず、検証済みのリクエストを `202` で受理します。`occurred_at` は実行時のUTC時刻へ置き換えます。

```bash
curl -i http://127.0.0.1:5173/api/macclipy/analytics \
  -H 'Content-Type: application/json' \
  --data '{
    "schema_version": 1,
    "installation_id": "a4b69d19-9b90-4dad-b034-f4a3fc912fa1",
    "event_name": "feature_usage",
    "app_version": "0.3.0",
    "build_number": "30",
    "macos_major_version": 26,
    "architecture": "arm64",
    "occurred_at": "<現在から5分以内のUTC時刻>",
    "feature": "history_panel",
    "usage_count": 3,
    "usage_date": "<集計完了日 YYYY-MM-DD>"
  }'
```

期待結果は本文なしの `202 Accepted` です。形式不正は `400`、大きすぎる本文は `413`、JSON以外は `415`、短時間の過剰送信は `429`、GA4転送失敗は `503` です。response本文にはAPI secret、インストールID、payloadを含めません。

### Measurement Protocol validation server

本番反映前に、`gaMeasurementClient.test.ts` と同じGA4 payloadをGoogleのvalidation endpoint `/debug/mp/collect` へ送り、`validationMessages` が空であることを確認します。validation endpointはイベントをGA4レポートへ記録しません。

- [Measurement Protocol validation server](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events)
- [Measurement Protocolの送信仕様](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events)

検証時もAPI secretとインストールIDを通常ログやIssueへ貼り付けません。validation結果には、値そのものではなく成功・失敗とvalidation messageだけを記録します。

### 本番APIとGA4

本番反映後、MacClipy公開前に検証専用の匿名インストールIDで `daily_running`、`daily_engaged`、`feature_usage` を各1件送ります。

1. first-party APIが各リクエストを `202` で受理する。
2. GA4 Realtimeで `macclipy_daily_running`、`macclipy_daily_engaged`、`macclipy_feature_usage` が現れる。
3. `feature_usage` に `feature`、`usage_date`、`usage_count` と共通metadataだけが入る。
4. legacy `daily_active` の合成入力が `macclipy_daily_running` として現れ、`macclipy_daily_active` を新規発火しない。
5. 匿名送信をオフにしたMacClipyからはRunning、Engaged、feature usageを含むAPIリクエストが発生しない。
6. APIの通常ログとresponseにsecret、インストールID、payload、接続元IPが出ていない。

確認成功日を新指標の開始日として本書とautomation履歴へ記録してから、MacClipy対応版を公開します。

## 日次監視

既存の `ga-qiita` automationは、TechGuideのMacClipyサブ表へ次を追加します。

| 指標                      | GA4 Data APIでの定義                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| Running DAU               | `eventName=macclipy_daily_running` の日別unique installs             |
| Engaged DAU               | `eventName=macclipy_daily_engaged` の日別unique installs             |
| Engaged率                 | `Engaged DAU / Running DAU`                                          |
| 機能別ユニーク利用        | `macclipy_feature_usage` を `feature` で分けたunique installs        |
| 機能別合計利用回数        | `customEvent:usage_count` の合計を `feature` と `usage_date` で分解  |
| Engaged DAUあたり利用回数 | 機能別合計利用回数 / Engaged DAU                                     |
| 7日・28日ユニーク         | 各期間のRunning / Engaged unique installs。日別DAUの単純合算はしない |
| バージョン分布            | Running / Engagedを `app_version` で分解                             |

運用ルール:

- 最初に取得できた完了日を新指標開始日として履歴へ保存し、それ以前を0埋めしない。
- API・認証・custom definition・Data APIの失敗は `取得不可` とし、実績0と分ける。
- Engaged率などの分母が0なら率を出さない。
- 母数10未満の比率だけで異常と断定しない。
- `usage_date` を機能利用の完了日として扱い、再送されたイベントの受信日だけで日次件数を集計しない。
- 同日再実行は既存スナップショットを更新し、成功した指標だけ履歴を更新する。

## 障害・不正利用への対応

- アプリは送信失敗で主要機能を止めず、次回起動時に未送信イベントを再試行します。
- 通常の日次batchはRunning 1件、Engaged 1件、最大6 feature、初回のみinstall 1件の最大9件です。
- APIは1アドレス・1分あたり100件、匿名インストールごとに1分あたり10件を各SSRプロセスで制限します。同じアドレスを共有する複数端末の正常batchを許可しつつ、単一端末の過剰送信を抑止します。各制限の保持キーは最大1万件で、再送は別windowへ分散します。
- 複数インスタンスをまたぐ大量アクセスには、この制限だけでは不十分です。継続的な不正利用がある場合はAWS WAFなどのホスティング側制限を追加します。
- GA4転送が連続して失敗する場合は、測定ID、API secret、SSM権限、Google側の応答を順に確認します。secretの値そのものは出力しません。

## リリース順序

1. first-party API、GA Admin CLI、`/macclipy/privacy/`、日次automationを反映する。
2. `pnpm ga:sync:dry`、`pnpm ga:sync`、`pnpm ga:list` でcustom definitionを確認する。
3. Measurement Protocol validation serverで合成payloadを確認する。
4. 本番APIとGA4 Realtimeで3イベントとlegacy変換を確認し、新指標開始日を記録する。
5. MacClipy側の説明と `PrivacyInfo.xcprivacy` が本ページと一致することを確認する。
6. MacClipy対応版を署名・公証して公開する。
7. 公開後24時間のAPIエラー、Running / Engaged / feature usageを確認する。

API・GA4定義・ポリシーが未反映の状態では、MacClipy側の新しい匿名イベントを有効にしません。ローカルビルドと未署名ビルドは実装上も送信無効です。
