<script lang="ts">
  import { siteMetadata } from '$lib/data/site';
  import { buildAbsoluteUrl } from '$lib/seo';

  interface Props {
    title: string;
    description: string;
    path: string;
    image?: string;
    imageAlt?: string;
    type?: 'website' | 'article';
    noindex?: boolean;
    jsonLd?: string[];
  }

  let {
    title,
    description,
    path,
    image = siteMetadata.defaultOgImage,
    imageAlt = siteMetadata.defaultOgImageAlt,
    type = 'website',
    noindex = false,
    jsonLd = [],
  }: Props = $props();

  const canonicalUrl = $derived(buildAbsoluteUrl(path));
  const ogImageUrl = $derived(buildAbsoluteUrl(image));
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:site_name" content={siteMetadata.brandName} />
  <meta property="og:locale" content={siteMetadata.locale} />
  <meta property="og:type" content={type} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:image:alt" content={imageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />
  <meta name="twitter:image:alt" content={imageAlt} />

  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
    <meta name="googlebot" content="noindex, nofollow" />
  {/if}

  {#each jsonLd as item, index (index)}
    <svelte:element this={'script'} type="application/ld+json">{item}</svelte:element>
  {/each}
</svelte:head>
