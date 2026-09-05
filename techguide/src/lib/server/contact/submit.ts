import { createEmptyContactFormValues } from '../../contact/form.ts';
import type { ContactReceipt } from '../../contact/lead.ts';
import { parseContactFormData, type ContactSubmission } from './validation.ts';

type ServiceResult = { ok: true; message?: string } | { ok: false; message: string };

interface SubmitDependencies {
  shouldMock: () => Promise<boolean>;
  verify: () => Promise<ServiceResult>;
  send: (submission: ContactSubmission) => Promise<ServiceResult>;
}

const SUCCESS_MESSAGE = 'お問い合わせを受け付けました。内容を確認し、営業日に順次ご連絡します。';

export async function submitContactForm(formData: FormData, dependencies: SubmitDependencies) {
  const validation = parseContactFormData(formData);
  if (!validation.ok) return { status: 400 as const, data: validation };

  const { submission, isBot } = validation;
  const success = (message = SUCCESS_MESSAGE) => {
    const { category, landingPage, sourcePage } = submission;
    const receipt: ContactReceipt | null = isBot
      ? null
      : { id: crypto.randomUUID(), category, landingPage, sourcePage };
    return {
      status: 200 as const,
      data: { ok: true as const, receipt, values: createEmptyContactFormValues(), message },
    };
  };

  if (await dependencies.shouldMock()) return success();

  const turnstile = await dependencies.verify();
  if (!turnstile.ok) {
    return {
      status: 400 as const,
      data: {
        ok: false as const,
        values: submission,
        fieldErrors: { turnstile: turnstile.message },
        message: turnstile.message,
      },
    };
  }

  if (isBot) return success();

  const result = await dependencies.send(submission);
  if (!result.ok) {
    return {
      status: 500 as const,
      data: { ok: false as const, values: submission, fieldErrors: {}, message: result.message },
    };
  }
  return success(result.message);
}
