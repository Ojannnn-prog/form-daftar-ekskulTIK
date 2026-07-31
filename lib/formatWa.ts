/**
 * Formats an Indonesian phone number into a clean wa.me link.
 * Removes leading '0' and prepends '62' (e.g., 087977387383 -> https://wa.me/6287977387383).
 * If a registrant name is provided, attaches an automated chatbot-style greeting message with the WhatsApp group link.
 */
export function formatWhatsAppUrl(wa: string, name?: string): string {
  if (!wa) return "https://wa.me/";

  // Remove non-numeric characters (spaces, dashes, +, etc.)
  const cleaned = wa.replace(/\D/g, "");

  let phoneNumber = cleaned;
  if (cleaned.startsWith("0")) {
    phoneNumber = `62${cleaned.slice(1)}`;
  } else if (cleaned.startsWith("8")) {
    phoneNumber = `62${cleaned}`;
  } else if (cleaned.startsWith("62")) {
    phoneNumber = cleaned;
  } else {
    phoneNumber = `62${cleaned}`;
  }

  const baseUrl = `https://wa.me/${phoneNumber}`;

  if (!name) {
    return baseUrl;
  }

  const groupLink =
    "https://chat.whatsapp.com/GZOK45zquUeACMYdR5Z0QV?s=cl&p=a&ilr=0";

  const message = `*[BOT INFORMASI - EKSKUL TIK SDN 231 SUKAASIH]* 🤖✨

Halo kak/adik *${name}*! 👋

Selamat! Pendaftaran kamu untuk bergabung di Ekstrakurikuler Teknologi Informasi & Komunikasi (TIK) *SDN 231 Sukaasih* telah kami terima dengan baik. 🎉

Agar tidak ketinggalan informasi jadwal kegiatan, materi, dan pengumuman penting lainnya, silakan langsung bergabung ke *Grup WhatsApp Resmi Ekskul TIK* melalui tautan di bawah ini:

🔗 *Link Grup WhatsApp Resmi:*
${groupLink}

Sampai jumpa di pertemuan pertama kita! Tetap semangat dan salam teknologi! 🚀✨

_(Pesan ini dikirim secara otomatis oleh Sistem Informasi Ekskul TIK SDN 231 Sukaasih)_`;

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
