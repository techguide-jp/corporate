import type {
  AccessInfo,
  CompanyProfile,
  ContactInfo,
  HeroContent,
  NavItem,
  ServiceDetail,
  ServiceItem,
  ShowcaseItem,
  StoryContent
} from '$lib/types/content';

export const navItems: NavItem[] = [
  { label: '支援内容', href: '/services' },
  { label: 'プロダクト', href: '/#products' },
  { label: '実績', href: '/#works' },
  { label: '会社情報', href: '/#company' },
  { label: 'お問い合わせ', href: '/contact' }
];

export const hero: HeroContent = {
  image: '/images/hero/hero.webp',
  title: 'IT を、もっと身近に。\n成果につながる形まで。',
  description:
    '中小企業や立ち上げ期のチームに向けて、IT導入、LP制作、AI活用まで実行しやすい形に整えて伴走します。',
  actions: [
    { label: '支援内容を見る', href: '/services', tone: 'warm' },
    { label: 'お問い合わせ', href: '/contact', tone: 'light' }
  ]
};

export const story: StoryContent = {
  label: 'About',
  title: '事業と現場をつなぎ、実行できる形へ。',
  lead: 'ITを難しくしすぎず、現場で使える形まで落とし込む。',
  image: '/images/about/ceo.webp',
  imageAlt: 'TechGuide合同会社 代表 高橋雄太',
  paragraphs: [
    '長くIT業界に関わる中で、ITが業務や事業の可能性を大きく広げる一方で、活用できる企業とそうでない企業の差が広がっていることを強く感じてきました。',
    'さらに、エンジニア需要は増えているのに、企業が求める人材と現場で力を発揮できる人材がうまく出会えないミスマッチも起きています。',
    'テックガイドは、事業側と技術側の両方を理解しながら、導入前の整理から制作、運用、改善までを伴走することで、このギャップを埋めていきます。'
  ],
  focusItems: [
    {
      title: 'IT活用の二極化',
      description:
        'ITを使いこなせる企業は、新しい技術やサービスを自分たちで見極めながら、事業や業務に合わせて前進できます。',
      points: [
        '一方で、そもそもITで何がどう変わるのか分からず、通常業務で手一杯なまま着手できない企業も少なくありません。',
        'その差は業務効率だけでなく、人材の流動性や後継者探しにも影響し、事業継続の不安につながることがあります。',
        'TechGuideは、流行りのサービスを当て込むのではなく、今の体制で無理なく始められる形を一緒に整理します。'
      ]
    },
    {
      title: '人材と現場のミスマッチ',
      description:
        'エンジニア需要は増え続ける一方で、企業が求める人材と、現場で力を発揮できる人材がうまく噛み合わない状況も広がっています。',
      points: [
        '会社側は求めるスキルを持つ人に出会えず、候補者側も自分に合う現場や成長環境を見つけにくいままです。',
        '社内に知見が少ない企業では、採用後の受け入れや育成、内製化の進め方が曖昧なまま止まってしまうこともあります。',
        'TechGuideは、採用だけでなく、教育・技術指導・運用体制まで含めて、現場に定着する形を支援します。'
      ]
    }
  ],
  missionTitle: 'Mission',
  missionItems: [
    '中小企業にとって、人に寄り添い、幸せを生み出す IT との関わりを増やす。',
    '技術だけでなく相手の状況や感情を汲み取れる人を増やし、現場で成果の出る支援を広げる。'
  ]
};

export const services: ServiceItem[] = [
  {
    title: 'ITコンサルティング・導入支援',
    description:
      '課題整理、業務設計、ツール選定までを整理し、何から始めるべきかを明確にします。',
    href: '/services#consulting',
    kind: 'consulting',
    image: '/images/services/consulting-visual.webp',
    imageAlt: 'ITコンサルティング・導入支援'
  },
  {
    title: '受託開発・LP/導線改善',
    description:
      '要件整理から設計、制作、改善運用まで一気通貫で伴走し、成果に結びつく導線を整えます。',
    href: '/services#development',
    kind: 'development',
    image: '/images/services/development-visual.webp',
    imageAlt: '受託開発・LP/導線改善'
  },
  {
    title: 'AI活用・技術指導・採用支援',
    description:
      'AI導入のスモールスタートから、内製化に向けた技術指導や採用支援まで対応します。',
    href: '/services#ai',
    kind: 'ai',
    image: '/images/services/ai-visual.webp',
    imageAlt: 'AI活用・技術指導・採用支援'
  }
];

export const productItems: ShowcaseItem[] = [
  {
    title: 'TicketCraft',
    description: '申込・決済・受付・配信を一本化するイベント運営プロダクト',
    image: '/images/showcase/ticketcraft-hero.webp',
    href: 'https://ticketcraft.jp/',
    ctaLabel: 'プロダクトを見る'
  },
  {
    title: 'その他事例集',
    description: '制作実績を横断して見られるポートフォリオ集',
    image: '/images/showcase/portfolio-hero.webp',
    href: 'https://portfolio-site-sage-seven.vercel.app/',
    ctaLabel: '事例集を見る'
  }
];

export const workItems: ShowcaseItem[] = [
  {
    title: 'AROMINE',
    description: 'セルフコンディショニングブランドの講座・申込LP',
    image: '/images/showcase/aromine-hero.webp',
    href: 'https://aromine.vercel.app/',
    ctaLabel: '実績を見る'
  },
  {
    title: '守成クラブ 東京品川会場',
    description: '例会案内・イベント導線を整理した公式サイト',
    image: '/images/showcase/shusei-shinagawa-hero.webp',
    href: 'https://www.shusei-tokyoshinagawa.com/',
    ctaLabel: '実績を見る'
  }
];

export const companyProfile: CompanyProfile = {
  name: 'TechGuide合同会社',
  foundedAt: '2021年4月12日',
  representative: '高橋 雄太'
};

export const accessInfo: AccessInfo = {
  postalCode: '〒160-0022',
  address: '東京都新宿区新宿7-20-6 大久保マンション1F',
  mapHref:
    'https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF7-20-6%20%E5%A4%A7%E4%B9%85%E4%BF%9D%E3%83%9E%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B31F',
  embedSrc:
    'https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF7-20-6%20%E5%A4%A7%E4%B9%85%E4%BF%9D%E3%83%9E%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B31F&z=17&output=embed'
};

export const contactInfo: ContactInfo = {
  heading: '導入前の整理から、制作・改善まで気軽にご相談ください。',
  description:
    '現状整理、LP改善、ツール導入、AI活用の壁打ちまで、事業フェーズに合わせて伴走します。',
  email: 'y.takahashi@techguide.jp'
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'consulting',
    title: 'ITコンサル・導線設計',
    summary:
      'ツール導入や業務改善を進めたいが、何が課題で、何を優先すべきかが曖昧な状態から整理します。',
    issues: [
      'ITで何が改善できるのか分からない',
      '提案を受けているが妥当性を判断できない',
      '現場に合う導線設計や運用フローまで整理したい'
    ],
    offerings: [
      '課題整理と現状ヒアリング',
      '導線設計、業務整理、導入方針の言語化',
      '既存ツール活用を含む現実的な提案'
    ],
    process: ['現状ヒアリング', '課題と優先順位の整理', '導入・改善方針の提案'],
    visual: {
      image: '/images/services/consulting-visual.webp',
      alt: '課題整理の打ち合わせイメージ',
      eyebrow: 'Planning',
      title: 'まず課題の輪郭を揃える',
      description: '導入可否の判断や、現場に無理のない進め方まで整理してから着手します。'
    }
  },
  {
    id: 'development',
    title: 'LP制作・受託開発',
    summary:
      '企画段階から目的を整理し、申込や問い合わせにつながる導線まで含めて制作と改善を進めます。',
    issues: [
      'LPやWebサイトを作りたいが、何を載せるべきか分からない',
      '公開しているページが成果につながっていない',
      '制作後も改善しながら運用したい'
    ],
    offerings: [
      '要件整理と構成設計',
      'LP制作、フォーム導線、改善提案',
      '公開後の振り返りと継続改善'
    ],
    process: ['目的とターゲットの整理', '構成・制作', '公開後の改善伴走'],
    visual: {
      image: '/images/services/development-visual.webp',
      alt: 'LP制作と導線改善のイメージ',
      eyebrow: 'Development',
      title: '訴求から申込導線まで設計する',
      description: '構成設計、フォーム導線、公開後の改善まで継続して支える支援です。',
      href: 'https://lpboost-prod.lpboost.workers.dev/',
      ctaLabel: 'LP Boost を見る'
    },
    relatedItems: [
      {
        title: 'LP Boost',
        description: '相談導線まで整えるLP制作・改善支援',
        image: '/images/showcase/lpboost-hero.webp',
        href: 'https://lpboost-prod.lpboost.workers.dev/',
        ctaLabel: 'サービスを見る'
      },
      {
        title: 'Ready Mock',
        description: '3分診断を起点に、事業に合う試作サービス案を組み立てる支援',
        image: '/images/showcase/ready-mock-hero.webp',
        href: 'https://ready-mock.com/',
        ctaLabel: 'サービスを見る'
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI活用・技術指導・採用支援',
    summary:
      'AIを現場で使える形に落とし込みながら、内製化に向けた技術指導や採用体制づくりまで支援します。',
    issues: [
      'ChatGPT や生成AIをどう業務に活かせばいいか分からない',
      '社内に技術知見が少なく、内製化に不安がある',
      '採用や育成まで含めて体制を整えたい'
    ],
    offerings: [
      'AI活用テーマの選定と小さな実証',
      '技術指導、教育、運用ルール整理',
      '採用や内製化に向けた体制設計の相談'
    ],
    process: ['テーマ設定', '小さく試す', '現場定着と体制づくり'],
    visual: {
      image: '/images/services/ai-visual.webp',
      alt: 'AI活用と技術支援のイメージ',
      eyebrow: 'Enablement',
      title: '小さく始めて、現場に定着させる',
      description: 'AI導入も技術指導も、試して終わりではなく続く体制づくりまで伴走します。'
    },
    relatedItems: [
      {
        title: 'ValueGate Blog',
        description: '単価設計やキャリア設計を、実務に落とし込める形で発信するブログ',
        image: '/images/showcase/valuegate-blog-hero.webp',
        href: 'https://blog.valuegate.tech/',
        ctaLabel: 'ブログを見る'
      }
    ]
  }
];
