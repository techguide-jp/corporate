<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  interface Props {
    title: string;
    good: string[];
    notGood: string[];
  }
  let { title, good, notGood }: Props = $props();
</script>

<section class="section--tight surface-soft">
  <div class="container panel">
    <SectionHeading {title} level={2} />
    <div class="grid">
      <section>
        <h3>向いている人</h3>
        <ul>
          {#each good as item (item)}<li>{item}</li>{/each}
        </ul>
      </section>
      <section>
        <h3>向いていない人</h3>
        <ul>
          {#each notGood as item (item)}<li>{item}</li>{/each}
        </ul>
      </section>
    </div>
  </div>
</section>

<style>
  .panel {
    display: grid;
    gap: 16px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }
  section {
    background: #fff;
    border: 1px solid var(--color-line);
    border-radius: 18px;
    padding: 16px;
  }
  ul {
    margin: 10px 0 0;
    padding-left: 1.2rem;
    display: grid;
    gap: 8px;
    color: var(--color-ink-soft);
  }
</style>
