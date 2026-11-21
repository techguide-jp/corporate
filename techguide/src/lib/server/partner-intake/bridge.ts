const appsScriptUrl =
  'https://script.google.com/macros/s/AKfycbykcM6Ca7gXW0pU8V69nFPD5MhQhNm8b6rP5HegtUpP3g0zmPsPRqXrBThunavTjOb5/exec';

const actionArgumentCounts = {
  requestVerification: 3,
  verifyIdentity: 1,
  submitIntake: 2,
} as const;

type PartnerIntakeAction = {
  action: keyof typeof actionArgumentCounts;
  args: unknown[];
};

type BridgeResult =
  | { ok: true; result: unknown }
  | { ok: false; message: string; status: 400 | 502 };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isAction(action: string): action is PartnerIntakeAction['action'] {
  return Object.hasOwn(actionArgumentCounts, action);
}

export function parsePartnerIntakeAction(value: unknown): PartnerIntakeAction | null {
  if (!isRecord(value) || typeof value.action !== 'string' || !isAction(value.action)) {
    return null;
  }
  const { action, args } = value;
  if (!Array.isArray(args) || args.length !== actionArgumentCounts[action]) {
    return null;
  }
  return { action, args };
}

const unavailable = {
  ok: false,
  message: '現在フォームに接続できません。時間をおいてお試しください。',
  status: 502,
} as const;

export async function forwardPartnerIntakeAction(
  input: PartnerIntakeAction,
  key: string,
  fetcher: typeof fetch,
): Promise<BridgeResult> {
  try {
    const signal = AbortSignal.timeout(20_000);
    let upstream = await fetcher(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, key }),
      credentials: 'omit',
      redirect: 'manual',
      signal,
    });
    if (upstream.status === 302 || upstream.status === 303) {
      // ContentService serves each response from a one-time Google URL.
      const target = new URL(upstream.headers.get('location') ?? '');
      if (
        target.origin !== 'https://script.googleusercontent.com' ||
        target.pathname !== '/macros/echo'
      ) {
        return unavailable;
      }
      upstream = await fetcher(target, { credentials: 'omit', redirect: 'error', signal });
    }
    if (!upstream.ok) return unavailable;
    const data: unknown = await upstream.json();
    if (!isRecord(data)) return unavailable;
    if (data.ok === true && Object.hasOwn(data, 'result')) {
      return { ok: true, result: data.result };
    }
    if (data.code === 'input_error' && typeof data.message === 'string') {
      return { ok: false, message: data.message, status: 400 };
    }
  } catch {
    // Contact details and confirmation tokens are included in these requests.
  }
  return unavailable;
}
