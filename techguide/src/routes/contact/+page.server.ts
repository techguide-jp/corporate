import { loadContactPage, submitContactPage } from '$lib/server/contact/page';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = ({ url }) => loadContactPage(url);

export const actions: Actions = {
  submit: (event) => submitContactPage(event),
};
