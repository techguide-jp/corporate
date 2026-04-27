<script lang="ts">
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import ActionButton from '$lib/components/ui/ActionButton.svelte';
  import { navItems, companyProfile, contactInfo } from '$lib/data/site';
  import { recruitContent } from '$lib/data/recruit';
</script>

<SeoHead title="採用・パートナー募集 | TechGuide" description="Webエンジニア募集" path="/recruit/" />
<Header items={navItems} />

<main class="container">
  <h1>{recruitContent.hero.title}</h1>
  <p>{recruitContent.hero.lead}</p>

  <h2>募集背景</h2>
  {#each recruitContent.background.paragraphs as p}<p>{p}</p>{/each}

  <h2>関われる領域</h2>
  <ul>{#each recruitContent.opportunities as o}<li>{o.title}</li>{/each}</ul>

  <h2>業務内容</h2>
  <ul>{#each recruitContent.workItems as i}<li>{i}</li>{/each}</ul>

  <h2>技術スタック</h2>
  <ul>{#each recruitContent.stack.frontend as s}<li>{s}</li>{/each}</ul>

  <h2>働き方</h2>
  <ul>{#each recruitContent.workStyle as w}<li>{w.title}</li>{/each}</ul>

  <h2>求める人物像</h2>
  <ul>{#each recruitContent.fit.good as g}<li>{g}</li>{/each}</ul>

  <h2>応募</h2>
  <ActionButton href={contactInfo.formUrl} label={recruitContent.cta.buttonLabel} size="lg" />
</main>

<Footer companyName={companyProfile.name} items={navItems} />
