<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  interface Props {
    title: string;
    steps: string[];
  }
  let { title, steps }: Props = $props();

  const formatStep = (index: number) => String(index + 1).padStart(2, '0');
</script>

<section class="section--tight surface-soft">
  <div class="container panel">
    <SectionHeading {title} level={2} />
    <ol class="flow">
      {#each steps as step, index (step)}
        <li>
          <span>{formatStep(index)}</span>
          <p>{step}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .panel {
    display: grid;
    gap: 24px;
    max-width: 720px;
    margin-inline: auto;
  }

  .flow {
    position: relative;
    display: grid;
    gap: 14px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .flow::before {
    content: '';
    position: absolute;
    inset: 24px auto 24px 24px;
    width: 2px;
    background: linear-gradient(180deg, var(--color-primary-deep), rgba(214, 151, 76, 0.08));
  }

  li {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 16px;
    min-height: 72px;
    padding: 16px 18px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid var(--color-line);
    box-shadow: 0 18px 42px rgba(90, 72, 48, 0.08);
  }

  span {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 48px;
    aspect-ratio: 1;
    border-radius: 14px;
    color: #fff;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-deep));
    font-family: var(--font-heading);
    font-weight: 800;
    box-shadow: 0 10px 24px rgba(214, 151, 76, 0.22);
  }

  p {
    margin: 0;
    color: var(--color-ink);
    font-weight: 800;
    line-height: 1.6;
  }
</style>
