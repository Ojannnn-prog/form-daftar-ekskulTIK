"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Users, Sparkles, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [maxQuota, setMaxQuota] = useState(50);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.success) {
          setMaxQuota(parseInt(data.data.max_quota, 10) || 50);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_quota: maxQuota,
        }),
      });

      if (res.ok) {
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 4000);
      } else {
        alert("Gagal menyimpan pengaturan.");
      }
    } catch (e) {
      alert("Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Banner */}
      <div className="bg-[#FFD000] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] flex items-center justify-between">
        <div>
          <span className="inline-block bg-black text-white font-extrabold text-xs uppercase px-2.5 py-1 rounded border-2 border-black mb-1.5">
            ⚙ KONFIGURASI PROYEK
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
            PENGATURAN KUOTA EKSKUL TIK
          </h1>
          <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
            Ubah kuota pendaftaran secara dinamis sesuai kebutuhan semester.
          </p>
        </div>
        <div className="hidden sm:flex bg-white p-3 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000]">
          <Settings className="w-8 h-8 text-black" />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-black mb-3" />
          <p className="font-black text-sm uppercase">Memuat Konfigurasi...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {successMsg && (
            <div className="bg-[#4ADE80] border-3 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000000] flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-black text-sm">
                  Pengaturan Berhasil Disimpan!
                </h4>
                <p className="text-xs font-semibold text-gray-900 mt-0.5">
                  Kuota maksimal siswa telah diperbarui secara langsung.
                </p>
              </div>
            </div>
          )}

          {/* Max Quota Setting Card */}
          <div className="neo-card p-6 sm:p-8 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-black pb-3">
              <Users className="w-5 h-5 text-[#A78BFA]" />
              <h2 className="text-lg font-black uppercase text-black">
                Kapasitas / Kuota Maksimal Pendaftar
              </h2>
            </div>

            <p className="text-sm font-medium text-gray-700 leading-relaxed">
              Tentukan berapa jumlah kursi maksimal untuk kelas ekskul semester ini (sesuai arahan: **50 Siswa**). Nilai ini menentukan tampilan *Progress Bar Kuota* di dasbor Anda.
            </p>

            <div>
              <label htmlFor="maxquota" className="block text-xs font-black uppercase text-black mb-2">
                Jumlah Kursi Maksimal (Siswa) *
              </label>
              <input
                id="maxquota"
                type="number"
                min={1}
                max={500}
                value={maxQuota}
                onChange={(e) => setMaxQuota(parseInt(e.target.value, 10) || 50)}
                required
                className="neo-input max-w-xs font-black font-mono text-lg"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="neo-button-primary px-8 py-4 text-base"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan Pengaturan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" /> Simpan Semua Pengaturan
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
