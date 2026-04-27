import { env as privateEnv } from '$env/dynamic/private';
import {
  CONTACT_TO_EMAIL as STATIC_CONTACT_TO_EMAIL,
  RESEND_FROM_EMAIL as STATIC_RESEND_FROM_EMAIL,
  RESEND_FROM_NAME as STATIC_RESEND_FROM_NAME,
} from '$env/static/private';
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

type AmplifySecrets = Record<string, string>;

const DEFAULT_AMPLIFY_APP_ID = 'd1ei4wu36fr0u9';
const SSM_SECRET_NAMES = new Set(['RESEND_API_KEY', 'TURNSTILE_SECRET_KEY']);
const BUILD_TIME_SERVER_ENV: Record<string, string | undefined> = {
  CONTACT_TO_EMAIL: STATIC_CONTACT_TO_EMAIL,
  RESEND_FROM_EMAIL: STATIC_RESEND_FROM_EMAIL,
  RESEND_FROM_NAME: STATIC_RESEND_FROM_NAME,
};

let cachedAmplifySecrets: AmplifySecrets | undefined;
let cachedSsmClient: SSMClient | undefined;
const cachedSsmSecrets = new Map<string, Promise<string | undefined>>();

function getDirectEnv(name: string): string | undefined {
  const processValue = process.env[name];
  if (processValue) {
    return processValue;
  }

  const dynamicValue = privateEnv[name];
  if (dynamicValue) {
    return dynamicValue;
  }

  return BUILD_TIME_SERVER_ENV[name];
}

function getAwsRegion(): string {
  return (
    getDirectEnv('AWS_REGION') ??
    getDirectEnv('AWS_DEFAULT_REGION') ??
    getDirectEnv('AMPLIFY_AWS_REGION') ??
    'ap-northeast-1'
  );
}

function getSsmClient(): SSMClient {
  cachedSsmClient ??= new SSMClient({ region: getAwsRegion() });
  return cachedSsmClient;
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

function getAmplifySecretParameterNames(name: string): string[] {
  const configuredPrefix = getDirectEnv('AMPLIFY_SECRET_PATH_PREFIX')?.trim().replace(/\/$/, '');
  if (configuredPrefix) {
    return [`${configuredPrefix}/${name}`];
  }

  const appId = getDirectEnv('AMPLIFY_APP_ID')?.trim() || getDirectEnv('AWS_APP_ID')?.trim();
  const sharedAppId = appId || DEFAULT_AMPLIFY_APP_ID;

  return sharedAppId ? [`/amplify/shared/${sharedAppId}/${name}`] : [];
}

async function getSsmSecret(name: string): Promise<string | undefined> {
  if (!SSM_SECRET_NAMES.has(name)) {
    return undefined;
  }

  if (cachedSsmSecrets.has(name)) {
    return cachedSsmSecrets.get(name);
  }

  const secretPromise = (async () => {
    for (const parameterName of getAmplifySecretParameterNames(name)) {
      try {
        const result = await getSsmClient().send(
          new GetParameterCommand({
            Name: parameterName,
            WithDecryption: true,
          }),
        );

        const value = result.Parameter?.Value;
        if (value) {
          return value;
        }
      } catch {
        // SSR Compute role 未設定や権限不足の環境では通常の環境変数フォールバックに任せる。
      }
    }

    return undefined;
  })();

  cachedSsmSecrets.set(name, secretPromise);
  return secretPromise;
}

export async function getServerEnv(name: string): Promise<string | undefined> {
  const directValue = getDirectEnv(name);
  if (directValue) {
    return directValue;
  }

  const amplifySecret = getAmplifySecrets()[name];
  if (amplifySecret) {
    return amplifySecret;
  }

  return getSsmSecret(name);
}
