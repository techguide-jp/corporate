import { beforeToolSelectionArticle } from './data/before-tool-selection';
import { businessEngineerAlignmentArticle } from './data/business-engineer-alignment';
import { designingForMaintenanceAndImprovementArticle } from './data/designing-for-maintenance-and-improvement';
import { whyWeSometimesRecommendNotBuildingArticle } from './data/why-we-sometimes-recommend-not-building';
import { whyWeStartWithPlanningArticle } from './data/why-we-start-with-planning';
import type { Article } from './types';

export const articles = [
  whyWeSometimesRecommendNotBuildingArticle,
  whyWeStartWithPlanningArticle,
  beforeToolSelectionArticle,
  designingForMaintenanceAndImprovementArticle,
  businessEngineerAlignmentArticle,
] satisfies readonly Article[];
