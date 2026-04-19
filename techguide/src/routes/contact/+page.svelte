<script lang="ts">
  import { browser } from '$app/environment';
  import { trackEvent } from '$lib/analytics';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { buildBreadcrumbJsonLd, buildWebPageJsonLd, serializeJsonLd } from '$lib/seo';
  import {
    companyProfile,
    contactInfo,
    contactPageContent,
    navItems,
    pageSeo,
  } from '$lib/data/site';

  $effect(() => {
    if (!browser) {
      return;
    }

    trackEvent('contact_page_view');
  });

  function openMailClient() {
    window.location.href = `mailto:${contactInfo.email}`;
  }

  function openContactForm() {
    trackEvent('contact_form_fallback_click', {
      destination_host: new URL(contactInfo.formUrl).hostname,
    });

    window.open(contactInfo.formUrl, '_blank', 'noopener,noreferrer');
  }

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
</script>

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

          <section class="contact-page__panel contact-page__panel--compact">
            <h2>{contactPageContent.alternateContactTitle}</h2>
            <p>{contactPageContent.alternateContactDescription}</p>

            <div class="contact-page__links">
              <button type="button" onclick={openContactForm}>フォームを直接開く</button>
              <button type="button" onclick={openMailClient}>メールで問い合わせる</button>
            </div>
          </section>
        </div>

        <div class="contact-page__frame">
          <iframe
            src={contactInfo.formUrl}
            title="TechGuideお問い合わせフォーム"
            loading="lazy"
            scrolling="no"
          ></iframe>
        </div>
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

  .contact-page__panel {
    display: grid;
    gap: 14px;
    padding: clamp(22px, 3vw, 28px);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(117, 92, 56, 0.12);
    box-shadow: var(--shadow-soft);
  }

  .contact-page__panel--compact {
    gap: 12px;
  }

  .contact-page__panel h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.22rem, 1.8vw, 1.5rem);
    line-height: 1.3;
    letter-spacing: -0.03em;
    font-weight: 800;
  }

  .contact-page__panel p,
  .contact-page__support-list,
  .contact-page__process-list {
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

  .contact-page__links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .contact-page__links button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 16px;
    border-radius: var(--radius-pill);
    color: rgba(135, 99, 45, 0.95);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 6px;
    background: rgba(250, 246, 236, 0.82);
    cursor: pointer;
  }

  .contact-page__frame {
    min-height: 1360px;
    border-radius: 28px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(117, 92, 56, 0.12);
    box-shadow: var(--shadow-soft);
  }

  iframe {
    display: block;
    width: 100%;
    height: 1360px;
    border: 0;
    background: #fff;
  }

  @media (max-width: 960px) {
    .contact-page__content {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .contact-page__frame {
      min-height: 1560px;
    }

    iframe {
      height: 1560px;
    }

    .contact-page__links {
      flex-direction: column;
    }
  }
</style>
