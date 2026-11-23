import { Resend, type CreateEmailOptions } from 'resend';
import { getServerEnv } from '$lib/server/env';
import { deliverContactEmails, type SendContactEmailResult } from './deliverContactEmails';
import type { ContactSubmission } from './validation';

export async function sendContactEmails(
  submission: ContactSubmission,
): Promise<SendContactEmailResult> {
  const apiKey = (await getServerEnv('RESEND_API_KEY'))?.trim();
  const fromName = (await getServerEnv('RESEND_FROM_NAME'))?.trim();
  const fromEmail = (await getServerEnv('RESEND_FROM_EMAIL'))?.trim();
  const to = (await getServerEnv('CONTACT_TO_EMAIL'))?.trim();

  if (!apiKey || !fromName || !fromEmail || !to) {
    return {
      ok: false,
      message: 'メール送信設定が未完了です。時間をおいて再度お試しください。',
    };
  }

  const from = `${fromName} <${fromEmail}>`;
  const resend = new Resend(apiKey);
  return deliverContactEmails(submission, from, to, (email) => sendEmail(resend, email));
}

async function sendEmail(resend: Resend, payload: CreateEmailOptions): Promise<boolean> {
  try {
    const result = await resend.emails.send(payload);
    return !result.error;
  } catch {
    return false;
  }
}
