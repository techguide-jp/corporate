export class MonthlyConfigurationError extends Error {}

export function requireMonthlySecret(
  name: 'MACCLIPY_ADMIN_PASSWORD' | 'MACCLIPY_FEEDBACK_SECRET',
  value: string | undefined,
  minimumLength: number,
): string {
  if (!value || value.length < minimumLength) {
    throw new MonthlyConfigurationError(`${name}を${minimumLength}文字以上で設定してください。`);
  }
  return value;
}

export function monthlyConfigurationMessage(error: unknown, detailed: boolean): string {
  const message = '管理画面の設定が完了していません。';
  return detailed && error instanceof MonthlyConfigurationError
    ? `${message} ${error.message}`
    : message;
}
