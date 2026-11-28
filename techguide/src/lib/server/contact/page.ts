import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { createContactFormValuesFromSearchParams } from '$lib/contact/form';
import { MOTENJI_CATEGORY_ID } from '$lib/contact/motenji';
import { getServerEnv } from '$lib/server/env';
import { shouldMockContactSubmission } from './devSubmission';
import { isContactEmailRejected } from './emailVerification';
import { sendContactEmails } from './sendContactEmails';
import { submitContactForm } from './submit';
import { verifyTurnstile } from './turnstile';

export async function loadContactPage(url: URL, motenji = false) {
  const initialValues = createContactFormValuesFromSearchParams(
    url.searchParams,
    motenji ? MOTENJI_CATEGORY_ID : undefined,
  );

  const mockSubmission = await shouldMockContactSubmission();
  return {
    selectedCategory: initialValues.category,
    initialValues,
    turnstileSiteKey: mockSubmission ? '' : PUBLIC_TURNSTILE_SITE_KEY.trim(),
  };
}

export async function submitContactPage(
  event: Pick<RequestEvent, 'request' | 'getClientAddress'>,
  motenji = false,
) {
  const formData = await event.request.formData();
  const result = await submitContactForm(
    formData,
    {
      shouldMock: shouldMockContactSubmission,
      verify: () => verifyTurnstile(formData, event.getClientAddress()),
      isEmailRejected: async (email) =>
        isContactEmailRejected(email, await getServerEnv('EMAIL_VERIFIER_API_KEY')),
      send: sendContactEmails,
    },
    motenji,
  );
  return result.status === 200 ? result.data : fail(result.status, result.data);
}
