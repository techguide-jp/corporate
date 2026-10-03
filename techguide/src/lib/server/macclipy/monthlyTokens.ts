import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import type { SurveyQuestion } from '../../macclipy/monthly.ts';
function signature(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('base64url');
}
export function signToken(value: object, secret: string): string {
  const payload = Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${payload}.${signature(payload, secret)}`;
}
export function verifyToken(token: string, secret: string): Record<string, unknown> | null {
  if (token.length > 4096) return null;
  const [payload, provided, extra] = token.split('.');
  if (!payload || !provided || extra) return null;
  const expected = Buffer.from(signature(payload, secret));
  const actual = Buffer.from(provided);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const value: unknown = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof value === 'object' && value !== null && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}
export function questionsVersion(questions: SurveyQuestion[]): string {
  return createHash('sha256').update(JSON.stringify(questions)).digest('hex');
}
export function issueSurveyTicket(
  month: string,
  questions: SurveyQuestion[],
  secret: string,
  now = Date.now(),
): string {
  return signToken(
    {
      purpose: 'survey',
      id: randomUUID(),
      month,
      version: questionsVersion(questions),
      issuedAt: now,
    },
    secret,
  );
}
export function readSurveyTicket(
  token: string,
  month: string,
  questions: SurveyQuestion[],
  secret: string,
  now = Date.now(),
): string | null {
  const value = verifyToken(token, secret);
  if (
    !value ||
    value.purpose !== 'survey' ||
    value.month !== month ||
    value.version !== questionsVersion(questions) ||
    typeof value.id !== 'string' ||
    !/^[0-9a-f-]{36}$/.test(value.id) ||
    typeof value.issuedAt !== 'number' ||
    now < value.issuedAt ||
    now - value.issuedAt > 86400000
  )
    return null;
  return value.id;
}
export function passwordMatches(provided: string, expected: string): boolean {
  return timingSafeEqual(
    createHash('sha256').update(provided).digest(),
    createHash('sha256').update(expected).digest(),
  );
}
export function issueAdminSession(secret: string, now = Date.now()): string {
  return signToken({ purpose: 'admin', expiresAt: now + 8 * 3600000 }, secret);
}
export function validAdminSession(token: string, secret: string, now = Date.now()): boolean {
  const value = verifyToken(token, secret);
  return (
    value?.purpose === 'admin' &&
    typeof value.expiresAt === 'number' &&
    value.expiresAt > now &&
    value.expiresAt <= now + 8 * 3600000
  );
}
