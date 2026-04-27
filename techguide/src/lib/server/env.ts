import { env as privateEnv } from '$env/dynamic/private';

type AmplifySecrets = Record<string, string>;

let cachedAmplifySecrets: AmplifySecrets | undefined;

function getDirectEnv(name: string): string | undefined {
  const processValue = process.env[name];
  if (processValue) {
    return processValue;
  }

  return privateEnv[name];
}

function getAmplifySecrets(): AmplifySecrets {
  if (cachedAmplifySecrets) {
    return cachedAmplifySecrets;
  }

  const rawSecrets = getDirectEnv('secrets') ?? getDirectEnv('SECRETS');
  if (!rawSecrets) {
    cachedAmplifySecrets = {};
    return cachedAmplifySecrets;
  }

  try {
    const parsed: unknown = JSON.parse(rawSecrets);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      cachedAmplifySecrets = {};
      return cachedAmplifySecrets;
    }

    // Amplify secrets は通常の KEY=value ではなく process.env.secrets JSON で届く場合がある。
    cachedAmplifySecrets = Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string',
      ),
    );
    return cachedAmplifySecrets;
  } catch {
    cachedAmplifySecrets = {};
    return cachedAmplifySecrets;
  }
}

export function getServerEnv(name: string): string | undefined {
  const directValue = getDirectEnv(name);
  if (directValue) {
    return directValue;
  }

  return getAmplifySecrets()[name];
}
