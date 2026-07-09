import { beforeToolSelectionArticle } from './data/before-tool-selection';
import { designingForMaintenanceAndImprovementArticle } from './data/designing-for-maintenance-and-improvement';
import { whyWeStartWithPlanningArticle } from './data/why-we-start-with-planning';
import type { Article } from './types';

export const articles = [
  whyWeStartWithPlanningArticle,
  beforeToolSelectionArticle,
  designingForMaintenanceAndImprovementArticle,
] satisfies readonly Article[];
