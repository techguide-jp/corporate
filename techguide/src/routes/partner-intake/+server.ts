import { json } from '@sveltejs/kit';
import { getServerEnv } from '$lib/server/env';
import {
  forwardPartnerIntakeAction,
  parsePartnerIntakeAction,
} from '$lib/server/partner-intake/bridge';
import formHtml from '$lib/server/partner-intake/form.html?raw';
import type { RequestHandler } from './$types';

export const prerender = false;
export const trailingSlash = 'always';

const responseHeaders = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
};

const maxBodyBytes = 512 * 1024;

export const GET: RequestHandler = () =>
  new Response(formHtml, {
    headers: {
      ...responseHeaders,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy':
        "default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; img-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    },
  });

export const POST: RequestHandler = async ({ request, fetch }) => {
  const contentType = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (
    contentType !== 'application/json' ||
    request.headers.get('sec-fetch-site') === 'cross-site'
  ) {
    return json(
      { ok: false, message: '入力内容を確認してください。' },
      {
        status: 415,
        headers: responseHeaders,
      },
    );
  }
  const text = await readBody(request);
  if (text === null) {
    return json(
      { ok: false, message: '入力内容が長すぎます。' },
      {
        status: 413,
        headers: responseHeaders,
      },
    );
  }
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    payload = null;
  }
  const action = parsePartnerIntakeAction(payload);
  if (!action) {
    return json(
      { ok: false, message: '入力内容を確認してください。' },
      {
        status: 400,
        headers: responseHeaders,
      },
    );
  }
  const key = await getServerEnv('PARTNER_INTAKE_BRIDGE_SECRET');
  if (!key || !/^[a-f0-9]{64}$/.test(key)) {
    return json(
      { ok: false, message: '現在フォームに接続できません。時間をおいてお試しください。' },
      {
        status: 503,
        headers: responseHeaders,
      },
    );
  }
  const result = await forwardPartnerIntakeAction(action, key, fetch);
  if (result.ok) return json(result, { headers: responseHeaders });
  return json(
    { ok: false, message: result.message },
    {
      status: result.status,
      headers: responseHeaders,
    },
  );
};

async function readBody(request: Request): Promise<string | null> {
  if (!request.body) return '';
  if (Number(request.headers.get('content-length')) > maxBodyBytes) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) return text + decoder.decode();
    size += value.byteLength;
    if (size > maxBodyBytes) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
}
