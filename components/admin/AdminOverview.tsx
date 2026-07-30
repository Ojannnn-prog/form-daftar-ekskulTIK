"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Mail,
  ArrowRight,
  Sparkles,
  Settings,
} from "lucide-react";

interface AdminOverviewProps {
  stats: {
    total: number;
    approved: number;
    rejected: number;
    pending: number;
    maxQuota: number;
  };
}

export default function AdminOverview({ stats }: AdminOverviewProps) {
  const quotaPercent = Math.min(
    Math.round((stats.approved / stats.maxQuota) * 100),
    100
  );

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-[#FFD000] border-4 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-black text-white font-extrabold text-xs uppercase px-2.5 py-1 rounded border-2 border-black mb-2">
            ⚡ SDN 231 Sukaasih // Tahun Ajaran 2026/2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
            DASHBOARD PEMBINA TIK
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">
            Kelola seleksi siswa baru, pantau kuota penerimaan, dan kirim pengumuman otomatis via email dengan satu klik!
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/pendaftar"
            className="neo-button-outline bg-white text-black font-extrabold text-sm px-5 py-3"
          >
            Kelola Pendaftar ({stats.pending} Menunggu) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quota Progress Bar Card (Requested by User: Default 50 Siswa) */}
      <div className="neo-card p-6 sm:p-8 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#A78BFA] bg-black px-2 py-0.5 rounded">
              KAPASITAS KELAS EKSKUL
            </span>
            <h2 className="text-2xl font-black text-black mt-1">
              PROGRESS KUOTA PENERIMAAN SISWA
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-black font-mono">
              {stats.approved}{" "}
              <span className="text-lg text-gray-500 font-bold">
                / {stats.maxQuota} Siswa
              </span>
            </span>
            <Link
              href="/admin/settings"
              className="p-2 bg-[#F4F4F0] border-2 border-black rounded-lg hover:bg-[#FFD000] transition-colors"
              title="Ubah Kuota"
            >
              <Settings className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>

        {/* Neobrutalist Progress Bar */}
        <div className="w-full h-8 bg-[#F4F4F0] border-3 border-black rounded-xl overflow-hidden p-1 shadow-[inset_2px_2px_0px_0px_#000000]">
          <div
            className={`h-full border-2 border-black rounded-lg transition-all duration-500 ${
              quotaPercent >= 90
                ? "bg-[#F87171]"
                : quotaPercent >= 60
                ? "bg-[#FFD000]"
                : "bg-[#4ADE80]"
            }`}
            style={{ width: `${quotaPercent}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs font-bold text-gray-700">
          <span>
            {stats.maxQuota - stats.approved > 0
              ? `Tersisa ${stats.maxQuota - stats.approved} kursi tersedia`
              : "⚠️ Kuota maksimal telah terpenuhi!"}
          </span>
          <span>{quotaPercent}% Kuota Terisi</span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total */}
        <div className="neo-card p-6 bg-[#F4F4F0] border-l-8 border-l-black">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-600">
              TOTAL PENDAFTAR
            </span>
            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center border-2 border-black">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-black font-mono">
            {stats.total}
          </p>
          <p className="text-xs font-bold text-gray-600 mt-1">
            Seluruh berkas masuk
          </p>
        </div>

        {/* Menunggu */}
        <div className="neo-card p-6 bg-[#FFD000] border-l-8 border-l-black">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              MENUNGGU SELEKSI
            </span>
            <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center border-2 border-black">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-black font-mono">
            {stats.pending}
          </p>
          <p className="text-xs font-bold text-gray-900 mt-1">
            Perlu di-review pembina
          </p>
        </div>

        {/* Diterima */}
        <div className="neo-card p-6 bg-[#4ADE80] border-l-8 border-l-black">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              RESMI DITERIMA
            </span>
            <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center border-2 border-black">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-black font-mono">
            {stats.approved}
          </p>
          <p className="text-xs font-bold text-gray-900 mt-1">
            Email & link WA terkirim
          </p>
        </div>

        {/* Ditolak */}
        <div className="neo-card p-6 bg-[#F87171] border-l-8 border-l-black">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              TIDAK DITERIMA
            </span>
            <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center border-2 border-black">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-black font-mono">
            {stats.rejected}
          </p>
          <p className="text-xs font-bold text-gray-900 mt-1">
            Pengumuman terkirim
          </p>
        </div>
      </div>

      {/* Quick links & tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="neo-card p-6 bg-white">
          <h3 className="text-lg font-black uppercase text-black mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#A78BFA]" /> Fitur Email Otomatis (Approve / Reject)
          </h3>
          <p className="text-sm font-medium text-gray-700 leading-relaxed">
            Setiap tombol <strong>&quot;Terima&quot;</strong> atau <strong>&quot;Tolak&quot;</strong> pada tabel pendaftar akan langsung memicu pembuatan dan pengiriman email ke alamat siswa. Anda juga bisa mengecek riwayat serta pratinjau HTML email di menu <strong>Riwayat Email &amp; Log</strong>.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/email-logs"
              className="text-xs font-extrabold underline text-black hover:text-[#A78BFA]"
            >
              Buka Riwayat Email &amp; Log Pratinjau →
            </Link>
          </div>
        </div>

        <div className="neo-card p-6 bg-white">
          <h3 className="text-lg font-black uppercase text-black mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#4ADE80]" /> Export Laporan Excel &amp; PDF
          </h3>
          <p className="text-sm font-medium text-gray-700 leading-relaxed">
            Unduh seluruh data pendaftar dalam format <strong>Excel (.xlsx)</strong> untuk analisis lebih lanjut atau cetak laporan sekolah resmi berbentuk <strong>PDF</strong> berlogo SDN 231 Sukaasih dengan sekali klik.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/pendaftar"
              className="text-xs font-extrabold underline text-black hover:text-[#A78BFA]"
            >
              Buka Tabel &amp; Export Laporan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
