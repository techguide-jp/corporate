<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import type { ServiceItem } from '$lib/types/content';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { getResolveArgs } from '$lib/utils/paths';

  interface Props {
    items: ServiceItem[];
  }

  let { items }: Props = $props();
</script>

<section class="section section--tight services" id="services">
  <div class="container">
    <SectionHeading
      title="支援領域"
      subtitle="TechGuide が伴走できる支援領域の全体像を、まずは要約でご覧いただけます。"
    />

    <div class="services__grid">
      {#each items as item (item.href)}
        <a
          class="service"
          href={resolve(...getResolveArgs(item.href))}
          aria-label={`${item.title} の詳細を見る`}
        >
          <div class="service__image">
            <img src={asset(item.image)} alt={item.imageAlt} loading="lazy" />
          </div>

          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .services {
    padding-top: clamp(44px, 6vw, 68px);
  }

  .services__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(18px, 2vw, 24px);
  }

  .service {
    display: grid;
    align-content: start;
    gap: 16px;
    overflow: hidden;
    border-radius: 26px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(117, 92, 56, 0.12);
    box-shadow: var(--shadow-soft);
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease,
      border-color 0.22s ease;
  }

  .service:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card);
    border-color: rgba(214, 151, 76, 0.28);
  }

  .service__image {
    overflow: hidden;
    background: rgba(248, 242, 225, 0.86);
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: center;
    transition: transform 0.28s ease;
  }

  .service:hover img {
    transform: scale(1.02);
  }

  h3,
  p {
    padding-inline: clamp(18px, 2.8vw, 26px);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: clamp(1.22rem, 1.75vw, 1.52rem);
    line-height: 1.35;
    letter-spacing: -0.03em;
    font-weight: 800;
    padding-top: 4px;
  }

  p {
    color: var(--color-ink-soft);
    font-size: 0.98rem;
    line-height: 1.75;
    padding-bottom: clamp(20px, 2.6vw, 26px);
  }

  @media (max-width: 880px) {
    .services__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
