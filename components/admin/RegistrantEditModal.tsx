"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Edit3, Loader2 } from "lucide-react";

interface Registrant {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  reason: string;
  status: string;
  notes?: string | null;
}

interface RegistrantEditModalProps {
  registrant: Registrant | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function RegistrantEditModal({
  registrant,
  onClose,
  onSaved,
}: RegistrantEditModalProps) {
  const [name, setName] = useState(registrant ? registrant.name : "");
  const [email, setEmail] = useState(registrant ? registrant.email : "-");
  const [whatsapp, setWhatsapp] = useState(registrant ? registrant.whatsapp : "");
  const [reason, setReason] = useState(registrant ? registrant.reason : "");
  const [status, setStatus] = useState(registrant ? registrant.status : "PENDING");
  const [notes, setNotes] = useState(registrant ? registrant.notes || "" : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!registrant) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/registrants/${registrant.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email || "-",
          whatsapp,
          reason,
          status,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal mengupdate data pendaftar.");
      }

      onSaved();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Titlebar */}
        <div className="bg-[#FFD000] border-b-4 border-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-black" />
            <h3 className="font-black text-lg uppercase text-black">
              EDIT DATA PENDAFTAR
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] text-black font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[#F87171] border-2 border-black rounded text-xs font-bold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-black uppercase mb-1">
              Nama Lengkap *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="neo-input text-sm py-2"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">
              No. WhatsApp *
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              className="neo-input text-sm py-2"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">
              Status Pendaftaran
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="neo-input text-sm py-2 font-bold"
            >
              <option value="PENDING">PENDING (Menunggu)</option>
              <option value="APPROVED">APPROVED (Diterima)</option>
              <option value="REJECTED">REJECTED (Ditolak)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">
              Alasan Bergabung
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="neo-input text-sm py-2 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">
              Catatan Internal Admin (Opsional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Siswa kelas 5, sangat aktif"
              className="neo-input text-sm py-2"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="neo-button-outline text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="neo-button-primary text-xs"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
