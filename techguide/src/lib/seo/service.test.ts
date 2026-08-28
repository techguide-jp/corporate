import assert from 'node:assert/strict';
import test from 'node:test';
import { buildServiceJsonLd } from './service.ts';

await test('builds local service structured data with provider and service areas', () => {
  const result = buildServiceJsonLd({
    name: '茅ヶ崎のシステム開発・Webアプリ開発 | TechGuide',
    description: '茅ヶ崎市・湘南エリアのシステム開発を支援します。',
    url: 'https://techguide.jp/chigasaki/system-development/',
    providerId: 'https://techguide.jp/#organization',
    serviceType: 'システム開発・Webアプリ開発',
    areaServed: [
      { type: 'City', name: '茅ヶ崎市' },
      { type: 'AdministrativeArea', name: '湘南エリア' },
    ],
  });

  assert.equal(result['@type'], 'Service');
  assert.equal(result['@id'], 'https://techguide.jp/chigasaki/system-development/#service');
  assert.equal(result.url, 'https://techguide.jp/chigasaki/system-development/');
  assert.equal(result.serviceType, 'システム開発・Webアプリ開発');
  assert.deepEqual(result.provider, {
    '@id': 'https://techguide.jp/#organization',
  });
  assert.deepEqual(result.areaServed, [
    { '@type': 'City', name: '茅ヶ崎市' },
    { '@type': 'AdministrativeArea', name: '湘南エリア' },
  ]);
});
