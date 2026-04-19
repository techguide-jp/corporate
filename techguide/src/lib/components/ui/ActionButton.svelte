<script lang="ts">
  import { resolve } from '$app/paths';
  import { trackEvent } from '$lib/analytics';
  import type { AnalyticsMetadata } from '$lib/analytics';

  interface Props {
    href: string;
    label: string;
    tone?: 'warm' | 'light';
    size?: 'md' | 'lg';
    analytics?: AnalyticsMetadata;
  }

  type ResolvableHref = Parameters<typeof resolve>[0];

  let { href, label, tone = 'warm', size = 'md', analytics }: Props = $props();

  function handleClick() {
    if (!analytics) {
      return;
    }

    trackEvent(analytics.eventName, analytics.params);
  }
</script>

{#if href.startsWith('/')}
  <a
    class={`action-button action-button--${tone} action-button--${size}`}
    href={resolve(href as ResolvableHref)}
    onclick={handleClick}
  >
    {label}
  </a>
{:else}
  <a
    class={`action-button action-button--${tone} action-button--${size}`}
    {href}
    rel="external noreferrer"
    onclick={handleClick}
  >
    {label}
  </a>
{/if}

<style>
  .action-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    padding-inline: 28px;
    border-radius: var(--radius-pill);
    font-weight: 700;
    letter-spacing: 0.02em;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease,
      background 0.2s ease;
    text-align: center;
    white-space: nowrap;
  }

  .action-button:hover {
    transform: translateY(-1px);
  }

  .action-button:active {
    transform: translateY(2px);
  }

  .action-button--warm {
    color: rgba(255, 255, 255, 0.96);
    background: linear-gradient(
      180deg,
      rgba(248, 187, 114, 1) 0%,
      rgba(235, 162, 86, 1) 56%,
      rgba(214, 132, 58, 1) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.32),
      0 7px 0 rgba(181, 113, 53, 0.72),
      0 16px 26px rgba(224, 164, 91, 0.24);
  }

  .action-button--warm:hover {
    background: linear-gradient(
      180deg,
      rgba(255, 197, 128, 1) 0%,
      rgba(242, 170, 93, 1) 56%,
      rgba(220, 136, 62, 1) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.34),
      0 9px 0 rgba(171, 104, 45, 0.78),
      0 20px 30px rgba(214, 145, 67, 0.3);
  }

  .action-button--warm:active {
    box-shadow:
      inset 0 2px 4px rgba(126, 73, 23, 0.28),
      0 3px 0 rgba(171, 104, 45, 0.78),
      0 10px 16px rgba(214, 145, 67, 0.2);
  }

  .action-button--light {
    color: var(--color-ink);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(250, 243, 231, 0.98) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92),
      0 7px 0 rgba(194, 173, 143, 0.95),
      0 14px 24px rgba(104, 72, 28, 0.16);
  }

  .action-button--light:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(246, 236, 220, 1) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.96),
      0 9px 0 rgba(187, 165, 135, 1),
      0 18px 28px rgba(104, 72, 28, 0.2);
  }

  .action-button--light:active {
    box-shadow:
      inset 0 2px 4px rgba(150, 124, 87, 0.18),
      0 3px 0 rgba(187, 165, 135, 1),
      0 10px 16px rgba(104, 72, 28, 0.14);
  }

  .action-button--md {
    min-width: 180px;
  }

  .action-button--lg {
    min-width: 220px;
    min-height: 60px;
    padding-inline: 32px;
  }
</style>
