<script lang="ts">
  import { trackEvent } from '$lib/analytics';
  interface Props { title: string; description: string; buttonLabel: string; href: string }
  let { title, description, buttonLabel, href }: Props = $props();

  function onClick() {
    trackEvent('contact_cta_click', { placement: 'recruit' });
  }
</script>
<section class="section">
  <div class="container cta">
    <h2>{title}</h2>
    <p>{description}</p>
    <a href={href} target="_blank" rel="external noreferrer" onclick={onClick}>{buttonLabel}</a>
  </div>
</section>
<style>
  .cta{display:grid;gap:16px;text-align:center;padding:clamp(26px,4vw,40px);border-radius:var(--radius-large);border:1px solid rgba(117,92,56,.16);background:linear-gradient(135deg,rgba(255,246,214,.96),rgba(255,254,248,.96))}
  h2{font-size:clamp(1.4rem,2.2vw,2rem)}
  p{color:var(--color-ink-soft);max-width:58ch;margin:0 auto}
  a{justify-self:center;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 26px;border-radius:var(--radius-pill);font-weight:800;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-deep));color:#fff;box-shadow:var(--shadow-button)}
</style>
