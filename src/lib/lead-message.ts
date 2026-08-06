export const WHATSAPP_NUMBER = "917602733055";

export const FORM_TYPES = {
  mediaPlan: "Get Free Media Plan",
  bookCall: "Book a call",
  contact: "Contact",
} as const;

const MODAL_TITLE_TO_FORM_TYPE: Record<string, string> = {
  "Get Your Free Media Plan": FORM_TYPES.mediaPlan,
  "Book a Free Consultation": FORM_TYPES.bookCall,
};

export function mapModalTitleToFormType(title: string): string {
  return MODAL_TITLE_TO_FORM_TYPE[title] ?? title;
}

export function formatLeadMessage(formType: string, fields: Record<string, string>): string {
  const lines = [
    "New inquiry from My Lead Foundry website",
    "",
    `Form: ${formType}`,
    ...Object.entries(fields).map(([key, value]) => `${key}: ${value}`),
  ];
  return lines.join("\n");
}
