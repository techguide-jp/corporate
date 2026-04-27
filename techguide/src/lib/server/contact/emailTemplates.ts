import type { ContactSubmission } from './validation';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatOptional(label: string, value: string) {
  return value ? `${label}: ${value}` : `${label}: 未入力`;
}

function formatSubmissionLines(submission: ContactSubmission) {
  const lines = [
    `カテゴリ: ${submission.categoryLabel}`,
    `お名前: ${submission.name}`,
    `メールアドレス: ${submission.email}`,
    formatOptional('会社名・屋号', submission.company),
    `件名: ${submission.subject}`,
    '',
    'お問い合わせ内容:',
    submission.message,
  ];

  if (submission.isRecruit) {
    lines.push(
      '',
      '採用・パートナー応募情報:',
      formatOptional('職種・主な役割', submission.role),
      formatOptional('経験年数', submission.experienceYears),
      formatOptional('現在の働き方', submission.workStyle),
      formatOptional('週の稼働可能時間', submission.availability),
      formatOptional('使用しているAIツール', submission.aiTools),
      formatOptional('ポートフォリオ/GitHub URL', submission.portfolioUrl),
    );
  }

  return lines;
}

function toHtml(lines: string[]) {
  return lines
    .map((line) => (line ? `<p>${escapeHtml(line).replaceAll('\n', '<br>')}</p>` : '<br>'))
    .join('\n');
}

export function buildAdminEmail(submission: ContactSubmission) {
  const lines = [
    'TechGuideサイトからお問い合わせが届きました。',
    '',
    ...formatSubmissionLines(submission),
  ];

  return {
    subject: `[TechGuide] ${submission.categoryLabel}: ${submission.subject}`,
    text: lines.join('\n'),
    html: toHtml(lines),
  };
}

export function buildAutoReplyEmail(submission: ContactSubmission) {
  const recruitNote = submission.isRecruit
    ? ['', '採用・パートナー応募については、内容確認後にカジュアル面談可否をご連絡します。']
    : [];

  const lines = [
    `${submission.name} 様`,
    '',
    'TechGuideへお問い合わせいただきありがとうございます。',
    '内容を確認し、営業日に順次ご連絡します。',
    ...recruitNote,
    '',
    '送信内容の控え:',
    ...formatSubmissionLines(submission),
    '',
    'TechGuide合同会社',
  ];

  return {
    subject: 'お問い合わせありがとうございます | TechGuide',
    text: lines.join('\n'),
    html: toHtml(lines),
  };
}
