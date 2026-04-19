<script lang="ts">
  interface Props {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    level?: 1 | 2;
  }

  let { eyebrow, title, subtitle, level = 2 }: Props = $props();
</script>

<div class="section-heading">
  {#if eyebrow}
    <p class="section-heading__eyebrow">{eyebrow}</p>
  {/if}
  {#if level === 1}
    <h1>{title}</h1>
  {:else}
    <h2>{title}</h2>
  {/if}
  {#if subtitle}
    <p class="section-heading__subtitle">{subtitle}</p>
  {/if}
</div>

<style>
  .section-heading {
    display: grid;
    gap: 10px;
    justify-items: center;
    text-align: center;
    margin-bottom: clamp(34px, 4vw, 48px);
  }

  h1,
  h2 {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 3vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .section-heading__eyebrow {
    color: rgba(135, 99, 45, 0.88);
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .section-heading__subtitle {
    max-width: 720px;
    color: var(--color-ink-soft);
    font-size: 1rem;
  }
</style>
