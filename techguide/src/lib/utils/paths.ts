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

export function normalizePathname(pathname: string) {
  const path = pathname.split(/[?#]/)[0] || '/';

  return path === '/' ? path : path.replace(/\/+$/, '');
}

export function isNavigationItemActive({
  currentHash,
  currentPathname,
  href,
}: {
  currentHash: string;
  currentPathname: string;
  href: string;
}) {
  if (href.startsWith('/#')) {
    return currentPathname === '/' && currentHash === href.slice(1);
  }

  const currentPath = normalizePathname(currentPathname);
  const targetPath = normalizePathname(href);

  return currentPath === targetPath || (targetPath !== '/' && currentPath.startsWith(`${targetPath}/`));
}
