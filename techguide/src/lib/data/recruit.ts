export interface RecruitContent {
  hero: {
    title: string;
    lead: string;
    description: string;
  };
  background: {
    title: string;
    items: string[];
  };
  opportunities: {
    title: string;
    items: string[];
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
    href: string;
  };
}

export const recruitContent: RecruitContent = {
  hero: {
    title: '一緒に、ITを“使える形”で届ける仲間を募集しています。',
    lead: 'Webエンジニア（業務委託・副業）募集',
    description:
      'TechGuideは、IT導入・Web制作・AI活用を通じて「やりたい」を現実にする支援をしています。ただ作るだけでなく、使われるところまで整える開発に興味がある方を歓迎します。',
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
      'LP制作・改善（マーケ × 開発）',
      'Webプロダクト開発（SaaS / PoC）',
      'AIを使った業務改善支援',
      'イベント・コミュニティ関連のシステム',
    ],
  },
  work: {
    title: '業務内容',
    items: [
      'Webサイト / LPの設計・実装',
      'SvelteKitベースの開発',
      'コンポーネント設計・UI実装',
      'データ構造の設計',
      '既存サイトの改善（導線・UX）',
      'AIツールを活用した開発',
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
      'AIツールの有料プラン利用を前提とした開発スタイルです',
      '業務委託 / 副業（週5時間〜、フルリモート、稼働時間は柔軟）',
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
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScM5ySJZ8V8uUI86CY8kMv6OTlixm5PBcKQ_60rY8V1sM4wFQ/viewform',
  },
};
