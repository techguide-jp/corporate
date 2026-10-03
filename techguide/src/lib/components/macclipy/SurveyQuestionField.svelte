<script lang="ts">
  import { untrack } from 'svelte';
  import { OTHER_OPTION, otherAnswerQuestion, type SurveyQuestion } from '$lib/macclipy/monthly';
  let {
    question,
    answers,
  }: {
    question: SurveyQuestion;
    answers: Record<string, string[]>;
  } = $props();
  const other = $derived(otherAnswerQuestion(question));
  let otherSelected = $state(untrack(() => answers[question.id]?.includes(OTHER_OPTION) ?? false));
  let otherText = $state(untrack(() => (other ? (answers[other.id]?.[0] ?? '') : '')));
</script>

<fieldset class="question">
  <legend>{question.label} <small>任意</small></legend>
  {#if question.type === 'text'}
    <textarea name={question.id} maxlength="2000" rows="4" aria-label={question.label}
      >{answers[question.id]?.[0] ?? ''}</textarea
    >
  {:else if question.type === 'single'}
    <select
      name={question.id}
      aria-label={question.label}
      value={answers[question.id]?.[0] ?? ''}
      onchange={(event) => (otherSelected = event.currentTarget.value === OTHER_OPTION)}
      ><option value="">選択してください</option>
      {#each question.options as option (option)}<option value={option}>{option}</option>{/each}
    </select>
  {:else}
    <div class:rating={question.type === 'rating'} class="options">
      {#each question.options as option (option)}
        <label
          ><input
            type={question.type === 'multiple' ? 'checkbox' : 'radio'}
            name={question.id}
            value={option}
            checked={answers[question.id]?.includes(option) ?? false}
            onchange={(event) => {
              if (option === OTHER_OPTION) otherSelected = event.currentTarget.checked;
            }}
          />{option}</label
        >
      {/each}
    </div>
  {/if}
  {#if other && otherSelected}
    <label class="other-input">
      <span>その他の内容 <small>任意</small></span>
      <textarea
        name={other.id}
        aria-label={other.label}
        maxlength="2000"
        rows="2"
        bind:value={otherText}
      ></textarea>
    </label>
  {/if}
</fieldset>

<style>
  .question {
    padding: 0;
    border: 0;
    margin-top: 16px;
    min-width: 0;
  }
  legend {
    font-weight: 600;
    margin-bottom: 12px;
    line-height: 1.7;
  }
  small {
    font-size: 12px;
    color: #71848b;
    font-weight: 400;
  }
  .options {
    display: grid;
    gap: 10px;
  }
  .options label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .rating {
    display: flex;
    gap: 22px;
    flex-wrap: wrap;
  }
  .other-input {
    display: grid;
    gap: 8px;
    margin-top: 14px;
  }
  textarea,
  select {
    width: 100%;
    padding: 12px;
    border: 1px solid #beced4;
    border-radius: 8px;
    background: white;
    font: inherit;
  }
  textarea {
    resize: vertical;
  }
</style>
