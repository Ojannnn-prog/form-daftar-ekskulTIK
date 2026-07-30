"use client";

import React from "react";
import { X, Mail, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface EmailLogItem {
  id: string;
  recipient: string;
  subject: string;
  bodyHtml: string;
  status: string;
  createdAt: string;
  registrant?: {
    name: string;
    whatsapp: string;
    status: string;
  };
}

interface EmailPreviewModalProps {
  log: EmailLogItem | null;
  onClose: () => void;
}

export default function EmailPreviewModal({ log, onClose }: EmailPreviewModalProps) {
  if (!log) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Titlebar */}
        <div className="bg-[#FFD000] border-b-4 border-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-black" />
            <div>
              <span className="block font-black text-xs uppercase tracking-wider text-black">
                PRATINJAU NOTIFIKASI EMAIL
              </span>
              <h3 className="font-extrabold text-base text-black truncate max-w-sm">
                {log.subject}
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

        {/* Email Metadata Bar */}
        <div className="bg-[#F4F4F0] border-b-2 border-black px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <div>
            <span className="text-gray-500 uppercase">Kepada:</span>{" "}
            <span className="text-black">{log.recipient}</span>
            {log.registrant && (
              <span className="ml-1 text-gray-700">({log.registrant.name})</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded border border-black uppercase text-[10px] ${
                log.status === "SENT"
                  ? "bg-[#4ADE80] text-black"
                  : log.status === "SIMULATED"
                  ? "bg-[#A78BFA] text-black"
                  : "bg-[#F87171] text-black"
              }`}
            >
              {log.status === "SENT"
                ? "✓ TERKIRIM (RESEND API)"
                : log.status === "SIMULATED"
                ? "⚙ DEV SIMULATED LOG"
                : "✕ GAGAL"}
            </span>
            <span className="text-gray-600">
              {new Date(log.createdAt).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Rendered HTML Body Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] rounded-xl overflow-hidden">
            <div
              className="p-4"
              dangerouslySetInnerHTML={{ __html: log.bodyHtml }}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t-4 border-black px-6 py-4 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-600">
            ℹ Email ini di-render secara nyata dengan spesifikasi HTML Neobrutalism.
          </p>
          <button
            onClick={onClose}
            className="neo-button-primary px-5 py-2 text-xs"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
}
