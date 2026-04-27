export interface RecruitCardItem {
  title: string;
  description: string;
}

export interface RecruitContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
  };
  background: {
    title: string;
    paragraphs: string[];
  };
  opportunities: RecruitCardItem[];
  workItems: string[];
  stack: {
    frontend: string[];
    infrastructure: string[];
    aiTools: string[];
  };
  workStyle: RecruitCardItem[];
  requirements: {
    required: string[];
    welcome: string[];
  };
  fit: {
    good: string[];
    mismatch: string[];
  };
  benefits: RecruitCardItem[];
  flow: RecruitCardItem[];
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
  };
}

export const recruitContent: RecruitContent = {
  hero: {
    eyebrow: 'Recruit / Partner',
    title: '一緒に、ITを“使える形”で届ける仲間を募集しています。',
    lead:
      'TechGuideは、IT導入・Web制作・AI活用を通じて、中小企業や個人事業主の「やりたい」を現実にする会社です。',
    note: 'ただ作るのではなく、使われるところまで整える。そんな開発に興味がある方へ。',
  },
  background: {
    title: '募集背景',
    paragraphs: [
      '案件・プロダクト・イベントの増加に伴い、開発領域に一緒に関われるメンバーを募集しています。',
      'LP制作・改善、Webアプリ開発、AI活用支援など、幅広い領域で開発ニーズが増えています。',
      '現時点では正社員採用ではなく、業務委託・副業として小さく関わり始められるパートナー募集です。',
    ],
  },
  opportunities: [
    {
      title: 'LP制作・改善',
      description: 'マーケティング視点と実装力を組み合わせ、問い合わせや申込につながる導線を整えます。',
    },
    {
      title: 'Webプロダクト開発',
      description: 'SaaS、PoC、業務支援ツールなど、事業判断や運用改善につながるWebアプリを形にします。',
    },
    {
      title: 'AI活用支援',
      description: 'ChatGPT、Codex、Claude、Cursorなどを前提に、開発や業務改善のスピードを高めます。',
    },
    {
      title: 'イベント関連システム',
      description: 'イベント、コミュニティ、チケット販売、参加者体験を支える仕組みづくりに関われます。',
    },
  ],
  workItems: [
    'Webサイト / LP の設計・実装',
    'SvelteKitベースの開発（本サイトと同様の構成）',
    'コンポーネント設計・UI実装',
    'データ構造の設計',
    '既存サイトの改善（導線・UX）',
    'AIツールを活用した開発効率化',
  ],
  stack: {
    frontend: ['SvelteKit', 'TypeScript', 'Vite'],
    infrastructure: ['Vercel', 'Cloudflare', 'GCP', 'Neon（PostgreSQL）'],
    aiTools: ['ChatGPT', 'Codex', 'Claude', 'Cursor などのAIエディタ'],
  },
  workStyle: [
    {
      title: '業務委託 / 副業',
      description: '正社員採用ではなく、プロジェクト単位・業務委託として関われる形を想定しています。',
    },
    {
      title: '週5時間〜OK',
      description: '小さく関わり始め、相性を見ながら関わり方を広げられます。',
    },
    {
      title: 'フルリモート',
      description: '稼働時間帯は柔軟に調整します。必要に応じてオンラインで認識合わせを行います。',
    },
  ],
  requirements: {
    required: [
      'Web開発の実務経験、または同等のスキル',
      'Svelte / React / Vue などのフレームワークを用いた開発経験',
      '自走して開発を進められること',
      'AIツールを日常的に活用していること',
      'AIツールの有料プランに加入していること',
    ],
    welcome: [
      'SvelteKitの開発経験',
      'LPやマーケティング視点の実装経験',
      'Vercel / Cloudflare / GCP などインフラの基本理解',
      'サーバーレス / エッジ環境の理解',
      'デザイン〜実装まで一貫して対応できること',
      'イベントやコミュニティへの関心',
    ],
  },
  fit: {
    good: [
      '技術だけでなく、相手の状況を考えられる',
      '指示待ちではなく、提案しながら進められる',
      '小さく作って改善するのが好き',
      'AI前提の開発スタイルに抵抗がない',
      '変化のある環境を楽しめる',
    ],
    mismatch: [
      '指示された実装だけをしたい',
      '人とのやり取りをできるだけ避けたい',
      '正解が決まっていない状況が苦手',
      '変化のある小規模事業のスピード感が苦手',
    ],
  },
  benefits: [
    {
      title: '少ない稼働でもプロダクトに関われる',
      description: '週5時間程度から、LP・プロダクト・イベント関連システムに関われます。',
    },
    {
      title: 'AI前提の開発環境',
      description: 'AIツールを前提に、設計・実装・レビュー・改善のスピードを高める働き方を目指します。',
    },
    {
      title: '設計から関われる',
      description: 'ただ実装するだけでなく、どう作ると成果につながるかまで一緒に考えます。',
    },
    {
      title: '幅広い領域に関われる',
      description: 'LP、Webアプリ、AI活用、イベント支援など、複数領域の経験を積めます。',
    },
  ],
  flow: [
    {
      title: '1. フォーム送信',
      description: '興味のある領域、経験、稼働可能時間、使用しているAIツールなどを教えてください。',
    },
    {
      title: '2. カジュアル面談',
      description: '30分程度で、これまでの経験や関わり方の希望をすり合わせます。',
    },
    {
      title: '3. 小さなタスクでトライアル',
      description: 'いきなり大きな案件ではなく、小さなタスクや案件で相性を確認します。',
    },
    {
      title: '4. 継続判断',
      description: '双方にとって良い形で続けられそうかを確認し、継続的な関わり方を決めます。',
    },
  ],
  cta: {
    title: 'まずはカジュアルにお話ししませんか？',
    description: '「少し気になる」くらいでも大丈夫です。フォームからお気軽にご連絡ください。',
    buttonLabel: 'フォームから相談する',
  },
};
