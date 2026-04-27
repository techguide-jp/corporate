<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  interface Props {
    title: string;
    items: string[];
  }
  let { title, items }: Props = $props();
</script>

<section class="section--tight">
  <div class="container panel">
    <SectionHeading {title} level={2} />
    <div class="cards">
      {#each items as item (item)}<article>{item}</article>{/each}
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
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }
  article {
    padding: 16px;
    border-radius: 16px;
    background: rgba(255, 248, 231, 0.88);
    border: 1px solid var(--color-line);
    font-weight: 700;
  }
</style>
