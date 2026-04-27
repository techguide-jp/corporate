import { env as privateEnv } from '$env/dynamic/private';
import { Resend } from 'resend';
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
  const apiKey = privateEnv.RESEND_API_KEY;
  const fromName = privateEnv.RESEND_FROM_NAME?.trim();
  const fromEmail = privateEnv.RESEND_FROM_EMAIL?.trim();
  const to = privateEnv.CONTACT_TO_EMAIL;

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

  const adminResult = await (async () => {
    try {
      return await resend.emails.send({
        from,
        to: [to],
        replyTo: submission.email,
        subject: adminEmail.subject,
        text: adminEmail.text,
        html: adminEmail.html,
      });
    } catch {
      return { error: true };
    }
  })();

  if (adminResult.error) {
    return {
      ok: false,
      message: SEND_FAILURE_MESSAGE,
    };
  }

  const autoReplyResult = await (async () => {
    try {
      return await resend.emails.send({
        from,
        to: [submission.email],
        replyTo: to,
        subject: autoReplyEmail.subject,
        text: autoReplyEmail.text,
        html: autoReplyEmail.html,
      });
    } catch {
      return { error: true };
    }
  })();

  if (autoReplyResult.error) {
    // 管理者通知が成功した時点で受付済みにし、再送による重複通知を避ける。
    return {
      ok: true,
      message: AUTO_REPLY_FAILURE_MESSAGE,
    };
  }

  return { ok: true };
}
