# MacClipy 匿名利用状況の運用手順

`POST /api/macclipy/analytics` は、MacClipyから匿名イベントを受け取り、GA4 Measurement Protocolへ転送します。クリップボードの内容や検索語は受け付けません。

## 計測仕様

| アプリのイベント | GA4イベント             | 頻度                    | 主な用途                   |
| ---------------- | ----------------------- | ----------------------- | -------------------------- |
| `install`        | `macclipy_install`      | インストールIDごとに1回 | ユニークインストールの目安 |
| `daily_active`   | `macclipy_daily_active` | 1日1回まで              | DAU・WAU・MAUの目安        |

共通パラメータは `app_version`、`build_number`、`macos_major_version`、`architecture` です。ランダムなインストールIDをGA4の `client_id` として使います。広告関連の同意状態は常に拒否として転送します。

インストールIDは個人やWebサイトのCookieに結び付けません。再インストール後もキーチェーンのIDが残る場合があるため、インストール数は厳密なダウンロード数ではありません。また、送信を停止した利用者は集計されません。

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

`PUBLIC_GA_MEASUREMENT_ID` は対象Webストリームの測定IDにします。API secretをログ、PR、クライアントの `Info.plist`、公開bundleへ出力しないでください。

### 2. GA4 custom dimension

サービスアカウントと `GA4_PROPERTY_ID` を設定し、差分確認後に反映します。

```bash
pnpm ga:sync:dry
pnpm ga:sync
pnpm ga:list
```

次のイベントスコープdimensionが作成されます。

- `app_version`
- `build_number`
- `macos_major_version`
- `architecture`

### 3. 保存期間

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

`pnpm dev` ではGA4へ転送せず、検証済みのリクエストを `202` で受理します。

```bash
curl -i http://127.0.0.1:5173/api/macclipy/analytics \
  -H 'Content-Type: application/json' \
  --data '{
    "schema_version": 1,
    "installation_id": "a4b69d19-9b90-4dad-b034-f4a3fc912fa1",
    "event_name": "install",
    "app_version": "0.2.0",
    "build_number": "20",
    "macos_major_version": 26,
    "architecture": "arm64",
    "occurred_at": "<現在から5分以内のUTC時刻>"
  }'
```

期待結果は本文なしの `202 Accepted` です。形式不正は `400`、大きすぎる本文は `413`、JSON以外は `415`、短時間の連続送信は `429`、GA4転送失敗は `503` です。

### GA4連携

本番反映前は、GoogleのMeasurement Protocol validation serverでペイロードを検証します。validation serverはイベントをGA4レポートへ記録しません。

- [Measurement Protocol validation server](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events)
- [Measurement Protocolの送信仕様](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events)

本番反映後は、署名済みMacClipyの検証用インストール1台から送信し、次を確認します。

1. 初回起動後、GA4のリアルタイムに `macclipy_install` と `macclipy_daily_active` が各1件現れる。
2. 同じ日に再起動しても `macclipy_daily_active` が増えない。
3. 設定で匿名送信をオフにした後はAPIリクエストが発生しない。
4. GA4に `app_version` など4つのパラメータが入り、クリップボード由来の値がない。

## 集計と見方

GA4の探索またはレポートで、Web側のCTAとアプリ利用を分けて見ます。

- ダウンロード導線: Webイベント `outbound_link_click`
- ユニークインストールの目安: `macclipy_install` のユーザー数・イベント数
- DAU・WAU・MAUの目安: `macclipy_daily_active` の期間別ユーザー数
- バージョン分布: `macclipy_daily_active` を `app_version` と `build_number` で分解
- 対応環境: `macos_major_version` と `architecture` で分解

CTAクリック、GitHubのダウンロード、インストール、アクティブ利用は定義が異なるため、同じ数値として扱いません。取得不能や転送失敗も0件として扱わず、APIの `503` とHosting compute logsを確認します。API secretやリクエスト本文はログへ出しません。

## 障害・不正利用への対応

- アプリは送信失敗で主要機能を止めず、次回起動時に未送信イベントを再試行します。
- APIは1アドレス・1分あたり10件、保持キー1万件までを各SSRプロセスで制限します。上限到達時は新規アドレスを拒否します。
- 複数インスタンスをまたぐ大量アクセスには、この制限だけでは不十分です。継続的な不正利用がある場合はAWS WAFなどのホスティング側制限を追加します。
- GA4転送が連続して失敗する場合は、測定ID、API secret、SSM権限、Google側の応答を順に確認します。secretの値そのものは出力しません。

## リリース順序

1. このAPIと `/macclipy/privacy/` を本番へ反映する。
2. GA4の保持期間、API secret、custom dimension、ログ保持期間を確認する。
3. validation serverと検証用インストールで疎通を確認する。
4. 匿名送信を有効にした署名・公証済みMacClipyをリリースする。
5. 初回24時間はAPIエラーとGA4リアルタイムを確認する。

APIやポリシーが未反映の状態では、MacClipy側の匿名送信を有効にしません。ローカルビルドと未署名ビルドは実装上も送信無効です。
