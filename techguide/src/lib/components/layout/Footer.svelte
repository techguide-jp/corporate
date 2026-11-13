<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { trackEvent } from '$lib/analytics';
  import { chigasakiHubLink } from '$lib/local-seo/chigasaki/shared';
  import type { NavItem } from '$lib/types/content';
  import { getResolveArgs, isNavigationItemActive } from '$lib/utils/paths';

  interface Props {
    companyName: string;
    items: NavItem[];
  }

  let { companyName, items }: Props = $props();
  const currentYear = new Date().getFullYear();
  const linkGroups = [
    { title: 'サービス・実績', paths: ['/services/', '/#works', chigasakiHubLink.href] },
    { title: '会社情報', paths: ['/#company', '/profile/', '/recruit/', '/contact/'] },
  ];
  const footerItems = $derived([
    ...items,
    { label: '茅ヶ崎での支援', href: chigasakiHubLink.href },
  ]);
  const footerGroups = $derived(
    linkGroups.map(({ title, paths }) => ({
      title,
      links: footerItems.filter((item) => paths.includes(item.href)),
    })),
  );

  function isActive(href: string) {
    return isNavigationItemActive({
      currentHash: page.url.hash,
      currentPathname: page.url.pathname,
      href,
    });
  }

  function scrollToTop() {
    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(window.history.state, '', cleanUrl);
    }

    window.scrollTo({ top: 0 });
  }

  function trackRegionalLink(href: string) {
    if (href === chigasakiHubLink.href) {
      trackEvent('regional_link_click', { placement: 'footer', destination_page: href });
    }
  }
</script>

<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <a class="footer__brand-link" href={resolve('/')} aria-label="TechGuide ホームへ移動"
        >{companyName}</a
      >
    </div>

    <div class="footer__links">
      {#each footerGroups as group (group.title)}
        <div class="footer__group">
          <p class="footer__label">{group.title}</p>
          <nav aria-label={'フッターの' + group.title}>
            {#each group.links as item (item.href)}
              <a
                class:footer__link--active={isActive(item.href)}
                href={resolve(...getResolveArgs(item.href))}
                onclick={() => trackRegionalLink(item.href)}
                >{item.href === '/#company' ? '会社概要' : item.label}</a
              >
            {/each}
          </nav>
        </div>
      {/each}
    </div>

    <div class="footer__meta">
      <p>© {currentYear} {companyName}</p>
      <button class="footer__top" type="button" onclick={scrollToTop}>ページ上部へ戻る</button>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding-block: clamp(26px, 4vw, 42px) 18px;
    border-top: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    color: var(--color-ink);
  }

  .footer__inner {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    align-items: start;
    gap: 20px clamp(16px, 4vw, 48px);
  }

  .footer__brand-link {
    display: inline-block;
    padding-block: 6px;
    font-family: var(--font-heading);
    font-size: 1.12rem;
    font-weight: 800;
  }

  .footer__links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .footer__label {
    margin-bottom: 3px;
    color: var(--color-ink-soft);
    font-size: 0.83rem;
    font-weight: 750;
  }

  nav {
    display: grid;
    justify-items: start;
  }

  nav a,
  .footer__top {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    font-size: 0.92rem;
    font-weight: 650;
  }

  nav a:hover,
  .footer__top:hover,
  .footer__link--active {
    text-decoration: underline;
    text-underline-offset: 0.24em;
  }

  .footer__meta {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0 16px;
    padding-top: 8px;
    border-top: 1px solid var(--color-line);
    color: var(--color-ink-soft);
    font-size: 0.8rem;
  }

  .footer__top {
    padding: 0;
    color: inherit;
    font-size: inherit;
  }

  @media (max-width: 620px) {
    .footer__inner {
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }

    nav a,
    .footer__top {
      min-height: 44px;
    }
  }
</style>
