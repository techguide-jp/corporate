import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
import { fail, type Actions } from '@sveltejs/kit';
import { createEmptyContactFormValues, getInitialCategory } from '$lib/contact/form';
import { shouldMockContactSubmission } from '$lib/server/contact/devSubmission';
import { sendContactEmails } from '$lib/server/contact/sendContactEmails';
import { verifyTurnstile } from '$lib/server/contact/turnstile';
import { parseContactFormData } from '$lib/server/contact/validation';
import type { PageServerLoad } from './$types';

export const prerender = false;

const SUCCESS_MESSAGE = 'お問い合わせを受け付けました。内容を確認し、営業日に順次ご連絡します。';

export const load: PageServerLoad = async ({ url }) => {
  const selectedCategory = getInitialCategory(url.searchParams.get('category'));
  const mockSubmission = await shouldMockContactSubmission();

  return {
    selectedCategory,
    turnstileSiteKey: mockSubmission ? '' : PUBLIC_TURNSTILE_SITE_KEY.trim(),
  };
};

export const actions: Actions = {
  submit: async ({ request, getClientAddress }) => {
    const formData = await request.formData();
    const validation = parseContactFormData(formData);

    if (!validation.ok) {
      return fail(400, validation);
    }

    if (await shouldMockContactSubmission()) {
      return {
        ok: true,
        values: createEmptyContactFormValues(),
        message: SUCCESS_MESSAGE,
      };
    }

    const turnstile = await verifyTurnstile(formData, getClientAddress());
    if (!turnstile.ok) {
      return fail(400, {
        ok: false,
        values: validation.submission,
        fieldErrors: { turnstile: turnstile.message },
        message: turnstile.message,
      });
    }

    if (validation.isBot) {
      return {
        ok: true,
        values: createEmptyContactFormValues(),
        message: SUCCESS_MESSAGE,
      };
    }

    const sendResult = await sendContactEmails(validation.submission);
    if (!sendResult.ok) {
      return fail(500, {
        ok: false,
        values: validation.submission,
        fieldErrors: {},
        message: sendResult.message,
      });
    }

    return {
      ok: true,
      values: createEmptyContactFormValues(),
      message: sendResult.message ?? SUCCESS_MESSAGE,
    };
  },
};
