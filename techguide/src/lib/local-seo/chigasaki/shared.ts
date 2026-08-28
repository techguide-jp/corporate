import type { LocalSeoLinkCard } from '$lib/local-seo/types';

export const chigasakiHubLink: LocalSeoLinkCard = {
  title: '茅ヶ崎で、集客と業務を整える',
  description: 'ホームページ、予約・顧客管理、日々の手作業をまとめて相談できます。',
  href: '/chigasaki/',
  image: '/images/chigasaki/consultation-hero.webp',
  imageAlt: '茅ヶ崎の海辺をイメージしたWeb・IT相談の風景',
  ctaLabel: '茅ヶ崎での支援を見る',
};

export const chigasakiServiceLinks: LocalSeoLinkCard[] = [
  {
    title: '来店・問い合わせにつながるホームページ',
    description: '店舗やサービスの魅力を整理し、見つけてもらうところから申込みまで整えます。',
    href: '/chigasaki/homepage/',
    image: '/images/chigasaki/homepage-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージしたホームページ制作の打ち合わせ風景',
    ctaLabel: 'ホームページ制作を見る',
  },
  {
    title: '予約・申込・顧客管理をひとつに',
    description: '教室、イベント、店舗などの受付と管理を、現場に合う流れへまとめます。',
    href: '/chigasaki/system-development/',
    image: '/images/chigasaki/system-development-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージした予約管理システムの打ち合わせ風景',
    ctaLabel: 'システム開発を見る',
  },
  {
    title: '転記・集計・メール対応を減らす',
    description: 'いま使っているExcelやフォームを活かし、毎日の繰り返し作業を減らします。',
    href: '/chigasaki/business-improvement/',
    image: '/images/chigasaki/business-improvement-hero.webp',
    imageAlt: '茅ヶ崎の海辺をイメージした業務改善の打ち合わせ風景',
    ctaLabel: '業務効率化を見る',
  },
];

export function getChigasakiRelatedLinks(currentPath: string): LocalSeoLinkCard[] {
  return [chigasakiHubLink, ...chigasakiServiceLinks].filter((link) => link.href !== currentPath);
}
