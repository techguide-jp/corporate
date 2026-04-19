<script lang="ts">
  import { asset } from '$app/paths';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import type { StoryContent } from '$lib/types/content';

  interface Props {
    content: StoryContent;
  }

  let { content }: Props = $props();

  type TextChunk = {
    text: string;
    emphasized: boolean;
  };

  const focusIntro =
    '**導入前の整理で止まること**と、**技術とビジネスをつなぐ人材が育ちにくいこと**に向き合っています。';

  function splitEmphasis(text: string): TextChunk[] {
    const matches = Array.from(text.matchAll(/\*\*(.+?)\*\*/g));

    if (matches.length === 0) {
      return [{ text, emphasized: false }];
    }

    const chunks: TextChunk[] = [];
    let currentIndex = 0;

    for (const match of matches) {
      const start = match.index ?? 0;
      const fullText = match[0];
      const emphasizedText = match[1];

      if (start > currentIndex) {
        chunks.push({ text: text.slice(currentIndex, start), emphasized: false });
      }

      chunks.push({ text: emphasizedText, emphasized: true });
      currentIndex = start + fullText.length;
    }

    if (currentIndex < text.length) {
      chunks.push({ text: text.slice(currentIndex), emphasized: false });
    }

    return chunks;
  }
</script>

<section class="section section--tight about" id="about">
  <div class="container about__inner">
    <SectionHeading eyebrow={content.label} title={content.title} />

    <div class="about__intro">
      <div class="about__portrait">
        <img src={asset(content.image)} alt={content.imageAlt} loading="lazy" />
      </div>

      <article class="about__story">
        <p class="about__eyebrow">代表の想い</p>
        <p class="about__lead">
          {#each splitEmphasis(content.lead) as chunk, chunkIndex (chunkIndex)}
            {#if chunk.emphasized}
              <strong>{chunk.text}</strong>
            {:else}
              {chunk.text}
            {/if}
          {/each}
        </p>

        <div class="about__copy">
          {#each content.paragraphs as paragraph (paragraph)}
            <p>
              {#each splitEmphasis(paragraph) as chunk, chunkIndex (chunkIndex)}
                {#if chunk.emphasized}
                  <strong>{chunk.text}</strong>
                {:else}
                  {chunk.text}
                {/if}
              {/each}
            </p>
          {/each}
        </div>
      </article>
    </div>

    <section class="about__mission-area">
      <div class="about__block-head">
        <p class="about__eyebrow">{content.missionTitle}</p>
      </div>

      <ul class="about__mission-list">
        {#each content.missionItems as item (item)}
          <li>
            {#each splitEmphasis(item) as chunk, chunkIndex (chunkIndex)}
              {#if chunk.emphasized}
                <strong>{chunk.text}</strong>
              {:else}
                {chunk.text}
              {/if}
            {/each}
          </li>
        {/each}
      </ul>
    </section>

    <section class="about__focus-area">
      <div class="about__block-head">
        <p class="about__eyebrow">課題意識</p>
        <p class="about__block-copy">
          {#each splitEmphasis(focusIntro) as chunk, chunkIndex (chunkIndex)}
            {#if chunk.emphasized}
              <strong>{chunk.text}</strong>
            {:else}
              {chunk.text}
            {/if}
          {/each}
        </p>
      </div>

      <div class="about__focus-list">
        {#each content.focusItems as item (item.title)}
          <article>
            <h3>{item.title}</h3>
            <p>
              {#each splitEmphasis(item.description) as chunk, chunkIndex (chunkIndex)}
                {#if chunk.emphasized}
                  <strong>{chunk.text}</strong>
                {:else}
                  {chunk.text}
                {/if}
              {/each}
            </p>

            {#if item.points?.length}
              <ul class="about__focus-points">
                {#each item.points as point (point)}
                  <li>
                    {#each splitEmphasis(point) as chunk, chunkIndex (chunkIndex)}
                      {#if chunk.emphasized}
                        <strong>{chunk.text}</strong>
                      {:else}
                        {chunk.text}
                      {/if}
                    {/each}
                  </li>
                {/each}
              </ul>
            {/if}

            {#if item.closing}
              <p class="about__focus-closing">
                {#each splitEmphasis(item.closing) as chunk, chunkIndex (chunkIndex)}
                  {#if chunk.emphasized}
                    <strong>{chunk.text}</strong>
                  {:else}
                    {chunk.text}
                  {/if}
                {/each}
              </p>
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

  .about :global(.section-heading__eyebrow) {
    font-size: 0.9rem;
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
    max-width: 42rem;
    font-size: 0.98rem;
    line-height: 1.8;
    text-wrap: pretty;
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
    background: linear-gradient(
      90deg,
      rgba(233, 188, 96, 0.32) 0%,
      rgba(244, 223, 180, 0.2) 26%,
      rgba(255, 249, 239, 0.08) 100%
    );
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
    text-wrap: pretty;
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
    text-wrap: pretty;
  }

  .about__focus-points {
    display: grid;
    gap: 12px;
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
  }

  .about__focus-points li {
    position: relative;
    padding: 14px 16px 14px 44px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.58);
    border: 1px solid rgba(117, 92, 56, 0.12);
    box-shadow: 0 10px 22px rgba(111, 83, 41, 0.06);
    color: rgba(72, 58, 40, 0.92);
    font-size: 0.95rem;
    line-height: 1.8;
    text-wrap: pretty;
  }

  .about__focus-points li::before {
    content: '';
    position: absolute;
    left: 16px;
    top: 1.05rem;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background:
      radial-gradient(circle at center, rgba(255, 253, 248, 0.92) 0 28%, transparent 32%),
      linear-gradient(180deg, rgba(236, 174, 101, 1) 0%, rgba(214, 151, 76, 1) 100%);
    box-shadow:
      0 0 0 4px rgba(230, 184, 92, 0.16),
      0 4px 10px rgba(214, 151, 76, 0.22);
  }

  .about__focus-closing {
    margin-top: 4px;
    padding-top: 14px;
    border-top: 1px solid rgba(117, 92, 56, 0.12);
    color: rgba(48, 37, 23, 0.94);
    font-size: 0.97rem;
    line-height: 1.8;
    text-wrap: pretty;
  }

  .about strong {
    color: rgba(35, 27, 17, 0.98);
    font-weight: 800;
  }

  .about__copy strong,
  .about__block-copy strong,
  .about__mission-list strong,
  .about__focus-list strong,
  .about__focus-points strong,
  .about__focus-closing strong {
    background: linear-gradient(transparent 58%, rgba(230, 184, 92, 0.26) 58%);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .about__lead strong {
    color: rgba(28, 21, 13, 0.98);
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
