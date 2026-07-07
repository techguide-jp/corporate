<script lang="ts">
  import type { Article } from '$lib/articles/types';
  import ArticleCard from './ArticleCard.svelte';

  interface Props {
    articles: Article[];
  }

  let { articles }: Props = $props();
</script>

{#if articles.length}
  <section class="related-articles" aria-labelledby="related-articles-heading">
    <h2 id="related-articles-heading">関連記事</h2>
    <div class="related-articles__grid">
      {#each articles as article (article.slug)}
        <ArticleCard {article} trackingEventName="article_related_click" placement="related" />
      {/each}
    </div>
  </section>
{/if}

<style>
  .related-articles {
    display: grid;
    gap: 20px;
    margin-top: clamp(42px, 6vw, 64px);
  }

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.45rem, 2vw, 1.8rem);
    letter-spacing: -0.03em;
  }

  .related-articles__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
  }
</style>
