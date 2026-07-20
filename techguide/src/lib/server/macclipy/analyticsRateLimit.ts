interface AnalyticsRateLimiterOptions {
  limit: number;
  windowMs: number;
  maxEntries: number;
  now?: () => number;
}

interface AnalyticsRateLimitEntry {
  count: number;
  windowStartedAt: number;
}

export interface AnalyticsRateLimiter {
  consume(key: string): boolean;
}

export function createAnalyticsRateLimiter({
  limit,
  windowMs,
  maxEntries,
  now = Date.now,
}: AnalyticsRateLimiterOptions): AnalyticsRateLimiter {
  const entries = new Map<string, AnalyticsRateLimitEntry>();

  return {
    consume(key: string): boolean {
      const currentTime = now();
      removeExpiredEntries(entries, currentTime, windowMs);

      const existing = entries.get(key);
      if (existing) {
        if (existing.count >= limit) {
          return false;
        }

        existing.count += 1;
        return true;
      }

      if (entries.size >= maxEntries) {
        return false;
      }

      entries.set(key, { count: 1, windowStartedAt: currentTime });
      return true;
    },
  };
}

function removeExpiredEntries(
  entries: Map<string, AnalyticsRateLimitEntry>,
  currentTime: number,
  windowMs: number,
): void {
  for (const [key, entry] of entries) {
    if (currentTime - entry.windowStartedAt >= windowMs) {
      entries.delete(key);
    }
  }
}
