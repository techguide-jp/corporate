import type { LocalSeoLinkCard } from '$lib/local-seo/types';

export const chigasakiHubLink: LocalSeoLinkCard = {
  title: '茅ヶ崎のWeb制作・システム開発・IT相談',
  description: '相談内容が固まる前の課題整理から、制作・開発・運用改善までまとめて相談できます。',
  href: '/chigasaki/',
  image: '/images/services/consulting-visual.webp',
  imageAlt: '課題整理から始めるIT相談のイメージ',
  ctaLabel: '茅ヶ崎エリアの支援を見る',
};

export const chigasakiServiceLinks: LocalSeoLinkCard[] = [
  {
    title: 'ホームページ制作・Web制作',
    description: '会社やサービスの魅力を整理し、問い合わせや申込みにつながるページを制作します。',
    href: '/chigasaki/homepage/',
    image: '/images/services/development-visual.webp',
    imageAlt: 'ホームページ制作と導線設計のイメージ',
    ctaLabel: 'ホームページ制作を見る',
  },
  {
    title: 'システム開発・Webアプリ開発',
    description: '予約、申込、顧客管理など、現場の業務に合う仕組みを設計・開発します。',
    href: '/chigasaki/system-development/',
    image: '/images/showcase/ticketcraft-hero.webp',
    imageAlt: '予約や申込を支えるシステム開発のイメージ',
    ctaLabel: 'システム開発を見る',
  },
  {
    title: '業務効率化・IT導入・AI活用',
    description: '手作業や情報の分散を整理し、無理なく続けられる改善方法を一緒に考えます。',
    href: '/chigasaki/business-improvement/',
    image: '/images/services/ai-visual.webp',
    imageAlt: '業務効率化とAI活用を検討するイメージ',
    ctaLabel: '業務効率化を見る',
  },
];

export function getChigasakiRelatedLinks(currentPath: string): LocalSeoLinkCard[] {
  return [chigasakiHubLink, ...chigasakiServiceLinks].filter((link) => link.href !== currentPath);
}
