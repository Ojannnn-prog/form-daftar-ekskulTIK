import React from "react";
import { MousePointer, Monitor } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-black py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFD000] border-2 border-black p-2 rounded-lg shadow-[2px_2px_0px_0px_#000000]">
              <Monitor className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-wide text-black">
                Ekskul TIK SDN 231 Sukaasih
              </p>
              <p className="text-xs font-semibold text-gray-600">
                Membentuk Anak Didik Unggul & Kreatif di Era Digital
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-black">
            <a href="#tentang" className="hover:text-[#A78BFA] transition-colors">
              Kurikulum
            </a>
            <a href="#showcase" className="hover:text-[#A78BFA] transition-colors">
              Showcase Website
            </a>
            <a
              href="https://ojannnn-prog.github.io/showcase-ekskul-tik/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A78BFA] transition-colors"
            >
              Website Vibe Coder ↗
            </a>
            <a href="/admin/login" className="hover:text-[#A78BFA] transition-colors">
              Login Admin
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-black flex items-center justify-center text-xs font-bold text-gray-700">
          <p>© {new Date().getFullYear()} SDN 231 Sukaasih. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
