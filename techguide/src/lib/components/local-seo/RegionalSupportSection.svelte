<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import { chigasakiHubLink, chigasakiServiceLinks } from '$lib/local-seo/chigasaki/shared';
  import { getResolveArgs } from '$lib/utils/paths';

  let { placement }: { placement: 'home' | 'services' } = $props();

  function trackLink(href: string) {
    trackEvent('regional_link_click', { placement, destination_page: href });
  }
</script>

<section class="section regional-support">
  <div class="container regional-support__inner">
    <div class="regional-support__visual">
      <img
        src={asset(chigasakiHubLink.image)}
        alt={chigasakiHubLink.imageAlt}
        width="1536"
        height="864"
        loading="lazy"
      />
    </div>
    <div class="regional-support__copy">
      <p class="regional-support__eyebrow">茅ヶ崎市内で対面相談できます</p>
      <h2>茅ヶ崎で、集客と業務を整えたい方へ</h2>
      <p>
        ホームページの見直し、予約・顧客管理、転記作業の削減など、店舗や事業の現場で起きている困りごとから相談できます。
      </p>
      <nav class="regional-support__tags" aria-label="茅ヶ崎のサービス">
        {#each chigasakiServiceLinks as item (item.href)}
          <a href={resolve(...getResolveArgs(item.href))} onclick={() => trackLink(item.href)}
            >{item.ctaLabel}</a
          >
        {/each}
      </nav>
      <a
        class="regional-support__link"
        href={resolve(...getResolveArgs(chigasakiHubLink.href))}
        onclick={() => trackLink(chigasakiHubLink.href)}
      >
        茅ヶ崎エリア向け支援を見る
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>

<style>
  .regional-support {
    background: linear-gradient(180deg, rgba(255, 253, 248, 0.92), rgba(247, 240, 213, 0.88));
  }

  .regional-support__inner {
    display: grid;
    grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(30px, 5vw, 68px);
    align-items: center;
  }

  .regional-support__visual img {
    width: 100%;
    aspect-ratio: 16 / 11;
    border-radius: 28px;
    object-fit: cover;
    object-position: top center;
    box-shadow: var(--shadow-card);
  }

  .regional-support__copy {
    display: grid;
    justify-items: start;
    gap: 18px;
  }

  .regional-support__eyebrow {
    color: rgba(38, 92, 96, 0.94);
    font-family: var(--font-heading);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .regional-support__copy > p:not(.regional-support__eyebrow) {
    color: var(--color-ink-soft);
  }

  .regional-support__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .regional-support__tags a {
    padding: 7px 12px;
    border-radius: var(--radius-pill);
    background: rgba(255, 246, 214, 0.86);
    color: rgba(100, 73, 34, 0.94);
    font-size: 0.84rem;
    font-weight: 800;
  }

  .regional-support__link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 52px;
    padding-inline: 22px;
    border-radius: var(--radius-pill);
    background: var(--color-primary);
    color: rgba(79, 54, 21, 0.96);
    font-weight: 800;
    box-shadow: var(--shadow-button);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .regional-support__link:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 26px rgba(224, 164, 91, 0.3);
  }

  .regional-support__copy h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    line-height: 1.3;
    font-weight: 800;
  }

  .regional-support__tags a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  @media (max-width: 900px) {
    .regional-support__inner {
      grid-template-columns: 1fr;
    }
  }
</style>
