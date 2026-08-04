# MacClipy Running・Engaged・機能別利用計測 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Issue #43 に従い、MacClipy の Running DAU・Engaged DAU・機能別日次利用を first-party API で安全に受け、GA4 と既存の日次監視で確認できるようにする。

**Architecture:** 既存の SvelteKit API を維持し、検証層は共通フィールドと `feature_usage` 専用フィールドを判別する discriminated union にする。GA4 転送は受理イベント名を明示的に対応付け、GA Admin CLI は追加 dimension / metric を冪等同期する。日次監視は既存 `ga-qiita` automation の時刻・履歴・保存形式を維持したまま MacClipy サブスナップショットだけを拡張する。

**Tech Stack:** SvelteKit 2、Svelte 5、TypeScript、Node test runner、GA4 Measurement Protocol、Google Analytics Admin API、Codex heartbeat automation

## Global Constraints

- `daily_active` は後方互換として受理し、`macclipy_daily_running` へ転送する。
- `feature_usage` の追加キーは `feature`、`usage_count`、`usage_date` だけとする。
- `usage_count` は正の整数、`usage_date` は実在する `YYYY-MM-DD`、`feature` は Issue 記載の6値だけとする。
- API secret、匿名インストールID、payload、接続元IPを response や通常ログへ出さない。
- 取得失敗を0件として扱わず、母数10未満の比率だけで異常断定しない。
- 新しい依存関係は追加しない。

---

### Task 1: API payload の条件付き検証

**Files:**

- Modify: `techguide/src/lib/server/macclipy/analyticsValidation.ts`
- Test: `techguide/src/lib/server/macclipy/analyticsValidation.test.ts`
- Test: `techguide/src/lib/server/macclipy/analyticsEndpoint.test.ts`

**Interfaces:**

- Produces: `MacClipyAnalyticsPayload` discriminated union。`feature_usage` のときだけ `feature`, `usageCount`, `usageDate` を持つ。
- Consumes: 既存の共通匿名メタデータと72時間以内の `occurred_at` 制約。

- [ ] **Step 1: 新しい3イベントと6種類のfeatureを受理する失敗テストを書く**

  `daily_running`、`daily_engaged`、全6 feature の `feature_usage` を literal fixture で渡し、正規化後の値を検証する。

- [ ] **Step 2: 条件付き追加キーの不正値を拒否する失敗テストを書く**

  不正 event / feature / 日付 / 0・負数・小数の件数 / 非 `feature_usage` への追加キー / `feature_usage` の不足キーを `invalid_schema` として確認する。

- [ ] **Step 3: 対象テストを実行して期待どおり失敗することを確認する**

  Run: `pnpm test -- src/lib/server/macclipy/analyticsValidation.test.ts`

- [ ] **Step 4: 共通キーとイベント別キーを分けて最小実装する**

  `hasExactKeys` を event 判定後に適用し、実在日判定は UTC の年・月・日を元文字列へ戻して一致させる。

- [ ] **Step 5: endpoint が feature payload を一度だけ転送することを確認する**

  `forward` に届く正規化済み `feature`, `usageCount`, `usageDate` を literal で検証する。

- [ ] **Step 6: 対象テストを再実行する**

  Run: `pnpm test`

### Task 2: GA4転送とAdmin API定義

**Files:**

- Modify: `techguide/src/lib/server/macclipy/gaMeasurementClient.ts`
- Test: `techguide/src/lib/server/macclipy/gaMeasurementClient.test.ts`
- Create: `techguide/scripts/ga-admin-resources.mjs`
- Modify: `techguide/scripts/ga-admin.mjs`
- Create: `techguide/src/lib/server/macclipy/gaAdminResources.test.ts`

**Interfaces:**

- Consumes: Task 1 の `MacClipyAnalyticsPayload`。
- Produces: `install -> macclipy_install`、`daily_active|daily_running -> macclipy_daily_running`、`daily_engaged -> macclipy_daily_engaged`、`feature_usage -> macclipy_feature_usage`。
- Produces: event-scoped `feature`, `usage_date` dimension と event-scoped `usage_count` custom metric。

- [ ] **Step 1: 4種類のGA4イベント名とfeature専用paramsの失敗テストを書く**

  `daily_active` の互換変換、新3イベント、feature payload に許可済みパラメータだけが入ることを検証する。

- [ ] **Step 2: GA Admin resource定義の失敗テストを書く**

  resource factory が `feature`, `usage_date`, `usage_count` を event scope で返すことを literal で検証する。

- [ ] **Step 3: 対象テストが期待どおり失敗することを確認する**

  Run: `pnpm test`

- [ ] **Step 4: 明示的なイベント名mappingとfeature paramsを実装する**

  共通paramsを一度作り、`feature_usage` の場合だけ `feature`, `usage_count`, `usage_date` を追加する。

- [ ] **Step 5: GA Admin CLIへdimension / metricのlist・dry-run・create・metadata updateを追加する**

  `listCustomMetrics`、`ensureCustomMetrics`、`printCustomMetrics` を既存dimension同期と同じ冪等パターンで実装する。

- [ ] **Step 6: 対象テストを再実行する**

  Run: `pnpm test`

### Task 3: 送信量、安全説明、運用手順

**Files:**

- Modify: `techguide/src/lib/server/macclipy/analyticsRateLimit.ts`
- Modify: `techguide/src/routes/api/macclipy/analytics/+server.ts`
- Test: `techguide/src/lib/server/macclipy/analyticsRateLimit.test.ts`
- Modify: `techguide/src/routes/macclipy/privacy/+page.svelte`
- Modify: `techguide/docs/macclipy-analytics.md`
- Modify: `techguide/README.md`

**Interfaces:**

- Produces: 1回の通常日次送信（Running + Engaged + 最大6 feature、初回は install 追加）が1分10件制限内に収まる定数と回帰テスト。
- Produces: 新指標の意味、旧 `macclipy_daily_active` との非連続性、検証・リリース順序を明記した公開説明とrunbook。

- [ ] **Step 1: 9件の正常batchを許可し11件目を拒否する失敗テストを書く**

- [ ] **Step 2: routeとテストが共有するrate-limit定数を実装する**

- [ ] **Step 3: privacy pageを更新する**

  常駐確認、明示的利用、機能別日次件数、送らない本文・検索語・利用アプリ名、OFF時の全停止を平易な日本語で追記する。

- [ ] **Step 4: runbookとREADMEを更新する**

  GA定義、切替日記録欄、旧イベントと新イベントを同一連続値にしない注意、validation / production合成検証、日次監視の算出式を記載する。

- [ ] **Step 5: Svelteと全テストを検証する**

  Run: `pnpm test && pnpm check && pnpm lint`

### Task 4: 既存GA・Qiita日次automationの拡張

**Files:**

- External update: Codex automation `ga-qiita`

**Interfaces:**

- Consumes: GA4 event names と custom definitions。
- Produces: Running DAU、Engaged DAU、Engaged率、feature別unique installs / total usage / Engaged DAUあたり利用回数、7日・28日unique、version分布。

- [ ] **Step 1: 現行automationの設定を再読し、既存フィールドを保持する**

- [ ] **Step 2: MacClipyサブスナップショットと報告表へ新指標を追加する**

  Data API失敗は `取得不可`、イベント実績0は `0` と分離し、最初に取得できた完了日を新指標開始日として履歴へ保存する。

- [ ] **Step 3: automation定義をread-backする**

### Task 5: 全体検証

**Files:**

- Verify all modified files and external automation definition.

- [ ] **Step 1: 全検証を新しく実行する**

  Run: `pnpm validate`

- [ ] **Step 2: `git diff --check` と差分確認を行う**

- [ ] **Step 3: 本番反映前の未実施項目を明示する**

  `ga:sync:dry` / `ga:sync` / `ga:list`、本番API合成送信、GA4 Realtime確認は認証・デプロイ後の手順として区別し、ローカル成功だけで受け入れ条件達成と誤記しない。
