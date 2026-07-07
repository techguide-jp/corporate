import { readyMockHomeHref, readyMockReferralParams } from '../links';
import type { Article } from '../types';

export const beforeToolSelectionArticle: Article = {
  slug: 'before-tool-selection',
  title: 'IT導入で、最初にツール選定から入らない理由',
  description:
    'TechGuideがIT導入でいきなりツール比較に入らず、業務導線・責任者・判断基準の整理から支援する理由をまとめました。',
  category: 'it-adoption',
  tags: ['IT導入', '業務改善', '業務フロー整理', 'ツール選定'],
  status: 'published',
  publishedAt: '2026-07-08',
  readingTimeMinutes: 6,
  thumbnail: {
    src: '/images/articles/before-tool-selection.webp',
    alt: 'IT導入前に業務導線を整理するためのワークフロー図とノートの打ち合わせ風景',
  },
  lead: 'IT導入の相談では、最初に「どのツールを使えばよいですか」と聞かれることがあります。ただ、TechGuideではいきなりツール選定から始めることは多くありません。先に、何を改善したいのか、誰が使うのか、どの業務に乗せるのかを整理します。',
  blocks: [
    {
      type: 'paragraph',
      text: 'ツール選定は大切です。けれども、業務の前提が曖昧なまま比較を始めると、機能の多さや有名さで判断しやすくなります。その結果、導入後に現場で使われなかったり、手作業が別の場所に残ったりします。',
    },
    {
      type: 'paragraph',
      text: 'TechGuideが最初に見たいのは、どのサービスが優れているかではなく、その会社の業務がどのように流れていて、どこに時間やミスが発生しているかです。',
    },
    {
      type: 'heading',
      id: 'why-tool-first-stalls',
      text: 'ツール選定から始めると止まりやすい理由',
    },
    {
      type: 'paragraph',
      text: '導入したいツールが先に決まっていても、目的や運用の前提が揃っていないと、比較表だけでは意思決定しにくくなります。',
    },
    {
      type: 'list',
      items: [
        '課題が漠然としたまま比較してしまう',
        '機能の多さで選び、現場の運用に合わない',
        '導入後の担当者や確認フローが決まっていない',
        '費用対効果の判断基準がない',
        '例外処理や手作業の残り方を見落とす',
      ],
    },
    {
      type: 'paragraph',
      text: 'こうした状態では、どのツールを選んでも「使ってみないと分からない」になりがちです。そこでTechGuideでは、選ぶ前に判断の軸を整えます。',
    },
    {
      type: 'heading',
      id: 'what-we-organize-first',
      text: 'TechGuideが先に整理すること',
    },
    {
      type: 'paragraph',
      text: '最初に整理するのは、業務の流れと責任の置き方です。誰が入力し、誰が確認し、どのタイミングで次の作業に進むのかが見えると、必要な仕組みの形も見えやすくなります。',
    },
    {
      type: 'list',
      items: [
        '現状の業務導線',
        'どこで時間やミスが発生しているか',
        '誰が入力し、誰が確認するか',
        '毎週、毎月繰り返している作業',
        '売上、請求、顧客対応に関わる重要業務',
        '改善後にどうなれば成功と言えるか',
      ],
    },
    {
      type: 'cta',
      cta: {
        label: '業務自動化できるか診断する',
        description:
          '具体的にどの作業を自動化できるか確認したい方は、Ready-mockの診断を利用できます。',
        href: `https://www.ready-mock.com/business-automation-check?${readyMockReferralParams}&utm_content=before_tool_selection_inline_cta`,
        eventName: 'ready_mock_outbound_click',
        target: 'ready-mock',
        placement: 'inline',
        tone: 'light',
        isExternal: true,
      },
    },
    {
      type: 'heading',
      id: 'classify-before-building',
      text: '作る前に選択肢を切り分ける',
    },
    {
      type: 'paragraph',
      text: '整理してみると、必ずしも個別開発が必要とは限りません。既存ツールで足りる場合もあれば、小さな自動化や試作で十分に判断材料を作れる場合もあります。',
    },
    {
      type: 'list',
      items: [
        '既存ツールで足りる',
        'フォーム、スプレッドシート、通知で小さく始める',
        'Notionなどで運用を整理する',
        [
          {
            type: 'link',
            text: 'Ready-mock',
            href: readyMockHomeHref,
            eventName: 'ready_mock_outbound_click',
            target: 'ready-mock',
            isExternal: true,
          },
          'で試作して判断材料を作る',
        ],
        '個別開発として本格的に作る',
      ],
    },
    {
      type: 'paragraph',
      text: '大切なのは、最初から大きな導入に寄せすぎないことです。業務に合う最小の形から始め、必要に応じて広げる方が、現場に定着しやすくなります。',
    },
    {
      type: 'heading',
      id: 'support-style',
      text: 'TechGuideが支援できること',
    },
    {
      type: 'paragraph',
      text: 'TechGuideは、ツール名だけを決める支援ではなく、業務の整理から実装後の改善までを一つの流れとして扱います。事業側の判断と技術側の実装がずれないように、導入目的と運用設計を一緒に整えます。',
    },
    {
      type: 'list',
      items: [
        '業務フローの整理',
        '導入目的と優先順位の言語化',
        '既存ツール、小規模自動化、個別開発の切り分け',
        '現場に定着する運用設計',
        '実装、保守、改善までの伴走',
      ],
    },
    {
      type: 'quote',
      text: 'TechGuideが重視しているのは、ツールを導入すること自体ではありません。業務に合う判断基準を先に整え、現場で使われ続ける形に落とし込むことです。',
    },
  ],
  primaryCta: {
    label: '自社の業務に合わせて相談する',
    description: 'ツール比較の前に、自社の業務導線や優先順位から一緒に整理できます。',
    href: '/contact/?category=discovery',
    eventName: 'article_cta_click',
    target: 'techguide-contact',
    placement: 'bottom',
    tone: 'warm',
  },
  secondaryCta: {
    label: '業務自動化できるか診断する',
    description: '具体的に自動化しやすい業務を確認したい方は、Ready-mockの診断へ進めます。',
    href: `https://www.ready-mock.com/business-automation-check?${readyMockReferralParams}&utm_content=before_tool_selection_bottom_cta`,
    eventName: 'ready_mock_outbound_click',
    target: 'ready-mock',
    placement: 'bottom',
    tone: 'light',
    isExternal: true,
  },
  relatedSlugs: ['why-we-start-with-planning'],
  seo: {
    title: 'IT導入で、最初にツール選定から入らない理由 | TechGuide',
    description:
      'TechGuideがIT導入でいきなりツール比較に入らず、業務導線・責任者・判断基準の整理から支援する理由を紹介します。',
    ogImage: '/images/articles/before-tool-selection.webp',
    imageAlt: 'IT導入前に業務導線を整理するためのワークフロー図とノートの打ち合わせ風景',
  },
};
