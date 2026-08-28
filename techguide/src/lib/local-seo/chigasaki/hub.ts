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
    title: 'こんな悩み、ありませんか',
    description: '茅ヶ崎で店舗や事業を続けるなかで、集客と日々の運営が少しずつ重くなっている方へ。',
    items: [
      {
        audience: '店舗・教室',
        title: '「ホームページはある。でも予約や問い合わせが増えない」',
        description:
          '営業時間やサービスは載っていても、選ばれる理由や申込みまでの流れが伝わっていない状態です。',
      },
      {
        audience: '企業・専門サービス',
        title: '「顧客情報がLINE・メール・Excelに散らばっている」',
        description: '担当者が毎回探し直し、連絡漏れや二重入力が起きやすくなっています。',
      },
      {
        audience: 'イベント・地域団体',
        title: '「申込が増えるほど、転記と確認に追われる」',
        description:
          '受付、名簿、入金確認、案内が別々で、本来の企画や参加者対応に時間を使えません。',
      },
    ],
    bridge: {
      title: 'ひとつでも当てはまれば、作るものを決める前に相談できます',
      description:
        'ホームページの改善で足りるのか、既存ツールをつなぐのか、独自の仕組みが必要か。現状を見ながら一緒に判断します。',
    },
  },
  transformation: {
    title: '仕組みを整えると、目の前の仕事がこう変わります',
    description: '派手なDXではなく、集客と運営の詰まりを一つずつなくします。',
    items: [
      {
        before: 'サイトを更新しても、何が問い合わせにつながったか分からない',
        after: '見る人の悩みから導線を組み、改善する場所を判断できる',
        image: '/images/chigasaki/transformation-inquiry-flow-v20260828.webp',
        imageAlt: '複雑なサイト構成に悩む店主と、導線整理後に顧客対応する店主の比較',
      },
      {
        before: '申込のたびに複数の画面へ転記し、確認漏れを心配する',
        after: '受付から管理までがつながり、確認と連絡に集中できる',
        image: '/images/chigasaki/transformation-application-flow-v20260828.webp',
        imageAlt: '紙と複数画面の申込管理と、タブレットで受付を一元化した状態の比較',
      },
      {
        before: '詳しい担当者に作業が集まり、休むと業務が止まる',
        after: '手順と情報が共有され、誰でも状況を追える',
        image: '/images/chigasaki/transformation-team-flow-v20260828.webp',
        imageAlt: '一人に書類が集中した職場と、進捗をチーム共有する職場の比較',
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
  works: {
    title: '集客導線と運営の仕組みを、実際に形にしてきました',
    description:
      'イベント申込・受付、講座LP、会場公式サイトなどの制作・開発例です。茅ヶ崎地域に限定した事例ではありませんが、相談内容に近い進め方を確認できます。',
  },
  faq: {
    title: '茅ヶ崎でのWeb・IT相談について',
    description: 'ご相談前によくある疑問にお答えします。',
    items: [
      {
        question: '茅ヶ崎市内で対面相談できますか？',
        answer:
          'はい。日程と場所を調整のうえ、茅ヶ崎市内での対面相談に対応します。オンラインとの併用も可能です。',
      },
      {
        question: 'ホームページとシステムのどちらが必要か分かりません。',
        answer:
          '作るものが決まっていない段階で問題ありません。集客、受付、管理など現在の課題を確認し、サイト改善・既存ツール・独自開発を比較します。',
      },
      {
        question: '小さな店舗や個人事業でも相談できますか？',
        answer:
          'はい。店舗、教室、専門サービス、地域団体など、少人数で運営している事業の相談にも対応します。',
      },
      {
        question: '相談したら、すぐ開発を依頼する必要がありますか？',
        answer: 'いいえ。まず課題と選択肢を整理し、費用や運用負担を踏まえて進めるか判断できます。',
      },
      {
        question: '茅ヶ崎以外の湘南エリアも対応していますか？',
        answer:
          'オンラインでは湘南エリアを含めて相談できます。対面をご希望の場合は場所と日程を個別に調整します。',
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
};
