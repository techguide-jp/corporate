<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  interface Props {
    title: string;
    steps: string[];
  }
  let { title, steps }: Props = $props();
</script>

<section class="section--tight surface-soft">
  <div class="container panel">
    <SectionHeading {title} level={2} />
    <ol>
      {#each steps as step (step)}<li>{step}</li>{/each}
    </ol>
  </div>
</section>

<style>
  .panel {
    display: grid;
    gap: 16px;
  }
  ol {
    margin: 0;
    padding-left: 1.2rem;
    display: grid;
    gap: 10px;
  }
  li {
    padding: 10px 12px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid var(--color-line);
  }
</style>
