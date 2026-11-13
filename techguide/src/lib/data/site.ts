import type {
  AccessInfo,
  CompanyProfile,
  ContactPageContent,
  ContactInfo,
  HeroContent,
  NavItem,
  PageSeo,
  ProfilePageContent,
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

export const instagramProfileUrl = 'https://www.instagram.com/yuchan_314/';

export const pageSeo: Record<
  | 'home'
  | 'services'
  | 'articles'
  | 'news'
  | 'contact'
  | 'instagram'
  | 'profile'
  | 'recruit'
  | 'macclipy'
  | 'macclipyPrivacy'
  | 'safeqr'
  | 'safeqrPrivacy',
  PageSeo
> = {
  home: {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    path: '/',
  },
  services: {
    title: 'お手伝いできること | TechGuide',
    description:
      'ITの相談・業務改善、Webサイト制作・システム開発、AI活用・エンジニア育成。TechGuideがお手伝いできることを、具体的な困りごとや相談例とともに紹介します。',
    path: '/services/',
    image: '/images/services/development-visual.webp',
    imageAlt: 'TechGuideがお手伝いできることを紹介するページのビジュアル',
  },
  articles: {
    title: '記事 | TechGuide',
    description:
      'TechGuideが大切にしているIT導入、業務改善、AI活用、試作開発、事業と技術の橋渡しの考え方をまとめています。',
    path: '/articles/',
    image: '/images/services/consulting-visual.webp',
    imageAlt: 'TechGuideの記事一覧ページのビジュアル',
  },
  news: {
    title: 'お知らせ | TechGuide',
    description:
      'TechGuide合同会社のサービス、プロダクト、制作実績、イベント、採用などの最新情報をお届けします。',
    path: '/news/',
  },
  contact: {
    title: 'お問い合わせ | TechGuide',
    description:
      'IT導入、LP制作、受託開発、AI活用・技術教育に関するご相談窓口です。課題整理から制作・改善まで、TechGuide が伴走します。',
    path: '/contact/',
  },
  instagram: {
    title: '仕事と申し込み導線を整える | TechGuide',
    description:
      '業務自動化、申し込みフォーム、LP制作、新しいサービスの試作など、今の困りごとに合った相談先を選べます。',
    path: '/instagram/',
    image: '/images/instagram/instagram-hero.webp',
    imageAlt: '仕事や申し込み導線を、小さく整えたい方へ',
  },
  profile: {
    title: 'プロフィール | 高橋雄太（ゆーちゃん） | TechGuide',
    description:
      'TechGuide合同会社代表・Webエンジニアの高橋雄太（ゆーちゃん）。試作開発、業務改善、イベント設計の事例や、参加しているビジネス行動管理大学（UBM）を紹介します。',
    path: '/profile/',
    image: '/images/about/ceo.webp',
    imageAlt: 'TechGuide合同会社 代表 高橋雄太',
  },
  recruit: {
    title: '採用・パートナー募集 | TechGuide',
    description:
      'TechGuideのWebエンジニア（業務委託・副業）募集ページ。週5時間〜・フルリモートで、設計から改善まで関われる開発パートナーを募集しています。',
    path: '/recruit/',
  },
  macclipy: {
    title: 'MacClipy | macOS用クリップボード履歴アプリ | TechGuide',
    description:
      'MacClipyは、コピー履歴をメニューバーやショートカットからすぐに呼び出せるmacOS用クリップボード管理アプリです。無料でダウンロードできます。',
    path: '/macclipy/',
    image: '/images/macclipy/macclipy-og-rich.png',
    imageAlt: 'MacClipyのコピー履歴パネルを表示したMacBook',
  },
  macclipyPrivacy: {
    title: 'MacClipy プライバシーポリシー | TechGuide',
    description:
      'MacClipyが取り扱うデータ、匿名の利用状況の送信内容、利用目的、停止方法、保存期間について説明します。',
    path: '/macclipy/privacy/',
  },
  safeqr: {
    title: 'SafeQR サポート | TechGuide',
    description:
      'QRのリンクを開く前に確認するiPhone・iPadアプリ、SafeQRの使い方とお問い合わせ窓口です。',
    path: '/safeqr/',
    image: '/images/safeqr/app-icon.png',
    imageAlt: 'SafeQRのアプリアイコン',
  },
  safeqrPrivacy: {
    title: 'SafeQR プライバシーポリシー | TechGuide',
    description:
      'SafeQRのカメラ・端末内履歴、任意のGoogle安全性照会、リンク先への通信とお問い合わせについて説明します。',
    path: '/safeqr/privacy/',
  },
};

export const navItems: NavItem[] = [
  { label: '支援内容', href: '/services/' },
  { label: 'プロダクト', href: '/#products' },
  { label: '実績', href: '/#works' },
  { label: '記事', href: '/articles/' },
  { label: 'お知らせ', href: '/news/' },
  { label: '会社情報', href: '/#company' },
  { label: '代表について', href: '/profile/' },
  { label: '採用', href: '/recruit/' },
  { label: 'お問い合わせ', href: '/contact/' },
];

const visionTitle = '力になれる喜びと、頼れる安心が、すべての人に。';

export const hero: HeroContent = {
  image: '/images/hero/hero.webp',
  imageAlt: '',
  imageWidth: 1316,
  imageHeight: 688,
  title: visionTitle.replaceAll('、', '、\n'),
  descriptionLines: [
    ['ITの活用から', 'システム開発・制作、', 'エンジニアの育成まで。'],
    ['相手の想いや状況を理解し、', '実際に役立つ形で応えます。'],
  ],
  actions: [
    { label: '支援内容を見る', href: '/services/', tone: 'warm' },
    {
      label: 'お問い合わせ',
      href: '/contact/',
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
  title: 'TechGuideが目指す世界と、大切にすること。',
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
  vision: {
    title: visionTitle,
    paragraphs: [
      '自分の得意や経験が、誰かの役に立つ。\n自分だけでは難しいときには、安心して頼れる人がいる。',
      '支える側と支えられる側を固定せず、人との関わりの中で、一人ひとりが自分の望む人生を歩んでいける世界を目指します。',
    ],
  },
  missionTitle: 'Mission',
  missionItems: [
    {
      title: '目の前の人に価値を提供し、その力を持つエンジニアを増やす。',
      description:
        '相手の想いや状況を理解し、実際に役立つ形で応える。自らその支援を実践するとともに、誰かの力になれるエンジニアを育てます。',
    },
    {
      title: '必要なときに、安心して頼れる人や支援に出会える機会を広げる。',
      description:
        '知識や経験の違いによって、困りごとを抱え込んだり、やりたいことを諦めたりしなくてよいように。相談できる入口と、必要な支援につながる関係を育てます。',
    },
  ],
  valuesTitle: 'Values',
  valuesIntro: '会社全体で、仕事や関係づくりの判断基準にする3つ。',
  values: [
    {
      title: '相手を知ることから始める。',
      description:
        '要望だけでなく、その背景にある想い、状況、大切にしていることを理解するよう努めます。',
    },
    {
      title: '本当に役立つことを選ぶ。',
      description:
        '自分が提供したいものより、相手に必要なものを優先する。ちょっとした調整や既存サービスで十分な場合はそう提案する場合も。',
    },
    {
      title: '無理なく続く関係を育てる。',
      description:
        'お互いの状況を大切にしながら、双方にとって無理なく続けられる進め方を一緒に探します。一度きりの成果にとどまらず、信頼や経験が積み重なる関係を育てます。',
    },
  ],
};

export const services: ServiceItem[] = [
  {
    title: 'ITの相談・業務改善',
    description:
      '「手作業を減らしたい」「どのツールを使えばいいか分からない」。今の仕事の進め方を伺い、無理なく取り入れられる方法を一緒に考えます。',
    href: '/services/#consulting',
    kind: 'consulting',
    image: '/images/services/consulting-visual.webp',
    imageAlt: 'ITの相談・業務改善',
  },
  {
    title: 'Webサイト制作・システム開発',
    description:
      'サービスを伝えるWebサイトや、仕事を使いやすくするシステムをつくります。今あるサイトやシステムの改善もご相談いただけます。',
    href: '/services/#development',
    kind: 'development',
    image: '/images/services/development-visual.webp',
    imageAlt: 'Webサイト制作・システム開発',
  },
  {
    title: 'AI活用・エンジニア育成',
    description:
      'AIを日々の仕事に取り入れるお手伝いや、エンジニアの育成を行います。技術を学ぶことに加え、相手の意図をくみ取り、提案する力も大切にしています。',
    href: '/services/#ai',
    kind: 'ai',
    image: '/images/services/ai-visual.webp',
    imageAlt: 'AI活用・エンジニア育成',
  },
];

export const productItems: ShowcaseItem[] = [
  {
    title: 'MacClipy',
    description: 'コピー履歴をすぐに呼び出せるmacOS用クリップボード管理アプリ',
    image: '/images/macclipy/product-hero.png',
    href: '/macclipy/',
    ctaLabel: '無料でダウンロード',
  },
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

export { workItems } from './works';

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
    'お問い合わせは営業日に順次確認しています。送信後は入力いただいたメールアドレスへ控えをお送りします。',
  formTitle: '相談内容を送信する',
  formDescription:
    'カテゴリを選ぶと必要な入力欄が切り替わります。採用・協業・パートナー応募の場合は、稼働条件や利用しているAIツールもあわせてお知らせください。',
};

export const profilePageContent: ProfilePageContent = {
  hero: {
    name: '高橋 雄太（ゆーちゃん）',
    role: 'TechGuide合同会社 代表・Webエンジニア',
    lead: '「新しいサービスを試したい」「日々の手作業を減らしたい」。そんな相談から、まず何を変えるとよいかを一緒に考えます。試作やツールの導入から、現場で使い始めて分かった課題の改善までお手伝いします。',
    experience: 'Web開発に14年以上携わり、2021年にTechGuideを設立しました。',
    image: '/images/about/ceo.webp',
    imageAlt: 'TechGuide合同会社 代表 高橋雄太',
  },
  background: {
    title: '経歴と人となり',
    careerItems: [
      {
        title: '公立はこだて未来大学 大学院修了',
      },
      {
        title: '会社員として4社に勤務（通算11年）',
        description:
          'Webサイト制作や業務システムの受託開発に携わり、企画・実装から公開後の運用・改善まで経験しました。',
      },
      {
        title: '2021年にTechGuide合同会社を設立',
        description:
          'Web制作やシステム開発に加え、新規事業の試作、AIを使った業務改善、イベント運営の支援にも取り組んでいます。',
      },
    ],
    personalGroups: [
      {
        title: '仕事以外で関心があること',
        items: [
          '習慣づくりや、日々の行動を振り返ること',
          '瞑想や対話を通じて、自分や相手への理解を深めること',
        ],
      },
      {
        title: '好きな作品・音楽',
        items: [
          '宇宙兄弟 / カウボーイビバップ / バガボンド / SAO',
          'Janne Da Arc / Simon & Garfunkel / シートベルツ / LiSA',
        ],
      },
      {
        title: '暮らしてきた場所',
        items: [
          '帯広・函館・札幌、北松戸、自由が丘、東神奈川、豊田など、いくつかの街で暮らしてきました。',
        ],
      },
      {
        title: '関わってきたコミュニティ',
        items: ['守成クラブ（ヒルノ品川）', 'キミキミフェス', 'リベシティ'],
      },
    ],
  },
  valuesTitle: 'こんな相談から始められます',
  values: [
    {
      title: 'アイデアを試したい',
      description:
        '本開発の前に、使う人に触ってもらえる試作品を作り、必要な機能や使い方を確かめます。',
      cta: { label: '試作開発サービスを見る', href: 'https://ready-mock.com/' },
    },
    {
      title: '手作業を減らしたい',
      description:
        '二重入力や集計など、手間のかかる作業から見直し、今あるツールやAIで省ける工程を探します。',
      cta: { label: 'IT・業務改善の支援を見る', href: '/services/' },
    },
    {
      title: 'イベントを運営しやすくしたい',
      description:
        'チケット販売や受付、当日の会場案内を整え、参加者と運営側が迷わず動けるようにします。',
      cta: { label: 'TicketCraftの事例を見る', href: 'https://ticketcraft.jp/#event-showcase' },
    },
  ],
  pastEvents: [
    {
      dateIso: '2026-06-04',
      title: '北原孝彦Academy Fes 2026',
      description: 'アプリ開発・ブース出展・セミナー登壇で参加しました。',
      href: '/profile/academy-fes-2026/',
    },
    {
      dateIso: '2026-05-31',
      title: 'キミキミフェス〜チャレンジ〜',
      description: '一人ひとりのチャレンジを応援するフェスです。',
    },
    {
      dateIso: '2026-05-13',
      title: 'エンジニア人生相談会',
      description: 'エンジニアとしての働き方やキャリアの悩みを話せる相談会です。',
    },
    {
      dateIso: '2026-04-22',
      title: 'エンジニア人生相談会',
      description: 'エンジニアとしての働き方やキャリアの悩みを話せる相談会です。',
    },
  ],
  portfolioTitle: '制作・開発事例',
  portfolioItems: [
    {
      title: '北原孝彦Academy Fes 2026',
      description:
        '100ブース・100セミナーの中から行きたい場所を探せる、来場者向けアプリを開発しました。',
      image: '/images/showcase/academy-fes-2026-hero.webp',
      href: '/news/academy-fes-2026/',
      ctaLabel: '開発・出展レポートを見る',
    },
    {
      title: '守成クラブ 品川グループ',
      description:
        '2会場の例会案内と会員情報を一つの公式サイトにまとめ、参加申込みや会員向けの更新機能も整えました。',
      image: '/images/showcase/shusei-shinagawa-hero.webp',
      href: 'https://www.shusei-tokyoshinagawa.com/',
      ctaLabel: 'サイトを見る',
    },
    {
      title: 'MacClipy',
      description: 'コピーしたテキストを後から検索して使い直せる、macOS向けの自社アプリです。',
      image: '/images/macclipy/macclipy-web-hero-rich.webp',
      href: '/macclipy/',
      ctaLabel: 'アプリを見る',
    },
    {
      title: 'AROMINE｜講座紹介・申込みサイト',
      description: '講座の内容、講師一覧、制作・講師クラスへの申込みを一つのサイトにまとめました。',
      image: '/images/showcase/profile-aromine.webp',
      href: 'https://aromine.vercel.app/',
      ctaLabel: 'サイトを見る',
    },
    {
      title: 'LPBoost｜LP制作・運用支援',
      description: 'サービスの紹介ページを制作し、公開後の運用や改善も支援します。',
      image: '/images/showcase/profile-lpboost.webp',
      href: 'https://lpboost-prod.lpboost.workers.dev/',
      ctaLabel: 'サービスを見る',
    },
    {
      title: 'コミュニティ管理サービス',
      description: '支部やメンバーが多い組織に向けて、管理と利便性の課題解決を目指すサービスです。',
      image:
        'https://portfolio-site-sage-seven.vercel.app/thumbnails/biz-match-manager-seven-vercel-app.webp',
      href: 'https://biz-match-manager-seven.vercel.app/',
      ctaLabel: 'サービスを見る',
    },
    {
      title: '自家製テトリス',
      description: 'ブラウザ上で遊べる自作ゲーム。遊び心のある試作開発の一例として公開しています。',
      image: 'https://portfolio-site-sage-seven.vercel.app/thumbnails/my-tetris-mu-vercel-app.webp',
      href: 'https://my-tetris-mu.vercel.app/',
      ctaLabel: '遊んでみる',
    },
  ],
  contactItems: [
    {
      platformLabel: 'X',
      platformImage: '/images/social/x.svg',
      title: 'エンジニア向け発信',
      description: 'エンジニアの働き方やキャリアについて発信しています。',
      href: 'https://x.com/tashua314',
    },
    {
      platformLabel: 'Instagram',
      platformImage: '/images/social/instagram.svg',
      title: '起業家向け発信',
      description: '日々の仕事にITやAIを取り入れるヒントを発信しています。',
      href: instagramProfileUrl,
    },
    {
      title: '起業家向けサポート用LINE',
      platformLabel: 'LINE',
      description: '登録後に「イベントお誘い」と送ると、イベントお誘いツールをお渡しします。',
      href: 'https://lin.ee/76ZzaJl',
    },
  ],
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'consulting',
    title: 'ITの相談・業務改善',
    summary:
      '手作業を減らしたい、仕事をもっと進めやすくしたい。今の仕事の進め方や困っていることを伺い、どこから変えるとよいかを一緒に考えます。新しいツールを入れる前の段階からご相談いただけます。',
    issues: [
      '手作業や二重入力が多く、何から見直せばよいか分からない',
      '自分たちの仕事に合うツールを選びたい',
      '新しいツールを入れても、現場で使い続けられるか不安',
    ],
    offerings: [
      '今の仕事の流れを伺い、時間や手間がかかっているところを整理します',
      '今あるツールの工夫や既存サービスの活用も含め、改善方法を考えます',
      '費用や手間を踏まえて優先順位を決め、無理なく続けられる進め方を提案します',
    ],
    process: ['今の仕事を伺う', '取り組む順番を決める', '進め方を一緒に考える'],
    visual: {
      image: '/images/services/consulting-visual.webp',
      alt: '仕事の流れや困りごとを整理するイメージ',
      eyebrow: '相談・整理',
      title: 'まずは、今の困りごとから',
      description:
        'うまく説明できなくても大丈夫です。状況を伺いながら、今の体制でできることを一緒に探します。',
    },
  },
  {
    id: 'development',
    title: 'Webサイト制作・システム開発',
    summary:
      'サービスの魅力を伝えるWebサイトや、毎日の仕事を使いやすくするシステムをつくります。何をつくるかを考える段階から、公開後の見直しまでご相談いただけます。今あるサイトやシステムの改善にも対応します。',
    issues: [
      'サービスの魅力を伝え、申し込みやお問い合わせにつなげたい',
      '手作業で行っている仕事を、使いやすいシステムにしたい',
      '今あるサイトやシステムを、使いながら改善していきたい',
    ],
    offerings: [
      '誰に何を伝えたいか、どんな仕事を便利にしたいかを一緒に整理します',
      'Webサイトや申し込みフォーム、業務に必要なシステムを制作・開発します',
      '公開後の使われ方や利用者の声をもとに、使いやすさを見直します',
    ],
    process: ['つくる目的を整理する', '制作・開発する', '使いながら改善する'],
    visual: {
      image: '/images/services/development-visual.webp',
      alt: 'Webサイトやシステムをつくり、使いやすく整えるイメージ',
      eyebrow: '制作・開発',
      title: '伝わること、使いやすいことを大切に',
      description:
        '見る人・使う人を思い浮かべながら、載せる情報や必要な機能を考えます。公開後も、実際の使われ方に合わせて改善します。',
      href: 'https://lpboost-prod.lpboost.workers.dev/',
      ctaLabel: 'LP Boost を見る',
    },
    relatedItems: [
      {
        title: 'LP Boost',
        description:
          'サービス紹介ページ（LP）の制作や、申し込み・お問い合わせにつながりやすくするための改善',
        image: '/images/showcase/lpboost-hero.webp',
        href: 'https://lpboost-prod.lpboost.workers.dev/',
        ctaLabel: 'サービスを見る',
      },
      {
        title: 'Ready Mock',
        description: '3分の診断から、事業に合った試作品のアイデアを整理するサービス',
        image: '/images/showcase/ready-mock-hero.webp',
        href: 'https://ready-mock.com/',
        ctaLabel: 'サービスを見る',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI活用・エンジニア育成',
    summary:
      'AIを日々の仕事に取り入れるお手伝いや、エンジニアの育成を行います。技術を学ぶことに加え、仕事の目的や相手の意図を理解し、相談・提案できる力を育てます。チーム内での認識のすり合わせもお手伝いします。',
    issues: [
      'AIに興味はあるが、どの仕事に使えるか分からない',
      'エンジニアと仕事を依頼する側で、目的や優先順位の認識がずれる',
      'エンジニアが相手の意図をくみ取り、自分から提案できるようになってほしい',
    ],
    offerings: [
      'AIを使えそうな仕事を一緒に探し、小さく試して役立つかを確かめます',
      '実際の仕事での悩みや疑問を題材に、技術と、目的に合った考え方を学ぶ機会をつくります',
      'エンジニアと仕事を依頼する側が、目的や進め方を話し合えるようお手伝いします',
    ],
    process: [
      '仕事やチームの悩みを伺う',
      '試すこと・学ぶことを決める',
      '仕事に取り入れながら振り返る',
    ],
    visual: {
      image: '/images/services/ai-visual.webp',
      alt: 'AIの使い方や技術を学び、チームで話し合うイメージ',
      eyebrow: '活用・育成',
      title: '学んだことを、日々の仕事で使える力に',
      description:
        'AIも技術も、仕事の中で役立てることを大切にしています。試すことや対話を重ねながら、できることを増やしていきます。',
    },
    relatedItems: [
      {
        title: 'ValueGate Blog',
        description: '技術を仕事に役立てる考え方や、相談・提案のヒントを紹介するブログ',
        image: '/images/showcase/valuegate-blog-hero.webp',
        href: 'https://blog.valuegate.tech/',
        ctaLabel: 'ブログを見る',
      },
    ],
  },
];
