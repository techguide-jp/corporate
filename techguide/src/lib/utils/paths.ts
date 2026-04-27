import type { resolve } from '$app/paths';
import type { PathnameWithSearchOrHash, RouteIdWithSearchOrHash } from '$app/types';

export type InternalHref = PathnameWithSearchOrHash | RouteIdWithSearchOrHash;

type ResolveArgs = Parameters<typeof resolve>;

export function getResolveArgs(href: InternalHref): ResolveArgs {
  // resolve() uses conditional rest tuples, so wrapping the tuple keeps union hrefs type-safe.
  return [href] as ResolveArgs;
}

export function isInternalHref(href: string): href is InternalHref {
  return href.startsWith('/');
}
