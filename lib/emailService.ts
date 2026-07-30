import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export interface SendEmailResult {
  status: "SENT" | "SIMULATED" | "FAILED";
  subject: string;
  bodyHtml: string;
  recipient: string;
  error?: string;
}

export async function sendDecisionEmail(
  registrantId: string,
  name: string,
  email: string,
  decision: "APPROVED" | "REJECTED",
  waGroupLink: string = "https://chat.whatsapp.com/SDN231SukaasihTIK"
): Promise<SendEmailResult> {
  const isApproved = decision === "APPROVED";

  const subject = isApproved
    ? "Selamat! Kamu Resmi Diterima di Ekskul TIK SDN 231 Sukaasih 🎉"
    : "Informasi Pendaftaran Ekskul TIK SDN 231 Sukaasih";

  const bodyText = isApproved
    ? `Halo ${name}, Selamat! Kami sangat senang memberitahukan bahwa kamu telah diterima bergabung di Ekstrakurikuler TIK SDN 231 Sukaasih. Siapkan dirimu untuk belajar hal-hal seru seputar teknologi! Untuk info lebih lanjut dan jadwal pertemuan pertama, silakan bergabung ke Grup WhatsApp resmi kami melalui tautan berikut: ${waGroupLink}. Sampai jumpa!`
    : `Halo ${name}, Terima kasih atas antusiasmemu mendaftar di Ekskul TIK. Sayangnya, untuk saat ini kami belum bisa menerima pendaftaranmu karena kuota telah penuh/alasan lainnya. Jangan patah semangat dan terus belajar, ya!`;

  const bodyHtml = isApproved
    ? `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4F4F0; padding: 24px; border: 4px solid #000000;">
        <div style="background-color: #FFD000; padding: 18px; border: 2px solid #000000; text-align: center; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 20px; color: #000000; text-transform: uppercase;">EKSKUL TIK SDN 231 SUKAASIH</h1>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #000000; font-weight: bold;">PENGUMUMAN RESMI HASIL SELEKSI</p>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border: 2px solid #000000; margin-bottom: 20px;">
          <div style="background-color: #4ADE80; color: #000000; padding: 8px 12px; font-weight: bold; border: 2px solid #000000; display: inline-block; margin-bottom: 16px;">
            ✓ STATUS: RESMI DITERIMA
          </div>
          <h2 style="margin-top: 0; color: #000000;">Halo ${name}, Selamat! 🎉</h2>
          <p style="color: #333333; line-height: 1.6; font-size: 15px;">
            Kami sangat senang memberitahukan bahwa kamu telah <strong>diterima bergabung di Ekstrakurikuler TIK SDN 231 Sukaasih</strong>. Siapkan dirimu untuk belajar hal-hal seru seputar teknologi!
          </p>
          <p style="color: #333333; line-height: 1.6; font-size: 15px;">
            Untuk info lebih lanjut dan jadwal pertemuan pertama, silakan bergabung ke Grup WhatsApp resmi kami melalui tautan di bawah ini:
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${waGroupLink}" style="background-color: #FFD000; color: #000000; text-decoration: none; padding: 14px 28px; font-weight: 800; border: 3px solid #000000; display: inline-block; font-size: 14px; text-transform: uppercase;">
              GABUNG GRUP WHATSAPP RESMI ↗
            </a>
          </div>
          <p style="color: #333333; line-height: 1.6; font-size: 14px; margin-bottom: 0;">
            Sampai jumpa pada pertemuan perdana!<br/>
            <strong>Pembina Ekskul TIK SDN 231 Sukaasih</strong>
          </p>
        </div>
        <div style="text-align: center; font-size: 11px; color: #666666; font-weight: bold;">
          © SDN 231 SUKAASIH // EKSTRAKURIKULER TEKNOLOGI INFORMASI & KOMUNIKASI
        </div>
      </div>
    `
    : `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4F4F0; padding: 24px; border: 4px solid #000000;">
        <div style="background-color: #FFD000; padding: 18px; border: 2px solid #000000; text-align: center; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 20px; color: #000000; text-transform: uppercase;">EKSKUL TIK SDN 231 SUKAASIH</h1>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #000000; font-weight: bold;">INFORMASI PENDAFTARAN</p>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border: 2px solid #000000; margin-bottom: 20px;">
          <div style="background-color: #F87171; color: #000000; padding: 8px 12px; font-weight: bold; border: 2px solid #000000; display: inline-block; margin-bottom: 16px;">
            INFO STATUS PENDAFTARAN
          </div>
          <h2 style="margin-top: 0; color: #000000;">Halo ${name},</h2>
          <p style="color: #333333; line-height: 1.6; font-size: 15px;">
            Terima kasih atas antusiasmemu mendaftar di <strong>Ekskul TIK SDN 231 Sukaasih</strong>.
          </p>
          <p style="color: #333333; line-height: 1.6; font-size: 15px;">
            Sayangnya, untuk saat ini kami belum bisa menerima pendaftaranmu karena kuota telah penuh/alasan lainnya.
          </p>
          <div style="background-color: #F4F4F0; padding: 16px; border: 2px solid #000000; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #000000; font-size: 14px;">
              💡 Jangan patah semangat dan terus belajar, ya! Kamu tetap berkesempatan mendaftar kembali pada pembukaan kuota semester berikutnya.
            </p>
          </div>
          <p style="color: #333333; line-height: 1.6; font-size: 14px; margin-bottom: 0;">
            Salam hangat,<br/>
            <strong>Pembina Ekskul TIK SDN 231 Sukaasih</strong>
          </p>
        </div>
        <div style="text-align: center; font-size: 11px; color: #666666; font-weight: bold;">
          © SDN 231 SUKAASIH // EKSTRAKURIKULER TEKNOLOGI INFORMASI & KOMUNIKASI
        </div>
      </div>
    `;

  let status: "SENT" | "SIMULATED" | "FAILED" = "SIMULATED";
  let errorMsg: string | undefined;

  // Attempt real email sending if RESEND_API_KEY is configured
  const apiKey = process.env.RESEND_API_KEY;
  const resendClient = apiKey ? new Resend(apiKey) : null;

  if (resendClient) {
    try {
      const data = await resendClient.emails.send({
        from: "Ekskul TIK SDN 231 Sukaasih <onboarding@resend.dev>",
        to: email,
        subject: subject,
        html: bodyHtml,
      });

      if (data.error) {
        status = "FAILED";
        errorMsg = data.error.message;
      } else {
        status = "SENT";
      }
    } catch (err: unknown) {
      status = "FAILED";
      errorMsg =
        err instanceof Error ? err.message : "Gagal mengirim via Resend API";
    }
  }

  // Record into EmailLog database table so Admin can inspect it in the Dashboard previewer
  await prisma.emailLog.create({
    data: {
      registrantId,
      recipient: email,
      subject,
      bodyHtml,
      status,
    },
  });

  return {
    status,
    subject,
    bodyHtml,
    recipient: email,
    error: errorMsg,
  };
}
