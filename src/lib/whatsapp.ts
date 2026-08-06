import { WHATSAPP_NUMBER } from "./lead-message";

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppChat(message?: string): void {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
