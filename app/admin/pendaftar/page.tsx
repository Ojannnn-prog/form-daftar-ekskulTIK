"use client";

import React from "react";
import PendaftarTable from "@/components/admin/PendaftarTable";
import { Users, ShieldCheck } from "lucide-react";

export default function PendaftarPage() {
  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-[#A78BFA] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] flex items-center justify-between">
        <div>
          <span className="inline-block bg-black text-white font-extrabold text-xs uppercase px-2.5 py-1 rounded border-2 border-black mb-1.5">
            📋 DATABASE PENDAFTAR MASUK
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
            MANAJEMEN & SELEKSI SISWA
          </h1>
          <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
            Gunakan tombol Terima/Tolak untuk mengubah status sekaligus mengirim email hasil seleksi.
          </p>
        </div>
        <div className="hidden sm:flex bg-white p-3 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000]">
          <Users className="w-8 h-8 text-black" />
        </div>
      </div>

      <PendaftarTable />
    </div>
  );
}
