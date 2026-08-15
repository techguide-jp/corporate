import type { NewsItem } from './types';

const shuseiContactSearch = new URLSearchParams({
  category: 'shusei',
  subject: '守成クラブについての問い合わせ',
  message: '守成クラブについて、次の内容を相談したいです。\n\n',
}).toString();

export const newsItems: readonly NewsItem[] = [
  {
    slug: 'shusei-shinagawa-website',
    title: '守成クラブ 品川グループ公式サイトを制作しました',
    description:
      '東京品川会場とヒルノ品川会場の情報をまとめ、例会案内、会員紹介、参加導線を整えた公式サイトを制作しました。',
    category: 'work',
    status: 'published',
    publishedAt: '2026-01-22',
    lead: '2つの会場に分かれていた情報を一つにまとめ、会員にも初めて参加する方にも使いやすい公式サイトを目指しました。',
    image: {
      src: '/images/showcase/shusei-shinagawa-hero.webp',
      alt: '守成クラブ 品川グループ公式サイトのトップページ',
    },
    sections: [
      {
        title: '2つの会場を一つのサイトへ',
        paragraphs: [
          '守成クラブ 品川グループは、東京品川会場とヒルノ品川会場の2会場で活動しています。今回の制作では、それぞれに分かれていた情報を整理し、次回例会、年間予定、会場案内、会員紹介などへ迷わず進める構成にまとめました。',
          'ゲスト、他会場の会員、自会場の会員で必要な案内が異なるため、立場に合わせて参加方法を確認できる導線も整えています。',
        ],
      },
      {
        title: '活動に近い立場から、使いやすさを考える',
        paragraphs: [
          'TechGuide代表の高橋雄太も、ヒルノ品川会場で活動しています。会員やゲストが実際に必要とする情報に触れながら、例会への参加や会員同士のつながりにつながる使いやすさを考えました。',
          'サイトを作って終わりにせず、例会や会員情報を継続して更新しやすい管理機能も含めて整備しています。',
        ],
      },
      {
        title: '守成クラブについてのご相談',
        paragraphs: [
          '守成クラブやヒルノ品川会場、品川グループ公式サイトについて聞いてみたいことがある方は、専用のお問い合わせ種別からご連絡いただけます。内容に応じて確認のうえご案内します。',
        ],
      },
    ],
    links: [
      {
        label: '守成クラブについて問い合わせる',
        href: `/contact/?${shuseiContactSearch}`,
        tone: 'warm',
      },
      {
        label: '品川グループ公式サイトを見る',
        href: 'https://www.shusei-tokyoshinagawa.com/',
        tone: 'light',
      },
    ],
  },
  {
    slug: 'macclipy-release',
    title: 'macOS用クリップボード履歴アプリ「MacClipy」をリリースしました',
    description:
      'コピーしたテキストを、メニューバーやショートカットからすぐに呼び出せる無料のmacOSアプリをリリースしました。',
    category: 'product',
    status: 'published',
    publishedAt: '2026-06-04',
    lead: '日々のコピーと貼り付けを少し軽くする、無料のmacOS用クリップボード履歴アプリです。',
    image: {
      src: '/images/macclipy/macclipy-web-hero-rich.webp',
      alt: 'MacClipyのコピー履歴パネルを表示したMacBook',
    },
    sections: [
      {
        title: 'コピー履歴を、必要なときにすぐ呼び出す',
        paragraphs: [
          'MacClipyは、過去にコピーしたテキストを保存し、メニューバーやショートカットからすぐに検索・再利用できるアプリです。よく使う文章はお気に入りとして整理できます。',
          'クリップボードの内容はMacの中に保存されます。アプリは無料でダウンロードして利用できます。',
        ],
      },
    ],
    links: [{ label: 'MacClipyを見る', href: '/macclipy/', tone: 'warm' }],
  },
  {
    slug: 'academy-fes-2026',
    title: '北原孝彦Academy Fes 2026に参加しました',
    description:
      '来場者向けアプリの開発、AIロボ体験ブースの出展、仕組み化と外注化をテーマにしたセミナー登壇を行いました。',
    category: 'event',
    status: 'published',
    publishedAt: '2026-06-04',
    lead: 'アプリ開発、ブース出展、セミナー登壇の3つの形で、Academy Fes 2026に参加しました。',
    image: {
      src: '/images/profile/academy-fes-2026/academy-group-standing.webp',
      alt: '北原孝彦アカデミーの集合記念写真',
    },
    sections: [
      {
        title: '会場での体験と運営を支える',
        paragraphs: [
          '100ブース・100セミナーが集まる会場で、参加者がブースやセミナーを探し、当日を回りやすくする来場者向けアプリを開発しました。',
          '当日はAIロボとの会話を体験できるブースを出展し、「まだ自分で回せる」が一番危ないをテーマに、小さな仕組み化と外注化についてセミナーでお話ししました。',
        ],
      },
    ],
    links: [
      {
        label: '参加内容を見る',
        href: '/profile/academy-fes-2026/',
        tone: 'warm',
      },
    ],
  },
  {
    slug: 'recruit-partner-start',
    title: 'Webエンジニアの採用・パートナー募集を開始しました',
    description:
      '設計から開発、公開後の改善まで一緒に取り組む、業務委託・副業の開発パートナーを募集しています。',
    category: 'recruit',
    status: 'published',
    publishedAt: '2026-04-27',
    lead: '事業の背景を理解し、設計から改善まで一緒に進める開発パートナーを募集しています。',
    image: {
      src: '/images/services/development-visual.webp',
      alt: 'Webサイト・システム開発のイメージ',
    },
    sections: [
      {
        title: '技術と事業の間を一緒につなぐ',
        paragraphs: [
          'TechGuideでは、Webサイトや業務システム、イベント運営プロダクトなどの設計・開発・改善に関わるWebエンジニアを募集しています。',
          '週5時間程度から、フルリモートを基本に参加できます。担当範囲や応募条件は募集ページでご確認ください。',
        ],
      },
    ],
    links: [{ label: '募集内容を見る', href: '/recruit/', tone: 'warm' }],
  },
  {
    slug: 'ready-mock-release',
    title: '試作開発サービス「Ready-mock」をリリースしました',
    description:
      '新規サービスや業務改善のアイデアを、本開発前に小さく試せる形へ落とし込む試作開発サービスを公開しました。',
    category: 'service',
    status: 'published',
    publishedAt: '2025-06-28',
    lead: 'いきなり本開発へ進む前に、アイデアや業務改善の方向性を小さな試作で確かめられるサービスです。',
    image: {
      src: '/images/showcase/ready-mock-hero.webp',
      alt: 'Ready-mockのサービス紹介ページ',
    },
    sections: [
      {
        title: '本開発の前に、小さく試す',
        paragraphs: [
          'Ready-mockは、新規サービスや業務改善のアイデアを、確認したいことが分かる小さな試作へ落とし込むサービスです。',
          '無料チェックや初回相談を通じて、既存サービスで足りるのか、試作で何を確かめるのか、本開発ではどこまで必要なのかを整理します。',
        ],
      },
    ],
    links: [
      {
        label: 'Ready-mockを見る',
        href: 'https://www.ready-mock.com/',
        tone: 'warm',
      },
    ],
  },
  {
    slug: 'company-founded',
    title: 'TechGuide合同会社を設立しました',
    description:
      'ITをもっと身近なものにし、事業と現場をつなぎながら、実行できる形まで支援する会社として設立しました。',
    category: 'company',
    status: 'published',
    publishedAt: '2021-04-12',
    lead: '技術だけでなく、その先にいる人や事業に向き合う会社として、TechGuide合同会社を設立しました。',
    image: {
      src: '/images/about/ceo.webp',
      alt: 'TechGuide合同会社 代表 高橋雄太',
      position: 'center 32%',
    },
    sections: [
      {
        title: 'ITを、もっと身近に',
        paragraphs: [
          'TechGuide合同会社は、2021年4月12日に設立しました。ITを分かる人だけのものにせず、事業や現場で無理なく使える状態まで整えることを大切にしています。',
          '課題整理から制作、導入、公開後の改善まで、相手の状況に合わせて一緒に進めていきます。',
        ],
      },
    ],
    links: [{ label: 'TechGuideについて見る', href: '/#about', tone: 'warm' }],
  },
];
