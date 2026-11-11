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
  lead: 'TechGuideでは、公開後も管理しやすいシステムやWebサイトを作るため、誰が更新するか、どう保守するかを開発前から一緒に考えます。',
  blocks: [
    {
      type: 'paragraph',
      text: [
        '依頼するときは、画面や機能、公開日、開発費用に目が向きがちです。',
        { type: 'strong', text: '公開後は運用が長く続きます。' },
        '開発の段階で管理の仕方を考えておくと、想定外の作業や費用を抑えやすくなります。',
      ],
    },
    {
      type: 'paragraph',
      text: '設計段階で、不具合が起きたときの対応、情報更新を引き継げるかどうか、機能を変更するときの手順を確認します。特定の人にしか管理できなかったり、小さな変更に大きな費用がかかったりする状態を防ぐためです。',
    },
    {
      type: 'heading',
      id: 'not-finished-at-launch',
      text: '公開日は終点ではなく、運用の始まり',
    },
    {
      type: 'paragraph',
      text: '公開後には、想定より入力作業に時間がかかったり、問い合わせが特定の担当者に集中したりすることがあります。こうした問題が分かったときに対応できるよう、情報を更新しやすい管理方法や、機能を変えたときに影響する範囲を設計段階で考えます。',
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
      text: [
        'TechGuideでは、こうした運用の前提をできるだけ早い段階で確認します。完璧な運用表を作るためではなく、',
        { type: 'strong', text: '後で困りそうな場所を先に見つける' },
        'ためです。',
      ],
    },
    {
      type: 'heading',
      id: 'what-we-design-for',
      text: '設計時に見ていること',
    },
    {
      type: 'paragraph',
      text: [
        '不具合への対応やセキュリティ更新は保守、利用状況に合わせて機能や操作を見直すことは改善です。どちらにも対応しやすいよう、',
        { type: 'strong', text: '仕組みはシンプルに保ちます。' },
      ],
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
      text: [
        '初期公開に必要な範囲を決め、運用しながら追加するものを分けます。設計では、',
        { type: 'strong', text: '変わりやすい部分を分けておきます。' },
        '例えば、よく変わる案内文を画面の仕組みと分けておくと、担当者が後から更新しやすくなります。変更しやすくするために初期の作業が増える場合もあるので、将来の更新や機能追加にかかる費用も含めて判断します。',
      ],
    },
    {
      type: 'heading',
      id: 'how-we-support-after-release',
      text: '公開後も相談しやすい状態を残す',
    },
    {
      type: 'paragraph',
      text: '公開後の更新は誰が担当し、不具合はどこへ連絡し、修正費用はどう扱うのか。TechGuideでは、制作段階から依頼する方とこうした項目を確認し、保守の対象範囲や公開後の対応方法を整理します。',
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
      text: [
        'TechGuideは、作ることだけを切り出して終わるよりも、事業や現場の中で使われ続ける状態まで考えたいと思っています。だからこそ、',
        { type: 'strong', text: '相談時点でまだ曖昧なことがあっても問題ありません' },
        '。',
      ],
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
