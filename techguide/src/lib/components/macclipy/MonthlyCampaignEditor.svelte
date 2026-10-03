<script lang="ts">
  import { enhance } from '$app/forms';
  import { resolve } from '$app/paths';
  import { untrack } from 'svelte';
  import {
    publicCampaign,
    questionsFor,
    type MonthlyCampaign,
    type SurveyQuestion,
  } from '$lib/macclipy/monthly';
  let {
    campaign,
    etag,
    status,
  }: {
    campaign: MonthlyCampaign;
    etag: string | null;
    status: { ok: boolean; message: string } | null | undefined;
  } = $props();
  let draft = $state(structuredClone(untrack(() => campaign)));
  let saving = $state(false);
  let clientError = $state('');
  const preview = $derived(publicCampaign(draft));
  function addQuestion(): void {
    if (draft.customQuestions.length >= 6) return;
    draft.customQuestions.push({
      id: `custom_${crypto.randomUUID()}`,
      label: '',
      type: 'text',
      options: [],
    });
  }
  function changeType(question: SurveyQuestion, value: string): void {
    question.type = value as SurveyQuestion['type'];
    question.options =
      value === 'rating'
        ? ['1', '2', '3', '4', '5']
        : value === 'text'
          ? []
          : question.options.length >= 2
            ? question.options
            : ['はい', 'いいえ'];
  }
</script>

<form
  method="POST"
  action={resolve('/macclipy/admin/') + '?/save&month=' + draft.month}
  use:enhance={() => {
    saving = true;
    clientError = '';
    return async ({ result, update }) => {
      try {
        if (result.type === 'error') clientError = '保存できませんでした。再度お試しください。';
        else await update({ reset: false });
      } finally {
        saving = false;
      }
    };
  }}
>
  <input type="hidden" name="month" value={draft.month} />
  <input type="hidden" name="etag" value={etag ?? ''} />
  <input type="hidden" name="customQuestions" value={JSON.stringify(draft.customQuestions)} />
  <fieldset disabled={saving}>
    <h2>{draft.month}の配信内容</h2>
    <label class="checkbox"
      ><input
        type="checkbox"
        name="published"
        bind:checked={draft.published}
      />この月のカスタム内容を公開する</label
    >
    <p class="help">
      公開した内容は対象月の1日から配信されます。非公開・未設定の月はデフォルトを配信します。
    </p>
    <label
      >タイトル<input
        name="title"
        bind:value={draft.title}
        maxlength="120"
        placeholder="空欄ならデフォルト"
      /></label
    >
    <label
      >メッセージ<textarea
        name="message"
        bind:value={draft.message}
        maxlength="6000"
        rows="7"
        placeholder="空欄ならデフォルトメッセージ"
      ></textarea></label
    >
    <h3>追加のアンケート質問</h3>
    <p class="help">
      用途・機能の要望・職種・満足度に加える質問です。最大6問、すべて任意です。感想欄は最後に表示します。
    </p>
    {#each draft.customQuestions as question, index (question.id)}
      <div class="custom-question">
        <label>質問文<input bind:value={question.label} maxlength="300" required /></label>
        <label
          >回答形式<select
            value={question.type}
            onchange={(event) => changeType(question, event.currentTarget.value)}
            ><option value="text">自由記述</option><option value="single">単一選択</option><option
              value="multiple">複数選択</option
            ><option value="rating">5段階評価</option></select
          ></label
        >
        {#if question.type === 'single' || question.type === 'multiple'}<label
            >選択肢（1行に1つ、2〜12個）<textarea
              rows="4"
              value={question.options.join('\n')}
              onchange={(event) =>
                (question.options = event.currentTarget.value
                  .split('\n')
                  .filter((value) => value.trim()))}
            ></textarea></label
          >{/if}
        <button
          type="button"
          class="secondary"
          onclick={() => draft.customQuestions.splice(index, 1)}>この質問を外す</button
        >
      </div>
    {/each}
    <button
      type="button"
      class="secondary"
      onclick={addQuestion}
      disabled={draft.customQuestions.length >= 6}>質問を追加する</button
    >
    <details open>
      <summary>利用者に届く内容のプレビュー</summary>
      <div class="preview">
        <h3>{preview.title}</h3>
        <p class="message">{preview.message}</p>
        <p>［アンケートに回答する］</p>
        <ol>
          {#each questionsFor(preview) as question (question.id)}<li>
              {question.label} <small>任意</small>
            </li>{/each}
        </ol>
      </div>
    </details>
    {#if status?.message || clientError}<p
        role={status?.ok ? 'status' : 'alert'}
        class:error={!status?.ok}
      >
        {clientError || status?.message}
      </p>{/if}
    <button type="submit" aria-busy={saving}>{saving ? '保存中…' : 'この月の内容を保存する'}</button
    >
  </fieldset>
</form>

<style>
  fieldset {
    padding: 0;
    border: 0;
  }
  h2 {
    font-size: 23px;
  }
  label {
    display: grid;
    gap: 8px;
    margin: 18px 0;
  }
  input:not([type='checkbox']),
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #b9cbd1;
    border-radius: 8px;
    font: inherit;
    background: white;
  }
  textarea {
    resize: vertical;
  }
  .checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .help {
    font-size: 13px;
    color: #65787f;
    line-height: 1.8;
  }
  .custom-question {
    padding: 10px 20px 20px;
    margin: 18px 0;
    background: #f5f8f9;
    border-radius: 12px;
  }
  button {
    border: 0;
    border-radius: 8px;
    padding: 11px 18px;
    background: #166c77;
    color: white;
    font: inherit;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .secondary {
    background: #e5eef0;
    color: #24454c;
  }
  details {
    margin: 28px 0;
  }
  summary {
    cursor: pointer;
    font-weight: 600;
  }
  .preview {
    margin-top: 14px;
    padding: 20px;
    border: 1px solid #dbe7eb;
    border-radius: 12px;
    background: #f6fafb;
  }
  .message {
    white-space: pre-wrap;
    line-height: 1.8;
  }
  li {
    margin: 12px 0;
  }
  small {
    color: #73848a;
  }
  .error {
    color: #b32929;
  }
</style>
