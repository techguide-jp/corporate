<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  interface Props { title: string; items: string[] }
  let { title, items }: Props = $props();
</script>
<section class="section--tight surface-soft">
  <div class="container panel">
    <SectionHeading title={title} level={2} />
    <div class="chips">
      {#each items as item (item)}<p>{item}</p>{/each}
    </div>
  </div>
</section>
<style>
  .panel{display:grid;gap:16px}.chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
  .chips p{padding:14px 16px;border-radius:16px;background:#fff;border:1px solid var(--color-line);font-weight:700}
</style>
