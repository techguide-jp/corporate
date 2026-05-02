(() => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(new Date());
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;
  const todayTokyoIso = year && month && day ? `${year}-${month}-${day}` : '';

  document.documentElement.dataset.profileTodayIso = todayTokyoIso;

  const cards = document.querySelectorAll('[data-profile-event-card]');
  const statusClasses = [
    'profile-events__status--accepting',
    'profile-events__status--upcoming',
    'profile-events__status--ended',
  ];

  for (const card of cards) {
    const dateIso = card.getAttribute('data-event-date-iso') ?? '';
    const href = card.getAttribute('data-event-href') ?? '';
    const isExternal = card.getAttribute('data-event-external') === 'true';
    const statusLabel = card.getAttribute('data-event-status-label') ?? '';
    const ctaLabel = card.getAttribute('data-event-cta-label') ?? '';
    const isAccepting = card.getAttribute('data-event-accepting') === 'true';
    const isEnded = todayTokyoIso !== '' && dateIso < todayTokyoIso;
    const statusTone = isEnded ? 'ended' : isAccepting ? 'accepting' : 'upcoming';

    const status = card.querySelector('[data-event-status]');
    const meta = card.querySelector('[data-event-meta]');

    card.classList.toggle('profile-events__card--ended', isEnded);

    if (status instanceof HTMLElement) {
      status.textContent = isEnded ? '終了' : statusLabel;
      status.classList.remove(...statusClasses);
      status.classList.add(`profile-events__status--${statusTone}`);
    }

    if (meta instanceof HTMLElement) {
      meta.textContent = isEnded ? '終了しました' : ctaLabel;
      meta.classList.toggle('profile-events__meta--ended', isEnded);
    }

    if (isEnded) {
      card.removeAttribute('href');
      card.removeAttribute('target');
      card.removeAttribute('rel');
    } else if (href) {
      card.setAttribute('href', href);
      if (isExternal) {
        card.setAttribute('target', '_blank');
        card.setAttribute('rel', 'external noreferrer');
      } else {
        card.removeAttribute('target');
        card.removeAttribute('rel');
      }
    }
  }
})();
