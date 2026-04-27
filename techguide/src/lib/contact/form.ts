export const RECRUIT_CATEGORY_ID = 'recruit';

export const CONTACT_CATEGORIES = [
  { id: 'discovery', label: '課題整理・導入前の相談' },
  { id: 'lp', label: 'LP・Webサイト制作の相談' },
  { id: 'improvement', label: '既存サイト・LP改善の相談' },
  { id: 'development', label: '受託開発・システム開発の相談' },
  { id: 'ai', label: 'AI活用・業務改善の相談' },
  { id: 'education', label: '技術教育・伴走支援の相談' },
  { id: 'partnership', label: '協業・パートナーの相談' },
  { id: RECRUIT_CATEGORY_ID, label: '採用・パートナー応募' },
  { id: 'media', label: '取材・登壇の相談' },
  { id: 'sales', label: '営業・ご提案' },
  { id: 'other', label: 'その他・まだ整理できていない相談' },
] as const;

export type ContactCategoryId = (typeof CONTACT_CATEGORIES)[number]['id'];

export interface ContactFormValues {
  category: ContactCategoryId | '';
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  role: string;
  experienceYears: string;
  workStyle: string;
  availability: string;
  aiTools: string;
  portfolioUrl: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues | 'turnstile', string>>;

export function isContactCategoryId(value: string): value is ContactCategoryId {
  return CONTACT_CATEGORIES.some((category) => category.id === value);
}

export function getContactCategoryLabel(categoryId: ContactCategoryId) {
  return CONTACT_CATEGORIES.find((category) => category.id === categoryId)?.label ?? categoryId;
}

export function getInitialCategory(value: string | null): ContactCategoryId | '' {
  if (!value) {
    return '';
  }

  return isContactCategoryId(value) ? value : '';
}

export function createEmptyContactFormValues(
  category: ContactCategoryId | '' = '',
): ContactFormValues {
  return {
    category,
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    role: '',
    experienceYears: '',
    workStyle: '',
    availability: '',
    aiTools: '',
    portfolioUrl: '',
  };
}
