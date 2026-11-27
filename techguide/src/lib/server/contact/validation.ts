import {
  EMAIL_VERIFICATION_API_CATEGORY_ID,
  EMAIL_VERIFICATION_API_PRESET,
  getContactCategoryLabel,
  getInitialCategory,
  parsePortfolioUrls,
  PORTFOLIO_URL_LABEL,
  RECRUIT_CATEGORY_ID,
  type ContactCategoryId,
  type ContactFieldErrors,
  type ContactFormValues,
} from '../../contact/form.ts';
import {
  findMotenjiTopic,
  getMotenjiDetailLabel,
  MOTENJI_CATEGORY_ID,
} from '../../contact/motenji.ts';
import { normalizeAttributionPage } from '../../analytics/attribution.ts';

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

function isHttpUrl(value: string) {
  if (!/^https?:\/\//i.test(value) || /\s/.test(value)) return false;
  try {
    const url = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.length > 0;
  } catch {
    return false;
  }
}

export function parseContactFormData(formData: FormData, motenji = false): ContactValidationResult {
  const values: ContactFormValues = {
    category: motenji ? MOTENJI_CATEGORY_ID : getInitialCategory(readText(formData, 'category')),
    landingPage: normalizeAttributionPage(readText(formData, 'landingPage')),
    sourcePage: normalizeAttributionPage(readText(formData, 'sourcePage')),
    name: readText(formData, 'name'),
    email: readText(formData, 'email'),
    company: motenji ? '' : readText(formData, 'company'),
    subject: motenji ? '' : readText(formData, 'subject'),
    message: readText(formData, 'message'),
    motenjiTopic: motenji ? readText(formData, 'motenjiTopic').slice(0, 40) : '',
    motenjiDetail: motenji ? readText(formData, 'motenjiDetail').slice(0, 40) : '',
    role: readText(formData, 'role'),
    experienceYears: readText(formData, 'experienceYears'),
    workStyle: readText(formData, 'workStyle'),
    availability: readText(formData, 'availability'),
    nearestStation: readText(formData, 'nearestStation'),
    aiTools: readText(formData, 'aiTools'),
    portfolioUrl: readText(formData, 'portfolioUrl'),
    aiUsagePractices: readText(formData, 'aiUsagePractices'),
    strengths: readText(formData, 'strengths'),
    discoverySource: readText(formData, 'discoverySource'),
  };

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

  const motenjiTopic = findMotenjiTopic(values.motenjiTopic);
  if (motenji) {
    if (!motenjiTopic) {
      fieldErrors.motenjiTopic = '相談カテゴリを選択してください。';
    } else if (!getMotenjiDetailLabel(motenjiTopic, values.motenjiDetail)) {
      fieldErrors.motenjiDetail = '相談内容に近いものを選択してください。';
    }
    if (values.message.length > 500) {
      fieldErrors.message = '補足は500文字以内で入力してください。';
    }
  } else if (
    !hasValue(values.message) ||
    (values.category === EMAIL_VERIFICATION_API_CATEGORY_ID &&
      values.message.replace(/\r\n?/g, '\n') === EMAIL_VERIFICATION_API_PRESET.message)
  ) {
    fieldErrors.message = 'お問い合わせ内容を入力してください。';
  }

  const isRecruit = values.category === RECRUIT_CATEGORY_ID;
  const portfolioUrls = parsePortfolioUrls(values.portfolioUrl);
  if (isRecruit) {
    if (!hasValue(values.role)) {
      fieldErrors.role = '職種・主な役割を入力してください。';
    }
    if (!hasValue(values.experienceYears)) {
      fieldErrors.experienceYears = '経験年数を入力してください。';
    }
    if (!hasValue(values.workStyle)) {
      fieldErrors.workStyle = '現在の働き方を入力してください。';
    }
    if (!hasValue(values.nearestStation)) {
      fieldErrors.nearestStation = '最寄駅を入力してください。';
    }
    if (!hasValue(values.aiTools)) {
      fieldErrors.aiTools = '利用しているAIツールを入力してください。';
    }
    if (portfolioUrls.length === 0) {
      fieldErrors.portfolioUrl = `${PORTFOLIO_URL_LABEL}を1件以上入力してください。`;
    }
  }

  if (!motenji && portfolioUrls.some((url) => !isHttpUrl(url))) {
    fieldErrors.portfolioUrl =
      'http:// または https:// から始まる有効なURLを、1行に1つずつ入力してください。';
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
      subject: motenjiTopic?.label || values.subject || getContactCategoryLabel(category),
      category,
      categoryLabel: getContactCategoryLabel(category),
      isRecruit,
    },
  };
}
