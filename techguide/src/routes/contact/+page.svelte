<script lang="ts">
  import { browser } from '$app/environment';
  import { enhance } from '$app/forms';
  import { trackEvent } from '$lib/analytics';
  import {
    CONTACT_CATEGORIES,
    RECRUIT_CATEGORY_ID,
    createEmptyContactFormValues,
    type ContactFieldErrors,
    type ContactCategoryId,
    type ContactFormValues,
  } from '$lib/contact/form';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import { companyProfile, contactPageContent, navItems, pageSeo } from '$lib/data/site';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();
  const initialSelectedCategory = () => data.selectedCategory;
  let selectedCategory = $state<ContactCategoryId | ''>(initialSelectedCategory());
  let isSubmitting = $state(false);

  const values = $derived.by<ContactFormValues>(() => ({
    ...createEmptyContactFormValues(data.selectedCategory),
    ...form?.values,
  }));
  const fieldErrors = $derived.by<ContactFieldErrors>(() => form?.fieldErrors ?? {});
  const isRecruit = $derived(selectedCategory === RECRUIT_CATEGORY_ID);
  const hasTurnstile = $derived(data.turnstileSiteKey.length > 0);
  const contactStructuredData = [
    buildWebPageJsonLd({
      name: pageSeo.contact.title,
      description: pageSeo.contact.description,
      path: pageSeo.contact.path,
      type: 'ContactPage',
    }),
    buildBreadcrumbJsonLd([
      { name: 'ホーム', path: '/' },
      { name: 'お問い合わせ', path: pageSeo.contact.path },
    ]),
  ].map((item) => serializeJsonLd(item));

  $effect(() => {
    if (!browser) {
      return;
    }

    trackEvent('contact_page_view');
  });

  $effect(() => {
    if (form?.values?.category !== undefined) {
      selectedCategory = form.values.category;
    }
  });

  function updateCategory(event: Event) {
    selectedCategory = (event.currentTarget as HTMLSelectElement).value as ContactCategoryId | '';
  }

  const handleSubmit: SubmitFunction = () => {
    isSubmitting = true;

    return async ({ update }) => {
      try {
        await update();
        window.turnstile?.reset();
      } finally {
        isSubmitting = false;
      }
    };
  };
</script>

<svelte:head>
  {#if hasTurnstile}
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  {/if}
</svelte:head>

<SeoHead
  title={pageSeo.contact.title}
  description={pageSeo.contact.description}
  path={pageSeo.contact.path}
  jsonLd={contactStructuredData}
/>

<Header items={navItems} />

<main>
  <section class="contact-page section--tight">
    <div class="container contact-page__inner">
      <SectionHeading
        title={contactPageContent.title}
        subtitle={contactPageContent.subtitle}
        level={1}
      />

      <p class="contact-page__lead">{contactPageContent.lead}</p>

      <div class="contact-page__content">
        <div class="contact-page__details">
          <section class="contact-page__panel">
            <h2>このようなご相談に対応しています</h2>
            <ul class="contact-page__support-list">
              {#each contactPageContent.inquiryExamples as item (item)}
                <li>{item}</li>
              {/each}
            </ul>
          </section>

          <section class="contact-page__panel">
            <h2>{contactPageContent.processTitle}</h2>
            <ol class="contact-page__process-list">
              {#each contactPageContent.processSteps as step (step)}
                <li>{step}</li>
              {/each}
            </ol>
          </section>

          <section class="contact-page__panel contact-page__panel--compact">
            <h2>返信について</h2>
            <p>{contactPageContent.responseNote}</p>
          </section>
        </div>

        <form method="POST" action="?/submit" class="contact-form" use:enhance={handleSubmit}>
          <div class="contact-form__header">
            <h2>{contactPageContent.formTitle}</h2>
            <p>{contactPageContent.formDescription}</p>
          </div>

          {#if form?.message}
            <p
              class:contact-form__status--success={form.ok}
              class:contact-form__status--error={!form.ok}
              class="contact-form__status"
              role={form.ok ? 'status' : 'alert'}
            >
              {form.message}
            </p>
          {/if}

          <div class="contact-form__field contact-form__field--trap" aria-hidden="true">
            <label for="website">Webサイト</label>
            <input id="website" name="website" tabindex="-1" autocomplete="off" />
          </div>

          <label class="contact-form__field" for="category">
            <span>お問い合わせカテゴリ <strong>必須</strong></span>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onchange={updateCategory}
              aria-invalid={fieldErrors.category ? 'true' : undefined}
              aria-describedby={fieldErrors.category ? 'category-error' : undefined}
            >
              <option value="">下から選んでください</option>
              {#each CONTACT_CATEGORIES as category (category.id)}
                <option value={category.id}>{category.label}</option>
              {/each}
            </select>
            {#if fieldErrors.category}
              <small id="category-error">{fieldErrors.category}</small>
            {/if}
          </label>

          <div class="contact-form__grid">
            <label class="contact-form__field" for="name">
              <span>お名前 <strong>必須</strong></span>
              <input
                id="name"
                name="name"
                value={values.name ?? ''}
                autocomplete="name"
                aria-invalid={fieldErrors.name ? 'true' : undefined}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              />
              {#if fieldErrors.name}
                <small id="name-error">{fieldErrors.name}</small>
              {/if}
            </label>

            <label class="contact-form__field" for="email">
              <span>メールアドレス <strong>必須</strong></span>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email ?? ''}
                autocomplete="email"
                aria-invalid={fieldErrors.email ? 'true' : undefined}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {#if fieldErrors.email}
                <small id="email-error">{fieldErrors.email}</small>
              {/if}
            </label>
          </div>

          <label class="contact-form__field" for="company">
            <span>会社名・屋号</span>
            <input
              id="company"
              name="company"
              value={values.company ?? ''}
              autocomplete="organization"
            />
          </label>

          <label class="contact-form__field" for="subject">
            <span>件名 <strong>必須</strong></span>
            <input
              id="subject"
              name="subject"
              value={values.subject ?? ''}
              aria-invalid={fieldErrors.subject ? 'true' : undefined}
              aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
            />
            {#if fieldErrors.subject}
              <small id="subject-error">{fieldErrors.subject}</small>
            {/if}
          </label>

          <label class="contact-form__field" for="message">
            <span>お問い合わせ内容 <strong>必須</strong></span>
            <textarea
              id="message"
              name="message"
              rows="8"
              aria-invalid={fieldErrors.message ? 'true' : undefined}
              aria-describedby="message-help">{values.message ?? ''}</textarea
            >
            <em id="message-help">
              現在の状況、相談したいこと、希望時期、参考URLなどを分かる範囲でご記入ください。
            </em>
            {#if fieldErrors.message}
              <small>{fieldErrors.message}</small>
            {/if}
          </label>

          {#if isRecruit}
            <fieldset class="contact-form__recruit">
              <legend>採用・パートナー応募の追加情報</legend>

              <div class="contact-form__grid">
                <label class="contact-form__field" for="role">
                  <span>職種・主な役割 <strong>必須</strong></span>
                  <input
                    id="role"
                    name="role"
                    value={values.role ?? ''}
                    placeholder="例: フロントエンドエンジニア"
                    aria-invalid={fieldErrors.role ? 'true' : undefined}
                  />
                  {#if fieldErrors.role}
                    <small>{fieldErrors.role}</small>
                  {/if}
                </label>

                <label class="contact-form__field" for="experienceYears">
                  <span>経験年数</span>
                  <input
                    id="experienceYears"
                    name="experienceYears"
                    value={values.experienceYears ?? ''}
                    placeholder="例: Web開発5年"
                  />
                </label>
              </div>

              <div class="contact-form__grid">
                <label class="contact-form__field" for="workStyle">
                  <span>現在の働き方 <strong>必須</strong></span>
                  <input
                    id="workStyle"
                    name="workStyle"
                    value={values.workStyle ?? ''}
                    placeholder="例: 副業 / フリーランス / 正社員"
                    aria-invalid={fieldErrors.workStyle ? 'true' : undefined}
                  />
                  {#if fieldErrors.workStyle}
                    <small>{fieldErrors.workStyle}</small>
                  {/if}
                </label>

                <label class="contact-form__field" for="availability">
                  <span>週の稼働可能時間 <strong>必須</strong></span>
                  <input
                    id="availability"
                    name="availability"
                    value={values.availability ?? ''}
                    placeholder="例: 週5〜10時間"
                    aria-invalid={fieldErrors.availability ? 'true' : undefined}
                  />
                  {#if fieldErrors.availability}
                    <small>{fieldErrors.availability}</small>
                  {/if}
                </label>
              </div>

              <label class="contact-form__field" for="aiTools">
                <span>使用しているAIツール <strong>必須</strong></span>
                <input
                  id="aiTools"
                  name="aiTools"
                  value={values.aiTools ?? ''}
                  placeholder="例: ChatGPT / Codex / Claude / Cursor"
                  aria-invalid={fieldErrors.aiTools ? 'true' : undefined}
                />
                {#if fieldErrors.aiTools}
                  <small>{fieldErrors.aiTools}</small>
                {/if}
              </label>

              <label class="contact-form__field" for="portfolioUrl">
                <span>ポートフォリオ / GitHub URL</span>
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  value={values.portfolioUrl ?? ''}
                  placeholder="https://github.com/..."
                  aria-invalid={fieldErrors.portfolioUrl ? 'true' : undefined}
                />
                {#if fieldErrors.portfolioUrl}
                  <small>{fieldErrors.portfolioUrl}</small>
                {/if}
              </label>
            </fieldset>
          {/if}

          <div class="contact-form__turnstile">
            {#if hasTurnstile}
              <div class="cf-turnstile" data-sitekey={data.turnstileSiteKey}></div>
            {:else}
              <p>迷惑投稿対策は本番環境で有効になります。</p>
            {/if}
            {#if fieldErrors.turnstile}
              <small>{fieldErrors.turnstile}</small>
            {/if}
          </div>

          <button
            class="contact-form__submit"
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? '送信中...' : '内容を送信'}
          </button>
        </form>
      </div>
    </div>
  </section>
</main>

<Footer companyName={companyProfile.name} items={navItems} />

<style>
  .contact-page {
    padding-block: clamp(72px, 8vw, 110px);
  }

  .contact-page__inner {
    display: grid;
    gap: 28px;
  }

  .contact-page__lead {
    max-width: 52rem;
    margin: 0 auto;
    text-align: center;
    color: var(--color-ink-soft);
    font-size: 1.02rem;
  }

  .contact-page__content {
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    gap: 24px;
    align-items: start;
  }

  .contact-page__details {
    display: grid;
    gap: 18px;
  }

  .contact-page__panel,
  .contact-form {
    display: grid;
    gap: 18px;
    padding: clamp(22px, 3vw, 30px);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(117, 92, 56, 0.12);
    box-shadow: var(--shadow-soft);
  }

  .contact-page__panel--compact {
    gap: 12px;
  }

  .contact-page__panel h2,
  .contact-form h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.22rem, 1.8vw, 1.5rem);
    line-height: 1.3;
    letter-spacing: 0;
    font-weight: 800;
  }

  .contact-page__panel p,
  .contact-page__support-list,
  .contact-page__process-list,
  .contact-form__header p,
  .contact-form__field em,
  .contact-form__turnstile p {
    color: var(--color-ink-soft);
  }

  .contact-page__support-list,
  .contact-page__process-list {
    display: grid;
    gap: 12px;
    padding-left: 1.3rem;
  }

  .contact-page__support-list li,
  .contact-page__process-list li {
    line-height: 1.7;
  }

  .contact-form__header {
    display: grid;
    gap: 8px;
  }

  .contact-form__status {
    padding: 12px 14px;
    border-radius: 14px;
    font-weight: 700;
  }

  .contact-form__status--success {
    color: #23543a;
    background: rgba(220, 245, 229, 0.9);
    border: 1px solid rgba(50, 130, 79, 0.22);
  }

  .contact-form__status--error {
    color: #8a3b2f;
    background: rgba(255, 237, 232, 0.94);
    border: 1px solid rgba(190, 84, 60, 0.24);
  }

  .contact-form__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .contact-form__field {
    display: grid;
    gap: 8px;
    font-weight: 700;
  }

  .contact-form__field span {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .contact-form__field strong {
    padding: 2px 7px;
    border-radius: var(--radius-pill);
    color: #fff;
    background: var(--color-primary-deep);
    font-size: 0.72rem;
    line-height: 1.4;
  }

  .contact-form__field input,
  .contact-form__field textarea,
  .contact-form__field select {
    width: 100%;
    border: 1px solid rgba(117, 92, 56, 0.18);
    border-radius: 14px;
    background: rgba(255, 253, 248, 0.92);
    color: var(--color-ink);
    padding: 12px 14px;
    outline: none;
  }

  .contact-form__field textarea {
    resize: vertical;
    min-height: 180px;
  }

  .contact-form__field input:focus,
  .contact-form__field textarea:focus,
  .contact-form__field select:focus {
    border-color: rgba(214, 151, 76, 0.78);
    box-shadow: 0 0 0 3px rgba(230, 184, 92, 0.2);
  }

  .contact-form__field [aria-invalid='true'] {
    border-color: rgba(190, 84, 60, 0.62);
    background: rgba(255, 248, 246, 0.96);
  }

  .contact-form__field small,
  .contact-form__turnstile small {
    color: #9a4033;
    font-weight: 700;
  }

  .contact-form__field em {
    font-style: normal;
    font-size: 0.88rem;
    font-weight: 400;
  }

  .contact-form__field--trap {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .contact-form__recruit {
    display: grid;
    gap: 14px;
    margin: 0;
    padding: 18px;
    border: 1px solid rgba(214, 151, 76, 0.24);
    border-radius: 20px;
    background: rgba(255, 246, 214, 0.38);
  }

  .contact-form__recruit legend {
    padding-inline: 8px;
    font-family: var(--font-heading);
    font-weight: 800;
  }

  .contact-form__turnstile {
    display: grid;
    gap: 8px;
    min-height: 68px;
    align-items: center;
  }

  .contact-form__submit {
    justify-self: start;
    min-width: 180px;
    min-height: 52px;
    padding-inline: 28px;
    border-radius: var(--radius-pill);
    color: #fff;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-deep));
    box-shadow: var(--shadow-button);
  }

  .contact-form__submit:disabled {
    cursor: progress;
    opacity: 0.68;
  }

  @media (max-width: 960px) {
    .contact-page__content {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .contact-form__grid {
      grid-template-columns: 1fr;
    }

    .contact-form__submit {
      justify-self: stretch;
      width: 100%;
    }
  }
</style>
