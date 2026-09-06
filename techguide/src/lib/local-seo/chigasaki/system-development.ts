import { publicWorks } from '$lib/data/works';
import { CHIGASAKI_PATHS } from './paths';
import { getChigasakiRelatedLinks } from '$lib/local-seo/chigasaki/shared';
import type { LocalSeoPageContent } from '$lib/local-seo/types';

const path = CHIGASAKI_PATHS.development;

export const chigasakiSystemDevelopmentContent: LocalSeoPageContent = {
  kind: 'service',
  seo: {
    title: '茅ヶ崎のシステム開発・Webアプリ開発 | TechGuide',
    description:
      '茅ヶ崎市・湘南エリアのシステム開発・Webアプリ開発。予約、申込、会員・顧客管理、イベント管理などを、業務整理から設計・開発・運用まで支援します。',
    path,
    image: '/images/chigasaki/system-development-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージした予約管理システムの打ち合わせ風景',
  },
  breadcrumbLabel: 'システム開発',
  eyebrow: '茅ヶ崎のシステム開発',
  heroTitleLines: ['茅ヶ崎のシステム開発。', '予約・申込を、', '現場に合う仕組みへ。'],
  heroLead:
    'イベント、教室、会員サービス、店舗予約など、茅ヶ崎の事業で増えがちな受付・確認・連絡をひとつの流れにします。システムが必要か分からない段階から相談できます。',
  heroCtaLabel: 'システム化を相談する',
  badges: ['茅ヶ崎市内で業務を確認', '小さな試作から相談可能', '運用改善まで伴走'],
  problems: {
    title: '申込が増えるほど、手作業も増えていませんか',
    description:
      '受付、確認、連絡、管理のどこで人の手が止まっているかを、現在の業務から確認します。',
    items: [
      {
        audience: '教室・店舗',
        title: '「予約が入るたび、フォームから台帳へ転記している」',
        description: '受付情報と予約枠、入金、案内が別々で、確認と連絡に時間がかかっています。',
      },
      {
        audience: '会員サービス',
        title: '「誰がどこまで対応したか、担当者に聞かないと分からない」',
        description: '顧客情報や対応履歴が個人のメールやメモに残り、引継ぎのたびに確認が必要です。',
      },
      {
        audience: 'イベント運営',
        title: '「既製ツールに業務を合わせた結果、別の手作業が増えた」',
        description: '便利な機能はあっても実際の受付手順に合わず、表計算やメールで補っています。',
      },
    ],
    bridge: {
      title: '独自システムを作ることが、いつも正解とは限りません',
      description:
        '既存サービスで足りる部分、連携で解決できる部分、独自開発が必要な部分を分け、運用負担まで含めて比較します。',
    },
  },
  transformation: {
    title: '情報を探す仕事から、次の対応を決める仕事へ',
    description: '入力を増やさず、受付から管理まで同じ情報が流れる状態を作ります。',
    items: [
      {
        before: 'フォーム、メール、台帳へ同じ内容を何度も入力する',
        after: '一度の受付で情報がまとまり、必要な確認だけを行える',
      },
      {
        before: '進捗を担当者に聞かないと、顧客への返答ができない',
        after: '対応状況と履歴を共有し、誰でも次の行動を判断できる',
      },
      {
        before: 'すべての機能を決めてから、大きな開発を始める',
        after: '優先度の高い流れを試作し、使い方を確かめて広げる',
      },
    ],
  },
  support: {
    title: '機能一覧ではなく、現場の流れから設計します',
    description: '機能を増やすことより、現場で使い続けられることを優先します。',
    items: [
      {
        title: '業務フロー・要件整理',
        description: '利用者、入力情報、判断、連絡、管理方法を確認し、必要な要件を決めます。',
      },
      {
        title: '試作・設計・Webアプリ開発',
        description: '不確かな部分は小さく試し、画面と動きを確認してから本開発へ進めます。',
      },
      {
        title: '外部連携・運用改善',
        description: '既存サービスやAPIとの連携を含め、導入後の使い方と改善まで支援します。',
      },
    ],
  },
  examples: {
    title: '店舗・教室・イベント運営で使える仕組み',
    description: '受付方法やスタッフ体制に合わせ、必要な機能だけを組み合わせます。',
    items: [
      '予約システム',
      '申込システム',
      'イベント・チケット管理',
      '会員管理',
      '顧客管理',
      'マッチングサービス',
      '業務管理画面',
      '外部サービス・API連携',
    ],
  },
  process: {
    title: '紙や画面を一緒に見ながら、必要な範囲を決めます',
    description: '最初から仕様書を用意する必要はありません。現在の業務から順に整理します。',
    items: [
      { title: '現状業務を整理', description: '担当者、手順、情報、困っている場面を確認します。' },
      {
        title: '要件と優先順位を決定',
        description: '最初に必要な機能と後から追加できる機能を分けます。',
      },
      {
        title: '試作・設計・開発',
        description: '早い段階で画面と動きを確認し、認識をそろえます。',
      },
      { title: '導入・運用改善', description: '実際の運用に合わせ、使い方や機能を改善します。' },
    ],
  },
  relatedLinks: {
    title: 'ほかの茅ヶ崎エリア向け支援',
    description: 'ホームページ制作や業務効率化と組み合わせた相談にも対応します。',
    items: getChigasakiRelatedLinks(path),
  },
  works: {
    items: [publicWorks.academyFes, publicWorks.shusei],
    title: '利用者の行動から設計したサイト・アプリ',
    description:
      '来場者向けアプリと会場公式サイトの公開実績です。ブースを探す、イベントを知るなど、利用者の行動に沿った設計と担当範囲を確認できます。掲載実績は茅ヶ崎市内に限定したものではありません。',
  },
  faq: {
    title: '茅ヶ崎のシステム開発でよくある質問',
    description: '要件が固まる前の相談や、既存ツールとの使い分けについてお答えします。',
    items: [
      {
        question: '仕様書や機能一覧がなくても相談できますか？',
        answer:
          'はい。現在の受付方法、使っている台帳、困る場面を確認し、必要な機能と優先順位を一緒に整理します。',
      },
      {
        question: '既存の予約サービスやGoogleスプレッドシートと連携できますか？',
        answer:
          'サービス側の連携方法や利用条件を確認したうえで検討します。独自開発だけに決めず、既存ツールを活かせる方法も比較します。',
      },
      {
        question: '一部の業務だけ、小さくシステム化できますか？',
        answer:
          'はい。負担が大きい工程を絞って試作し、実際に使えることを確認してから対象を広げる進め方ができます。',
      },
      {
        question: '開発後の保守や機能改善も依頼できますか？',
        answer:
          'はい。利用状況や現場の声を確認しながら、不具合対応、運用の見直し、必要な機能追加を相談できます。',
      },
      {
        question: '茅ヶ崎市内で実際の業務を見てもらえますか？',
        answer:
          'はい。日程と場所を調整し、現在使っている画面や帳票を見ながら茅ヶ崎市内で相談できます。オンラインとの併用も可能です。',
      },
    ],
  },
  contact: {
    title: 'いまの受付・管理方法を、そのまま見せてください',
    description:
      '作りたい機能が決まっていなくても、現在の業務や困りごとから整理できます。茅ヶ崎市内での対面確認も可能です。',
    category: 'development',
    subject: '茅ヶ崎エリアのシステム開発相談',
    placement: 'chigasaki_system_development',
  },
  serviceType: 'システム開発・Webアプリ開発',
};
