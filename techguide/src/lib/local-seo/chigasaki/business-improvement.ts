import { publicWorks } from '$lib/data/works';
import { CHIGASAKI_PATHS } from './paths';
import { getChigasakiRelatedLinks } from '$lib/local-seo/chigasaki/shared';
import type { LocalSeoPageContent } from '$lib/local-seo/types';

const path = CHIGASAKI_PATHS.improvement;

export const chigasakiBusinessImprovementContent: LocalSeoPageContent = {
  kind: 'service',
  seo: {
    title: '茅ヶ崎の業務効率化・IT導入・AI活用 | TechGuide',
    description:
      '茅ヶ崎市・湘南エリアの業務効率化、IT導入、AI活用支援。Excel管理、フォーム転記、顧客・予約管理などを整理し、現場で続けられる改善を支援します。',
    path,
    image: '/images/chigasaki/business-improvement-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージした業務改善の打ち合わせ風景',
  },
  breadcrumbLabel: '業務効率化・IT導入',
  eyebrow: '茅ヶ崎の業務改善・IT活用',
  heroTitleLines: ['茅ヶ崎の業務改善。', '毎日の手作業を、', '無理なく減らす。'],
  heroLead:
    'フォームからExcelへの転記、予約確認、定型メール、毎月の集計。茅ヶ崎の店舗・企業・団体で繰り返している作業を見つけ、いま使っている道具を活かしながら減らします。',
  heroCtaLabel: '業務改善を相談する',
  badges: ['茅ヶ崎市内で業務を確認', '既存ツールも活用', '小さな改善から開始'],
  problems: {
    title: '「仕方ない」と続けている作業はありませんか',
    description:
      '一回は数分でも、毎日繰り返す転記・確認・連絡が、本来の仕事に使う時間を削っています。',
    items: [
      {
        audience: '店舗・教室',
        title: '「フォームの内容をExcelへ移し、同じ案内を毎回送っている」',
        description: '予約や申込のたびに転記と定型連絡が発生し、忙しい時間ほど対応が遅れます。',
      },
      {
        audience: '少人数の企業',
        title: '「担当者しか分からない集計や確認作業が残っている」',
        description:
          '手順と判断基準が共有されず、休みや引継ぎのたびに仕事が止まりやすくなっています。',
      },
      {
        audience: '地域団体',
        title: '「ITツールを試したが、使い方が増えただけで楽にならない」',
        description: 'ツールごとに情報が分かれ、現場に合わない手順を人の工夫で補っています。',
      },
    ],
    bridge: {
      title: '新しいツールを入れる前に、今の仕事を一緒に見ます',
      description:
        '残す作業、なくせる作業、人が判断すべき作業を分け、いま使っているExcelやフォームも活かせる方法を探します。',
    },
  },
  transformation: {
    title: '手を動かす時間を減らし、判断とお客さま対応へ',
    description: '現場を止めず、効果を確かめやすい一つの作業から変えていきます。',
    items: [
      {
        before: '申込内容をコピーして台帳へ移し、確認メールを作る',
        after: '情報が自動でまとまり、内容の確認と個別対応だけを行う',
      },
      {
        before: '集計方法を知る担当者が休むと、月次作業が止まる',
        after: '手順と数字の見方を共有し、誰でも同じ結果を確認できる',
      },
      {
        before: 'AIを何に使うか決めないまま、ツールだけを試す',
        after: '対象業務と扱う情報を絞り、低いリスクで効果を確かめる',
      },
    ],
  },
  support: {
    title: '新しいツールを増やす前に、仕事の流れを整えます',
    description:
      '使っているExcel、フォーム、LINE、メールを確認し、変える必要がある部分だけを選びます。',
    items: [
      {
        title: '業務の棚卸し',
        description: '作業時間、転記、待ち時間、確認作業を洗い出し、優先順位を付けます。',
      },
      {
        title: '既存サービス・連携・AIの検討',
        description: 'Googleフォーム、スプレッドシート、LINEなども含め、合う方法を比較します。',
      },
      {
        title: '小さな導入と定着支援',
        description: '一部業務から試し、現場の声を取り入れながら使い方と仕組みを整えます。',
      },
    ],
  },
  examples: {
    title: '身近な業務から改善できます',
    description: '現在使っている道具を活かし、毎週・毎月繰り返す作業から着手します。',
    items: [
      'Excel・スプレッドシート管理の改善',
      'Googleフォーム連携',
      'LINE連携',
      'メール処理の自動化',
      '顧客・案件管理',
      '予約・申込管理',
      '生成AIの業務活用',
      '手作業のシステム化',
    ],
  },
  process: {
    title: '現場を止めず、小さく試して定着させます',
    description: '導入すること自体を目的にせず、削減できた時間と続けやすさを確かめます。',
    items: [
      {
        title: '業務を見える化',
        description: '作業手順、時間、担当者、利用中のツールを確認します。',
      },
      {
        title: '改善候補を比較',
        description: '削減効果、費用、導入負担を比べ、着手順を決めます。',
      },
      { title: '小さく導入', description: '対象を絞って試し、実際の業務で使えるか確認します。' },
      { title: '定着・改善', description: '運用ルールを整え、必要に応じて対象業務を広げます。' },
    ],
  },
  relatedLinks: {
    title: 'ほかの茅ヶ崎エリア向け支援',
    description: '改善内容に応じて、ホームページ制作や独自システム開発にも対応します。',
    items: getChigasakiRelatedLinks(path),
  },
  works: {
    items: [publicWorks.academyFes, publicWorks.shusei],
    title: '案内・情報整理から運営を支える公開実績',
    description:
      '来場者が情報を探せるアプリ、例会・イベント案内を整理したサイトの制作例です。日々の業務改善でも、まず情報と対応の流れを整理します。掲載実績は茅ヶ崎市内に限定したものではありません。',
  },
  faq: {
    title: '茅ヶ崎の業務効率化・IT導入でよくある質問',
    description: '改善する業務が決まっていない段階から相談できます。',
    items: [
      {
        question: 'どの作業を自動化できるのか分かりません。',
        answer:
          'まず毎日・毎週繰り返す作業、転記、確認、定型連絡を伺います。作業時間とミスの起きやすさを見て、改善候補を整理します。',
      },
      {
        question: '今使っているExcelやLINEを残したまま改善できますか？',
        answer:
          'はい。すべてを入れ替える前提ではなく、現在の道具を残す部分と連携・変更する部分を分けて検討します。',
      },
      {
        question: 'ひとつの小さな作業だけでも相談できますか？',
        answer:
          'はい。繰り返し回数が多い作業や確認負担の大きい作業を一つ選び、小さく試して効果を確認できます。',
      },
      {
        question: '生成AIへ社内情報を入れても安全ですか？',
        answer:
          '扱う情報と利用するサービスの条件を確認せずに導入は進めません。個人情報や機密情報を避けられる用途から検討し、必要な運用ルールも整理します。',
      },
      {
        question: '茅ヶ崎市内の事務所や店舗で相談できますか？',
        answer:
          'はい。日程と場所を調整し、実際の作業や画面を見ながら相談できます。オンラインでの継続相談も可能です。',
      },
    ],
  },
  contact: {
    title: '繰り返している作業を、ひとつ教えてください',
    description:
      'いま時間がかかっている作業や、改善したい業務を分かる範囲でお送りください。茅ヶ崎市内で実際の流れを見ながら相談できます。',
    category: 'ai',
    subject: '茅ヶ崎エリアの業務効率化・IT導入相談',
    placement: 'chigasaki_business_improvement',
  },
  serviceType: '業務効率化・IT導入・AI活用支援',
};
