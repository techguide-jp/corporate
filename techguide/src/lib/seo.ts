import { accessInfo, companyProfile, contactInfo, siteMetadata } from '$lib/data/site';

type JsonLdObject = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface WebPageInput {
  name: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'CollectionPage' | 'ContactPage';
}

function normalizePath(path: string) {
  if (!path || path === '/') {
    return '/';
  }

  const suffixIndex = path.search(/[?#]/);
  const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : path.slice(suffixIndex);
  const trimmedPathname = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const segments = trimmedPathname.split('/');
  const lastSegment = segments[segments.length - 1] ?? '';
  const isFilePath = lastSegment.includes('.');

  return isFilePath ? `/${trimmedPathname}${suffix}` : `/${trimmedPathname}/${suffix}`;
}

function normalizePostalCode(postalCode: string) {
  return postalCode.replace(/^〒/, '');
}

export function buildAbsoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(normalizePath(path), `${siteMetadata.siteUrl}/`).toString();
}

export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function buildWebSiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${buildAbsoluteUrl('/')}#website`,
    url: buildAbsoluteUrl('/'),
    name: siteMetadata.brandName,
    inLanguage: siteMetadata.language,
    publisher: {
      '@id': `${buildAbsoluteUrl('/')}#organization`,
    },
  };
}

export function buildOrganizationJsonLd(): JsonLdObject {
  const sameAs = siteMetadata.sameAs.filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${buildAbsoluteUrl('/')}#organization`,
    name: companyProfile.name,
    legalName: siteMetadata.legalName,
    alternateName: siteMetadata.brandName,
    url: buildAbsoluteUrl('/'),
    email: contactInfo.email,
    foundingDate: companyProfile.foundingDateIso,
    founder: {
      '@type': 'Person',
      name: companyProfile.representative,
    },
    image: buildAbsoluteUrl(siteMetadata.defaultOgImage),
    address: {
      '@type': 'PostalAddress',
      postalCode: normalizePostalCode(accessInfo.postalCode),
      addressRegion: accessInfo.addressRegion,
      addressLocality: accessInfo.addressLocality,
      streetAddress: accessInfo.streetAddress,
      addressCountry: accessInfo.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: contactInfo.email,
        availableLanguage: [siteMetadata.language],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function buildProfessionalServiceJsonLd(): JsonLdObject {
  const sameAs = siteMetadata.sameAs.filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${buildAbsoluteUrl('/')}#service`,
    name: companyProfile.name,
    legalName: siteMetadata.legalName,
    url: buildAbsoluteUrl('/'),
    image: buildAbsoluteUrl(siteMetadata.defaultOgImage),
    email: contactInfo.email,
    foundingDate: companyProfile.foundingDateIso,
    address: {
      '@type': 'PostalAddress',
      postalCode: normalizePostalCode(accessInfo.postalCode),
      addressRegion: accessInfo.addressRegion,
      addressLocality: accessInfo.addressLocality,
      streetAddress: accessInfo.streetAddress,
      addressCountry: accessInfo.addressCountry,
    },
    areaServed: 'JP',
    parentOrganization: {
      '@id': `${buildAbsoluteUrl('/')}#organization`,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function buildWebPageJsonLd({
  name,
  description,
  path,
  type = 'WebPage',
}: WebPageInput): JsonLdObject {
  const url = buildAbsoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: siteMetadata.language,
    isPartOf: {
      '@id': `${buildAbsoluteUrl('/')}#website`,
    },
    about: {
      '@id': `${buildAbsoluteUrl('/')}#organization`,
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}
