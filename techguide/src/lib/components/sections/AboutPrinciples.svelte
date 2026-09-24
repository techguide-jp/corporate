<script lang="ts">
  import type { StoryContent } from '$lib/types/content';

  interface Props {
    content: StoryContent;
  }

  let { content }: Props = $props();
  const visionPhrases = $derived(content.vision.title.split('、'));
</script>

<div class="principles">
  <section class="principles__vision" aria-labelledby="about-vision">
    <h3 class="principles__heading" id="about-vision">
      Vision <span>実現したい世界</span>
    </h3>
    <p class="principles__vision-title">
      {#each visionPhrases as phrase, index (phrase)}
        <span>{phrase}{index < visionPhrases.length - 1 ? '、' : ''}</span>
      {/each}
    </p>
    <div class="principles__vision-copy">
      {#each content.vision.paragraphs as paragraph (paragraph)}
        <p>{paragraph}</p>
      {/each}
    </div>
  </section>

  <section class="principles__section" aria-labelledby="about-mission">
    <h3 class="principles__heading" id="about-mission">
      {content.missionTitle} <span>私たちが果たす役割</span>
    </h3>
    <ol class="principles__list principles__list--mission" role="list">
      {#each content.missionItems as item, index (item.title)}
        <li>
          <span class="principles__number" aria-hidden="true">{index + 1}.</span>
          <div class="principles__item-copy">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </li>
      {/each}
    </ol>
  </section>

  <section class="principles__section" aria-labelledby="about-values">
    <div class="principles__values-heading">
      <h3 class="principles__heading" id="about-values">
        {content.valuesTitle} <span>私たちの判断基準</span>
      </h3>
      <p>{content.valuesIntro}</p>
    </div>
    <ol class="principles__list principles__list--values" role="list">
      {#each content.values as item, index (item.title)}
        <li>
          <span class="principles__number" aria-hidden="true">{index + 1}.</span>
          <div class="principles__item-copy">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </li>
      {/each}
    </ol>
  </section>
</div>

<style>
  .principles {
    display: grid;
    gap: clamp(36px, 5vw, 56px);
  }

  .principles__vision {
    display: grid;
    gap: 22px;
    padding: clamp(24px, 4vw, 48px);
    border-top: 3px solid rgba(214, 151, 76, 0.62);
    border-radius: 0 0 24px 24px;
    background: linear-gradient(135deg, rgba(233, 188, 96, 0.22), rgba(255, 249, 239, 0.5));
  }

  .principles__heading {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px 18px;
    color: rgba(135, 99, 45, 0.98);
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .principles__heading span {
    font-size: 0.9rem;
    letter-spacing: 0.02em;
  }

  .principles__vision-title {
    max-width: 26em;
    font-family: var(--font-heading);
    font-size: clamp(1.55rem, 3vw, 2.35rem);
    font-weight: 800;
    line-height: 1.65;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  .principles__vision-title span {
    display: inline-block;
    max-width: 100%;
  }

  .principles__vision-copy {
    display: grid;
    gap: 16px;
    max-width: 48rem;
    white-space: pre-line;
  }

  .principles p:not(.principles__vision-title) {
    color: var(--color-ink-soft);
    font-size: 0.98rem;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .principles__section {
    display: grid;
    gap: 24px;
  }

  .principles__values-heading {
    display: grid;
    gap: 10px;
  }

  .principles__list {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .principles__list li {
    display: grid;
    grid-template-columns: 1.5rem minmax(0, 1fr);
    align-content: start;
    gap: 12px;
    padding: 22px 0;
    border-top: 1px solid rgba(117, 92, 56, 0.18);
  }

  .principles__number {
    color: rgba(135, 99, 45, 0.98);
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 800;
  }

  .principles__item-copy {
    display: grid;
    gap: 12px;
  }

  .principles__item-copy h4 {
    font-family: var(--font-heading);
    font-size: clamp(1.08rem, 1.6vw, 1.32rem);
    font-weight: 800;
    line-height: 1.65;
    letter-spacing: -0.03em;
    text-wrap: pretty;
  }

  @media (min-width: 760px) {
    .principles__list--mission {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 32px;
    }

    .principles__list--values .principles__item-copy {
      grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.35fr);
      gap: 24px;
      align-items: baseline;
    }
  }
</style>
