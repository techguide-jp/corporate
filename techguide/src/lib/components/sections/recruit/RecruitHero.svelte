<script lang="ts">
  import ActionButton from '$lib/components/ui/ActionButton.svelte';

  interface Props {
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
    formUrl: string;
    buttonLabel: string;
  }

  let { eyebrow, title, lead, note, formUrl, buttonLabel }: Props = $props();
</script>

<section class="recruit-hero">
  <div class="container recruit-hero__inner">
    <p class="recruit-hero__eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    <p class="recruit-hero__lead">{lead}</p>
    <p class="recruit-hero__note">{note}</p>
    <ActionButton href={formUrl} label={buttonLabel} size="lg" analytics={{ eventName: 'contact_cta_click', params: { placement: 'recruit_hero' } }} />
  </div>
</section>

<style>
  .recruit-hero {
    padding-block: clamp(72px, 10vw, 120px);
    background: linear-gradient(180deg, rgba(255, 248, 238, 0.96) 0%, rgba(250, 241, 226, 0.8) 100%);
  }

  .recruit-hero__inner {
    display: grid;
    justify-items: center;
    gap: 20px;
    text-align: center;
  }

  .recruit-hero__eyebrow {
    color: var(--color-accent, #d8893d);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 920px;
    font-family: var(--font-heading);
    font-size: clamp(2.1rem, 5.4vw, 4.9rem);
    line-height: 1.12;
    letter-spacing: -0.05em;
  }

  .recruit-hero__lead,
  .recruit-hero__note {
    max-width: 760px;
    color: var(--color-ink-soft);
    line-height: 1.9;
  }

  .recruit-hero__lead {
    font-size: clamp(1.05rem, 1.8vw, 1.24rem);
  }
</style>
