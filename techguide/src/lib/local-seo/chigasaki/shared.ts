import type { LocalSeoLinkCard } from '$lib/local-seo/types';
import { CHIGASAKI_PATHS } from './paths';

export const chigasakiHubLink: LocalSeoLinkCard = {
  title: '茅ヶ崎で、集客と業務を整える',
  description: 'ホームページ、予約・顧客管理、日々の手作業をまとめて相談できます。',
  href: CHIGASAKI_PATHS.hub,
  image: '/images/chigasaki/consultation-hero.webp',
  imageAlt: '茅ヶ崎の海辺をイメージしたWeb・IT相談の風景',
  ctaLabel: '茅ヶ崎での支援を見る',
};

export const chigasakiServiceLinks: LocalSeoLinkCard[] = [
  {
    title: '来店・問い合わせにつながるホームページ',
    description: '店舗やサービスの魅力を整理し、見つけてもらうところから申込みまで整えます。',
    href: CHIGASAKI_PATHS.homepage,
    image: '/images/chigasaki/homepage-card-v20260828.webp',
    imageAlt: '店舗の前でスマートフォンのホームページを確認する店主',
    ctaLabel: 'ホームページ制作を見る',
  },
  {
    title: '予約・申込・顧客管理をひとつに',
    description: '教室、イベント、店舗などの受付と管理を、現場に合う流れへまとめます。',
    href: CHIGASAKI_PATHS.development,
    image: '/images/chigasaki/system-development-card-v20260828.webp',
    imageAlt: 'タブレットを使って来場者を受け付けるイベントスタッフ',
    ctaLabel: 'システム開発を見る',
  },
  {
    title: '転記・集計・メール対応を減らす',
    description: 'いま使っているExcelやフォームを活かし、毎日の繰り返し作業を減らします。',
    href: CHIGASAKI_PATHS.improvement,
    image: '/images/chigasaki/business-improvement-card-v20260828.webp',
    imageAlt: '業務の流れをボードに整理する店舗スタッフ',
    ctaLabel: '業務効率化を見る',
  },
];

export function getChigasakiRelatedLinks(currentPath: string): LocalSeoLinkCard[] {
  return [chigasakiHubLink, ...chigasakiServiceLinks].filter((link) => link.href !== currentPath);
}
