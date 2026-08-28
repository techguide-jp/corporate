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
    image: '/images/services/development-visual.webp',
    imageAlt: '茅ヶ崎エリアのホームページ制作と導線設計のイメージ',
  },
  breadcrumbLabel: 'ホームページ制作',
  eyebrow: 'Website Design',
  heroTitle: '茅ヶ崎のホームページ制作・Web制作',
  heroLead:
    '会社やサービスの魅力を整理し、見た人が次の行動へ進みやすいホームページを制作します。原稿や構成が決まっていない段階から、茅ヶ崎市内での対面相談にも対応します。',
  badges: ['茅ヶ崎市・湘南エリア対応', '原稿・構成から相談可能', '公開後の改善にも対応'],
  problems: {
    title: 'ホームページのこんな課題に',
    description: '見た目だけでなく、伝わり方と問い合わせまでの流れを整えます。',
    items: [
      {
        title: '何を載せればよいか決まらない',
        description: '事業の強み、利用者の悩み、選ばれる理由を整理してページ構成へ落とし込みます。',
      },
      {
        title: '既存サイトが古く更新しづらい',
        description: '必要な情報と運用方法を見直し、更新しやすく迷いにくいサイトへ整えます。',
      },
      {
        title: 'アクセスはあっても問い合わせがない',
        description:
          'サービス説明、実績、フォームまでの導線を確認し、行動につながる流れを作ります。',
      },
    ],
  },
  support: {
    title: '伝える内容から公開後まで支援します',
    description: '制作前の整理と公開後の改善を含め、事業に必要なWebサイトを一緒に作ります。',
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
    title: '制作できるページ・サイト',
    description: '目的に合わせて必要な構成と機能を選びます。',
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
    title: 'ホームページ制作の進め方',
    description: '原稿や写真がそろっていない状態でも、必要な準備から整理します。',
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
    title: '茅ヶ崎でのホームページ制作をご相談ください',
    description: '新規制作、リニューアル、LP改善など、現在の状況が分かる範囲でお送りください。',
    category: 'lp',
    subject: '茅ヶ崎エリアのホームページ制作相談',
    placement: 'chigasaki_homepage',
  },
  serviceType: 'ホームページ制作・Web制作',
};
