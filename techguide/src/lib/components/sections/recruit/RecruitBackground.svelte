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
    max-width: 560px;
    margin-inline: auto;
  }
  ul {
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
    padding-left: 1.2rem;
    color: var(--color-ink-soft);
    display: grid;
    gap: 10px;
  }
</style>
