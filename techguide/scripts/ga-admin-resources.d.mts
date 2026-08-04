interface GaAdminCustomDimensionDefinition {
  parameterName: string;
  displayName: string;
  description: string;
  scope: number;
}

interface GaAdminCustomMetricDefinition {
  parameterName: string;
  displayName: string;
  description: string;
  measurementUnit: number;
  scope: number;
}

export const MACCLIPY_USAGE_CUSTOM_DIMENSIONS: GaAdminCustomDimensionDefinition[];
export const MACCLIPY_USAGE_CUSTOM_METRICS: GaAdminCustomMetricDefinition[];
export function normalizeKeyEventCountingMethod(
  value: number | string | null | undefined,
): number | string | null | undefined;
