"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowLeft, Mail, MessageCircle, Share2, Award, Calendar } from "lucide-react";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "TIK-2026-REG-001";
  const name = searchParams.get("name") || "Calon Siswa TIK";
  const email = searchParams.get("email") || "siswa@sample.id";
  const whatsapp = searchParams.get("whatsapp") || "081234567890";

  // Generate a short ticket code from ID
  const ticketCode = id.length > 8 ? `SDN231-${id.slice(-6).toUpperCase()}` : id;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Neobrutalist Celebration Card */}
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] overflow-hidden">
        {/* Banner header */}
        <div className="bg-[#4ADE80] border-b-4 border-black p-8 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-3 border-black rounded-full shadow-[4px_4px_0px_0px_#000000] mb-4">
            <CheckCircle2 className="w-10 h-10 text-black" />
          </div>
          <span className="block bg-black text-white font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded w-max mx-auto mb-2">
            Pendaftaran Berhasil Dikirim!
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
            TERIMA KASIH, {name}! 🎉
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-900 mt-2">
            Formulir pendaftarannmu di Ekstrakurikuler TIK SDN 231 Sukaasih telah resmi tersimpan di sistem kami.
          </p>
        </div>

        {/* Ticket Summary Section */}
        <div className="p-6 sm:p-10">
          <div className="bg-[#F4F4F0] border-3 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_#000000] mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                  NOMOR TIKET PENDAFTARAN
                </span>
                <p className="text-2xl font-black text-black tracking-wider font-mono mt-0.5">
                  {ticketCode}
                </p>
              </div>
              <span className="neo-badge bg-[#FFD000] text-black">
                MENUNGGU KONFIRMASI
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
              <div>
                <span className="block text-xs font-bold text-gray-600 uppercase">
                  NAMA LENGKAP
                </span>
                <p className="font-extrabold text-black">{name}</p>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-600 uppercase">
                  NOMOR WHATSAPP
                </span>
                <p className="font-extrabold text-black">{whatsapp}</p>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-600 uppercase">
                  SEKOLAH ASAL
                </span>
                <p className="font-extrabold text-black">SDN 231 Sukaasih</p>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-600 uppercase">
                  STATUS PENDAFTARAN
                </span>
                <p className="font-extrabold text-black">TERDAFTAR DI SISTEM</p>
              </div>
            </div>
          </div>

          {/* Next Steps Guide */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-black uppercase text-black">
              📌 Apa Langkah Selanjutnya?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white border-2 border-black rounded-lg">
                <div className="w-8 h-8 rounded bg-[#FFD000] border-2 border-black flex items-center justify-center font-black text-black flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-extrabold text-black text-sm">
                    Pantau WhatsApp secara Berkala
                  </h4>
                  <p className="text-xs font-medium text-gray-700 mt-0.5">
                    Pembina akan mengonfirmasi pendaftaran dan mengoordinasikan jadwal kegiatan melalui nomor WhatsApp yang telah kamu daftarkan (<em>{whatsapp}</em>).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border-2 border-black rounded-lg">
                <div className="w-8 h-8 rounded bg-[#A78BFA] border-2 border-black flex items-center justify-center font-black text-black flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-extrabold text-black text-sm">
                    Siapkan Antusiasme Belajarmu!
                  </h4>
                  <p className="text-xs font-medium text-gray-700 mt-0.5">
                    Mari bergabung belajar bersama dan jelajahi berbagai ilmu seru seputar Teknologi Informasi dan Komunikasi di SDN 231 Sukaasih.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t-2 border-black">
            <Link
              href="/"
              className="neo-button-outline w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <a
              href="https://ojannnn-prog.github.io/showcase-ekskul-tik/"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-button-primary w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4" />
              Lihat Showcase Karya
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
