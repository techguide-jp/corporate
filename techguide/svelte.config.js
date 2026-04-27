import adapter from 'amplify-adapter';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { loadEnv } from 'vite';

const fileEnv = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
for (const [key, value] of Object.entries(fileEnv)) {
  process.env[key] ??= value;
}

// CIやローカルで未設定でも $env/static/* の型生成を安定させるため、build時参照する値を空文字で補う。
for (const key of [
  'PUBLIC_GA_MEASUREMENT_ID',
  'PUBLIC_TURNSTILE_SITE_KEY',
  'RESEND_FROM_NAME',
  'RESEND_FROM_EMAIL',
  'CONTACT_TO_EMAIL',
]) {
  process.env[key] ??= '';
}

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};

export default config;
