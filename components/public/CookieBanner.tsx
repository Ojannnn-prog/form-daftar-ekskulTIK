"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, Check, Shield } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent_sdn231");
    if (!consent) {
      // Small delay for smooth appearance after page load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent_sdn231", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent_sdn231", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] overflow-hidden">
        {/* Top bar */}
        <div className="bg-[#FFD000] border-b-3 border-black px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black text-[#FFD000] p-1 rounded border border-black">
              <Cookie className="w-4 h-4" />
            </div>
            <span className="font-black text-xs uppercase tracking-wider text-black">
              PENGGUNAAN COOKIES 🍪
            </span>
          </div>
          <button
            onClick={handleReject}
            className="p-1 hover:bg-black/10 rounded font-bold transition-colors text-black"
            aria-label="Tutup Banner Cookie"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs font-bold text-gray-800 leading-relaxed">
            Situs Ekstrakurikuler TIK SDN 231 Sukaasih menggunakan cookie untuk
            menyimpan preferensi navigasi dan meningkatkan pengalaman Anda.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="neo-button-success bg-[#4ADE80] text-black text-xs py-2 px-4 flex-1 font-black flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" /> Terima Semua
            </button>
            <button
              onClick={handleReject}
              className="neo-button-outline text-xs py-2 px-3 font-bold cursor-pointer"
            >
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
