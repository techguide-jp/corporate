import { chigasakiServiceLinks } from '$lib/local-seo/chigasaki/shared';
import type { LocalSeoPageContent } from '$lib/local-seo/types';

export const chigasakiHubContent: LocalSeoPageContent = {
  kind: 'hub',
  seo: {
    title: '茅ヶ崎のWeb制作・システム開発・IT相談 | TechGuide',
    description:
      '茅ヶ崎市・湘南エリアのWeb制作、システム開発、業務効率化、IT導入相談。課題整理から設計・開発・運用改善まで、オンラインと対面で伴走します。',
    path: '/chigasaki/',
    image: '/images/services/consulting-visual.webp',
    imageAlt: '茅ヶ崎エリアの事業者と課題を整理するIT相談のイメージ',
  },
  breadcrumbLabel: '茅ヶ崎のIT相談',
  eyebrow: 'Chigasaki & Shonan',
  heroTitle: '茅ヶ崎のWeb制作・システム開発・IT相談',
  heroLead:
    '茅ヶ崎市・湘南エリアの企業、店舗、団体に向けて、Web制作やシステム開発、業務効率化を支援します。相談内容が固まっていない段階から、オンライン・対面のどちらでもご相談いただけます。',
  badges: ['茅ヶ崎市・湘南エリア対応', 'オンライン・対面相談', '課題整理から運用改善まで'],
  problems: {
    title: 'こんな状態から相談できます',
    description: '作りたいものではなく、いま困っていることからお聞きします。',
    items: [
      {
        title: '何から始めるべきか決められない',
        description:
          'Webサイト、既製ツール、独自システムのどれが合うか、課題と優先順位から整理します。',
      },
      {
        title: '手作業や転記が増えている',
        description:
          'Excel、フォーム、メールなどに分かれた業務を確認し、減らせる作業を見つけます。',
      },
      {
        title: 'Webサイトが成果につながっていない',
        description: '伝える内容と問い合わせまでの導線を見直し、公開後も改善できる形に整えます。',
      },
    ],
  },
  primaryLinks: {
    title: '茅ヶ崎エリアで支援できること',
    description: '課題に近い支援内容から詳しいページをご覧ください。',
    items: chigasakiServiceLinks,
  },
  support: {
    title: '上流の整理から一緒に進めます',
    description: '制作や開発だけを請け負うのではなく、必要な仕組みを判断するところから伴走します。',
    items: [
      {
        title: '課題と目的の整理',
        description: '現状の業務や利用者の動きを確認し、改善したい状態を言葉にします。',
      },
      {
        title: '無理のない進め方を設計',
        description: '予算や体制を踏まえ、小さく始める範囲と将来拡張する範囲を分けます。',
      },
      {
        title: '制作・開発後も改善',
        description: '公開して終わりにせず、利用状況や運用上の課題を見ながら改善します。',
      },
    ],
  },
  examples: {
    title: '相談テーマの例',
    description: 'Web制作から業務の仕組み化まで、事業に合わせて組み合わせられます。',
    items: [
      'コーポレートサイト・サービスサイト',
      'LP・問い合わせ導線',
      '予約・申込システム',
      '会員・顧客管理',
      'イベント・チケット管理',
      'Googleフォーム・LINE連携',
      'Excel・スプレッドシート業務の改善',
      'AI活用・業務自動化',
    ],
  },
  process: {
    title: 'ご相談から改善までの流れ',
    description: '最初から大きな開発を前提にせず、必要性を確認しながら進めます。',
    items: [
      {
        title: '現状を聞く',
        description: '困っている業務、目的、利用者、いまの運用を確認します。',
      },
      {
        title: '優先順位を決める',
        description: '効果と負担を比べ、先に解決する範囲を整理します。',
      },
      {
        title: '制作・開発する',
        description: '合意した範囲を設計し、確認いただきながら形にします。',
      },
      {
        title: '運用しながら改善する',
        description: '実際の利用状況を踏まえ、必要な改善を続けます。',
      },
    ],
  },
  contact: {
    title: 'まだ相談内容がまとまっていなくても大丈夫です',
    description:
      '今困っていることや、変えたい業務をそのままお送りください。茅ヶ崎市内での対面相談にも対応します。',
    category: 'discovery',
    subject: '茅ヶ崎エリアのIT相談',
    placement: 'chigasaki_hub',
  },
  showWorks: true,
};
