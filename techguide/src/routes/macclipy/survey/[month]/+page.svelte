<script lang="ts">
  import { enhance } from '$app/forms';
  import { resolve } from '$app/paths';
  import SurveyQuestionField from '$lib/components/macclipy/SurveyQuestionField.svelte';
  import type { PageProps } from './$types';
  let { data, form }: PageProps = $props();
  let submitting = $state(false);
  let clientError = $state('');
  const answers: Record<string, string[]> = $derived(form?.values ?? {});
</script>

<svelte:head
  ><title>{data.campaign.month} MacClipyアンケート</title><meta
    name="robots"
    content="noindex,nofollow"
  /></svelte:head
>
<main class="monthly-page">
  <a href={resolve('/macclipy/')}>MacClipy</a>
  <p class="eyebrow">{data.campaign.month} · MacClipy便り</p>
  <h1>{data.campaign.title}</h1>
  <p class="message">{data.campaign.message}</p>
  <section class="card">
    {#if form?.ok}
      <h2>ご回答ありがとうございました</h2>
      <p role="status">{form.message}</p>
    {:else}
      <h2>あなたの使い方を教えてください</h2>
      <p>
        約1分の任意アンケートです。回答したい項目だけで構いません。<br
        />名前・メールアドレスやクリップボードの内容は収集しません。
      </p>
      <form
        method="POST"
        use:enhance={() => {
          submitting = true;
          clientError = '';
          return async ({ result, update }) => {
            try {
              if (result.type === 'error')
                clientError = '送信できませんでした。通信状況を確認して再度お試しください。';
              else await update({ reset: false });
            } finally {
              submitting = false;
            }
          };
        }}
      >
        <input type="hidden" name="ticket" value={form?.ticket || data.ticket} />
        <div class="honeypot" aria-hidden="true">
          <label>Website<input name="website" tabindex="-1" autocomplete="off" /></label>
        </div>
        <fieldset disabled={submitting} class="question-list">
          {#each data.questions as question (data.campaign.month + question.id)}
            <SurveyQuestionField {question} {answers} />
          {/each}
        </fieldset>
        <p class="muted">
          回答は製品改善のために保存します。利用状況の計測とは分けて扱います。<a
            href={resolve('/macclipy/privacy/')}>プライバシーポリシー</a
          >
        </p>
        {#if form?.message || clientError}<p role="alert" class="error">
            {clientError || form?.message}
          </p>{/if}
        <button type="submit" disabled={submitting} aria-busy={submitting}
          >{submitting ? '送信中…' : '回答を送信する'}</button
        >
      </form>
    {/if}
  </section>
</main>

<style>
  .monthly-page {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 20px 80px;
    color: #17252d;
  }
  .eyebrow {
    margin-top: 32px;
    font-size: 14px;
    color: #65787e;
  }
  h1 {
    font-size: 30px;
    line-height: 1.5;
  }
  .message {
    white-space: pre-wrap;
    line-height: 1.9;
    margin: 24px 0 32px;
  }
  .card {
    background: #fff;
    border: 1px solid #dce5e8;
    border-radius: 20px;
    padding: 28px;
  }
  .card > p {
    line-height: 1.8;
    color: #52666c;
  }
  h2 {
    font-size: 22px;
  }
  .question-list {
    padding: 0;
    border: 0;
    display: grid;
    gap: 28px;
  }
  .muted {
    font-size: 13px;
    line-height: 1.8;
    margin: 28px 0 18px;
    color: #60757b;
  }
  button {
    min-width: 180px;
    background: #166c77;
    border: 0;
    border-radius: 10px;
    color: white;
    padding: 13px 22px;
    font: inherit;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  .error {
    color: #b32929;
  }
  .honeypot {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
</style>
