import assert from 'node:assert/strict';
import test from 'node:test';
import { protos } from '@google-analytics/admin';
import {
  MACCLIPY_USAGE_CUSTOM_DIMENSIONS,
  MACCLIPY_USAGE_CUSTOM_METRICS,
} from '../../../../scripts/ga-admin-resources.mjs';
import * as gaAdminResources from '../../../../scripts/ga-admin-resources.mjs';

const { CustomDimension, CustomMetric, KeyEvent } = protos.google.analytics.admin.v1beta;

await test('defines event-scoped GA4 resources for feature usage reporting', () => {
  assert.deepEqual(MACCLIPY_USAGE_CUSTOM_DIMENSIONS, [
    {
      parameterName: 'feature',
      displayName: 'MacClipy feature',
      description: 'MacClipyで日次集計された利用機能',
      scope: CustomDimension.DimensionScope.EVENT,
    },
    {
      parameterName: 'usage_date',
      displayName: 'MacClipy usage date',
      description: 'MacClipyが端末内で利用回数を集計した完了日',
      scope: CustomDimension.DimensionScope.EVENT,
    },
  ]);
  assert.deepEqual(MACCLIPY_USAGE_CUSTOM_METRICS, [
    {
      parameterName: 'usage_count',
      displayName: 'MacClipy usage count',
      description: 'MacClipyが端末内で日次集計した機能利用回数',
      measurementUnit: CustomMetric.MeasurementUnit.STANDARD,
      scope: CustomMetric.MetricScope.EVENT,
    },
  ]);
});

await test('normalizes JSON enum names before comparing key event counting methods', () => {
  const resources = gaAdminResources as unknown as {
    normalizeKeyEventCountingMethod?: (value: number | string | null) => unknown;
  };

  assert.equal(typeof resources.normalizeKeyEventCountingMethod, 'function');
  assert.equal(
    resources.normalizeKeyEventCountingMethod?.('ONCE_PER_EVENT'),
    KeyEvent.CountingMethod.ONCE_PER_EVENT,
  );
  assert.equal(
    resources.normalizeKeyEventCountingMethod?.(KeyEvent.CountingMethod.ONCE_PER_EVENT),
    KeyEvent.CountingMethod.ONCE_PER_EVENT,
  );
});
