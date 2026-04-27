<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  interface Item {
    title: string;
    description: string;
  }

  interface Props {
    title: string;
    subtitle: string;
    items: Item[];
  }

  let { title, subtitle, items }: Props = $props();
</script>

<section class="section--tight">
  <div class="container panel">
    <SectionHeading {title} {subtitle} level={2} />
    <div class="grid">
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }

  article {
    display: grid;
    gap: 10px;
    padding: 18px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid rgba(117, 92, 56, 0.12);
  }

  h3 {
    font-size: 1rem;
  }

  p {
    color: var(--color-ink-soft);
  }
</style>
