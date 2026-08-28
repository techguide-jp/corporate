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
    image: '/images/chigasaki/system-development-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージした予約管理システムの打ち合わせ風景',
  },
  breadcrumbLabel: 'システム開発',
  eyebrow: '茅ヶ崎のシステム開発',
  heroTitleLines: ['予約・申込の手間を、', '現場に合う仕組みへ。'],
  heroLead:
    'イベント、教室、会員サービス、店舗予約など、茅ヶ崎の事業で増えがちな受付・確認・連絡をひとつの流れにします。システムが必要か分からない段階から相談できます。',
  heroCtaLabel: 'システム化を相談する',
  badges: ['茅ヶ崎市内で業務を確認', '小さな試作から相談可能', '運用改善まで伴走'],
  problems: {
    title: '受付から管理まで、同じ情報を追いかけていませんか',
    description: '予約や申込の流れを確認し、自動化する部分と人が判断する部分を分けます。',
    items: [
      {
        title: '予約や申込を台帳へ転記している',
        description: 'フォーム、メール、紙に分かれた情報をまとめ、確認や連絡の手間を減らします。',
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
    title: '機能一覧ではなく、現場の流れから設計します',
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
    title: '店舗・教室・イベント運営で使える仕組み',
    description: '受付方法やスタッフ体制に合わせ、必要な機能だけを組み合わせます。',
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
    title: '紙や画面を一緒に見ながら、必要な範囲を決めます',
    description: '最初から仕様書を用意する必要はありません。現在の業務から順に整理します。',
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
    title: 'いまの受付・管理方法を、そのまま見せてください',
    description:
      '作りたい機能が決まっていなくても、現在の業務や困りごとから整理できます。茅ヶ崎市内での対面確認も可能です。',
    category: 'development',
    subject: '茅ヶ崎エリアのシステム開発相談',
    placement: 'chigasaki_system_development',
  },
  serviceType: 'システム開発・Webアプリ開発',
};
