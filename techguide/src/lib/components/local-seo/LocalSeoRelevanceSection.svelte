<script lang="ts">
  import ActionButton from '$lib/components/ui/ActionButton.svelte';
  import type {
    LocalSeoProblemSection,
    LocalSeoSection,
    LocalSeoTransformationItem,
  } from '$lib/local-seo/types';

  interface Props {
    problems: LocalSeoProblemSection;
    transformation: LocalSeoSection<LocalSeoTransformationItem>;
    contactHref: string;
    analyticsPlacement: string;
  }

  let { problems, transformation, contactHref, analyticsPlacement }: Props = $props();
</script>

<section class="section local-relevance" aria-labelledby="local-relevance-title">
  <div class="container local-relevance__inner">
    <div class="local-relevance__intro">
      <div class="local-relevance__heading">
        <h2 id="local-relevance-title">{problems.title}</h2>
        <p>{problems.description}</p>
      </div>

      <div class="local-relevance__list">
        {#each problems.items as item (item.title)}
          <article class="local-pain-card">
            <p class="local-pain-card__audience">{item.audience}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        {/each}
      </div>
    </div>

    <div class="local-relevance__bridge">
      <div>
        <h3>{problems.bridge.title}</h3>
        <p>{problems.bridge.description}</p>
      </div>
      <ActionButton
        href={contactHref}
        label="当てはまる悩みを相談する"
        tone="light"
        analytics={{
          eventName: 'contact_cta_click',
          params: { placement: `${analyticsPlacement}_relevance` },
        }}
      />
    </div>

    <div class="local-transformation">
      <div class="local-transformation__heading">
        <p class="local-section-kicker">改善後のイメージ</p>
        <h2>{transformation.title}</h2>
        <p>{transformation.description}</p>
      </div>

      <div class="local-transformation__list">
        {#each transformation.items as item (item.before)}
          <article class="local-transformation__item">
            <div class="local-transformation__state local-transformation__state--before">
              <span>いま</span>
              <p>{item.before}</p>
            </div>
            <span class="local-transformation__arrow" aria-hidden="true">→</span>
            <div class="local-transformation__state local-transformation__state--after">
              <span>整えたあと</span>
              <p>{item.after}</p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>
