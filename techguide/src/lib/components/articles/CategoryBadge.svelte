<script lang="ts">
  import { getArticleCategoryLabel } from '$lib/articles/categories';
  import type { ArticleCategory } from '$lib/articles/types';

  interface Props {
    category: ArticleCategory;
  }

  let { category }: Props = $props();
</script>

<span class="category-badge">{getArticleCategoryLabel(category)}</span>

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
</style>
