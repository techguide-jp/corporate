<script lang="ts">
  import { asset } from '$app/paths';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import type { ShowcaseItem } from '$lib/types/content';

  interface Props {
    id: string;
    title: string;
    subtitle?: string;
    items: ShowcaseItem[];
    surface?: 'plain' | 'soft';
  }

  let { id, title, subtitle, items, surface = 'plain' }: Props = $props();
</script>

<section class={`section showcase showcase--${surface}`} {id}>
  <div class="container">
    <SectionHeading {title} {subtitle} />

    <div class="showcase__grid">
      {#each items as item (item.href)}
        <article class="showcase-card">
          <a
            class="showcase-card__image-link"
            href={item.href}
            target="_blank"
            rel="external noreferrer"
            aria-label={`${item.title} を開く`}
          >
            <img src={asset(item.image)} alt={item.title} loading="lazy" />
          </a>

          <div class="showcase-card__body">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a
              class="showcase-card__link"
              href={item.href}
              target="_blank"
              rel="external noreferrer"
            >
              {item.ctaLabel}
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .showcase--soft {
    background: linear-gradient(
      180deg,
      rgba(248, 241, 216, 0.7) 0%,
      rgba(255, 249, 237, 0.96) 100%
    );
  }

  .showcase__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: clamp(18px, 2vw, 24px);
  }

  .showcase-card {
    overflow: hidden;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid rgba(117, 92, 56, 0.12);
    box-shadow: var(--shadow-card);
  }

  .showcase-card__image-link {
    display: block;
    overflow: hidden;
    background: rgba(248, 242, 225, 0.8);
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.22s ease;
  }

  .showcase-card:hover img {
    transform: scale(1.02);
  }

  .showcase-card__body {
    display: grid;
    gap: 12px;
    padding: clamp(20px, 2.6vw, 26px);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: clamp(1.35rem, 2vw, 1.75rem);
    line-height: 1.2;
    letter-spacing: -0.03em;
    font-weight: 800;
  }

  p {
    color: var(--color-ink-soft);
  }

  .showcase-card__link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    width: fit-content;
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .showcase-card__link::after {
    content: '↗';
    font-size: 0.95em;
  }
</style>
