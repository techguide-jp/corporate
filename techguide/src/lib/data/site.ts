import type {
  AccessInfo,
  CompanyProfile,
  ContactPageContent,
  ContactInfo,
  HeroContent,
  NavItem,
  PageSeo,
  ServiceDetail,
  ServiceItem,
  SiteMetadata,
  ShowcaseItem,
  StoryContent,
} from '$lib/types/content';

export const siteMetadata: SiteMetadata = {
  brandName: 'TechGuide',
  legalName: 'TechGuide合同会社',
  siteUrl: 'https://techguide.jp',
  language: 'ja',
  locale: 'ja_JP',
  defaultTitle: 'TechGuide | IT導入・LP制作・AI活用まで伴走するパートナー',
  defaultDescription:
    'テックガイド合同会社のコーポレートサイト。導入前整理・IT活用支援、LP制作・受託開発、AI活用・技術教育・組織支援まで事業フェーズに合わせて伴走します。',
  defaultOgImage: '/images/hero/hero.webp',
  defaultOgImageAlt: 'TechGuide の支援領域を伝えるキービジュアル',
  sameAs: [],
};

export const pageSeo: Record<'home' | 'services' | 'contact', PageSeo> = {
  home: {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    path: '/',
  },
  services: {
    title: '支援内容 | TechGuide',
    description:
      'テックガイド合同会社の支援内容。導入前整理・IT活用支援、受託開発・LP/導線改善、AI活用・技術教育・組織支援を詳しく紹介します。',
    path: '/services/',
    image: '/images/services/development-visual.webp',
    imageAlt: 'TechGuide の支援内容を紹介するページのビジュアル',
  },
  contact: {
    title: 'お問い合わせ | TechGuide',
    description:
      'IT導入、LP制作、受託開発、AI活用・技術教育に関するご相談窓口です。課題整理から制作・改善まで、TechGuide が伴走します。',
    path: '/contact/',
  },
};

export const navItems: NavItem[] = [
  { label: '支援内容', href: '/services' },
  { label: 'プロダクト', href: '/#products' },
  { label: '実績', href: '/#works' },
  { label: '会社情報', href: '/#company' },
  { label: 'お問い合わせ', href: '/contact' },
];

export const hero: HeroContent = {
  image: '/images/hero/hero.webp',
  imageAlt: '',
  imageWidth: 1316,
  imageHeight: 688,
  title: 'IT を、もっと身近に。\n成果につながる形まで。',
  description:
    '中小企業や立ち上げ期のチームに向けて、IT導入、LP制作、AI活用まで実行しやすい形に整えて伴走します。',
  actions: [
    { label: '支援内容を見る', href: '/services', tone: 'warm' },
    {
      label: 'お問い合わせ',
      href: '/contact',
      tone: 'light',
      analytics: {
        eventName: 'contact_cta_click',
        params: { placement: 'hero' },
      },
    },
  ],
};

export const story: StoryContent = {
  label: 'About',
  title: '事業と現場をつなぎ、実行できる形へ。',
  lead: 'ITを、分かる人のものではなく、**使える人のものにする。**',
  image: '/images/about/ceo.webp',
  imageAlt: 'TechGuide合同会社 代表 高橋雄太',
  paragraphs: [
    'ITは本来、**業務を軽くしたり、事業の可能性を広げたりするための手段**です。けれど実際には、言葉が難しかったり、選択肢が多すぎたりして、現場では「何から始めればいいか分からない」まま止まってしまうことが少なくありません。',
    '私は、技術そのものを見せたいのではなく、**相手の状況に合った形で、使える状態まで整えること**に価値があると考えています。分かりやすく整理し、無理なく始められて、現場で続けられることを大切にしています。',
    'TechGuideは、**相談の段階から制作、導入、改善までを一緒に進めながら**、ITを特別なものではなく、**事業を前に進めるための実用的な力**として届けていきます。',
  ],
  focusItems: [
    {
      title: '導入の前で止まってしまう企業が多い',
      description:
        'ITを活用したい気持ちはあっても、**課題の整理や優先順位づけができないまま**、検討だけで時間が過ぎてしまう企業は少なくありません。',
      points: [
        '**何を改善したいのか**が言語化されていない',
        '提案やツールを比較しても、**自社に合う判断**がしづらい',
        '通常業務が忙しく、**導入の準備に手が回らない**',
      ],
      closing:
        'TechGuideは、こうした止まりやすさに対して、**導入そのものより前に、課題と優先順位を一緒に整理する支援**に取り組んでいます。',
    },
    {
      title: '技術とビジネスをつなぐ人材が育ちにくい',
      description:
        '現場では、技術力のある人がいても、**事業の背景や相手の立場を踏まえて会話し**、ビジネス側と噛み合う形で動ける人材が十分に育たないことがあります。',
      points: [
        '技術的には正しくても、**事業側が求める優先順位や判断軸**とずれてしまう',
        '要件や課題をそのまま受け取るだけで、**背景を踏まえた整理や提案**につながりにくい',
        'エンジニアとビジネス側の間をつなぐ役割が育たず、**認識の行き違い**が繰り返される',
      ],
      closing:
        'TechGuideは、こうした齟齬を減らすために、**技術だけでなく相手の状況や感情を汲み取り、事業と噛み合う形で動ける人を増やす支援**に取り組んでいます。',
    },
  ],
  missionTitle: 'Mission',
  missionItems: [
    '中小企業にとって、**人に寄り添い、幸せを生み出す IT との関わり**を増やす。',
    '技術だけでなく相手の状況や感情を汲み取れる人を増やし、**現場で成果の出る支援**を広げる。',
  ],
};

export const services: ServiceItem[] = [
  {
    title: '導入前整理・IT活用支援',
    description:
      '課題整理、優先順位づけ、業務導線の整理を通じて、今の体制で無理なく始められる一歩を明確にします。',
    href: '/services#consulting',
    kind: 'consulting',
    image: '/images/services/consulting-visual.webp',
    imageAlt: '導入前整理・IT活用支援',
  },
  {
    title: '受託開発・LP/導線改善',
    description:
      '事業の目的と利用者の行動を踏まえ、伝わる構成と成果につながる導線を設計し、制作から改善まで伴走します。',
    href: '/services#development',
    kind: 'development',
    image: '/images/services/development-visual.webp',
    imageAlt: '受託開発・LP/導線改善',
  },
  {
    title: 'AI活用・技術教育・組織支援',
    description:
      'AIの現場活用に加え、エンジニアが事業理解を持って対話・提案できるようにする技術教育を通じて、噛み合う組織づくりを支援します。',
    href: '/services#ai',
    kind: 'ai',
    image: '/images/services/ai-visual.webp',
    imageAlt: 'AI活用・技術教育・組織支援',
  },
];

export const productItems: ShowcaseItem[] = [
  {
    title: 'TicketCraft',
    description: '申込・決済・受付・配信を一本化するイベント運営プロダクト',
    image: '/images/showcase/ticketcraft-hero.webp',
    href: 'https://ticketcraft.jp/',
    ctaLabel: 'プロダクトを見る',
  },
  {
    title: 'その他事例集',
    description: '制作実績を横断して見られるポートフォリオ集',
    image: '/images/showcase/portfolio-hero.webp',
    href: 'https://portfolio-site-sage-seven.vercel.app/',
    ctaLabel: '事例集を見る',
  },
];

export const workItems: ShowcaseItem[] = [
  {
    title: 'AROMINE',
    description: 'セルフコンディショニングブランドの講座・申込LP',
    image: '/images/showcase/aromine-hero.webp',
    href: 'https://aromine.vercel.app/',
    ctaLabel: '実績を見る',
  },
  {
    title: '守成クラブ 東京品川会場',
    description: '例会案内・イベント導線を整理した公式サイト',
    image: '/images/showcase/shusei-shinagawa-hero.webp',
    href: 'https://www.shusei-tokyoshinagawa.com/',
    ctaLabel: '実績を見る',
  },
];

export const companyProfile: CompanyProfile = {
  name: 'TechGuide合同会社',
  foundedAt: '2021年4月12日',
  foundingDateIso: '2021-04-12',
  representative: '高橋 雄太',
};

export const accessInfo: AccessInfo = {
  postalCode: '〒160-0022',
  address: '東京都新宿区新宿7-20-6 大久保マンション1F',
  streetAddress: '新宿7-20-6 大久保マンション1F',
  addressLocality: '新宿区',
  addressRegion: '東京都',
  addressCountry: 'JP',
  mapHref:
    'https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF7-20-6%20%E5%A4%A7%E4%B9%85%E4%BF%9D%E3%83%9E%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B31F',
  embedSrc:
    'https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF7-20-6%20%E5%A4%A7%E4%B9%85%E4%BF%9D%E3%83%9E%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B31F&z=17&output=embed',
};

export const contactInfo: ContactInfo = {
  heading: '導入前の整理から、制作・改善まで気軽にご相談ください。',
  description:
    '現状整理、LP改善、ツール導入、AI活用の壁打ちまで、事業フェーズに合わせて伴走します。',
  email: 'y.takahashi@techguide.jp',
  formUrl: 'https://tayori.com/form/0a9d521c221f55e0c7b857f7e2f83f5760c7b7bb/',
};

export const contactPageContent: ContactPageContent = {
  title: 'お問い合わせ',
  subtitle:
    'IT導入、LP制作、受託開発、AI活用・技術教育に関するご相談をこちらから受け付けています。',
  lead: '現状の整理から制作・改善まで、事業フェーズや社内体制に合わせて進め方を一緒に考えます。相談段階でも問題ありません。',
  inquiryExamples: [
    '何から着手すべきか分からないので、課題と優先順位を整理したい',
    'LPやサイトを作りたいが、訴求や問い合わせ導線の設計から相談したい',
    'AIを現場でどう使うべきか、小さく試せるテーマから検討したい',
    'エンジニアと事業側の認識をそろえる進め方や教育支援を相談したい',
  ],
  processTitle: 'ご相談後の進め方',
  processSteps: [
    'お問い合わせ内容をもとに、現状・目的・優先したいことを確認します。',
    '内容に応じて、メールでの一次回答またはオンラインでの打ち合わせをご案内します。',
    '必要な支援範囲を整理し、進め方やスケジュール感が分かる形でご提案します。',
  ],
  responseNote:
    'お問い合わせは営業日に順次確認しています。お急ぎの場合は、希望時期や期限もあわせてご記入ください。',
  alternateContactTitle: 'フォームが表示されない場合',
  alternateContactDescription:
    'Tayori のフォームを直接開くか、メールからのご連絡も可能です。環境によって iframe が表示されない場合はこちらをご利用ください。',
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'consulting',
    title: '導入前整理・IT活用支援',
    summary:
      'ツール導入や業務改善を進めたいが、何が課題で、何を優先すべきかが曖昧な状態から整理します。',
    issues: [
      '何を改善したいのかがまだ言語化できていない',
      '提案やツールの妥当性を判断しづらい',
      '導入前に現場の運用や導線まで整理したい',
    ],
    offerings: [
      '現状把握と課題整理',
      '優先順位づけと導入方針の言語化',
      '現場に合う業務導線・運用設計',
    ],
    process: ['現状把握', '優先順位づけ', '導入方針の設計'],
    visual: {
      image: '/images/services/consulting-visual.webp',
      alt: '導入前整理の打ち合わせイメージ',
      eyebrow: 'Planning',
      title: 'まず着手前の整理を行う',
      description: '導入可否の判断や、現場に無理のない進め方まで整理してから動き出します。',
    },
  },
  {
    id: 'development',
    title: 'LP制作・受託開発',
    summary:
      '企画段階から目的と訴求を整理し、申込や問い合わせにつながる導線まで含めて制作と改善を進めます。',
    issues: [
      '何を載せれば伝わるのか整理できていない',
      '公開しているページが成果につながっていない',
      '制作後も改善しながら運用したい',
    ],
    offerings: [
      '目的整理と訴求設計',
      'LP制作、フォーム導線、必要機能の実装',
      '公開後の振り返りと改善伴走',
    ],
    process: ['目的整理と訴求設計', '制作・実装', '公開後の改善伴走'],
    visual: {
      image: '/images/services/development-visual.webp',
      alt: 'LP制作と導線改善のイメージ',
      eyebrow: 'Development',
      title: '訴求から申込導線まで設計する',
      description: '訴求設計、フォーム導線、必要機能の実装、公開後の改善まで継続して支えます。',
      href: 'https://lpboost-prod.lpboost.workers.dev/',
      ctaLabel: 'LP Boost を見る',
    },
    relatedItems: [
      {
        title: 'LP Boost',
        description: '相談導線まで整えるLP制作・改善支援',
        image: '/images/showcase/lpboost-hero.webp',
        href: 'https://lpboost-prod.lpboost.workers.dev/',
        ctaLabel: 'サービスを見る',
      },
      {
        title: 'Ready Mock',
        description: '3分診断を起点に、事業に合う試作サービス案を組み立てる支援',
        image: '/images/showcase/ready-mock-hero.webp',
        href: 'https://ready-mock.com/',
        ctaLabel: 'サービスを見る',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI活用・技術教育・組織支援',
    summary:
      'AIを現場で使える形に落とし込みながら、エンジニアが事業背景を理解し、ビジネス側と噛み合う形で動けるようにする技術教育と組織支援を行います。',
    issues: [
      'AIをどう業務に活かせば成果につながるのか分からない',
      '技術力はあっても、事業側との会話や優先順位のすり合わせが噛み合いにくい',
      'エンジニアが一段上の視座を持ち、提案や判断ができる組織にしたい',
    ],
    offerings: [
      'AI活用テーマの整理と小さな実証',
      'エンジニア向けの技術教育、事業理解支援、壁打ち',
      'ビジネスと技術の認識をそろえる進め方・対話設計',
    ],
    process: ['テーマ整理', '小さく試す', '教育と現場定着'],
    visual: {
      image: '/images/services/ai-visual.webp',
      alt: 'AI活用と技術教育のイメージ',
      eyebrow: 'Enablement',
      title: '小さく始めて、噛み合う組織を育てる',
      description:
        'AI導入だけでなく、事業理解と対話力を持って動ける技術人材と進め方づくりまで伴走します。',
    },
    relatedItems: [
      {
        title: 'ValueGate Blog',
        description: '技術と事業をつなぐ視点を、実務に落とし込める形で発信するブログ',
        image: '/images/showcase/valuegate-blog-hero.webp',
        href: 'https://blog.valuegate.tech/',
        ctaLabel: 'ブログを見る',
      },
    ],
  },
];
