<script lang="ts">
  import { asset } from '$app/paths';
  import type { HeroContent } from '$lib/types/content';
  import ActionButton from '$lib/components/ui/ActionButton.svelte';

  interface Props {
    content: HeroContent;
  }

  let { content }: Props = $props();
  const imageSrc = $derived(asset(content.image));
</script>

<section class="hero">
  <img
    class="hero__media"
    src={imageSrc}
    alt={content.imageAlt}
    width={content.imageWidth}
    height={content.imageHeight}
    loading="eager"
    fetchpriority="high"
    decoding="async"
    aria-hidden={content.imageAlt ? undefined : 'true'}
  />

  <div class="container hero__inner">
    <div class="hero__content">
      <h1 class="text-balance">{content.title}</h1>
      <p class="hero__description">
        {#each content.descriptionLines as line, index (index)}
          <span class="hero__description-line">
            {#each line as phrase (phrase)}
              <span class="hero__phrase">{phrase}</span>
            {/each}
          </span>
        {/each}
      </p>

      <div class="hero__actions">
        {#each content.actions as action (action.href)}
          <ActionButton
            href={action.href}
            label={action.label}
            tone={action.tone}
            size="lg"
            analytics={action.analytics}
          />
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    overflow: clip;
    min-height: clamp(520px, 50vw, 680px);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 253, 248, 0.32) 100%
    );
  }

  .hero__media {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at center, rgba(255, 253, 248, 0.32) 0%, rgba(255, 253, 248, 0) 40%),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0) 28%,
        rgba(255, 253, 248, 0.16) 100%
      );
    pointer-events: none;
  }

  .hero::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      90deg,
      rgba(255, 253, 248, 0.3) 0%,
      rgba(255, 253, 248, 0.08) 18%,
      transparent 34%,
      transparent 66%,
      rgba(255, 253, 248, 0.08) 82%,
      rgba(255, 253, 248, 0.3) 100%
    );
    pointer-events: none;
  }

  .hero__inner {
    position: relative;
    z-index: 1;
    min-height: inherit;
    display: grid;
    place-items: center;
    padding-block: clamp(40px, 5vw, 72px);
  }

  .hero__content {
    --hero-title-size: clamp(1.65rem, calc(1.1rem + 2.4vw), 3.5rem);
    --hero-inline-padding: clamp(22px, 5vw, 52px);
    position: relative;
    display: grid;
    justify-items: center;
    gap: 18px;
    text-align: center;
    inline-size: min(100%, 49rem);
    padding: clamp(28px, 4vw, 44px) var(--hero-inline-padding);
    border-radius: min(36px, 4vw);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.82) 0%,
      rgba(255, 249, 238, 0.78) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.48);
    box-shadow: 0 20px 40px rgba(95, 67, 32, 0.11);
    backdrop-filter: blur(18px) saturate(140%);
  }

  h1 {
    font-family: var(--font-heading);
    max-width: 11.5em;
    font-size: var(--hero-title-size);
    line-height: 1.4;
    letter-spacing: -0.04em;
    font-weight: 800;
    white-space: pre-line;
    color: rgba(33, 23, 13, 0.96);
  }

  .hero__description {
    max-width: 34rem;
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    line-height: 1.85;
    color: rgb(69, 55, 37);
  }

  .hero__description-line {
    display: block;
  }

  .hero__phrase {
    display: inline-block;
    max-width: 100%;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    inline-size: min(100%, 30rem);
    gap: 14px;
    margin-top: 6px;
  }

  .hero__actions :global(.action-button) {
    flex: 1 1 220px;
    min-width: 0;
  }

  @media (max-width: 640px) {
    .hero__inner {
      padding-block: 24px;
    }

    .hero__content {
      --hero-inline-padding: 18px;
      padding: 26px var(--hero-inline-padding) 24px;
      border-radius: 28px;
      gap: 16px;
    }
  }
</style>
