<script lang="ts">
  import ContactPage from '$lib/components/contact/ContactPage.svelte';
  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();
</script>

<ContactPage {data} {form} />
