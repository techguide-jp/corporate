<script lang="ts">
  interface Props {
    lead: string;
    title: string;
    description: string;
  }

  let { lead, title, description }: Props = $props();
</script>

<section class="recruit-hero section--tight">
  <div class="container recruit-hero__inner">
    <p class="recruit-hero__lead">{lead}</p>
    <h1>{title}</h1>
    <p class="recruit-hero__description">{description}</p>
  </div>
</section>

<style>
  .recruit-hero {
    padding-top: clamp(44px, 6vw, 72px);
  }

  .recruit-hero__inner {
    display: grid;
    gap: 14px;
    padding: clamp(24px, 4vw, 42px);
    border: 1px solid rgba(117, 92, 56, 0.14);
    border-radius: var(--radius-large);
    background: linear-gradient(140deg, rgba(255, 247, 226, 0.98), rgba(255, 254, 248, 0.96));
    box-shadow: var(--shadow-soft);
  }

  .recruit-hero__lead {
    font-weight: 800;
    color: rgba(135, 99, 45, 0.95);
  }

  h1 {
    font-size: clamp(1.7rem, 3.2vw, 2.5rem);
    line-height: 1.35;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  .recruit-hero__description {
    color: var(--color-ink-soft);
    max-width: 68ch;
  }
</style>
