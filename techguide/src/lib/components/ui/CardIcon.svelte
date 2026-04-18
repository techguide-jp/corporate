<script lang="ts">
  type IconKind = 'consulting' | 'development' | 'ai' | 'readymock' | 'ticketcraft' | 'lpboost';

  interface Props {
    kind: IconKind;
  }

  let { kind }: Props = $props();
</script>

{#if kind === 'consulting'}
  <svg viewBox="0 0 88 88" aria-hidden="true" class="icon">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="30" r="15" stroke-width="4" />
      <path
        d="M50 11v-7M62.5 16.5l5-5M69 30h7M62.5 43.5l5 5M50 49v7M37.5 43.5l-5 5M31 30h-7M37.5 16.5l-5-5"
        stroke-width="4"
      />
      <path d="M20 56h48v10a8 8 0 0 1-8 8H28a8 8 0 0 1-8-8V56Z" stroke-width="4" />
      <path d="M27 56v-7c0-6 5-11 11-11h24c6 0 11 5 11 11v7" stroke-width="4" />
    </g>
  </svg>
{:else if kind === 'development'}
  <svg viewBox="0 0 88 88" aria-hidden="true" class="icon">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="60" height="42" rx="10" stroke-width="4" />
      <path d="M14 31h60" stroke-width="4" />
      <path d="M26 44l8-8-8 8 8 8M62 44l-8-8 8 8-8 8M48 33l-8 22" stroke-width="4" />
      <path d="M32 71h24" stroke-width="4" />
    </g>
  </svg>
{:else if kind === 'ai'}
  <svg viewBox="0 0 88 88" aria-hidden="true" class="icon">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path
        d="M34 18c-11 2-18 11-18 22 0 11 8 20 18 22m20-44c11 2 18 11 18 22 0 11-8 20-18 22"
        stroke-width="4"
      />
      <path d="M34 18c5 4 7 9 7 15s-2 11-7 15m20-30c-5 4-7 9-7 15s2 11 7 15" stroke-width="4" />
      <path d="M28 34h32M28 54h32M44 18v52" stroke-width="4" />
      <circle cx="44" cy="44" r="8" stroke-width="4" />
    </g>
  </svg>
{:else if kind === 'readymock'}
  <svg viewBox="0 0 120 88" aria-hidden="true" class="icon icon--wide">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="14" width="72" height="50" rx="10" stroke-width="4" />
      <rect x="60" y="26" width="50" height="52" rx="8" stroke-width="4" />
      <path d="M18 26h56M18 37h18M42 37h30M18 49h56" stroke-width="4" />
      <path d="M72 36h26M72 48h18M72 60h26" stroke-width="4" />
      <circle cx="22" cy="21" r="2.5" fill="currentColor" stroke-width="0" />
      <circle cx="30" cy="21" r="2.5" fill="currentColor" stroke-width="0" />
    </g>
  </svg>
{:else if kind === 'ticketcraft'}
  <svg viewBox="0 0 120 88" aria-hidden="true" class="icon icon--wide">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path
        d="M26 24h68a10 10 0 0 0 0 16 10 10 0 0 0 0 16H26a10 10 0 0 0 0-16 10 10 0 0 0 0-16Z"
        stroke-width="4"
      />
      <path d="M60 28v8M60 42v8M60 56v4" stroke-width="4" />
      <path d="m42 48 10-12 10 8 16-18" stroke-width="4" />
    </g>
  </svg>
{:else if kind === 'lpboost'}
  <svg viewBox="0 0 120 88" aria-hidden="true" class="icon icon--wide">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="m73 18 22 22-18 18-22-22 18-18Z" stroke-width="4" />
      <path d="M56 35 28 63M74 56l8 8M66 18l16 16" stroke-width="4" />
      <path d="M27 67c5-1 10-4 13-7l4 4c-3 4-8 7-17 8l-4-4 4-1Z" stroke-width="4" />
      <path d="M42 28c9 0 18 3 24 9l-10 10-23-8 9-11Z" stroke-width="4" />
    </g>
  </svg>
{/if}

<style>
  .icon {
    width: 72px;
    height: 72px;
    color: rgba(84, 61, 34, 0.92);
  }

  .icon--wide {
    width: 110px;
    height: 78px;
  }
</style>
