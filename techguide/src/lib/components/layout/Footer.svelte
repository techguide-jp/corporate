<script lang="ts">
  import { browser } from '$app/environment';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import type { NavItem } from '$lib/types/content';

  interface Props {
    companyName: string;
    items: NavItem[];
  }

  type ResolvableHref = Parameters<typeof resolve>[0];

  let { companyName, items }: Props = $props();
  let showFloatingTop = $state(false);

  const currentYear = new Date().getFullYear();

  function isActive(href: string) {
    if (href.startsWith('/#')) {
      return page.url.pathname === '/' && page.url.hash === href.slice(1);
    }

    return page.url.pathname === href;
  }

  function scrollToTop() {
    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(window.history.state, '', cleanUrl);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateFloatingTopVisibility() {
    showFloatingTop = window.scrollY > 0;
  }

  $effect(() => {
    if (!browser) {
      return;
    }

    updateFloatingTopVisibility();

    const handleScroll = () => {
      updateFloatingTopVisibility();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <a class="footer__brand-link" href={resolve('/')} aria-label="TechGuide ホームへ移動">
        <span>{companyName}</span>
      </a>
      <p class="footer__summary">IT導入、LP制作、AI活用まで、現場に合わせて伴走します。</p>
    </div>

    <div class="footer__links">
      <p class="footer__label">サイトマップ</p>
      <nav aria-label="フッターリンク">
        {#each items as item (item.href)}
          <a
            class:footer__link--active={isActive(item.href)}
            href={resolve(item.href as ResolvableHref)}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>

    <div class="footer__meta">
      <p>© {currentYear} {companyName}</p>
    </div>
  </div>
</footer>

{#if showFloatingTop}
  <button class="floating-top" type="button" aria-label="ページ最上部へ戻る" onclick={scrollToTop}>
    TOPへ
  </button>
{/if}

<style>
  .footer {
    padding-block: 34px 36px;
    background: linear-gradient(180deg, rgba(255, 248, 231, 0.92) 0%, rgba(255, 253, 248, 1) 100%);
    border-top: 1px solid rgba(117, 92, 56, 0.12);
  }

  .footer__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.9fr) auto;
    align-items: start;
    gap: 28px;
    color: rgba(76, 62, 43, 0.88);
    font-size: 0.95rem;
  }

  .footer__brand {
    display: grid;
    gap: 12px;
  }

  .footer__brand-link {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: var(--font-heading);
    font-size: 1.18rem;
    font-weight: 800;
  }

  .footer__summary {
    max-width: 28rem;
    color: var(--color-ink-soft);
  }

  nav a,
  .floating-top {
    transition: color 0.2s ease;
  }

  .footer__links {
    display: grid;
    gap: 12px;
  }

  .footer__label {
    font-family: var(--font-heading);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(135, 99, 45, 0.88);
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 18px;
  }

  nav a {
    color: rgba(76, 62, 43, 0.88);
    font-weight: 700;
  }

  .footer__link--active {
    color: var(--color-primary-deep);
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .footer__meta {
    display: grid;
    justify-items: end;
    gap: 0;
    text-align: right;
    color: var(--color-ink-soft);
  }

  nav a:hover,
  .floating-top:hover {
    color: var(--color-primary-deep);
  }

  .floating-top {
    position: fixed;
    right: max(18px, calc(18px + env(safe-area-inset-right)));
    bottom: calc(18px + env(safe-area-inset-bottom));
    z-index: 20;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 18px;
    border-radius: var(--radius-pill);
    background: rgba(255, 252, 246, 0.94);
    box-shadow: 0 12px 28px rgba(111, 83, 41, 0.18);
    border: 1px solid rgba(117, 92, 56, 0.14);
    color: rgba(76, 62, 43, 0.88);
    font-family: var(--font-heading);
    font-size: 0.88rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    backdrop-filter: blur(12px);
  }

  @media (max-width: 720px) {
    .footer__inner {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    nav {
      justify-content: center;
    }

    .footer__brand,
    .footer__links,
    .footer__meta {
      justify-items: center;
      text-align: center;
    }

    .floating-top {
      right: max(14px, calc(14px + env(safe-area-inset-right)));
      bottom: calc(14px + env(safe-area-inset-bottom));
      min-height: 42px;
      padding-inline: 16px;
      font-size: 0.82rem;
    }
  }
</style>
