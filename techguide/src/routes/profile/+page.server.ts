import { loadTicketcraftEvents } from '$lib/server/ticketcraft/profileEvents';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  const ticketcraftEvents = await loadTicketcraftEvents(fetch);
  setHeaders({
    'cache-control': ticketcraftEvents ? 'public, max-age=0, s-maxage=60' : 'no-store',
  });
  return { ticketcraftEvents };
};
