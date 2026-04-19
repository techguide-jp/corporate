<script lang="ts">
  import { browser } from '$app/environment';
  import { trackEvent } from '$lib/analytics';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import { companyProfile, navItems } from '$lib/data/site';

  const contactFormUrl = 'https://tayori.com/form/0a9d521c221f55e0c7b857f7e2f83f5760c7b7bb/';

  $effect(() => {
    if (!browser) {
      return;
    }

    trackEvent('contact_page_view');
  });
</script>

<svelte:head>
  <title>お問い合わせ | TechGuide</title>
  <meta
    name="description"
    content="TechGuide合同会社のお問い合わせフォームです。旧サイトと同じTayoriフォームを埋め込んでいます。"
  />
</svelte:head>

<Header items={navItems} />

<main>
  <section class="contact-page section--tight">
    <div class="container contact-page__inner">
      <SectionHeading
        title="お問い合わせ"
        subtitle="ご相談・お問い合わせはこちらのフォームからお送りください。"
      />

      <div class="contact-page__frame">
        <iframe
          src={contactFormUrl}
          title="TechGuideお問い合わせフォーム"
          loading="lazy"
          scrolling="no"
        ></iframe>
      </div>

      <p class="contact-page__note">
        フォームが表示されない場合は
        <a
          href={contactFormUrl}
          target="_blank"
          rel="noreferrer"
          onclick={() =>
            trackEvent('contact_form_fallback_click', {
              destination_host: new URL(contactFormUrl).hostname,
            })}
        >
          こちら
        </a>
        から直接開けます。
      </p>
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

  .contact-page__note {
    text-align: center;
    color: var(--color-ink-soft);
  }

  .contact-page__note a {
    color: rgba(135, 99, 45, 0.95);
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  @media (max-width: 720px) {
    .contact-page__frame {
      min-height: 1560px;
    }

    iframe {
      height: 1560px;
    }
  }
</style>
