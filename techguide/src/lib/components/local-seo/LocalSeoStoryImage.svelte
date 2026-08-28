<script lang="ts">
  import { asset } from '$app/paths';
  import type { LocalSeoStoryImage } from '$lib/local-seo/types';

  interface Props {
    storyImage: LocalSeoStoryImage;
  }

  let { storyImage }: Props = $props();
</script>

<section class="local-story" aria-label="現場での支援イメージ">
  <div class="container">
    <figure class="local-story__figure">
      <img
        src={asset(storyImage.image)}
        alt={storyImage.imageAlt}
        width="1536"
        height="864"
        loading="lazy"
      />
      <figcaption>{storyImage.caption}</figcaption>
    </figure>
  </div>
</section>
