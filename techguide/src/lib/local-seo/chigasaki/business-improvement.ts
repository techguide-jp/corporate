import { getChigasakiRelatedLinks } from '$lib/local-seo/chigasaki/shared';
import type { LocalSeoPageContent } from '$lib/local-seo/types';

const path = '/chigasaki/business-improvement/';

export const chigasakiBusinessImprovementContent: LocalSeoPageContent = {
  kind: 'service',
  seo: {
    title: '茅ヶ崎の業務効率化・IT導入・AI活用 | TechGuide',
    description:
      '茅ヶ崎市・湘南エリアの業務効率化、IT導入、AI活用支援。Excel管理、フォーム転記、顧客・予約管理などを整理し、現場で続けられる改善を支援します。',
    path,
    image: '/images/chigasaki/business-improvement-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージした業務改善の打ち合わせ風景',
  },
  breadcrumbLabel: '業務効率化・IT導入',
  eyebrow: '茅ヶ崎の業務改善・IT活用',
  heroTitleLines: ['毎日の手作業を、', '無理なく減らす。'],
  heroLead:
    'フォームからExcelへの転記、予約確認、定型メール、毎月の集計。茅ヶ崎の店舗・企業・団体で繰り返している作業を見つけ、いま使っている道具を活かしながら減らします。',
  heroCtaLabel: '業務改善を相談する',
  badges: ['茅ヶ崎市内で業務を確認', '既存ツールも活用', '小さな改善から開始'],
  problems: {
    title: '忙しいのに、同じ作業が毎日残っていませんか',
    description: '時間がかかる作業とミスが起きやすい場所を、実際の仕事の流れから見つけます。',
    items: [
      {
        title: '同じ情報を何度も転記している',
        description:
          'フォーム、台帳、メールなどの流れを確認し、連携や自動化できる部分を整理します。',
      },
      {
        title: '担当者しか分からない業務がある',
        description: '手順と判断基準を見える化し、引継ぎや共同作業がしやすい状態を作ります。',
      },
      {
        title: 'AIやITツールをどう使うか分からない',
        description: '目的と扱う情報を確認し、効果を確かめやすい小さなテーマから試します。',
      },
    ],
  },
  support: {
    title: '新しいツールを増やす前に、仕事の流れを整えます',
    description:
      '使っているExcel、フォーム、LINE、メールを確認し、変える必要がある部分だけを選びます。',
    items: [
      {
        title: '業務の棚卸し',
        description: '作業時間、転記、待ち時間、確認作業を洗い出し、優先順位を付けます。',
      },
      {
        title: '既存サービス・連携・AIの検討',
        description: 'Googleフォーム、スプレッドシート、LINEなども含め、合う方法を比較します。',
      },
      {
        title: '小さな導入と定着支援',
        description: '一部業務から試し、現場の声を取り入れながら使い方と仕組みを整えます。',
      },
    ],
  },
  examples: {
    title: '身近な業務から改善できます',
    description: '現在使っている道具を活かし、毎週・毎月繰り返す作業から着手します。',
    items: [
      'Excel・スプレッドシート管理の改善',
      'Googleフォーム連携',
      'LINE連携',
      'メール処理の自動化',
      '顧客・案件管理',
      '予約・申込管理',
      '生成AIの業務活用',
      '手作業のシステム化',
    ],
  },
  process: {
    title: '現場を止めず、小さく試して定着させます',
    description: '導入すること自体を目的にせず、削減できた時間と続けやすさを確かめます。',
    items: [
      {
        title: '業務を見える化',
        description: '作業手順、時間、担当者、利用中のツールを確認します。',
      },
      {
        title: '改善候補を比較',
        description: '削減効果、費用、導入負担を比べ、着手順を決めます。',
      },
      { title: '小さく導入', description: '対象を絞って試し、実際の業務で使えるか確認します。' },
      { title: '定着・改善', description: '運用ルールを整え、必要に応じて対象業務を広げます。' },
    ],
  },
  relatedLinks: {
    title: 'ほかの茅ヶ崎エリア向け支援',
    description: '改善内容に応じて、ホームページ制作や独自システム開発にも対応します。',
    items: getChigasakiRelatedLinks(path),
  },
  contact: {
    title: '繰り返している作業を、ひとつ教えてください',
    description:
      'いま時間がかかっている作業や、改善したい業務を分かる範囲でお送りください。茅ヶ崎市内で実際の流れを見ながら相談できます。',
    category: 'ai',
    subject: '茅ヶ崎エリアの業務効率化・IT導入相談',
    placement: 'chigasaki_business_improvement',
  },
  serviceType: '業務効率化・IT導入・AI活用支援',
};
