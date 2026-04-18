<script lang="ts">
  import { asset } from '$app/paths';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import type { StoryContent } from '$lib/types/content';

  interface Props {
    content: StoryContent;
  }

  let { content }: Props = $props();
</script>

<section class="section section--tight about" id="about">
  <div class="container about__inner">
    <SectionHeading title={content.label} subtitle={content.title} />

    <div class="about__intro">
      <div class="about__portrait">
        <img src={asset(content.image)} alt={content.imageAlt} loading="lazy" />
      </div>

      <article class="about__story">
        <p class="about__eyebrow">代表の想い</p>
        <p class="about__lead">{content.lead}</p>

        <div class="about__copy">
          {#each content.paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
      </article>
    </div>

    <section class="about__mission-area">
      <div class="about__block-head">
        <p class="about__eyebrow">{content.missionTitle}</p>
      </div>

      <ul class="about__mission-list">
        {#each content.missionItems as item}
          <li>{item}</li>
        {/each}
      </ul>
    </section>

    <section class="about__focus-area">
      <div class="about__block-head">
        <p class="about__eyebrow">課題意識</p>
        <p class="about__block-copy">
          IT 活用の格差と、人材・現場のミスマッチを埋めることに向き合っています。
        </p>
      </div>

      <div class="about__focus-list">
        {#each content.focusItems as item}
          <article>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            {#if item.points?.length}
              <ul class="about__focus-points">
                {#each item.points as point}
                  <li>{point}</li>
                {/each}
              </ul>
            {/if}
          </article>
        {/each}
      </div>
    </section>
  </div>
</section>

<style>
  .about {
    background:
      radial-gradient(circle at 14% 18%, rgba(242, 220, 165, 0.34) 0%, transparent 22%),
      linear-gradient(180deg, rgba(253, 250, 243, 1) 0%, rgba(244, 236, 219, 0.94) 100%);
  }

  .about__inner {
    display: grid;
    gap: clamp(28px, 4vw, 42px);
  }

  .about :global(.section-heading) {
    margin-bottom: clamp(24px, 3vw, 34px);
  }

  .about :global(.section-heading h2) {
    font-size: clamp(1.82rem, 2.6vw, 2.38rem);
  }

  .about :global(.section-heading p) {
    font-size: 0.96rem;
  }

  .about__intro {
    display: grid;
    grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.4fr);
    gap: clamp(24px, 3vw, 40px);
    align-items: start;
  }

  .about__portrait img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: 30px;
    box-shadow: var(--shadow-card);
  }

  .about__story {
    display: grid;
    gap: 14px;
    padding-top: 8px;
  }

  .about__eyebrow {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(135, 99, 45, 0.88);
  }

  .about__lead {
    font-family: var(--font-heading);
    font-size: clamp(1.08rem, 1.55vw, 1.44rem);
    line-height: 1.55;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: rgba(40, 30, 16, 0.96);
  }

  .about__copy {
    display: grid;
    gap: 14px;
    color: var(--color-ink-soft);
  }

  .about__copy p {
    font-size: 0.98rem;
    line-height: 1.8;
  }

  .about__mission-area {
    position: relative;
    isolation: isolate;
    overflow: visible;
    display: grid;
    gap: 18px;
    padding: clamp(26px, 3vw, 34px) 0 clamp(22px, 3vw, 28px);
  }

  .about__mission-area::before {
    content: 'Mission';
    position: absolute;
    right: 0;
    top: clamp(8px, 1.8vw, 14px);
    font-family: var(--font-heading);
    font-size: clamp(3.6rem, 8vw, 6.2rem);
    line-height: 1;
    letter-spacing: -0.06em;
    font-weight: 900;
    color: rgba(214, 151, 76, 0.18);
    pointer-events: none;
  }

  .about__mission-area::after {
    content: '';
    position: absolute;
    left: 50%;
    top: -18px;
    bottom: -14px;
    width: 100vw;
    transform: translateX(-50%);
    background:
      linear-gradient(90deg, rgba(233, 188, 96, 0.32) 0%, rgba(244, 223, 180, 0.2) 26%, rgba(255, 249, 239, 0.08) 100%);
    box-shadow:
      inset 0 3px 0 rgba(214, 151, 76, 0.62),
      inset 0 -1px 0 rgba(214, 151, 76, 0.24);
    z-index: -1;
    pointer-events: none;
  }

  .about__mission-area .about__block-head,
  .about__mission-area .about__mission-list {
    position: relative;
    z-index: 1;
  }

  .about__focus-area {
    display: grid;
    gap: 18px;
    padding-top: clamp(28px, 4vw, 40px);
    border-top: 1px solid rgba(117, 92, 56, 0.14);
  }

  .about__block-head {
    display: grid;
    gap: 10px;
    max-width: 760px;
  }

  .about__block-copy {
    font-family: var(--font-heading);
    font-size: clamp(1.04rem, 1.55vw, 1.28rem);
    line-height: 1.65;
    font-weight: 700;
    color: rgba(57, 45, 29, 0.92);
  }

  .about__mission-list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .about__mission-list li {
    padding: 20px 0;
    font-family: var(--font-heading);
    font-size: clamp(1.16rem, 1.76vw, 1.56rem);
    line-height: 1.58;
    letter-spacing: -0.03em;
    color: rgba(57, 45, 29, 0.94);
    font-weight: 800;
    border-bottom: 1px solid rgba(117, 92, 56, 0.1);
  }

  .about__mission-list li:first-child {
    padding-top: 0;
  }

  .about__focus-list {
    display: grid;
    gap: 18px;
  }

  .about__focus-list article {
    display: grid;
    gap: 8px;
    padding: 0 0 0 22px;
    border-left: 3px solid rgba(234, 152, 84, 0.5);
  }

  .about__focus-list article + article {
    margin-top: 8px;
  }

  .about__focus-list h3 {
    font-family: var(--font-heading);
    font-size: clamp(1.16rem, 1.72vw, 1.42rem);
    line-height: 1.4;
    letter-spacing: -0.03em;
    font-weight: 800;
  }

  .about__focus-list p {
    max-width: 760px;
    color: var(--color-ink-soft);
    font-size: 0.97rem;
    line-height: 1.8;
  }

  .about__focus-points {
    display: grid;
    gap: 10px;
    margin: 4px 0 0;
    padding: 0;
    list-style: none;
  }

  .about__focus-points li {
    padding-left: 0;
    color: rgba(72, 58, 40, 0.92);
    font-size: 0.95rem;
    line-height: 1.85;
  }

  @media (max-width: 900px) {
    .about__intro {
      grid-template-columns: 1fr;
    }

    .about__portrait {
      max-width: 420px;
    }
  }
</style>
