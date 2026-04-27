<script lang="ts">
  import { resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import { getResolveArgs, type InternalHref } from '$lib/utils/paths';

  interface Props {
    lead: string;
    title: string;
    description: string;
    badges: string[];
    ctaLabel: string;
    ctaHref: InternalHref;
  }

  let { lead, title, description, badges, ctaLabel, ctaHref }: Props = $props();

  function onCtaClick() {
    trackEvent('contact_cta_click', { placement: 'recruit_hero' });
  }
</script>

<section class="recruit-hero section--tight">
  <div class="container recruit-hero__inner">
    <div class="recruit-hero__content">
      <p class="recruit-hero__lead">{lead}</p>
      <h1>{title}</h1>
      <p class="recruit-hero__description">{description}</p>
      <a
        class="recruit-hero__button"
        href={resolve(...getResolveArgs(ctaHref))}
        onclick={onCtaClick}
      >
        {ctaLabel}
      </a>
    </div>

    <ul class="recruit-hero__badges" aria-label="募集条件">
      {#each badges as badge (badge)}
        <li>{badge}</li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .recruit-hero {
    padding-top: clamp(44px, 6vw, 72px);
  }

  .recruit-hero__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    align-items: center;
    gap: clamp(20px, 4vw, 48px);
    padding: clamp(24px, 4vw, 42px);
    border: 1px solid rgba(117, 92, 56, 0.14);
    border-radius: var(--radius-large);
    background: linear-gradient(140deg, rgba(255, 247, 226, 0.98), rgba(255, 254, 248, 0.96));
    box-shadow: var(--shadow-soft);
  }

  .recruit-hero__content {
    display: grid;
    gap: 14px;
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

  .recruit-hero__button {
    justify-self: start;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    padding-inline: 28px;
    border-radius: var(--radius-pill);
    color: #fff;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-deep));
    box-shadow: var(--shadow-button);
  }

  .recruit-hero__badges {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .recruit-hero__badges li {
    display: grid;
    place-items: center;
    min-height: 76px;
    padding: 14px;
    border-radius: 18px;
    color: rgba(76, 62, 43, 0.95);
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(117, 92, 56, 0.12);
    font-weight: 800;
    text-align: center;
  }

  @media (max-width: 820px) {
    .recruit-hero__inner {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 520px) {
    .recruit-hero__badges {
      grid-template-columns: 1fr;
    }

    .recruit-hero__button {
      justify-self: stretch;
    }
  }
</style>
