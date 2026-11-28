const VERIFICATION_URL = 'https://email-check.techguide.jp/api/v1/email/verify';

export async function isContactEmailRejected(
  email: string,
  apiKey: string | undefined,
  fetchVerification = fetch,
): Promise<boolean> {
  if (!apiKey || !/^[a-f0-9]{64}$/.test(apiKey)) return false;

  try {
    const response = await fetchVerification(VERIFICATION_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      redirect: 'error',
      signal: AbortSignal.timeout(8_000),
    });
    if (response.status === 200) {
      const result: unknown = await response.json();
      return (
        typeof result === 'object' &&
        result !== null &&
        'status' in result &&
        result.status === 'likely_invalid' &&
        'reason' in result &&
        (result.reason === 'recipient_not_found' || result.reason === 'null_mx') &&
        'cached' in result &&
        typeof result.cached === 'boolean'
      );
    }
    await response.body?.cancel();
  } catch {
    // 検査APIの障害で問い合わせを取りこぼさないよう、判定できない場合も受付を続ける。
  }
  return false;
}
