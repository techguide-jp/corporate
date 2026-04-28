import { dev } from '$app/environment';
import { getServerEnv } from '$lib/server/env';

export async function shouldMockContactSubmission(): Promise<boolean> {
  if (!dev) {
    return false;
  }

  const configuredValue = (await getServerEnv('CONTACT_DEV_MOCK_SUBMISSION'))?.trim().toLowerCase();
  return configuredValue !== 'false';
}
