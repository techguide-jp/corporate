import { protos } from '@google-analytics/admin';

const { CustomDimension, CustomMetric, KeyEvent } = protos.google.analytics.admin.v1beta;

export function normalizeKeyEventCountingMethod(value) {
  if (typeof value === 'string') {
    const enumValue = KeyEvent.CountingMethod[value];
    if (typeof enumValue === 'number') {
      return enumValue;
    }
  }

  return value;
}

export const MACCLIPY_USAGE_CUSTOM_DIMENSIONS = [
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
];

export const MACCLIPY_USAGE_CUSTOM_METRICS = [
  {
    parameterName: 'usage_count',
    displayName: 'MacClipy usage count',
    description: 'MacClipyが端末内で日次集計した機能利用回数',
    measurementUnit: CustomMetric.MeasurementUnit.STANDARD,
    scope: CustomMetric.MetricScope.EVENT,
  },
];
