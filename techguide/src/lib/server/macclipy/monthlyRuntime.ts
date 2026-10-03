import { dev } from '$app/environment';
import { getServerEnv } from '../env';
import { requireMonthlySecret } from './monthlyConfiguration';
import { createS3Repository, type MonthlyRepository } from './monthlyRepository';
import { createLocalRepository } from './monthlyLocalRepository';
import { createAnalyticsRateLimiter } from './analyticsRateLimit';
let repository: MonthlyRepository | undefined;
export async function monthlyRepository(): Promise<MonthlyRepository> {
  if (repository) return repository;
  const local = dev ? await getServerEnv('MACCLIPY_MONTHLY_LOCAL_DIR') : undefined;
  if (local) return (repository = createLocalRepository(local));
  const bucket = await getServerEnv('MACCLIPY_MONTHLY_BUCKET');
  if (!bucket) throw new Error('Monthly storage is not configured');
  return (repository = createS3Repository(
    bucket,
    (await getServerEnv('AWS_REGION')) ?? 'ap-northeast-1',
  ));
}
export async function feedbackSecret(): Promise<string> {
  return requireMonthlySecret(
    'MACCLIPY_FEEDBACK_SECRET',
    await getServerEnv('MACCLIPY_FEEDBACK_SECRET'),
    32,
  );
}
export async function adminPassword(): Promise<string> {
  return requireMonthlySecret(
    'MACCLIPY_ADMIN_PASSWORD',
    await getServerEnv('MACCLIPY_ADMIN_PASSWORD'),
    24,
  );
}
export const loginLimiter = createAnalyticsRateLimiter({
  limit: 5,
  windowMs: 15 * 60000,
  maxEntries: 10000,
});
export const surveyLimiter = createAnalyticsRateLimiter({
  limit: 10,
  windowMs: 60000,
  maxEntries: 10000,
});
export async function readMonthlyForm(request: Request): Promise<FormData> {
  const contentType = request.headers.get('content-type') ?? '';
  if (
    !['application/x-www-form-urlencoded', 'multipart/form-data'].some((type) =>
      contentType.startsWith(type),
    )
  )
    throw new Error('Invalid form type');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing form');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      size += result.value.byteLength;
      if (size > 65536) {
        await reader.cancel();
        throw new Error('Form too large');
      }
      chunks.push(result.value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return new Request(request.url, {
    method: 'POST',
    headers: { 'content-type': contentType },
    body: bytes.buffer,
  }).formData();
}
