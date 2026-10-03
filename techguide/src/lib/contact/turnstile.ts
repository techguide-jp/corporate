export const TURNSTILE_SERVER_REASONS = [
  'server_missing_secret',
  'server_invalid_secret',
  'server_missing_response',
  'server_invalid_response',
  'server_expired_or_duplicate',
  'server_bad_request',
  'server_internal',
  'server_network',
  'server_timeout',
  'server_http',
  'server_invalid_json',
  'server_unknown',
] as const;

export type TurnstileServerReason = (typeof TURNSTILE_SERVER_REASONS)[number];
export type TurnstileClientReason =
  | 'client_pending'
  | 'client_expired'
  | 'client_load'
  | 'client_sitekey'
  | 'client_domain'
  | 'client_timeout'
  | 'client_clock'
  | 'client_iframe'
  | 'client_challenge'
  | 'client_unknown';

export function normalizeTurnstileServerReason(reason: unknown): TurnstileServerReason {
  return TURNSTILE_SERVER_REASONS.find((allowed) => allowed === reason) ?? 'server_unknown';
}

export function classifyTurnstileClientError(code: unknown): TurnstileClientReason {
  if (typeof code !== 'string') return 'client_unknown';
  if (['110100', '110110', '400020', '400070'].includes(code)) return 'client_sitekey';
  if (['110200', '400021'].includes(code)) return 'client_domain';
  if (['110600', '110620'].includes(code)) return 'client_timeout';
  if (code === '200100') return 'client_clock';
  if (code === '200500') return 'client_iframe';
  if (/^(300|600)\d{3}$/.test(code)) return 'client_challenge';
  return 'client_unknown';
}
