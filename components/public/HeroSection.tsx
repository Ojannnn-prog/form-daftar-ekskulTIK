import React from "react";
import { Code2, Palette, Cpu, Globe2, Sparkles, ArrowDownCircle, Trophy } from "lucide-react";

export default function HeroSection() {
  const curriculumItems = [
    {
      title: "Coding Dasar & Scratch",
      desc: "Belajar logika pemrograman membuat game animasi seru menggunakan blok kode interaktif.",
      icon: Code2,
      bgColor: "bg-[#FFD000]",
      badge: "Kreativitas",
    },
    {
      title: "Desain Grafis Digital",
      desc: "Latihan merancang poster, presentasi visual, dan karakter digital menggunakan Canva & Figma.",
      icon: Palette,
      bgColor: "bg-[#4ADE80]",
      badge: "Seni Visual",
    },
    {
      title: "Robotika Mini & Eksplorasi",
      desc: "Mengenal perangkat keras komputer, sensor dasar, serta pemrograman mini robotika.",
      icon: Cpu,
      bgColor: "bg-[#A78BFA]",
      badge: "Eksperimen",
    },
    {
      title: "Literasi & Aman di Internet",
      desc: "Memahami etika berinternet, keamanan siber anak, dan pemanfaatan teknologi positif.",
      icon: Globe2,
      bgColor: "bg-[#FB923C]",
      badge: "Kecakapan",
    },
  ];

  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Headline & CTA */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-black mb-6 leading-[1.05]">
            SIAPKAN DIRIMU JADI{" "}
            <span className="inline-block bg-[#FFD000] px-3 py-1 border-3 border-black shadow-[4px_4px_0px_0px_#000000] rotate-[-1deg]">
              JAGOAN TIK
            </span>{" "}
            MASA DEPAN! 🚀
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-800 max-w-2xl mx-auto mb-8 leading-relaxed">
            Platform resmi Pendaftaran Ekstrakurikuler Teknologi Informasi & Komunikasi (TIK){" "}
            <strong className="font-extrabold text-black">SDN 231 Sukaasih</strong>. Tanpa perlu membuat akun, mari bergabung belajar bersama dan dapatkan informasi kegiatanmu melalui WhatsApp!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#form-daftar"
              className="neo-button-primary w-full sm:w-auto text-base sm:text-lg"
            >
              <ArrowDownCircle className="w-5 h-5" />
              Daftar Sekarang Tanpa Login
            </a>
            <a
              href="#showcase"
              className="neo-button-outline w-full sm:w-auto text-base sm:text-lg"
            >
              Lihat Video & Karya Siswa
            </a>
          </div>
        </div>

        {/* Curriculum Grid Section */}
        <div id="tentang" className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-black bg-[#FFD000] border-2 border-black px-2.5 py-0.5 rounded shadow-[2px_2px_0px_0px_#000000]">
                Kurikulum Unggulan
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mt-2 text-black">
                APA SAJA YANG AKAN DIPELAJARI?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="neo-card p-6 flex flex-col justify-between hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_#000000] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${item.bgColor} border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-black" />
                      </div>
                      <span className="text-xs font-extrabold uppercase border-2 border-black bg-white px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000000]">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
