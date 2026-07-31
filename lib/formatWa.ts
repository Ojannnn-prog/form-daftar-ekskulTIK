/**
 * Formats an Indonesian phone number into a clean wa.me link.
 * Removes leading '0' and prepends '62' (e.g., 087977387383 -> https://wa.me/6287977387383)
 */
export function formatWhatsAppUrl(wa: string): string {
  if (!wa) return "https://wa.me/";

  // Remove non-numeric characters (spaces, dashes, +, etc.)
  const cleaned = wa.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    return `https://wa.me/62${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith("8")) {
    return `https://wa.me/62${cleaned}`;
  }
  if (cleaned.startsWith("62")) {
    return `https://wa.me/${cleaned}`;
  }

  return `https://wa.me/62${cleaned}`;
}
