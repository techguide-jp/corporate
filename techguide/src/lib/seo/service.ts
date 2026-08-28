interface ServiceArea {
  type: 'City' | 'AdministrativeArea';
  name: string;
}

interface ServiceJsonLdInput {
  name: string;
  description: string;
  url: string;
  providerId: string;
  serviceType: string;
  areaServed: ServiceArea[];
}

export function buildServiceJsonLd({
  name,
  description,
  url,
  providerId,
  serviceType,
  areaServed,
}: ServiceJsonLdInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType,
    areaServed: areaServed.map((area) => ({
      '@type': area.type,
      name: area.name,
    })),
    provider: {
      '@id': providerId,
    },
  };
}
