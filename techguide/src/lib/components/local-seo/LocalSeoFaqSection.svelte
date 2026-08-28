<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import type { LocalSeoFaqItem, LocalSeoSection } from '$lib/local-seo/types';

  interface Props {
    faq: LocalSeoSection<LocalSeoFaqItem>;
  }

  let { faq }: Props = $props();
</script>

<section class="section local-faq">
  <div class="container local-faq__inner">
    <SectionHeading title={faq.title} subtitle={faq.description} />
    <div class="local-faq__list">
      {#each faq.items as item (item.question)}
        <details>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      {/each}
    </div>
  </div>
</section>
