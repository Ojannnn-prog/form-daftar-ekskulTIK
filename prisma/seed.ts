import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SDN 231 Sukaasih TIK Registration database...');

  // 1. Seed Settings
  await prisma.setting.upsert({
    where: { key: 'whatsapp_group_link' },
    update: {},
    create: {
      key: 'whatsapp_group_link',
      value: 'https://chat.whatsapp.com/SDN231SukaasihTIK',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'max_quota' },
    update: {},
    create: {
      key: 'max_quota',
      value: '50',
    },
  });

  // 2. Check if registrants already exist
  const existingCount = await prisma.registrant.count();
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} registrants. Skipping registrant seeding.`);
    return;
  }

  // 3. Sample Registrants for SDN 231 Sukaasih
  const sampleRegistrants = [
    {
      name: 'Rizki Aditya Pratama',
      email: 'rizki.aditya@sample.id',
      whatsapp: '081234567890',
      reason: 'Saya ingin belajar pemrograman dasar dan cara membuat website sekolah yang menarik.',
      status: 'APPROVED',
      notes: 'Siswa kelas 5A, sangat antusias.',
    },
    {
      name: 'Nabila Putri Azzahra',
      email: 'nabila.putri@sample.id',
      whatsapp: '081345678912',
      reason: 'Ingin memperdalam ilmu komputer, literasi digital, dan desain grafis menggunakan Canva & Figma.',
      status: 'APPROVED',
      notes: 'Siswa kelas 5B.',
    },
    {
      name: 'Fathan Maulana Nugraha',
      email: 'fathan.maulana@sample.id',
      whatsapp: '081987654321',
      reason: 'Saya sangat menyukai teknologi dan ingin mencoba merakit serta memprogram robotika mini.',
      status: 'PENDING',
    },
    {
      name: 'Aisyah Zahra Khairunnisa',
      email: 'aisyah.zahra@sample.id',
      whatsapp: '082123456789',
      reason: 'Ingin belajar mengoperasikan komputer dengan cepat dan aman di internet.',
      status: 'PENDING',
    },
    {
      name: 'Muhammad Ilham Akbar',
      email: 'm.ilham.akbar@sample.id',
      whatsapp: '085712345678',
      reason: 'Senang main game animasi edukasi dan ingin tahu cara membuat program permainannya sendiri.',
      status: 'PENDING',
    },
    {
      name: 'Syifa Lestari Putri',
      email: 'syifa.lestari@sample.id',
      whatsapp: '087812345678',
      reason: 'Dianjurkan oleh orang tua untuk aktif mengembangkan bakat di bidang TIK sejak SD.',
      status: 'PENDING',
    },
    {
      name: 'Bima Satria Wijaya',
      email: 'bima.satria@sample.id',
      whatsapp: '089612345678',
      reason: 'Ingin belajar coding block menggunakan Scratch bersama teman-teman.',
      status: 'APPROVED',
    },
    {
      name: 'Kiara Anindya Permata',
      email: 'kiara.anindya@sample.id',
      whatsapp: '081398765432',
      reason: 'Tertarik dengan pelajaran komputer dan ingin membuat cerita interaktif bergambar.',
      status: 'PENDING',
    },
    {
      name: 'Rayhan Ramadhan',
      email: 'rayhan.ramadhan@sample.id',
      whatsapp: '081276543210',
      reason: 'Ingin belajar teknik fotografi dan pengeditan video dasar untuk dokumentasi kelas.',
      status: 'REJECTED',
      notes: 'Kuota terbatas, disarankan ikut semester depan.',
    },
    {
      name: 'Zahra Lathifa',
      email: 'zahra.lathifa@sample.id',
      whatsapp: '085234567891',
      reason: 'Ingin mengikuti perlombaan literasi digital siswa tingkat dasar.',
      status: 'APPROVED',
      notes: 'Berpotensi untuk kompetisi TIK SD.',
    },
  ];

  for (const item of sampleRegistrants) {
    const reg = await prisma.registrant.create({
      data: item,
    });

    if (item.status === 'APPROVED') {
      await prisma.emailLog.create({
        data: {
          registrantId: reg.id,
          recipient: reg.email,
          subject: 'Selamat! Kamu Resmi Diterima di Ekskul TIK SDN 231 Sukaasih 🎉',
          bodyHtml: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4F4F0; padding: 24px; border: 4px solid #000000;">
              <div style="background-color: #FFD000; padding: 16px; border: 2px solid #000000; text-align: center; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 20px; color: #000000; text-transform: uppercase;">Ekskul TIK SDN 231 Sukaasih</h1>
              </div>
              <div style="background-color: #ffffff; padding: 24px; border: 2px solid #000000; margin-bottom: 20px;">
                <h2 style="margin-top: 0; color: #000000;">Halo ${reg.name}, Selamat! 🎉</h2>
                <p style="color: #333333; line-height: 1.6;">
                  Kami sangat senang memberitahukan bahwa kamu telah diterima bergabung di <strong>Ekstrakurikuler TIK SDN 231 Sukaasih</strong>. Siapkan dirimu untuk belajar hal-hal seru seputar teknologi!
                </p>
                <p style="color: #333333; line-height: 1.6;">
                  Untuk info lebih lanjut dan jadwal pertemuan pertama, silakan bergabung ke Grup WhatsApp resmi kami melalui tautan di bawah ini:
                </p>
                <div style="text-align: center; margin: 28px 0;">
                  <a href="https://chat.whatsapp.com/SDN231SukaasihTIK" style="background-color: #4ADE80; color: #000000; text-decoration: none; padding: 14px 28px; font-weight: bold; border: 2px solid #000000; display: inline-block;">
                    GABUNG GRUP WHATSAPP RESMI
                  </a>
                </div>
                <p style="color: #333333; line-height: 1.6; margin-bottom: 0;">
                  Sampai jumpa pada pertemuan perdana!<br/>
                  <strong>Pembina Ekskul TIK SDN 231 Sukaasih</strong>
                </p>
              </div>
            </div>
          `,
          status: 'SIMULATED',
        },
      });
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
