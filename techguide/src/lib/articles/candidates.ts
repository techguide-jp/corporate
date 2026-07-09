import type { ArticleCategory } from './types';

export interface FutureArticleCandidate {
  title: string;
  category: ArticleCategory;
  readerConcern: string;
  angle: string;
  primaryCtaHref: string;
}

export const futureArticleCandidates = [
  {
    title: 'TechGuideに相談すると、最初に何を整理するのか',
    category: 'techguide-approach',
    readerConcern: '何を準備すればいいかわからない',
    angle: '初回相談で何を聞き、何を無理に決めないかを伝える',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: 'まだ要件が曖昧でも相談してよい理由',
    category: 'techguide-approach',
    readerConcern: 'こんな曖昧な状態で相談していいのか',
    angle: '完成した仕様がなくても、目的・現状・困りごとから整理できることを伝える',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: 'いきなり大きな開発を勧めない理由',
    category: 'techguide-approach',
    readerConcern: '高い開発を売り込まれそう',
    angle: '既存ツール、小さな自動化、試作、個別開発を切り分ける姿勢を伝える',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: '相談から実装まで、どう伴走するか',
    category: 'business-technology-alignment',
    readerConcern: '依頼後にどう進むのか見えない',
    angle: '整理、試作、実装、公開後改善までの流れを見せる',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: '小さな会社のIT相談で、大切にしていること',
    category: 'techguide-approach',
    readerConcern: 'うちの規模でも頼んでいいのか',
    angle: '現場で続くこと、担当者が困らないこと、無理な運用にしないことを伝える',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: '見積もりの前に、確認したいこと',
    category: 'business-technology-alignment',
    readerConcern: '費用感だけ知りたいけど、どう相談すればいいか',
    angle: '金額を出す前に、範囲・優先順位・運用・成功条件を揃える理由を伝える',
    primaryCtaHref: '/contact/?category=development',
  },
  {
    title: '“作らない提案”もする理由',
    category: 'techguide-approach',
    readerConcern: '開発ありきで話が進みそう',
    angle: '開発しない方がよい場合は、既存ツールや運用改善を提案する姿勢を出す',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: 'IT導入で、現場に無理をさせないために見るポイント',
    category: 'it-adoption',
    readerConcern: '導入しても現場が使わなさそう',
    angle: '担当者、入力負荷、確認フロー、例外対応を先に見る考え方を伝える',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: 'AI活用を相談するとき、最初に見ること',
    category: 'ai-adoption',
    readerConcern: 'AIを使いたいけど、何から始めればいいかわからない',
    angle: 'プロンプトやツールより、業務上どこにAIを入れると安全かを見る姿勢を伝える',
    primaryCtaHref: '/contact/?category=ai',
  },
  {
    title: '社内の“なんとなく困っている”を、相談できる形にするまで',
    category: 'business-technology-alignment',
    readerConcern: '課題をうまく説明できない',
    angle: '漠然とした課題を、業務・人・頻度・影響に分解する進め方を伝える',
    primaryCtaHref: '/contact/?category=discovery',
  },
  {
    title: 'TechGuideの支援が向いている相談、向いていない相談',
    category: 'techguide-approach',
    readerConcern: '問い合わせたあとにミスマッチになりたくない',
    angle: '合うケース・合わないケースを正直に出し、相談前の不安を下げる',
    primaryCtaHref: '/contact/?category=discovery',
  },
] satisfies readonly FutureArticleCandidate[];
