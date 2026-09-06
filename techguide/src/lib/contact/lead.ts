import { normalizeAttributionPage, type ContactAttribution } from '../analytics/attribution.ts';
import { isContactCategoryId, type ContactCategoryId } from './form.ts';

export interface ContactReceipt extends ContactAttribution {
  id: string;
  category: ContactCategoryId;
}

export function createLeadEventTracker() {
  const measured = new Set<string>();
  return (receipt: ContactReceipt | null | undefined) => {
    if (!receipt?.id || measured.has(receipt.id) || !isContactCategoryId(receipt.category)) return;
    measured.add(receipt.id);
    return {
      contact_category: receipt.category,
      form_name: 'contact',
      inquiry_type: receipt.category,
      landing_page: normalizeAttributionPage(receipt.landingPage) || undefined,
      source_page: normalizeAttributionPage(receipt.sourcePage) || undefined,
    };
  };
}
