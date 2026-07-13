import { readyMockHomeHref, readyMockReferralParams } from '../links';
import type { Article } from '../types';

export const whyWeStartWithPlanningArticle: Article = {
  slug: 'why-we-start-with-planning',
  title: '「作る前の整理」から支援する理由',
  description:
    'TechGuideがいきなり開発に入らず、目的・利用者・運用・判断基準の整理から支援する理由をまとめました。',
  category: 'techguide-approach',
  tags: ['導入前整理', 'IT活用支援', '試作開発', '業務改善'],
  status: 'published',
  publishedAt: '2026-07-08',
  readingTimeMinutes: 6,
  thumbnail: {
    src: '/images/articles/why-we-start-with-planning.webp',
    alt: '作る前の整理をテーマにしたワイヤーフレームと付箋の打ち合わせ風景',
  },
  lead: 'TechGuideでは、相談を受けたときにすぐ「何を作るか」だけを決めにいくことはしません。まず、何を解決したいのか、誰が使うのか、どの状態になれば前進と言えるのかを一緒に整理します。',
  blocks: [
    {
      type: 'paragraph',
      text: 'システム開発やIT導入の相談では、最初から機能名やツール名が出てくることがあります。ただ、機能を並べるだけでは、事業にとって本当に必要な形になるとは限りません。',
    },
    {
      type: 'paragraph',
      text: [
        'TechGuideが重視しているのは、作れるかどうかだけではなく、',
        { type: 'strong', text: '作る意味があるか、現場で使われるか、次の判断につながるか' },
        'です。',
      ],
    },
    {
      type: 'heading',
      id: 'why-planning-first',
      text: 'なぜ作る前の整理から始めるのか',
    },
    {
      type: 'list',
      items: [
        '目的が曖昧だと、機能が増えても成果につながりにくい',
        '利用者が曖昧だと、画面や導線の判断がぶれやすい',
        '運用が曖昧だと、公開後に現場で使われなくなる',
        '判断基準が曖昧だと、試作と本開発の切り分けができない',
      ],
    },
    {
      type: 'paragraph',
      text: [
        { type: 'strong', text: '最初から完璧な仕様書を作る必要はありません。' },
        '一方で、何を解決したいのか、誰が使うのか、どこまで試せば次の判断ができるのかは、開発に入る前に揃えておきたい前提です。',
      ],
    },
    {
      type: 'cta',
      cta: {
        label: '開発外注前チェックリストを見る',
        description:
          '具体的な確認項目を自分で整理したい方は、Ready-mockのチェックリストを利用できます。',
        href: `https://www.ready-mock.com/articles/development-outsourcing-checklist?${readyMockReferralParams}&utm_content=why_we_start_with_planning_inline_cta`,
        eventName: 'ready_mock_outbound_click',
        target: 'ready-mock-article',
        placement: 'inline',
        tone: 'light',
        isExternal: true,
      },
    },
    {
      type: 'heading',
      id: 'what-we-look-at',
      text: 'TechGuideが最初に見る観点',
    },
    {
      type: 'paragraph',
      text: [
        'TechGuideでは、相談初期の曖昧さを悪いものとして扱いません。むしろ、',
        { type: 'strong', text: 'その曖昧さを分解し、事業側の言葉と技術側の実装をつなぐ' },
        'ことが支援の起点になります。',
      ],
    },
    {
      type: 'list',
      items: [
        '事業上の目的と、改善したい状態',
        '利用者と関係者、それぞれの行動',
        '現場で続けられる運用かどうか',
        '最初に確認すべき仮説',
        '本開発前に小さく試すべき範囲',
        '作らない選択肢も含めた判断',
      ],
    },
    {
      type: 'heading',
      id: 'when-not-to-build-big',
      text: 'いきなり本開発しない方がよいケース',
    },
    {
      type: 'list',
      items: [
        '需要や利用者の反応がまだ見えていない',
        '関係者間で完成イメージがそろっていない',
        '運用担当や更新方法が決まっていない',
        '画面や業務フローを見ながら判断したい',
      ],
    },
    {
      type: 'paragraph',
      text: [
        'こうした場合は、いきなり大きく作るよりも、',
        { type: 'strong', text: 'まず触れるものを作って判断材料を増やす' },
        '方が現実的です。試作で見える範囲を切り出すことで、本開発に進むべきか、範囲を削るべきか、別の方法で足りるのかを判断しやすくなります。',
      ],
    },
    {
      type: 'heading',
      id: 'support-style',
      text: 'TechGuideの支援スタイル',
    },
    {
      type: 'paragraph',
      text: [
        'TechGuideは、技術だけを切り出して提供するのではなく、',
        { type: 'strong', text: '相談段階の整理、試作、本開発、公開後の改善まで' },
        'を必要に応じてつなげていきます。',
      ],
    },
    {
      type: 'list',
      items: [
        '相談段階の曖昧さを整理する',
        '事業側と技術側の言葉をそろえる',
        '試作、本開発、既存ツール活用を切り分ける',
        [
          '必要に応じて',
          {
            type: 'link',
            text: 'Ready-mock',
            href: readyMockHomeHref,
            eventName: 'ready_mock_outbound_click',
            target: 'ready-mock',
            isExternal: true,
          },
          'やLP制作、受託開発へ接続する',
        ],
        '公開後の改善や運用まで見据える',
      ],
    },
    {
      type: 'quote',
      text: 'TechGuideが大切にしているのは、作ること自体をゴールにしないことです。事業や現場にとって意味のある形まで整えるために、作る前の整理から伴走します。',
    },
  ],
  primaryCta: {
    label: '作る前の整理から相談する',
    description: '課題やアイデアがまだ曖昧な段階でも、目的と進め方から一緒に整理できます。',
    href: '/contact/?category=discovery',
    eventName: 'article_cta_click',
    target: 'techguide-contact',
    placement: 'bottom',
    tone: 'warm',
  },
  secondaryCta: {
    label: '開発外注前チェックリストを見る',
    description: '具体的な確認項目を自分で整理したい方は、Ready-mockのチェックリストへ進めます。',
    href: `https://www.ready-mock.com/articles/development-outsourcing-checklist?${readyMockReferralParams}&utm_content=why_we_start_with_planning_bottom_cta`,
    eventName: 'ready_mock_outbound_click',
    target: 'ready-mock-article',
    placement: 'bottom',
    tone: 'light',
    isExternal: true,
  },
  relatedSlugs: ['before-tool-selection', 'designing-for-maintenance-and-improvement'],
  seo: {
    title: '「作る前の整理」から支援する理由 | TechGuide',
    description:
      'TechGuideがいきなり開発に入らず、目的・利用者・運用・判断基準の整理から支援する理由を紹介します。',
    ogImage: '/images/articles/why-we-start-with-planning.webp',
    imageAlt: '作る前の整理をテーマにしたワイヤーフレームと付箋の打ち合わせ風景',
  },
};
