<script lang="ts">
  import { page } from '$app/state';
  import { untrack } from 'svelte';
  import type { NavItem } from '$lib/types/content';
  import LogoMark from '$lib/components/ui/LogoMark.svelte';

  interface Props {
    items: NavItem[];
  }

  let { items }: Props = $props();
  let menuOpen = $state(false);

  function closeMenu() {
    menuOpen = false;
  }

  function isActive(href: string) {
    if (href.startsWith('/#')) {
      return page.url.pathname === '/' && page.url.hash === href.slice(1);
    }

    return page.url.pathname === href;
  }

  function ariaCurrentValue(href: string) {
    return href.startsWith('/#') ? 'location' : 'page';
  }

  $effect(() => {
    page.url.pathname;
    page.url.hash;

    if (untrack(() => menuOpen)) {
      closeMenu();
    }
  });
</script>

<header class="header" id="top">
  <div class="container header__inner">
    <a class="brand" href="/" aria-label="TechGuide ホームへ移動">
      <LogoMark />
      <span>TechGuide</span>
    </a>

    <button
      class:menu-toggle--open={menuOpen}
      class="menu-toggle"
      type="button"
      aria-controls="site-nav"
      aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    {#if menuOpen}
      <button class="nav-backdrop" type="button" aria-label="メニューを閉じる" onclick={closeMenu}>
      </button>
    {/if}

    <nav
      class={`nav ${menuOpen ? 'nav--open' : ''}`}
      id="site-nav"
      aria-label="主要ナビゲーション"
    >
      <ul>
        {#each items as item}
          <li>
            <a
              class:nav__link--active={isActive(item.href)}
              href={item.href}
              aria-current={isActive(item.href) ? ariaCurrentValue(item.href) : undefined}
              onclick={closeMenu}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 30;
    backdrop-filter: blur(16px);
    background: rgba(255, 253, 248, 0.9);
    box-shadow: 0 1px 0 rgba(117, 92, 56, 0.1);
  }

  .header__inner {
    min-height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: var(--font-heading);
    font-size: 1.65rem;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .nav ul {
    display: flex;
    align-items: center;
    gap: clamp(18px, 2vw, 30px);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding-inline: 2px;
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: var(--color-ink);
    transition:
      color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;
  }

  .nav a:hover {
    color: var(--color-primary-deep);
  }

  .nav__link--active {
    color: var(--color-primary-deep);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 10px;
  }

  .menu-toggle {
    display: none;
    width: 48px;
    height: 48px;
    padding: 12px;
    border-radius: 14px;
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
  }

  .menu-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    margin-block: 5px;
    border-radius: 999px;
    background: var(--color-ink);
    transform-origin: center;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  .menu-toggle--open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .menu-toggle--open span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle--open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 980px) {
    .menu-toggle {
      display: inline-block;
      position: relative;
      z-index: 32;
    }

    .nav-backdrop {
      position: fixed;
      inset: var(--header-height) 0 0;
      z-index: 30;
      background: rgba(47, 36, 24, 0.18);
      backdrop-filter: blur(4px);
    }

    .nav {
      position: fixed;
      inset: calc(var(--header-height) + 10px) 14px auto;
      z-index: 31;
      padding: 18px;
      border: 1px solid rgba(117, 92, 56, 0.14);
      border-radius: 24px;
      background: rgba(255, 253, 248, 0.98);
      box-shadow: var(--shadow-card);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        visibility 0.2s ease;
    }

    .nav--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .nav ul {
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
    }

    .nav a {
      justify-content: center;
      border-radius: 14px;
      background: rgba(250, 246, 236, 0.82);
      padding: 12px 18px;
    }

    .nav__link--active {
      text-decoration: none;
      background: rgba(244, 231, 203, 0.96);
      color: var(--color-primary-deep);
    }
  }

  @media (max-width: 720px) {
    .brand span {
      font-size: 1.4rem;
    }
  }
</style>
