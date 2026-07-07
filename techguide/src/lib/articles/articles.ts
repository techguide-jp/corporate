import { beforeToolSelectionArticle } from './data/before-tool-selection';
import { whyWeStartWithPlanningArticle } from './data/why-we-start-with-planning';
import type { Article } from './types';

export const articles = [
  whyWeStartWithPlanningArticle,
  beforeToolSelectionArticle,
] satisfies readonly Article[];
