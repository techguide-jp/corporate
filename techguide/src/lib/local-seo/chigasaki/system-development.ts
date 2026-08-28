import { getChigasakiRelatedLinks } from '$lib/local-seo/chigasaki/shared';
import type { LocalSeoPageContent } from '$lib/local-seo/types';

const path = '/chigasaki/system-development/';

export const chigasakiSystemDevelopmentContent: LocalSeoPageContent = {
  kind: 'service',
  seo: {
    title: '茅ヶ崎のシステム開発・Webアプリ開発 | TechGuide',
    description:
      '茅ヶ崎市・湘南エリアのシステム開発・Webアプリ開発。予約、申込、会員・顧客管理、イベント管理などを、業務整理から設計・開発・運用まで支援します。',
    path,
    image: '/images/showcase/ticketcraft-hero.webp',
    imageAlt: '茅ヶ崎エリアの予約・申込システム開発のイメージ',
  },
  breadcrumbLabel: 'システム開発',
  eyebrow: 'System Development',
  heroTitle: '茅ヶ崎のシステム開発・Webアプリ開発',
  heroLead:
    '予約、申込、顧客管理など、現場の業務に合うWebシステムを設計・開発します。「システムが必要か分からない」という段階から、オンライン・対面で業務を整理します。',
  badges: ['業務整理から対応', '小さな試作から相談可能', '運用改善まで伴走'],
  problems: {
    title: 'システム開発を検討するきっかけ',
    description: '既存の業務を理解し、仕組みにする部分と人が判断する部分を分けます。',
    items: [
      {
        title: '予約や申込の転記が多い',
        description: 'フォーム、メール、台帳に分かれた情報をまとめ、確認や連絡の手間を減らします。',
      },
      {
        title: '顧客情報を追いかけにくい',
        description: '対応状況や履歴を一か所で確認できる管理画面を検討します。',
      },
      {
        title: '既製ツールでは業務に合わない',
        description: '必要な機能だけを整理し、独自開発と既製サービス連携の両方を比較します。',
      },
    ],
  },
  support: {
    title: '業務課題を解決する形で設計します',
    description: '機能を増やすことより、現場で使い続けられることを優先します。',
    items: [
      {
        title: '業務フロー・要件整理',
        description: '利用者、入力情報、判断、連絡、管理方法を確認し、必要な要件を決めます。',
      },
      {
        title: '試作・設計・Webアプリ開発',
        description: '不確かな部分は小さく試し、画面と動きを確認してから本開発へ進めます。',
      },
      {
        title: '外部連携・運用改善',
        description: '既存サービスやAPIとの連携を含め、導入後の使い方と改善まで支援します。',
      },
    ],
  },
  examples: {
    title: '開発できるシステムの例',
    description: '業種や運用に合わせ、必要な機能を組み合わせます。',
    items: [
      '予約システム',
      '申込システム',
      'イベント・チケット管理',
      '会員管理',
      '顧客管理',
      'マッチングサービス',
      '業務管理画面',
      '外部サービス・API連携',
    ],
  },
  process: {
    title: 'システム開発の進め方',
    description: '業務と目的を確認し、必要な範囲を見極めながら進めます。',
    items: [
      { title: '現状業務を整理', description: '担当者、手順、情報、困っている場面を確認します。' },
      {
        title: '要件と優先順位を決定',
        description: '最初に必要な機能と後から追加できる機能を分けます。',
      },
      {
        title: '試作・設計・開発',
        description: '早い段階で画面と動きを確認し、認識をそろえます。',
      },
      { title: '導入・運用改善', description: '実際の運用に合わせ、使い方や機能を改善します。' },
    ],
  },
  relatedLinks: {
    title: 'ほかの茅ヶ崎エリア向け支援',
    description: 'ホームページ制作や業務効率化と組み合わせた相談にも対応します。',
    items: getChigasakiRelatedLinks(path),
  },
  contact: {
    title: '茅ヶ崎でのシステム開発をご相談ください',
    description: '作りたい機能が決まっていなくても、現在の業務や困りごとから整理できます。',
    category: 'development',
    subject: '茅ヶ崎エリアのシステム開発相談',
    placement: 'chigasaki_system_development',
  },
  serviceType: 'システム開発・Webアプリ開発',
};
