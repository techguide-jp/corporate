<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  let { form }: PageProps = $props();
  let pending = $state(false);
  let clientError = $state('');
</script>

<svelte:head
  ><title>MacClipy月次配信 管理ログイン</title><meta
    name="robots"
    content="noindex,nofollow"
  /></svelte:head
>
<main>
  <p>TechGuide / MacClipy</p>
  <h1>月次配信の管理</h1>
  <form
    method="POST"
    use:enhance={() => {
      pending = true;
      clientError = '';
      return async ({ result, update }) => {
        try {
          if (result.type === 'error')
            clientError = 'ログインできませんでした。再度お試しください。';
          else await update();
        } finally {
          pending = false;
        }
      };
    }}
  >
    <label
      >管理用パスワード<input
        type="password"
        name="password"
        autocomplete="current-password"
        required
        disabled={pending}
      /></label
    >
    {#if form?.message || clientError}<p role="alert">{clientError || form?.message}</p>{/if}
    <button disabled={pending} aria-busy={pending}>{pending ? 'ログイン中…' : 'ログイン'}</button>
  </form>
</main>

<style>
  main {
    max-width: 440px;
    margin: 80px auto;
    padding: 28px;
    border: 1px solid #dce5e8;
    border-radius: 16px;
    background: white;
  }
  h1 {
    font-size: 25px;
  }
  label {
    display: grid;
    gap: 10px;
  }
  input {
    border: 1px solid #b9c9ce;
    border-radius: 8px;
    padding: 12px;
    font: inherit;
    width: 100%;
  }
  button {
    margin-top: 20px;
    padding: 12px 24px;
    border: 0;
    border-radius: 8px;
    background: #166c77;
    color: white;
    font: inherit;
  }
  button:disabled {
    opacity: 0.6;
  }
  form > p {
    color: #b32929;
  }
</style>
