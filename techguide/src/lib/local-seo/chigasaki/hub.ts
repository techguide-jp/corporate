import { chigasakiServiceLinks } from '$lib/local-seo/chigasaki/shared';
import type { LocalSeoPageContent } from '$lib/local-seo/types';

export const chigasakiHubContent: LocalSeoPageContent = {
  kind: 'hub',
  seo: {
    title: '茅ヶ崎のWeb制作・システム開発・IT相談 | TechGuide',
    description:
      '茅ヶ崎市・湘南エリアの店舗・企業・教室・地域団体へ。ホームページ改善、予約・申込システム、業務効率化を、課題整理から対面・オンラインで支援します。',
    path: '/chigasaki/',
    image: '/images/chigasaki/consultation-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージしたWeb・IT相談の風景',
  },
  breadcrumbLabel: '茅ヶ崎のWeb・IT支援',
  eyebrow: '茅ヶ崎市内で対面相談できます',
  heroTitleLines: ['茅ヶ崎で、', '集客と業務を整える。'],
  heroLead:
    'ホームページの見直し、予約・申込の仕組み化、転記作業の削減。店舗・企業・教室・地域団体など、現場の困りごとを伺い、必要なところから小さく形にします。',
  heroCtaLabel: 'いまの困りごとを相談する',
  badges: ['茅ヶ崎市内で対面相談', '集客と業務改善をまとめて', '相談内容が未整理でもOK'],
  problems: {
    title: '「何を作るか」が決まる前で大丈夫です',
    description: '店舗や事業の現場で起きている困りごとから、必要な打ち手を整理します。',
    items: [
      {
        title: '問い合わせや予約を増やしたい',
        description: 'ホームページの内容、検索からの見つかり方、申込みまでの流れを確認します。',
      },
      {
        title: '申込・顧客情報が散らばっている',
        description:
          'フォーム、LINE、メール、Excelに分かれた情報を整理し、管理の手間を減らします。',
      },
      {
        title: 'ITツールを入れたが定着しない',
        description: 'いまの仕事の流れを見直し、現場の方が無理なく使い続けられる方法を考えます。',
      },
    ],
  },
  primaryLinks: {
    title: '集客から日々の業務まで、まとめて相談できます',
    description: 'いまの悩みに近いものから、詳しい支援内容をご覧ください。',
    items: chigasakiServiceLinks,
  },
  support: {
    title: '茅ヶ崎市内で、現場を見ながら進められます',
    description: 'オンラインだけでは伝えにくい業務も、対面で画面や資料を見ながら整理できます。',
    items: [
      {
        title: '対面で現状を共有',
        description: '茅ヶ崎市内で、いま使っている画面や帳票を見ながら困りごとを確認します。',
      },
      {
        title: '必要なところから小さく着手',
        description: '予算と体制に合わせ、効果を確かめやすい範囲から始めます。',
      },
      {
        title: '使い始めてからも改善',
        description: '公開や導入をゴールにせず、実際の反応と使い方を見ながら整えます。',
      },
    ],
  },
  examples: {
    title: '店舗・企業・団体で、こんな相談に対応します',
    description: '業種や規模を問わず、集客と運営に必要な仕組みを組み合わせます。',
    items: [
      '店舗・教室のホームページ',
      'サービスの問い合わせ導線',
      '予約・体験申込の受付',
      '顧客・会員情報の管理',
      '地域イベントの申込・参加者管理',
      'Googleフォーム・LINEの連携',
      'Excel・スプレッドシートの整理',
      'メール対応・集計作業の自動化',
    ],
  },
  process: {
    title: 'まず話して、必要なところだけ形にします',
    description: '大きな開発を前提にせず、現場の負担と効果を見ながら進めます。',
    items: [
      {
        title: '困りごとを聞く',
        description: '店舗や事務所での流れ、担当者、利用中の道具を確認します。',
      },
      {
        title: '改善案を比べる',
        description: 'サイト改善、既製ツール、独自開発などから合う方法を比べます。',
      },
      {
        title: '小さく形にする',
        description: '画面や試作を早めに共有し、使う方と確認しながら進めます。',
      },
      {
        title: '使いながら直す',
        description: '実際の反応や現場の声をもとに、必要な改善を続けます。',
      },
    ],
  },
  contact: {
    title: 'まずは、いま困っていることを聞かせてください',
    description:
      '今困っていることや、変えたい業務をそのままお送りください。茅ヶ崎市内での対面相談にも対応します。',
    category: 'discovery',
    subject: '茅ヶ崎エリアのIT相談',
    placement: 'chigasaki_hub',
  },
  showWorks: true,
};
