import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

const eventRedirectDestinations: Readonly<Record<string, string>> = {
  '20230522_talk_seminar': 'https://forms.gle/3TUbGDBYAHLrJBiq9',
};

export const GET: RequestHandler = ({ url }) => {
  const eventKeyword = url.searchParams.get('event');
  const destination = eventKeyword ? eventRedirectDestinations[eventKeyword] : undefined;

  redirect(302, destination ?? '/');
};
