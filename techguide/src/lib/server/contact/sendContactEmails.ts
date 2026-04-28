import { Resend, type CreateEmailOptions } from 'resend';
import { getServerEnv } from '$lib/server/env';
import { buildAdminEmail, buildAutoReplyEmail } from './emailTemplates';
import type { ContactSubmission } from './validation';

const SEND_FAILURE_MESSAGE = 'メール送信に失敗しました。時間をおいて再度お試しください。';
const AUTO_REPLY_FAILURE_MESSAGE =
  'お問い合わせを受け付けました。控えメールの送信に失敗した可能性がありますが、内容は届いています。営業日に順次ご連絡します。';

export type SendContactEmailResult =
  | { ok: true; message?: string }
  | { ok: false; message: string };

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
  const adminEmail = buildAdminEmail(submission);
  const autoReplyEmail = buildAutoReplyEmail(submission);

  const adminSent = await sendEmail(resend, {
    from,
    to: [to],
    replyTo: submission.email,
    subject: adminEmail.subject,
    text: adminEmail.text,
    html: adminEmail.html,
  });

  if (!adminSent) {
    return {
      ok: false,
      message: SEND_FAILURE_MESSAGE,
    };
  }

  const autoReplySent = await sendEmail(resend, {
    from,
    to: [submission.email],
    replyTo: to,
    subject: autoReplyEmail.subject,
    text: autoReplyEmail.text,
    html: autoReplyEmail.html,
  });

  if (!autoReplySent) {
    // 管理者通知が成功した時点で受付済みにし、再送による重複通知を避ける。
    return {
      ok: true,
      message: AUTO_REPLY_FAILURE_MESSAGE,
    };
  }

  return { ok: true };
}

async function sendEmail(resend: Resend, payload: CreateEmailOptions): Promise<boolean> {
  try {
    const result = await resend.emails.send(payload);
    return !result.error;
  } catch {
    return false;
  }
}
