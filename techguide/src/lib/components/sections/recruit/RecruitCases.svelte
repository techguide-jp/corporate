<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  interface Item {
    title: string;
    description: string;
    points?: string[];
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
    <div class="cases">
      {#each items as item (item.title)}
        <article>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {#if item.points?.length}
            <ul>
              {#each item.points as point (point)}
                <li>{point}</li>
              {/each}
            </ul>
          {/if}
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

  .cases {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  article {
    display: grid;
    align-content: start;
    gap: 12px;
    padding: 20px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid rgba(117, 92, 56, 0.12);
    box-shadow: var(--shadow-soft);
  }

  h3 {
    font-size: 1.08rem;
    line-height: 1.4;
  }

  p {
    color: var(--color-ink-soft);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 5px 10px;
    border-radius: var(--radius-pill);
    background: rgba(255, 246, 214, 0.96);
    color: rgba(135, 99, 45, 0.96);
    font-size: 0.86rem;
    font-weight: 800;
  }

  @media (max-width: 760px) {
    .cases {
      grid-template-columns: 1fr;
    }
  }
</style>
