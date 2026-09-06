import type { ShowcaseItem } from '$lib/types/content';

// 公開サイト・掲載済みの紹介で確認できる担当範囲を記載する。
export const publicWorks = {
  academyFes: {
    title: '北原孝彦アカデミーフェス 2026',
    description:
      '100ブース・100セミナーが集まる大型イベント。来場者がブースやセミナーを探し、会場を回りやすくするサイト・アプリを制作しました。',
    scope: '来場者向けアプリ開発、来場者・出展者の案内、会場情報・回遊導線の整理',
    image: '/images/showcase/academy-fes-2026-hero.webp',
    href: 'https://fes.kitaharatakahiko-academy.com/',
    ctaLabel: '公開サイトを見る',
  },
  aromine: {
    title: 'AROMINE',
    description: 'セルフコンディショニングブランドの講座を紹介し、申込みへつなぐLPです。',
    scope: '講座紹介・申込LPの制作',
    image: '/images/showcase/aromine-hero.webp',
    href: 'https://aromine.vercel.app/',
    ctaLabel: '公開サイトを見る',
  },
  shusei: {
    title: '守成クラブ 東京品川会場',
    description: '例会案内やイベント情報を確認し、参加へ進める会場公式サイトです。',
    scope: '公式サイト制作、例会案内・イベント導線の整理',
    image: '/images/showcase/shusei-shinagawa-hero.webp',
    href: 'https://www.shusei-tokyoshinagawa.com/',
    ctaLabel: '公開サイトを見る',
  },
} satisfies Record<string, ShowcaseItem>;

export const workItems: ShowcaseItem[] = Object.values(publicWorks);
