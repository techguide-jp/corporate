import { getChigasakiRelatedLinks } from '$lib/local-seo/chigasaki/shared';
import type { LocalSeoPageContent } from '$lib/local-seo/types';

const path = '/chigasaki/homepage/';

export const chigasakiHomepageContent: LocalSeoPageContent = {
  kind: 'service',
  seo: {
    title: '茅ヶ崎のホームページ制作・Web制作 | TechGuide',
    description:
      '茅ヶ崎市・湘南エリアのホームページ制作・Web制作。コーポレートサイト、サービスサイト、LP、リニューアルを、訴求整理と問い合わせ導線から支援します。',
    path,
    image: '/images/chigasaki/homepage-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージしたホームページ制作の打ち合わせ風景',
  },
  breadcrumbLabel: 'ホームページ制作',
  eyebrow: '茅ヶ崎のホームページ制作',
  heroTitleLines: ['お店の魅力を、', '伝わるサイトに。'],
  heroLead:
    '店舗、教室、専門サービス、地域イベントなど、茅ヶ崎で事業を営む方へ。写真や原稿がまだなくても、誰に何を伝えるかを一緒に整理し、スマートフォンで見やすいサイトに仕上げます。',
  heroCtaLabel: 'ホームページ制作を相談する',
  badges: ['茅ヶ崎市内で打ち合わせ', '原稿・構成から相談可能', '公開後の改善にも対応'],
  problems: {
    title: '見た目を変えるだけでは、成果は変わりません',
    description: '検索で見つけてもらい、内容を理解し、問い合わせるまでの流れを整えます。',
    items: [
      {
        title: 'サービスの良さをうまく言葉にできない',
        description: 'お客さまからよく聞かれることや選ばれる理由を整理し、伝わる文章にします。',
      },
      {
        title: '営業時間やメニューを更新しづらい',
        description: '日々変わる情報と固定情報を分け、無理なく更新できる運用に整えます。',
      },
      {
        title: '見られているのに予約・問い合わせがない',
        description:
          'サービス説明、実績、フォームまでの導線を確認し、行動につながる流れを作ります。',
      },
    ],
  },
  support: {
    title: 'お店やサービスの魅力を、伝わる順番に整えます',
    description: '制作前の聞き取りから公開後の改善まで、窓口を分けずに支援します。',
    items: [
      {
        title: '目的・訴求・構成の整理',
        description: '誰に何を伝え、どの行動につなげるかを決めてからページを設計します。',
      },
      {
        title: 'デザイン・実装・フォーム導線',
        description: 'スマートフォン対応、表示速度、問い合わせや申込みまで含めて制作します。',
      },
      {
        title: '計測・運用・リニューアル',
        description: '公開後の反応や更新負担を確認し、改善しやすい運用へつなげます。',
      },
    ],
  },
  examples: {
    title: '茅ヶ崎の事業に合わせた制作例',
    description: '来店、予約、問い合わせ、採用など、必要な行動に合わせて構成します。',
    items: [
      'コーポレートサイト',
      'サービスサイト',
      'ランディングページ（LP）',
      '店舗・教室サイト',
      'イベントサイト',
      'ECサイト',
      '採用ページ',
      '既存ホームページのリニューアル',
    ],
  },
  process: {
    title: '原稿や写真がなくても、ここから進められます',
    description: '対面・オンラインでお話を伺い、必要な準備を一緒に整理します。',
    items: [
      { title: 'ヒアリング', description: '目的、対象者、現在の課題、必要なページを確認します。' },
      { title: '構成・訴求設計', description: '情報の順番と問い合わせまでの導線を設計します。' },
      {
        title: 'デザイン・実装',
        description: '内容を確認いただきながら、スマートフォン対応で制作します。',
      },
      { title: '公開・改善', description: '公開後の計測と運用を整え、必要に応じて改善します。' },
    ],
  },
  relatedLinks: {
    title: 'ほかの茅ヶ崎エリア向け支援',
    description: 'サイト制作とシステム開発、業務改善をまとめて相談することもできます。',
    items: getChigasakiRelatedLinks(path),
  },
  contact: {
    title: 'いまのサイトを見ながら、改善点を整理できます',
    description:
      '新規制作、リニューアル、LP改善など、現在の状況が分かる範囲でお送りください。茅ヶ崎市内での対面相談も可能です。',
    category: 'lp',
    subject: '茅ヶ崎エリアのホームページ制作相談',
    placement: 'chigasaki_homepage',
  },
  serviceType: 'ホームページ制作・Web制作',
};
