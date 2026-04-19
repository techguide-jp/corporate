// See https://svelte.dev/docs/kit/types#app.d.ts
declare module '*.svelte' {
  import type { Component } from 'svelte';

  const component: Component;
  export default component;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }

  namespace App {}
}

export {};
