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
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          appearance?: 'always' | 'execute' | 'interaction-only';
          execution?: 'render' | 'execute';
          language?: string;
          size?: 'normal' | 'flexible' | 'compact';
          theme?: 'light' | 'dark' | 'auto';
          'response-field'?: boolean;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: (errorCode?: string) => boolean | void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove?: (widgetId: string) => void;
    };
  }

  namespace App {}
}

export {};
