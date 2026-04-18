<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  import type { AccessInfo, CompanyProfile, ContactInfo } from '$lib/types/content';

  interface Props {
    profile: CompanyProfile;
    access: AccessInfo;
    contact: ContactInfo;
  }

  let { profile, access, contact }: Props = $props();

  const fields = $derived([
    { label: '商号', value: profile.name },
    { label: '創業', value: profile.foundedAt },
    { label: '代表', value: profile.representative },
    { label: '住所', value: `${access.postalCode} ${access.address}` },
    { label: 'MAIL', value: contact.email },
  ]);
</script>

<section class="section company surface-soft" id="company">
  <span class="anchor-target" id="access" aria-hidden="true"></span>

  <div class="container">
    <SectionHeading title="会社情報" />

    <div class="company__grid">
      <div class="company__info">
        <dl>
          {#each fields as field (field.label)}
            <div class="company__row">
              <dt>{field.label}</dt>
              <dd>
                {#if field.label === 'MAIL'}
                  <a href={`mailto:${contact.email}`}>{field.value}</a>
                {:else}
                  {field.value}
                {/if}
              </dd>
            </div>
          {/each}
        </dl>

        <a
          class="company__map-link"
          href={access.mapHref}
          target="_blank"
          rel="external noreferrer"
        >
          Google Maps で見る
        </a>
      </div>

      <div class="company__map">
        <div class="company__map-frame">
          <span class="company__pin" aria-hidden="true"></span>
          <iframe
            src={access.embedSrc}
            title="TechGuide合同会社の所在地"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .company__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(420px, 0.95fr);
    gap: clamp(24px, 3vw, 42px);
    align-items: start;
  }

  .company__info {
    display: grid;
    gap: 24px;
    padding-top: 4px;
  }

  dl {
    display: grid;
    gap: 18px;
    margin: 0;
  }

  .company__row {
    display: grid;
    grid-template-columns: 104px 1fr;
    gap: 20px;
    align-items: baseline;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(117, 92, 56, 0.12);
  }

  dt {
    font-family: var(--font-heading);
    font-weight: 800;
    letter-spacing: 0.04em;
    color: rgba(135, 99, 45, 0.95);
  }

  dd {
    margin: 0;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    font-weight: 600;
    line-height: 1.7;
  }

  dd a,
  .company__map-link {
    color: rgba(135, 99, 45, 0.95);
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .company__map {
    min-height: 100%;
  }

  .company__map-frame {
    position: relative;
  }

  .company__pin {
    position: absolute;
    left: 50%;
    top: 48%;
    z-index: 2;
    width: 26px;
    height: 26px;
    margin-left: -13px;
    margin-top: -26px;
    pointer-events: none;
  }

  .company__pin::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50% 50% 50% 0;
    background: linear-gradient(180deg, #f36e4f 0%, #dc3f29 100%);
    transform: rotate(-45deg);
    box-shadow: 0 10px 18px rgba(179, 67, 44, 0.28);
  }

  .company__pin::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 9px;
    height: 9px;
    margin-left: -4.5px;
    margin-top: -4.5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.96);
  }

  .company__map iframe {
    width: 100%;
    min-height: 420px;
    border: 0;
    border-radius: 28px;
    box-shadow: var(--shadow-card);
  }

  @media (max-width: 960px) {
    .company__grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .company__row {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .company__map iframe {
      min-height: 320px;
    }
  }
</style>
