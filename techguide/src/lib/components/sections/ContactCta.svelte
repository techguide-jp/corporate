<script lang="ts">
  import ActionButton from '$lib/components/ui/ActionButton.svelte';
  import type { ContactInfo } from '$lib/types/content';

  interface Props {
    contact: ContactInfo;
  }

  let { contact }: Props = $props();
</script>

<section class="contact-cta" id="contact">
  <div class="container contact-cta__inner">
    <p class="text-balance">{contact.heading}</p>
    <span>{contact.description}</span>
    <ActionButton
      href="/contact"
      label="お問い合わせ"
      tone="light"
      size="lg"
      analytics={{ eventName: 'contact_cta_click', params: { placement: 'bottom_cta' } }}
    />
  </div>
</section>

<style>
  .contact-cta {
    padding-block: clamp(38px, 4vw, 52px);
    background: linear-gradient(180deg, rgba(244, 168, 93, 0.96) 0%, rgba(235, 141, 74, 1) 100%);
  }

  .contact-cta__inner {
    display: grid;
    justify-items: center;
    gap: 16px;
    text-align: center;
  }

  p {
    color: rgba(255, 255, 255, 0.95);
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 2.3vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  span {
    max-width: 720px;
    color: rgba(255, 248, 238, 0.92);
  }
</style>
