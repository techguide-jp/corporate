<script lang="ts">
  import { asset } from '$app/paths';
  import type { HeroContent } from '$lib/types/content';
  import ActionButton from '$lib/components/ui/ActionButton.svelte';

  interface Props {
    content: HeroContent;
  }

  let { content }: Props = $props();
  const backgroundStyle = $derived(`--hero-image: url('${asset(content.image)}')`);
</script>

<section class="hero" style={backgroundStyle}>
  <div class="container hero__inner">
    <div class="hero__content">
      <h1 class="text-balance">{content.title}</h1>
      <p class="hero__description">{content.description}</p>

      <div class="hero__actions">
        {#each content.actions as action}
          <ActionButton href={action.href} label={action.label} tone={action.tone} size="lg" />
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: clip;
    min-height: clamp(520px, 58vw, 700px);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 253, 248, 0.32) 100%),
      var(--hero-image) center center / cover no-repeat;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at center, rgba(255, 253, 248, 0.32) 0%, rgba(255, 253, 248, 0) 40%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 28%, rgba(255, 253, 248, 0.16) 100%);
    pointer-events: none;
  }

  .hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(255, 253, 248, 0.3) 0%, rgba(255, 253, 248, 0.08) 18%, transparent 34%, transparent 66%, rgba(255, 253, 248, 0.08) 82%, rgba(255, 253, 248, 0.3) 100%);
    pointer-events: none;
  }

  .hero__inner {
    position: relative;
    z-index: 1;
    min-height: inherit;
    display: grid;
    place-items: center;
    padding-block: clamp(92px, 10vw, 132px);
  }

  .hero__content {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 18px;
    text-align: center;
    max-width: 760px;
    padding: clamp(28px, 4vw, 44px) clamp(22px, 5vw, 52px);
    border-radius: min(36px, 4vw);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 249, 238, 0.46) 100%);
    border: 1px solid rgba(255, 255, 255, 0.48);
    box-shadow: 0 20px 40px rgba(95, 67, 32, 0.11);
    backdrop-filter: blur(18px) saturate(140%);
  }

  h1 {
    font-family: var(--font-heading);
    max-width: 15em;
    font-size: clamp(1.72rem, 4.1vw, 3.75rem);
    line-height: 1.12;
    letter-spacing: -0.06em;
    font-weight: 800;
    white-space: pre-line;
    color: rgba(33, 23, 13, 0.96);
  }

  .hero__description {
    max-width: 560px;
    font-size: clamp(1rem, 2vw, 1.16rem);
    color: rgba(69, 55, 37, 0.88);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    margin-top: 6px;
  }

  @media (max-width: 640px) {
    .hero {
      min-height: 520px;
      background-position: center;
    }

    .hero__content {
      padding: 26px 18px 24px;
      border-radius: 28px;
    }

    h1 {
      max-width: 11em;
      font-size: clamp(1.72rem, 5.8vw, 3rem);
    }

    .hero__actions {
      width: 100%;
      flex-direction: column;
    }
  }
</style>
