<script lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
  }

  let { title, subtitle }: Props = $props();
</script>

<div class="section-heading">
  <h2>{title}</h2>
  {#if subtitle}
    <p>{subtitle}</p>
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

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 3vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  p {
    max-width: 720px;
    color: var(--color-ink-soft);
    font-size: 1rem;
  }
</style>
