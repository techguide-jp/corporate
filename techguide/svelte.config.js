import adapter from 'amplify-adapter';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// CIやローカルで未設定でも $env/static/public の型生成を安定させるため、公開値だけ空文字を補う。
for (const key of ['PUBLIC_GA_MEASUREMENT_ID', 'PUBLIC_TURNSTILE_SITE_KEY']) {
  process.env[key] ??= '';
}

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};

export default config;
