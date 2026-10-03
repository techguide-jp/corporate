# MacClipy 月次のお知らせ・アンケート

## 提供する画面

- `GET /api/macclipy/monthly/`: 日本時間の当月のタイトル・本文・アンケートURL。
- `/macclipy/survey/YYYY-MM/`: 当月だけ受付。用途・要望・職種・満足度・追加質問・最後に感想。「その他」の選択時は自由記述欄を表示する（追加の選択式質問にも対応）。全項目任意、空の回答は不可。
- `/macclipy/admin/login/`: 専用パスワードでログイン。
- `/macclipy/admin/?month=YYYY-MM`: 月別のカスタム内容・質問を保存、プレビュー、回答一覧、用途・満足度集計。
- `/macclipy/admin/responses.csv?month=YYYY-MM`: 認証済み管理者だけが回答CSVを取得。

月ごとの公開設定を事前に保存すれば、日本時間の1日からその月の内容を返す。ジョブやメール送信は不要。設定がない月や非公開の月は既定内容となり、公開済みで本文だけ空なら既定本文になる。保存先への接続失敗は503で返し、既定内容に置き換えない。

## 本番設定

1. `infra/macclipy-monthly.yaml` で非公開S3 bucketとIAM policyを作成する。`AmplifyAppId` と `SSRComputeRoleName` は対象環境の値を指定する。bucketは公開しない。
2. policyは指定した既存のAmplify SSR Compute roleへ自動で付与される。対象bucket内の取得・保存と、月次機能の3つのSSM parameterの取得だけを許可する。ブラウザやアプリへAWS認証情報を渡さない。
3. 以下をAmplify shared SSM parametersへ設定する（既存の `/amplify/shared/<app-id>/` prefix を使用）。
   - `MACCLIPY_MONTHLY_BUCKET`: bucket名。
   - `MACCLIPY_ADMIN_PASSWORD`: ランダムな24文字以上の管理用パスワード。
   - `MACCLIPY_FEEDBACK_SECRET`: ランダムな32文字以上の署名用秘密情報。
4. Webをデプロイし、配信API、ログイン、内容編集、実際の回答保存とCSVを確認する。
5. MacClipyを `MONTHLY_MESSAGES_ENABLED=1` で署名・公証して配布する。Release workflowの手動入力 `monthly_messages` またはrepository variable `MONTHLY_MESSAGES_ENABLED=1` でも有効にできる。Webが未設定の間は既定の0を維持する。

管理cookieはHttpOnly・SameSite=Strict・本番Secure、8時間で期限切れとなる。ログアウトはPOSTだけで行う。全管理操作とCSVはサーバーで認証する。秘密情報を変更して既存ログイン・回答ticketを失効する場合は `MACCLIPY_FEEDBACK_SECRET` を変更してSSRを再デプロイする。パスワードを変更しても既存cookieは最大8時間有効なため、緊急失効時は両方を変更する。

専用bucketの `s3:ListBucket` はprefix条件を付けない。これにより存在しない月別設定を `GetObject` の404として判別し、未設定月の既定配信を維持する。オブジェクトの読み書きは `macclipy-monthly/` 以下に限定する。

S3条件つき書き込みで古い編集を拒否し、送信ticketのUUIDをキーにした回答の再送を冪等化する。質問内容が変わった場合は、旧ページで入力した回答の送信を拒否する。回答にはその時点の質問文・選択肢を保存する。CSV先頭が数式に見える回答は無害化する。

回答保存は730日、上書き前のS3 object versionは7日で自動削除する。bucketのversioning・lifecycleはtemplateの設定を維持する。bucketは削除時に残す。アクセスログの保存期間は既存ポリシーの30日以内を維持する。

ログイン5回/15分、回答10回/分のIP制限とhoneypotを使う。IP制限はSSR process単位の補助的な制限であり、複数インスタンスをまたぐ全体制限ではない。必要に応じて既存のWAFでログイン・回答POSTへの全体制限を追加する。アプリの匿名インストールID・clipboard・メールアドレスは回答と関連付けない。

## 開発

`techguide/.env` に以下を保存して `pnpm dev` を起動する。`.env` はgit管理対象外で、再起動時にも設定を読み込む。すでに起動済みのシェルで同名の環境変数を指定している場合は、その値が優先される。

- `MACCLIPY_MONTHLY_LOCAL_DIR=/private/tmp/macclipy-monthly-dev-data`
- `MACCLIPY_ADMIN_PASSWORD=<開発用の24文字以上の値>`
- `MACCLIPY_FEEDBACK_SECRET=<開発用の32文字以上の値>`

管理パスワードだけではログインできない。`MACCLIPY_FEEDBACK_SECRET` も必要で、ログイン後に管理画面を開くには保存先の設定が必要となる。パスワードは24文字以上、署名キーは32文字以上で、どちらも推測しにくい別々の値にする。未設定や文字数不足は開発画面で該当変数と必要文字数を表示する。本番では設定の詳細を表示しない。

ローカル保存は `dev` の明示設定時だけ有効。本番で保存先未設定なら503で停止する。ローカルデータもgitへ追加しない。アンケートと管理画面はサイトのPV計測から除外する。

## 検証

`pnpm validate`。追加のテストは `monthly.test.ts` で月境界、既定への切替、質問・回答検証、ticket・cookie、古い編集、回答再送、CSVを確認する。デプロイ後に実保存を確認するまでは本番稼働を報告しない。

ローカルサーバー起動後は `MACCLIPY_VERIFY_PASSWORD=<開発用パスワード> node scripts/verify-monthly-auth.mjs` で、未認証の管理画面・CSV拒否、ログイン後の表示、ログアウトを回帰検証できる。接続先はlocalhostに限定する。

## 本番反映コマンド

```sh
aws cloudformation deploy \
  --stack-name techguide-macclipy-monthly \
  --template-file infra/macclipy-monthly.yaml \
  --parameter-overrides AmplifyAppId=d1ei4wu36fr0u9 SSRComputeRoleName=TechGuideAmplifySsrComputeRole \
  --capabilities CAPABILITY_IAM \
  --region ap-northeast-1
```

管理用パスワードと署名キーは開発用とは別のランダム値にし、SSMの `SecureString` に保存する。ローカル保管が必要な場合はgit管理外の `.env.macclipy-production` を使用し、ファイル権限を600にする。秘密情報はPR本文、ログ、リリースノートへ記載しない。
