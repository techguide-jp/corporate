<script lang="ts">
  import { getArticleCategoryLabel } from '$lib/articles/categories';
  import type { ArticleCategory } from '$lib/articles/types';

  interface Props {
    category: ArticleCategory;
    variant?: 'default' | 'overlay';
  }

  let { category, variant = 'default' }: Props = $props();
</script>

<span class={`category-badge category-badge--${variant}`}>{getArticleCategoryLabel(category)}</span>

<style>
  .category-badge {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    min-height: 30px;
    padding-inline: 12px;
    border-radius: var(--radius-pill);
    background: rgba(230, 184, 92, 0.16);
    color: rgba(118, 78, 28, 0.98);
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.2;
  }

  .category-badge--overlay {
    border: 1px solid rgba(255, 255, 255, 0.62);
    background: rgba(255, 255, 255, 0.9);
    color: rgba(50, 36, 20, 0.98);
    box-shadow: 0 8px 18px rgba(23, 18, 12, 0.18);
  }
</style>
