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
    <SectionHeading title={title} level={2} />
    <ul>
      {#each items as item (item)}
        <li>{item}</li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .panel {
    display: grid;
    gap: 16px;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;
    display: grid;
    gap: 10px;
    color: var(--color-ink-soft);
  }
</style>
