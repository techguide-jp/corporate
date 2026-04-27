<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  interface Item {
    title: string;
    description: string;
  }

  interface Props {
    title: string;
    items: Item[];
  }

  let { title, items }: Props = $props();
</script>

<section class="section--tight surface-soft">
  <div class="container panel">
    <SectionHeading {title} level={2} />
    <div class="conditions">
      {#each items as item (item.title)}
        <article>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .panel {
    display: grid;
    gap: 18px;
  }

  .conditions {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  article {
    display: grid;
    align-content: start;
    gap: 8px;
    padding: 18px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid var(--color-line);
  }

  h3 {
    font-size: 1rem;
  }

  p {
    color: var(--color-ink-soft);
  }

  @media (max-width: 960px) {
    .conditions {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 560px) {
    .conditions {
      grid-template-columns: 1fr;
    }
  }
</style>
