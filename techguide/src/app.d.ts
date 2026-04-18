// See https://svelte.dev/docs/kit/types#app.d.ts
declare module '*.svelte' {
  import type { Component } from 'svelte';

  const component: Component;
  export default component;
}

declare global {
  namespace App {}
}

export {};
