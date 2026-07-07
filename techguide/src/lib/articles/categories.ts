import type { ArticleCategory } from './types';

export interface ArticleCategoryMetadata {
  id: ArticleCategory;
  label: string;
  description: string;
}

export const articleCategories = [
  {
    id: 'techguide-approach',
    label: 'TechGuideの考え方',
    description: '作る前の整理や支援スタイルについての考え方',
  },
  {
    id: 'it-adoption',
    label: 'IT導入・業務改善',
    description: '現場に合うIT活用や業務改善の進め方',
  },
  {
    id: 'ai-adoption',
    label: 'AI活用・現場定着',
    description: 'AIを現場で使える状態にするための整理',
  },
  {
    id: 'business-technology-alignment',
    label: '事業と技術の橋渡し',
    description: '事業側と技術側の認識をそろえる支援',
  },
  {
    id: 'prototype-process',
    label: '試作・本開発プロセス',
    description: '試作を判断材料として使う進め方',
  },
  {
    id: 'event-community',
    label: 'イベント・コミュニティ運営',
    description: 'イベントやコミュニティの体験設計とIT活用',
  },
] as const satisfies readonly ArticleCategoryMetadata[];

export const articleCategoryLabels = Object.fromEntries(
  articleCategories.map((category) => [category.id, category.label]),
) as Record<ArticleCategory, string>;

export function getArticleCategoryLabel(category: ArticleCategory) {
  return articleCategoryLabels[category];
}
