import assert from 'node:assert/strict';
import test from 'node:test';
import { loadTicketcraftEvents } from './profileEvents.ts';

const now = Date.parse('2026-11-18T09:00:00.000Z');
const ticket = {
  isActive: true,
  saleStart: null,
  saleEnd: null,
  availableQuantity: null,
};

const event = {
  id: 'listed-event',
  organizerSlug: 'techguide',
  title: '公開イベント',
  venueName: 'オンライン',
  status: 'active',
  eventDate: '2026-11-18T11:00:00.000Z',
  registrationStart: '2026-11-10T00:00:00.000Z',
  registrationEnd: null,
  remainingCapacity: 5,
  tickets: [ticket],
};

function fetchResponse(body: unknown): typeof fetch {
  return (input) => {
    assert.equal(
      input,
      'https://ticketcraft.jp/api/events?organizerSlug=techguide&listedOnly=true',
    );
    return Promise.resolve(Response.json(body));
  };
}

await test('uses registration windows and both event and ticket availability before the start', async () => {
  const scenarios = [
    [event, '申込受付中'],
    [{ ...event, status: 'closed' }, '受付終了'],
    [{ ...event, registrationStart: '2026-11-18T09:01:00Z' }, '受付開始前'],
    [{ ...event, registrationEnd: '2026-11-18T08:59:00Z' }, '受付終了'],
    [{ ...event, remainingCapacity: 0 }, '満席'],
    [{ ...event, tickets: [{ ...ticket, availableQuantity: 0 }] }, '満席'],
    [{ ...event, tickets: [{ ...ticket, saleStart: '2026-11-18T10:00:00Z' }] }, '受付開始前'],
    [{ ...event, tickets: [{ ...ticket, saleEnd: '2026-11-18T08:00:00Z' }] }, '受付終了'],
    [{ ...event, tickets: [{ ...ticket, availableQuantity: 0 }, ticket] }, '申込受付中'],
  ] as const;

  for (const [entry, status] of scenarios) {
    const result = await loadTicketcraftEvents(
      fetchResponse({ listedOnly: true, events: [entry] }),
      now,
    );
    assert.equal(result?.upcoming[0]?.status, status);
  }
});

await test('moves events to the archive at the actual start time, including on the same date', async () => {
  const result = await loadTicketcraftEvents(
    fetchResponse({
      listedOnly: true,
      events: [{ ...event, eventDate: '2026-11-18T18:00:00+09:00' }],
    }),
    now,
  );
  assert.deepEqual(result?.upcoming, []);
  assert.equal(result?.past[0]?.href, 'https://ticketcraft.jp/events/listed-event');
  assert.equal(result?.past[0]?.status, undefined);
});

await test('falls back when the server has not applied the listing filter or cannot supply valid data', async () => {
  for (const response of [
    { events: [event] },
    { listedOnly: true, events: [{ ...event, organizerSlug: 'another-organizer' }] },
    { listedOnly: true, events: [{ ...event, remainingCapacity: undefined }] },
  ]) {
    assert.equal(await loadTicketcraftEvents(fetchResponse(response), now), null);
  }
  assert.equal(
    await loadTicketcraftEvents(() => Promise.resolve(new Response(null, { status: 503 })), now),
    null,
  );
  assert.equal(await loadTicketcraftEvents(() => Promise.reject(new Error('offline')), now), null);
  assert.deepEqual(
    await loadTicketcraftEvents(fetchResponse({ listedOnly: true, events: [] }), now),
    {
      upcoming: [],
      past: [],
    },
  );
});
