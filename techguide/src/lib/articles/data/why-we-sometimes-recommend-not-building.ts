import type { Article } from '../types';

export const whyWeSometimesRecommendNotBuildingArticle: Article = {
  slug: 'why-we-sometimes-recommend-not-building',
  title: '「作らない提案」もする理由',
  description:
    '相談したら、高いシステムを勧められそう。そんな不安に答えながら、今あるツールでできること、新しく作った方がよい場合を紹介します。',
  category: 'techguide-approach',
  tags: ['IT相談', '業務改善', 'システム開発'],
  status: 'published',
  publishedAt: '2026-09-13',
  readingTimeMinutes: 5,
  thumbnail: {
    src: '/images/articles/why-we-sometimes-recommend-not-building-stop.webp',
    alt: '閉じたノートPCの前で、両腕を交差させてストップの意思を示す人物',
    layout: 'standalone',
  },
  lead: '「相談したら、高いシステムを勧められるのでは？」そんな心配はありませんか。TechGuideでは、今使っているツールや仕事の進め方を変えるだけで解決できるなら、新しいシステムを作らない提案もします。',
  blocks: [
    {
      type: 'paragraph',
      text: '同じ内容を何度も入力する。確認のたびに担当者へ連絡する。申込状況をまとめるだけで時間がかかる。こうした困りごとは、今のやり方を少し変えるだけで楽になることがあります。',
    },
    {
      type: 'paragraph',
      text: [
        { type: 'strong', text: '大切なのは、困りごとが減り、無理なく使い続けられることです。' },
        '今あるツールを使う、作業の順番を変える、一部だけ自動化する。新しく作る前に、こうした方法も一緒に考えます。',
      ],
    },
    {
      type: 'heading',
      id: 'work-after-building',
      text: '作った後にも、お金と手間がかかる',
    },
    {
      type: 'paragraph',
      text: 'システムは、作って終わりではありません。内容を書き換える、使う人が増えたら登録する、問題が起きたら直す。使い続けるための仕事があります。',
    },
    {
      type: 'paragraph',
      text: [
        { type: 'strong', text: '作る費用だけでなく、その後のお金と手間も考えます。' },
        '月に数回の作業を楽にするために、毎日の確認が増えたら、かえって大変になるからです。',
      ],
    },
    {
      type: 'paragraph',
      text: '担当者が変わっても使えるか、困ったときに誰へ相談できるかも確かめます。一人だけが詳しくて、その人に頼りきりになることも避けたいと考えています。',
    },
    {
      type: 'heading',
      id: 'improve-existing-workflows',
      text: 'まずは、今のやり方を見直す',
    },
    {
      type: 'paragraph',
      text: [
        { type: 'strong', text: '今あるもので解決できるなら、それを活かします。' },
        '誰が入力して、誰が確認し、その後どうするのか。仕事の流れをたどりながら、変えられるところを探します。',
      ],
    },
    {
      type: 'list',
      items: [
        '情報の置き場所を決めて、探す時間や同じ内容の入力を減らす',
        '確認する人とタイミングを決めて、連絡待ちを減らす',
        '今使っているツールの設定を変えて、必要な作業ができるようにする',
        '毎回同じ入力や連絡をする部分だけ、自動でできるようにする',
      ],
    },
    {
      type: 'paragraph',
      text: 'ツールの利用料や、担当者が新しく覚えることも確認します。便利にするための変更が、別の負担にならないようにするためです。',
    },
    {
      type: 'heading',
      id: 'application-management-example',
      text: '例えば、申込内容を何度も入力しているなら',
    },
    {
      type: 'paragraph',
      text: 'ここからは、架空の例です。申込フォームに届いた内容を管理表に写し、別の人がメールと見比べているとします。',
    },
    {
      type: 'paragraph',
      text: 'まず試せるのは、申込内容を1か所にまとめ、誰が確認したかを記録することです。今のフォームから管理表へ、自動で内容を写せるかも調べます。',
    },
    {
      type: 'paragraph',
      text: '一部の申込で試して、入力の手間や確認漏れが減るかを担当者と確かめます。キャンセルや内容の変更があったときも、困らずに対応できるかを見ます。',
    },
    {
      type: 'paragraph',
      text: [
        {
          type: 'strong',
          text: '今の仕組みで困りごとが減るなら、大きく作り直す必要はありません。',
        },
        'まずは、そのやり方で続けられるかを確かめていきます。',
      ],
    },
    {
      type: 'heading',
      id: 'when-custom-development-helps',
      text: '新しく作った方がよいのは、どんなとき？',
    },
    {
      type: 'paragraph',
      text: '今のやり方を見直しても、解決できないことはあります。例えば、次のような場合です。',
    },
    {
      type: 'list',
      items: [
        '必要な作業がツールではできず、毎回手作業で補っている',
        'いくつものツールを行き来して、確認や修正に時間がかかる',
        '担当者によって見せる情報を分けるなど、必要な管理ができない',
      ],
    },
    {
      type: 'paragraph',
      text: 'そんなときは、システムを作ると何が楽になるか、お金と手間はどれくらいかかるかを比べます。使いやすいか分からない部分は、小さな試作品で確かめる方法もあります。',
    },
    {
      type: 'paragraph',
      text: [
        { type: 'strong', text: '作ることで何がよくなるのか、納得できてから進めます。' },
        '必要なものと、今はなくてもよいものを、一緒に決めていきます。',
      ],
    },
    {
      type: 'heading',
      id: 'decide-when-to-revisit',
      text: '「今は作らない」と決めた後は？',
    },
    {
      type: 'paragraph',
      text: '仕事の量や関わる人が増えれば、今のやり方では難しくなることもあります。',
    },
    {
      type: 'paragraph',
      text: [
        { type: 'strong', text: '作らないと決めたときも、いつ見直すかを一緒に決めます。' },
        '例えば、次のような変化がきっかけになります。',
      ],
    },
    {
      type: 'list',
      items: [
        '作業が増え、今の人数では対応しきれなくなったとき',
        '確認や修正に、決めていた時間より長くかかるようになったとき',
        '担当者や店舗が増え、情報の共有が難しくなったとき',
      ],
    },
    {
      type: 'paragraph',
      text: 'どのくらい増えたら見直すか、誰がいつ確認するかも、仕事に合わせて決めます。かかった時間や困ったことを残しておくと、次に何を変えるべきか考えやすくなります。',
    },
    {
      type: 'heading',
      id: 'consult-before-deciding',
      text: '作るかどうかを決める前に、相談できます',
    },
    {
      type: 'paragraph',
      text: [
        {
          type: 'strong',
          text: '「何を作りたいか」が決まっていなくても、相談できます。',
        },
        '「この作業に時間がかかる」「確認漏れが気になる」。そんな困りごとから話を始められます。',
      ],
    },
    {
      type: 'paragraph',
      text: '分かる範囲で、次のことを教えてください。',
    },
    {
      type: 'list',
      items: [
        '誰が、どんな作業で困っているか',
        'どのくらいの頻度で起きているか',
        '今使っているツールや、すでに試したこと',
        'かけられるお金や時間、作業を担当できる人',
      ],
    },
    {
      type: 'paragraph',
      text: '全部そろっていなくても大丈夫です。まずは、今いちばん困っていることからお聞かせください。今のやり方を変える方法も、新しく作る方法も、一緒に考えます。',
    },
  ],
  primaryCta: {
    label: 'システムが必要かどうかから相談する',
    description: '困っていることを伺い、今のツールや仕事の進め方で解決できるか、一緒に考えます。',
    href: '/contact/?category=discovery',
    eventName: 'article_cta_click',
    target: 'techguide-contact',
    placement: 'bottom',
    tone: 'warm',
  },
  secondaryCta: {
    label: 'TechGuideの支援内容を見る',
    description: '相談できる内容や、TechGuideがお手伝いできることを確認できます。',
    href: '/services/#consulting',
    eventName: 'article_cta_click',
    target: 'techguide-service',
    placement: 'bottom',
    tone: 'light',
  },
  relatedSlugs: [
    'why-we-start-with-planning',
    'before-tool-selection',
    'designing-for-maintenance-and-improvement',
  ],
  seo: {
    title: '「作らない提案」もする理由 | TechGuide',
    description:
      'TechGuideが「作らない提案」もする理由を、申込管理の例で説明します。今あるツールを活かす方法、新しいシステムが必要になる場面、相談するときに伝えたいことをまとめました。',
    ogImage: '/images/articles/why-we-sometimes-recommend-not-building-stop.webp',
    imageAlt: '閉じたノートPCの前で、両腕を交差させてストップの意思を示す人物',
  },
};
