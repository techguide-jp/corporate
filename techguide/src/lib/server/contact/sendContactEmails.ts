import { env as privateEnv } from '$env/dynamic/private';
import { Resend } from 'resend';
import { buildAdminEmail, buildAutoReplyEmail } from './emailTemplates';
import type { ContactSubmission } from './validation';

export type SendContactEmailResult = { ok: true } | { ok: false; message: string };

export async function sendContactEmails(
  submission: ContactSubmission,
): Promise<SendContactEmailResult> {
  const apiKey = privateEnv.RESEND_API_KEY;
  const from = privateEnv.RESEND_FROM_EMAIL;
  const to = privateEnv.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return {
      ok: false,
      message: 'メール送信設定が未完了です。時間をおいて再度お試しください。',
    };
  }

  const resend = new Resend(apiKey);
  const adminEmail = buildAdminEmail(submission);
  const autoReplyEmail = buildAutoReplyEmail(submission);

  const adminResult = await resend.emails.send({
    from,
    to: [to],
    replyTo: submission.email,
    subject: adminEmail.subject,
    text: adminEmail.text,
    html: adminEmail.html,
  });

  if (adminResult.error) {
    return {
      ok: false,
      message: 'メール送信に失敗しました。時間をおいて再度お試しください。',
    };
  }

  const autoReplyResult = await resend.emails.send({
    from,
    to: [submission.email],
    replyTo: to,
    subject: autoReplyEmail.subject,
    text: autoReplyEmail.text,
    html: autoReplyEmail.html,
  });

  if (autoReplyResult.error) {
    return {
      ok: false,
      message: '受付メールの送信に失敗しました。時間をおいて再度お試しください。',
    };
  }

  return { ok: true };
}
