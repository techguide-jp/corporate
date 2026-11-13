import type { ProfileEventItem } from '../../types/content.ts';

const ticketcraftOrigin = 'https://ticketcraft.jp';
const organizerSlug = 'techguide';
const eventsUrl = `${ticketcraftOrigin}/api/events?organizerSlug=${organizerSlug}&listedOnly=true`;

interface Ticket {
  availableQuantity: number | null;
  saleStart: string | null;
  saleEnd: string | null;
}

interface PublicEvent {
  id: string;
  title: string;
  eventDate: string;
  status: 'active' | 'closed';
  venueName: string | null;
  registrationStart: string;
  registrationEnd: string | null;
  remainingCapacity: number;
  tickets: Ticket[];
}

interface ProfileEvents {
  upcoming: ProfileEventItem[];
  past: ProfileEventItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isDateTime(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
    Number.isFinite(Date.parse(value))
  );
}

function isQuantity(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function isTicket(value: unknown): value is Ticket {
  return (
    isRecord(value) &&
    value.isActive === true &&
    (value.availableQuantity === null || isQuantity(value.availableQuantity)) &&
    (value.saleStart === null || isDateTime(value.saleStart)) &&
    (value.saleEnd === null || isDateTime(value.saleEnd))
  );
}

function isPublicEvent(value: unknown): value is PublicEvent {
  return (
    isRecord(value) &&
    value.organizerSlug === organizerSlug &&
    typeof value.id === 'string' &&
    /^[\w-]+$/.test(value.id) &&
    typeof value.title === 'string' &&
    Boolean(value.title.trim()) &&
    isDateTime(value.eventDate) &&
    (value.status === 'active' || value.status === 'closed') &&
    (value.venueName === null || typeof value.venueName === 'string') &&
    isDateTime(value.registrationStart) &&
    (value.registrationEnd === null || isDateTime(value.registrationEnd)) &&
    isQuantity(value.remainingCapacity) &&
    Array.isArray(value.tickets) &&
    value.tickets.every(isTicket)
  );
}

function getRegistrationStatus(event: PublicEvent, now: number): ProfileEventItem['status'] {
  if (
    event.status === 'closed' ||
    (event.registrationEnd && now > Date.parse(event.registrationEnd))
  ) {
    return '受付終了';
  }
  if (now < Date.parse(event.registrationStart)) return '受付開始前';

  const onSale = event.tickets.filter(
    (ticket) =>
      (!ticket.saleStart || now >= Date.parse(ticket.saleStart)) &&
      (!ticket.saleEnd || now <= Date.parse(ticket.saleEnd)),
  );
  if (!onSale.length) {
    return event.tickets.some((ticket) => ticket.saleStart && now < Date.parse(ticket.saleStart))
      ? '受付開始前'
      : '受付終了';
  }

  if (event.remainingCapacity === 0 || onSale.every((ticket) => ticket.availableQuantity === 0)) {
    return '満席';
  }
  return '申込受付中';
}

export async function loadTicketcraftEvents(
  fetchEvents: typeof fetch,
  now?: number,
): Promise<ProfileEvents | null> {
  try {
    const response = await fetchEvents(eventsUrl, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;

    const data: unknown = await response.json();
    // 確認値がない旧APIは一覧非掲載のイベントも返す。
    if (
      !isRecord(data) ||
      data.listedOnly !== true ||
      !Array.isArray(data.events) ||
      !data.events.every(isPublicEvent)
    ) {
      return null;
    }

    const nowMs = now ?? Date.now();
    const result: ProfileEvents = { upcoming: [], past: [] };
    const events = [...data.events].sort(
      (first, second) => Date.parse(first.eventDate) - Date.parse(second.eventDate),
    );

    for (const event of events) {
      const item: ProfileEventItem = {
        dateIso: event.eventDate,
        title: event.title,
        description: event.venueName?.trim() || undefined,
        href: `${ticketcraftOrigin}/events/${event.id}`,
      };

      if (Date.parse(event.eventDate) <= nowMs) {
        result.past.push(item);
      } else {
        result.upcoming.push({ ...item, status: getRegistrationStatus(event, nowMs) });
      }
    }
    return result;
  } catch {
    return null;
  }
}
