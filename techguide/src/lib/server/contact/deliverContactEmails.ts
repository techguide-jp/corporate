import type { CreateEmailOptions } from 'resend';
import { buildAdminEmail, buildAutoReplyEmail } from './emailTemplates.ts';
import type { ContactSubmission } from './validation.ts';

const SEND_FAILURE_MESSAGE = 'メール送信に失敗しました。時間をおいて再度お試しください。';
const AUTO_REPLY_FAILURE_MESSAGE =
  'お問い合わせを受け付けました。控えメールの送信に失敗した可能性がありますが、内容は届いています。営業日に順次ご連絡します。';

export type SendContactEmailResult =
  | { ok: true; message?: string }
  | { ok: false; message: string };

export async function deliverContactEmails(
  submission: ContactSubmission,
  from: string,
  to: string,
  send: (email: CreateEmailOptions) => Promise<boolean>,
): Promise<SendContactEmailResult> {
  const adminEmail = buildAdminEmail(submission);
  const autoReplyEmail = buildAutoReplyEmail(submission);

  const adminSent = await send({
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

  const autoReplySent = await send({
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
