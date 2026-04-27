<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  interface Props {
    title: string;
    items: string[];
  }
  let { title, items }: Props = $props();

  const formatIndex = (index: number) => String(index + 1).padStart(2, '0');
</script>

<section class="section--tight">
  <div class="container panel">
    <SectionHeading {title} level={2} />
    <div class="cards">
      {#each items as item, index (item)}
        <article>
          <span>POINT {formatIndex(index)}</span>
          <p>{item}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .panel {
    display: grid;
    gap: 16px;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }
  article {
    position: relative;
    display: grid;
    gap: 14px;
    min-height: 136px;
    padding: 22px;
    border-radius: 18px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 249, 232, 0.92)),
      var(--color-surface);
    border: 1px solid var(--color-line);
    box-shadow: 0 18px 44px rgba(90, 72, 48, 0.08);
    overflow: hidden;
    font-weight: 700;
  }

  article::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary-deep), var(--color-tertiary));
  }

  span {
    color: var(--color-primary-deep);
    font-family: var(--font-heading);
    font-size: 0.78rem;
    line-height: 1;
    letter-spacing: 0.08em;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: var(--color-ink);
    font-size: clamp(1rem, 1.5vw, 1.12rem);
    line-height: 1.7;
  }
</style>
