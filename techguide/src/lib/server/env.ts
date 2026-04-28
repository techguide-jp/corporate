import { env as privateEnv } from '$env/dynamic/private';
import {
  CONTACT_TO_EMAIL as STATIC_CONTACT_TO_EMAIL,
  RESEND_FROM_EMAIL as STATIC_RESEND_FROM_EMAIL,
  RESEND_FROM_NAME as STATIC_RESEND_FROM_NAME,
} from '$env/static/private';
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

const DEFAULT_AMPLIFY_APP_ID = 'd1ei4wu36fr0u9';
const SSM_SECRET_NAMES = new Set(['RESEND_API_KEY', 'TURNSTILE_SECRET_KEY']);
const BUILD_TIME_SERVER_ENV: Record<string, string | undefined> = {
  CONTACT_TO_EMAIL: STATIC_CONTACT_TO_EMAIL,
  RESEND_FROM_EMAIL: STATIC_RESEND_FROM_EMAIL,
  RESEND_FROM_NAME: STATIC_RESEND_FROM_NAME,
};

let cachedSsmClient: SSMClient | undefined;
const cachedSsmSecrets = new Map<string, Promise<string | undefined>>();

function getConfiguredEnv(name: string): string | undefined {
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
    getConfiguredEnv('AWS_REGION') ??
    getConfiguredEnv('AWS_DEFAULT_REGION') ??
    getConfiguredEnv('AMPLIFY_AWS_REGION') ??
    'ap-northeast-1'
  );
}

function getSsmClient(): SSMClient {
  cachedSsmClient ??= new SSMClient({ region: getAwsRegion() });
  return cachedSsmClient;
}

function getAmplifySecretParameterNames(name: string): string[] {
  const configuredPrefix = getConfiguredEnv('AMPLIFY_SECRET_PATH_PREFIX')
    ?.trim()
    .replace(/\/$/, '');
  if (configuredPrefix) {
    return [`${configuredPrefix}/${name}`];
  }

  const appId =
    getConfiguredEnv('AMPLIFY_APP_ID')?.trim() || getConfiguredEnv('AWS_APP_ID')?.trim();
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
  const configuredValue = getConfiguredEnv(name);
  if (configuredValue) {
    return configuredValue;
  }

  return getSsmSecret(name);
}
