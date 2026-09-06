const SAFE_QUERY_KEYS = new Set([
  'category',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
]);

export function sanitizeAnalyticsUrl(value: string): string {
  if (!value) return '';
  try {
    const url = new URL(value);
    url.hash = '';
    for (const key of [...url.searchParams.keys()]) {
      if (!SAFE_QUERY_KEYS.has(key)) url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return '';
  }
}

export function analyticsPagePath(location: string): string {
  const safe = sanitizeAnalyticsUrl(location);
  return safe ? new URL(safe).pathname : '/';
}
