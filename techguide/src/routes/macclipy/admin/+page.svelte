<script lang="ts">
  import { enhance } from '$app/forms';
  import { resolve } from '$app/paths';
  import MonthlyCampaignEditor from '$lib/components/macclipy/MonthlyCampaignEditor.svelte';
  import type { PageProps } from './$types';
  let { data, form }: PageProps = $props();
  let loggingOut = $state(false);
  let exporting = $state(false);
  let exportError = $state('');
  async function exportCsv(): Promise<void> {
    exporting = true;
    exportError = '';
    try {
      const response = await fetch(
        `${resolve('/macclipy/admin/responses.csv')}?month=${data.campaign.month}`,
      );
      if (!response.ok) throw new Error('CSVを取得できませんでした。再度お試しください。');
      const url = URL.createObjectURL(await response.blob());
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `macclipy-survey-${data.campaign.month}.csv`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      exportError = 'CSVを取得できませんでした。再度お試しください。';
    } finally {
      exporting = false;
    }
  }
</script>

<svelte:head
  ><title>MacClipy月次配信 管理</title><meta
    name="robots"
    content="noindex,nofollow"
  /></svelte:head
>
<main>
  <header>
    <div>
      <p>TechGuide / MacClipy</p>
      <h1>月次配信とアンケート</h1>
    </div>
    <form
      method="POST"
      action="?/logout"
      use:enhance={() => {
        loggingOut = true;
        return async ({ update }) => {
          try {
            await update();
          } finally {
            loggingOut = false;
          }
        };
      }}
    >
      <button class="secondary" disabled={loggingOut}
        >{loggingOut ? 'ログアウト中…' : 'ログアウト'}</button
      >
    </form>
  </header>
  <form class="month-picker" method="GET">
    <label>対象月<input type="month" name="month" value={data.campaign.month} required /></label
    ><button>表示する</button>
  </form>
  <section class="card">
    {#key data.campaign.month + (data.etag ?? '')}<MonthlyCampaignEditor
        campaign={data.campaign}
        etag={data.etag}
        status={form}
      />{/key}
  </section>
  <section class="card">
    <div class="response-heading">
      <h2>{data.campaign.month}の回答</h2>
      <button disabled={exporting} aria-busy={exporting} onclick={exportCsv}
        >{exporting ? 'CSVを取得中…' : 'CSVダウンロード'}</button
      >
    </div>
    {#if exportError}<p role="alert" class="error">{exportError}</p>{/if}
    <div class="summary">
      <div><strong>{data.responses.length}</strong><span>回答数</span></div>
      <div>
        <strong>{data.average === null ? '—' : data.average.toFixed(1)}</strong><span
          >平均満足度 / 5（回答 {data.satisfactionCount}件）</span
        >
      </div>
    </div>
    <div class="metrics">
      <div>
        <h3>用途（複数選択）</h3>
        {#each data.usage as item (item.option)}<p>{item.option}<b>{item.count}件</b></p>{/each}
      </div>
      <div>
        <h3>満足度</h3>
        {#each data.distribution as item (item.score)}<p>
            {item.score} / 5<b>{item.count}件</b>
          </p>{/each}
      </div>
    </div>
    {#if data.responses.length === 0}<p class="help">この月の回答はまだありません。</p>{/if}
    {#each data.responses as response (response.id)}<details>
        <summary
          >{new Intl.DateTimeFormat('ja-JP', {
            timeZone: 'Asia/Tokyo',
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(response.submittedAt))}</summary
        >
        <dl>
          {#each response.questions as question (question.id)}{#if response.answers[question.id]?.length}<dt
              >
                {question.label}
              </dt>
              <dd>{response.answers[question.id].join(' / ')}</dd>{/if}{/each}
        </dl>
      </details>{/each}
  </section>
</main>

<style>
  main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 36px 20px 80px;
    color: #17252d;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  header p {
    font-size: 13px;
    color: #61757d;
  }
  h1 {
    font-size: 28px;
  }
  .card {
    background: white;
    padding: 28px;
    margin-top: 26px;
    border: 1px solid #dce5e8;
    border-radius: 16px;
  }
  .month-picker {
    display: flex;
    gap: 16px;
    align-items: flex-end;
    margin-top: 25px;
  }
  .month-picker label {
    display: grid;
    gap: 8px;
  }
  input {
    padding: 10px;
    border: 1px solid #b9cbd1;
    border-radius: 8px;
    font: inherit;
  }
  button {
    padding: 11px 18px;
    border: 0;
    border-radius: 8px;
    background: #166c77;
    color: white;
    font: inherit;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.5;
  }
  .secondary {
    background: #e5eef0;
    color: #24454c;
  }
  .response-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
  .summary {
    display: flex;
    gap: 40px;
    margin: 20px 0;
  }
  .summary > div {
    display: grid;
    gap: 8px;
  }
  .summary strong {
    font-size: 34px;
  }
  .summary span,
  .help {
    font-size: 13px;
    color: #65787f;
  }
  .metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
  .metrics p {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #edf2f4;
    padding: 8px 0;
  }
  .metrics b {
    font-weight: 500;
  }
  details {
    padding: 15px 0;
    border-top: 1px solid #e5edef;
  }
  summary {
    cursor: pointer;
  }
  dt {
    font-weight: 600;
    margin-top: 20px;
  }
  dd {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    margin: 8px 0;
    color: #465f68;
  }
  .error {
    color: #b32929;
  }
  @media (max-width: 640px) {
    header,
    .response-heading {
      align-items: flex-start;
      flex-direction: column;
    }
    .metrics {
      grid-template-columns: 1fr;
    }
    .card {
      padding: 20px;
    }
  }
</style>
