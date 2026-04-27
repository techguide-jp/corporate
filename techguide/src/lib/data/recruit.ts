import type { InternalHref } from '$lib/utils/paths';

interface RecruitCardItem {
  title: string;
  description: string;
  points?: string[];
}

export interface RecruitContent {
  hero: {
    title: string;
    lead: string;
    description: string;
    badges: string[];
    ctaLabel: string;
    ctaHref: InternalHref;
  };
  background: {
    title: string;
    items: string[];
  };
  opportunities: {
    title: string;
    items: RecruitCardItem[];
  };
  cases: {
    title: string;
    subtitle: string;
    items: RecruitCardItem[];
  };
  work: {
    title: string;
    items: string[];
  };
  stack: {
    title: string;
    frontend: string[];
    platform: string[];
  };
  workStyle: {
    title: string;
    items: string[];
  };
  expectations: {
    title: string;
    subtitle: string;
    items: RecruitCardItem[];
  };
  conditions: {
    title: string;
    items: RecruitCardItem[];
  };
  fit: {
    title: string;
    good: string[];
    notGood: string[];
  };
  benefits: {
    title: string;
    items: string[];
  };
  flow: {
    title: string;
    steps: string[];
  };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    href: InternalHref;
  };
}

export const recruitContent: RecruitContent = {
  hero: {
    title: '一緒に、ITを“使える形”で届ける仲間を募集しています。',
    lead: 'Webエンジニア（業務委託・副業）募集',
    description:
      'TechGuideは、IT導入・Web制作・AI活用を通じて「やりたい」を現実にする支援をしています。ただ作るだけでなく、使われるところまで整える開発に興味がある方を歓迎します。',
    badges: ['週5時間〜', '業務委託 / 副業', 'フルリモート', 'AI前提の開発'],
    ctaLabel: 'フォームから相談する',
    ctaHref: '/contact?category=recruit',
  },
  background: {
    title: '募集背景',
    items: [
      '案件・プロダクト・イベント関連開発の増加に伴い、開発体制を強化しています。',
      'LP制作、Webアプリ開発、AI活用支援など、幅広いニーズに対応するための募集です。',
    ],
  },
  opportunities: {
    title: '関われる領域',
    items: [
      {
        title: 'LP制作・改善',
        description: '事業の目的や問い合わせ導線を踏まえ、伝わる構成と実装を一緒に整えます。',
      },
      {
        title: 'Webプロダクト開発',
        description:
          'SaaS、PoC、業務アプリなど、試作から改善まで小さく速く進める開発に関われます。',
      },
      {
        title: 'AI活用・業務改善',
        description: 'AIツールや自動化を使い、現場の作業を軽くする仕組みづくりを支援します。',
      },
      {
        title: 'イベント・コミュニティ関連',
        description: '申込、受付、決済、参加者管理など、イベント運営に近いシステムも扱います。',
      },
    ],
  },
  cases: {
    title: '関われる案件例',
    subtitle: '単発の実装だけでなく、目的整理から改善まで一緒に考える案件が中心です。',
    items: [
      {
        title: '問い合わせにつながるLP改善',
        description:
          '既存LPの訴求、フォーム導線、スマホ表示を見直し、成果につながる形へ改善します。',
        points: ['構成整理', 'UI実装', '計測と改善'],
      },
      {
        title: 'SvelteKitベースの業務アプリ',
        description: '小規模なSaaSや社内向けツールを、要件整理から画面実装まで進めます。',
        points: ['画面設計', '型安全な実装', '運用しやすい構成'],
      },
      {
        title: 'AIを使った業務改善PoC',
        description: '手作業の整理、入力補助、ナレッジ化など、AI活用を現場で使える形にします。',
        points: ['課題整理', 'プロトタイプ', '導入支援'],
      },
      {
        title: 'イベント運営の受付・管理導線',
        description:
          '申込から受付、参加者管理まで、イベント当日の運用を軽くする仕組みに関われます。',
        points: ['申込導線', '受付UX', '運営改善'],
      },
    ],
  },
  work: {
    title: '業務内容',
    items: [
      'GitHub Issueを起点にした調査・実装・検証',
      'SvelteKit / TypeScriptベースのWebサイト・LP・業務画面開発',
      'コンポーネント設計、UI実装、データ構造の設計',
      '既存サイトやプロダクトの導線・UX改善',
      '任せられる範囲に応じたクライアントヒアリング・要件整理',
      'プロダクト企画、サービスのデータ集計、グロース計画立案',
      'AIツールを活用した開発プロセスの改善',
    ],
  },
  stack: {
    title: '技術スタック',
    frontend: ['SvelteKit', 'TypeScript', 'Vite'],
    platform: ['Vercel', 'Cloudflare', 'GCP', 'Neon（PostgreSQL）'],
  },
  workStyle: {
    title: '使用前提ツール・稼働条件',
    items: [
      'ChatGPT / Codex / Claude などのAIツールを日常的に利用していること',
      'CursorなどAIエディタの活用に抵抗がないこと',
      '必要なAI開発環境を自分で整え、日常的に活用できること',
      '業務委託 / 副業（週5時間〜、フルリモート、稼働時間は柔軟）',
    ],
  },
  expectations: {
    title: '求めるスキル・期待値',
    subtitle: '完璧な経歴よりも、目的を理解して小さく形にする姿勢を重視します。',
    items: [
      {
        title: '事業目的から逆算できる',
        description:
          '言われたものを作るだけでなく、誰のどんな行動を変えたいのかを考えられる方を歓迎します。',
      },
      {
        title: 'SvelteKit / TypeScriptを扱える',
        description:
          '既存コードを読み、型やコンポーネント設計を崩さずに改善できることを期待します。',
      },
      {
        title: 'AIを開発プロセスに組み込める',
        description:
          '調査、実装、レビュー、検証にAIを使い、速度と品質の両方を上げられる方に合います。',
      },
      {
        title: '非同期で進捗を共有できる',
        description: '短い稼働時間でも、判断材料や相談事項を整理して共有できることを大切にします。',
      },
    ],
  },
  conditions: {
    title: '関わり方・契約条件',
    items: [
      {
        title: '契約形態',
        description: '業務委託・副業での関わりを想定しています。正社員採用ではありません。',
      },
      {
        title: '稼働時間',
        description: '週5時間程度から相談可能です。稼働時間帯は本業や生活に合わせて調整できます。',
      },
      {
        title: '働く場所',
        description: 'フルリモートを前提に、必要に応じてオンラインでの打ち合わせを行います。',
      },
      {
        title: '報酬・進め方',
        description:
          'スキル、担当範囲、稼働量に応じて個別に相談します。まずは小さなタスクから相性を確認します。',
      },
    ],
  },
  fit: {
    title: '向いている人 / 向いていない人',
    good: [
      '実装だけでなく、設計や改善提案まで関わりたい方',
      '小さく早く試しながら、価値検証を進めるのが好きな方',
      'AIツールを活用して学習と実装を高速に回せる方',
    ],
    notGood: [
      '仕様どおりの実装のみを担当したい方',
      '非同期コミュニケーションや変化の多い環境が苦手な方',
    ],
  },
  benefits: {
    title: 'このポジションの特徴',
    items: [
      '少ない稼働でもプロダクトや案件に関われる',
      'AI前提の開発環境で実践的にスキルを伸ばせる',
      '設計から改善まで、一気通貫で関われる',
      'LP・SaaS・イベントなど幅広い領域を経験できる',
    ],
  },
  flow: {
    title: '選考フロー',
    steps: ['フォーム送信', 'カジュアル面談', '小さなタスク・案件でのトライアル', '継続判断'],
  },
  cta: {
    title: 'まずは気軽にご相談ください',
    description:
      '経歴や現在の働き方、週あたりの稼働可能時間、利用しているAIツールなどを添えてお送りください。',
    buttonLabel: 'フォームから相談する',
    href: '/contact?category=recruit',
  },
};
