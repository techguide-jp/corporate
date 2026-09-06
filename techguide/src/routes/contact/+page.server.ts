import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
import { fail, type Actions } from '@sveltejs/kit';
import { createContactFormValuesFromSearchParams } from '$lib/contact/form';
import { shouldMockContactSubmission } from '$lib/server/contact/devSubmission';
import { sendContactEmails } from '$lib/server/contact/sendContactEmails';
import { verifyTurnstile } from '$lib/server/contact/turnstile';
import { submitContactForm } from '$lib/server/contact/submit';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ url }) => {
  const initialValues = createContactFormValuesFromSearchParams(url.searchParams);
  const mockSubmission = await shouldMockContactSubmission();

  return {
    selectedCategory: initialValues.category,
    initialValues,
    turnstileSiteKey: mockSubmission ? '' : PUBLIC_TURNSTILE_SITE_KEY.trim(),
  };
};

export const actions: Actions = {
  submit: async ({ request, getClientAddress }) => {
    const formData = await request.formData();
    const result = await submitContactForm(formData, {
      shouldMock: shouldMockContactSubmission,
      verify: () => verifyTurnstile(formData, getClientAddress()),
      send: sendContactEmails,
    });
    return result.status === 200 ? result.data : fail(result.status, result.data);
  },
};
