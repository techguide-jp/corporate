import type { NewsCategory } from './types';

export const newsCategories = [
  { id: 'company', label: '会社情報' },
  { id: 'event', label: 'イベント' },
  { id: 'product', label: 'プロダクト' },
  { id: 'recruit', label: '採用' },
  { id: 'service', label: 'サービス' },
  { id: 'work', label: '実績' },
] as const satisfies readonly { id: NewsCategory; label: string }[];

export function getNewsCategoryLabel(categoryId: NewsCategory) {
  return newsCategories.find((category) => category.id === categoryId)?.label ?? categoryId;
}
