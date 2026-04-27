<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  interface Props { title: string; frontend: string[]; platform: string[] }
  let { title, frontend, platform }: Props = $props();
</script>
<section class="section--tight surface-soft">
  <div class="container panel">
    <SectionHeading title={title} level={2} />
    <div class="grid">
      <section><h3>フロントエンド</h3><ul>{#each frontend as item (item)}<li>{item}</li>{/each}</ul></section>
      <section><h3>インフラ / プラットフォーム</h3><ul>{#each platform as item (item)}<li>{item}</li>{/each}</ul></section>
    </div>
  </div>
</section>
<style>
.panel{display:grid;gap:16px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
section{background:#fff;border:1px solid var(--color-line);border-radius:18px;padding:16px}
h3{font-size:1rem}ul{margin:10px 0 0;padding-left:1.2rem;color:var(--color-ink-soft)}
</style>
