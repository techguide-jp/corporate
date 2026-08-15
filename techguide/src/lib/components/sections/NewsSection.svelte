<script lang="ts">
  import { resolve } from '$app/paths';
  import NewsList from '$lib/components/news/NewsList.svelte';
  import type { NewsItem } from '$lib/news/types';

  interface Props {
    items: readonly NewsItem[];
  }

  let { items }: Props = $props();
</script>

<section class="home-news" aria-labelledby="home-news-heading">
  <div class="container home-news__inner">
    <div class="home-news__heading">
      <div>
        <p>News</p>
        <h2 id="home-news-heading">お知らせ</h2>
      </div>
      <a href={resolve('/news/')}>お知らせ一覧を見る</a>
    </div>

    <NewsList {items} variant="compact" />
  </div>
</section>

<style>
  .home-news {
    padding-block: clamp(34px, 5vw, 54px);
    background: rgba(250, 246, 236, 0.7);
    border-block: 1px solid rgba(117, 92, 56, 0.1);
  }

  .home-news__inner {
    display: grid;
    gap: 22px;
  }

  .home-news__heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
  }

  .home-news__heading div {
    display: grid;
    gap: 2px;
  }

  .home-news__heading p {
    color: rgba(135, 99, 45, 0.88);
    font-family: var(--font-heading);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.55rem, 2.5vw, 2rem);
    letter-spacing: -0.03em;
  }

  .home-news__heading a {
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .home-news__heading a::after {
    margin-left: 8px;
    content: '→';
  }

  @media (max-width: 560px) {
    .home-news__heading {
      align-items: start;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
