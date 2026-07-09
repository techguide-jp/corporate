import type { Article } from '../types';

export const designingForMaintenanceAndImprovementArticle: Article = {
  slug: 'designing-for-maintenance-and-improvement',
  title: '保守と改善まで考えて設計する理由',
  description:
    'TechGuideが作って終わりにせず、公開後の保守・変更・改善まで見据えて設計する理由をまとめました。',
  category: 'techguide-approach',
  tags: ['保守', '改善', '運用設計', 'IT活用支援'],
  status: 'published',
  publishedAt: '2026-07-09',
  readingTimeMinutes: 6,
  thumbnail: {
    src: '/images/articles/designing-for-maintenance-and-improvement.webp',
    alt: '公開後の保守と改善を見据えて業務フローと計画を確認する打ち合わせ風景',
  },
  lead: 'TechGuideでは、システムやWebサイトを「作って終わり」のものとして扱いません。依頼時点では見えていない変更や、公開後に出てくる改善点まで見据えて、無理なく続けられる形を一緒に考えます。',
  blocks: [
    {
      type: 'paragraph',
      text: '相談前の段階では、まず完成物そのものに目が向きやすいものです。画面、機能、公開日、費用。どれも大切ですが、実際には公開した後の方が長く続きます。',
    },
    {
      type: 'paragraph',
      text: 'TechGuideが保守と改善まで考えて設計するのは、依頼する方が公開後に困らないようにするためです。作ったものが止まらず、変えられず、誰も触れない状態になることを避けたいと考えています。',
    },
    {
      type: 'heading',
      id: 'not-finished-at-launch',
      text: '公開日は終点ではなく、運用の始まり',
    },
    {
      type: 'paragraph',
      text: '公開直後は、実際に使ってみて初めて分かることが出てきます。問い合わせの内容、現場の入力負荷、更新頻度、例外対応、利用者の迷い。こうした変化に対応できる余地がないと、せっかく作ったものが少しずつ現場から離れていきます。',
    },
    {
      type: 'list',
      items: [
        '情報を誰が更新するのか',
        '問い合わせや申込が来た後に誰が確認するのか',
        '変更したいときにどこを触ればよいのか',
        '不具合や迷いが起きたときにどう相談するのか',
        '改善要望をどのように集め、判断するのか',
      ],
    },
    {
      type: 'paragraph',
      text: 'TechGuideでは、こうした運用の前提をできるだけ早い段階で確認します。完璧な運用表を作るためではなく、後で困りそうな場所を先に見つけるためです。',
    },
    {
      type: 'heading',
      id: 'what-we-design-for',
      text: '設計時に見ていること',
    },
    {
      type: 'paragraph',
      text: '保守や改善を見据える設計は、複雑な仕組みを作ることではありません。むしろ、必要以上に複雑にしないための考え方です。',
    },
    {
      type: 'list',
      items: [
        '初期公開に本当に必要な範囲',
        '後から変更されやすい情報',
        '担当者が自分で更新したい部分',
        '将来増えそうな業務やページ',
        '止まると困る重要な導線',
        '保守しやすいデータや画面の分け方',
      ],
    },
    {
      type: 'paragraph',
      text: '最初からすべてを盛り込むのではなく、変わりやすい部分と変えにくい部分を分けて考えます。そうすることで、初期費用を抑えながら、後から必要な改善を積み上げやすくなります。',
    },
    {
      type: 'heading',
      id: 'how-we-support-after-release',
      text: '公開後も相談しやすい状態を残す',
    },
    {
      type: 'paragraph',
      text: '依頼する側にとって不安なのは、公開後に何かあったとき、誰に何を相談すればよいか分からなくなることです。TechGuideでは、制作や実装の段階から、公開後の確認方法や改善の進め方を一緒に決めていきます。',
    },
    {
      type: 'list',
      items: [
        '公開後に確認する項目を決める',
        '改善要望を一度に抱え込まず、優先順位をつける',
        '担当者が困りやすい操作や更新を把握する',
        '必要に応じて小さな修正から進める',
        '継続的な保守が必要な範囲を明確にする',
      ],
    },
    {
      type: 'heading',
      id: 'our-stance',
      text: '安心して依頼してもらうために',
    },
    {
      type: 'paragraph',
      text: 'TechGuideは、作ることだけを切り出して終わるよりも、事業や現場の中で使われ続ける状態まで考えたいと思っています。だからこそ、相談時点でまだ曖昧なことがあっても問題ありません。',
    },
    {
      type: 'paragraph',
      text: 'むしろ、何を変えたいのか、どこまで自社で運用したいのか、どこから支援が必要なのかを一緒に整理するところから支援できます。',
    },
    {
      type: 'quote',
      text: 'TechGuideが目指しているのは、納品して終わる関係ではなく、必要なときに相談しながら改善していける関係です。最初の設計から、その後の運用と改善まで見据えて伴走します。',
    },
  ],
  primaryCta: {
    label: '保守と改善を見据えて相談する',
    description: '作った後の運用や改善まで含めて、自社に合う進め方から一緒に整理できます。',
    href: '/contact/?category=discovery',
    eventName: 'article_cta_click',
    target: 'techguide-contact',
    placement: 'bottom',
    tone: 'warm',
  },
  secondaryCta: {
    label: '作る前の整理について読む',
    description: '依頼前に何を整理するかを知りたい方は、TechGuideの考え方も確認できます。',
    href: '/articles/why-we-start-with-planning/',
    eventName: 'article_related_click',
    target: 'internal-article',
    placement: 'bottom',
    tone: 'light',
  },
  relatedSlugs: ['why-we-start-with-planning', 'before-tool-selection'],
  seo: {
    title: '保守と改善まで考えて設計する理由 | TechGuide',
    description:
      'TechGuideが作って終わりにせず、公開後の保守・変更・改善まで見据えて設計する理由を紹介します。',
    ogImage: '/images/articles/designing-for-maintenance-and-improvement.webp',
    imageAlt: '公開後の保守と改善を見据えて業務フローと計画を確認する打ち合わせ風景',
  },
};
