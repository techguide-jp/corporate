import {
  getContactCategoryLabel,
  isContactCategoryId,
  RECRUIT_CATEGORY_ID,
  type ContactCategoryId,
  type ContactFieldErrors,
  type ContactFormValues,
} from '$lib/contact/form';

export interface ContactSubmission extends ContactFormValues {
  category: ContactCategoryId;
  categoryLabel: string;
  isRecruit: boolean;
}

type ContactValidationResult =
  | { ok: true; submission: ContactSubmission; isBot: boolean }
  | { ok: false; values: ContactFormValues; fieldErrors: ContactFieldErrors; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function hasValue(value: string) {
  return value.length > 0;
}

export function parseContactFormData(formData: FormData): ContactValidationResult {
  const values: ContactFormValues = {
    category: '',
    name: readText(formData, 'name'),
    email: readText(formData, 'email'),
    company: readText(formData, 'company'),
    subject: readText(formData, 'subject'),
    message: readText(formData, 'message'),
    role: readText(formData, 'role'),
    experienceYears: readText(formData, 'experienceYears'),
    workStyle: readText(formData, 'workStyle'),
    availability: readText(formData, 'availability'),
    aiTools: readText(formData, 'aiTools'),
    portfolioUrl: readText(formData, 'portfolioUrl'),
  };

  const rawCategory = readText(formData, 'category');
  if (isContactCategoryId(rawCategory)) {
    values.category = rawCategory;
  }

  const fieldErrors: ContactFieldErrors = {};

  if (!values.category) {
    fieldErrors.category = 'お問い合わせカテゴリを選択してください。';
  }

  if (!hasValue(values.name)) {
    fieldErrors.name = 'お名前を入力してください。';
  }

  if (!hasValue(values.email)) {
    fieldErrors.email = 'メールアドレスを入力してください。';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = 'メールアドレスの形式を確認してください。';
  }

  if (!hasValue(values.subject)) {
    fieldErrors.subject = '件名を入力してください。';
  }

  if (!hasValue(values.message)) {
    fieldErrors.message = 'お問い合わせ内容を入力してください。';
  }

  const isRecruit = values.category === RECRUIT_CATEGORY_ID;
  if (isRecruit) {
    if (!hasValue(values.role)) {
      fieldErrors.role = '職種・主な役割を入力してください。';
    }
    if (!hasValue(values.workStyle)) {
      fieldErrors.workStyle = '現在の働き方を入力してください。';
    }
    if (!hasValue(values.availability)) {
      fieldErrors.availability = '週あたりの稼働可能時間を入力してください。';
    }
    if (!hasValue(values.aiTools)) {
      fieldErrors.aiTools = '利用しているAIツールを入力してください。';
    }
  }

  if (values.portfolioUrl && !/^https?:\/\/.+/i.test(values.portfolioUrl)) {
    fieldErrors.portfolioUrl = 'URLは http:// または https:// から入力してください。';
  }

  if (Object.keys(fieldErrors).length > 0 || !values.category) {
    return {
      ok: false,
      values,
      fieldErrors,
      message: '入力内容を確認してください。',
    };
  }

  const isBot = hasValue(readText(formData, 'website'));
  const category = values.category;

  return {
    ok: true,
    isBot,
    submission: {
      ...values,
      category,
      categoryLabel: getContactCategoryLabel(category),
      isRecruit,
    },
  };
}
