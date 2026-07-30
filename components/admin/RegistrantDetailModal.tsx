"use client";

import React from "react";
import { X, User, Phone, MessageSquare, Calendar, ShieldCheck, Clock, FileText } from "lucide-react";

interface Registrant {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  reason: string;
  status: string;
  notes?: string | null;
  createdAt: string | Date;
  emailLogs?: Array<{
    id: string;
    subject: string;
    status: string;
    createdAt: string;
    bodyHtml: string;
  }>;
}

interface RegistrantDetailModalProps {
  registrant: Registrant | null;
  onClose: () => void;
  onPreviewEmail?: (log: unknown) => void;
}

export default function RegistrantDetailModal({
  registrant,
  onClose,
  onPreviewEmail,
}: RegistrantDetailModalProps) {
  if (!registrant) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Titlebar */}
        <div className="bg-[#A78BFA] border-b-4 border-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-black" />
            <div>
              <span className="block font-black text-xs uppercase tracking-wider text-black">
                BIODATA LENGKAP PENDAFTAR
              </span>
              <h3 className="font-black text-lg text-black">
                {registrant.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] text-black font-bold hover:bg-gray-100"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Badge & Ticket Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#F4F4F0] border-2 border-black rounded-xl">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase">
                ID PENDAFTARAN
              </span>
              <p className="font-mono font-black text-black">{registrant.id}</p>
            </div>
            <div>
              <span
                className={`neo-badge ${
                  registrant.status === "APPROVED"
                    ? "bg-[#4ADE80] text-black"
                    : registrant.status === "REJECTED"
                    ? "bg-[#F87171] text-black"
                    : "bg-[#FFD000] text-black"
                }`}
              >
                {registrant.status === "APPROVED"
                  ? "✓ Diterima"
                  : registrant.status === "REJECTED"
                  ? "✕ Ditolak"
                  : "⌛ Menunggu Seleksi"}
              </span>
            </div>
          </div>

          {/* Biodata Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-white border-2 border-black rounded-xl">
              <span className="text-xs font-black text-gray-500 uppercase flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Nomor WhatsApp
              </span>
              <p className="font-extrabold text-black mt-1">{registrant.whatsapp}</p>
            </div>
          </div>

          {/* Alasan */}
          <div className="p-4 bg-white border-2 border-black rounded-xl">
            <span className="text-xs font-black text-gray-500 uppercase flex items-center gap-1 mb-2">
              <MessageSquare className="w-3.5 h-3.5" /> Alasan Bergabung Ekskul TIK
            </span>
            <p className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">
              {registrant.reason}
            </p>
          </div>

          {/* Catatan Admin */}
          {registrant.notes && (
            <div className="p-4 bg-[#FFD000]/20 border-2 border-black rounded-xl">
              <span className="text-xs font-black text-black uppercase flex items-center gap-1 mb-1">
                <FileText className="w-3.5 h-3.5" /> Catatan Internal Admin
              </span>
              <p className="text-sm font-bold text-gray-900">{registrant.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t-4 border-black px-6 py-4 flex justify-end">
          <button onClick={onClose} className="neo-button-outline">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
