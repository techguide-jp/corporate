<script lang="ts">
  import type { Article } from '$lib/articles/types';
  import ArticleCta from './ArticleCta.svelte';
  import ArticleInlineText from './ArticleInlineText.svelte';

  interface Props {
    article: Article;
  }

  let { article }: Props = $props();
</script>

<div class="article-content">
  {#each article.blocks as block, index (index)}
    {#if block.type === 'heading'}
      {#if block.level === 3}
        <h3 id={block.id}>{block.text}</h3>
      {:else}
        <h2 id={block.id}>{block.text}</h2>
      {/if}
    {:else if block.type === 'paragraph'}
      <p>
        <ArticleInlineText content={block.text} slug={article.slug} category={article.category} />
      </p>
    {:else if block.type === 'list'}
      <ul>
        {#each block.items as item (item)}
          <li>
            <ArticleInlineText content={item} slug={article.slug} category={article.category} />
          </li>
        {/each}
      </ul>
    {:else if block.type === 'quote'}
      <blockquote>{block.text}</blockquote>
    {:else if block.type === 'cta'}
      <ArticleCta cta={block.cta} slug={article.slug} category={article.category} />
    {/if}
  {/each}
</div>

<style>
  .article-content {
    display: grid;
    gap: 22px;
    font-size: 1.02rem;
  }

  h2,
  h3 {
    font-family: var(--font-heading);
    font-weight: 800;
    letter-spacing: -0.03em;
    scroll-margin-top: calc(var(--header-height) + 22px);
  }

  h2 {
    margin-top: 18px;
    font-size: clamp(1.55rem, 2.3vw, 2rem);
    line-height: 1.28;
  }

  h3 {
    margin-top: 8px;
    font-size: clamp(1.25rem, 1.8vw, 1.5rem);
    line-height: 1.35;
  }

  p,
  li {
    color: var(--color-ink-soft);
  }

  ul {
    display: grid;
    gap: 10px;
    margin: 0;
    padding-left: 1.2em;
  }

  li::marker {
    color: var(--color-primary-deep);
  }

  blockquote {
    margin: 8px 0;
    padding: clamp(18px, 3vw, 26px);
    border-left: 4px solid var(--color-primary);
    border-radius: 0 var(--radius-card) var(--radius-card) 0;
    background: rgba(250, 243, 229, 0.9);
    color: var(--color-ink);
    font-weight: 800;
  }
</style>
