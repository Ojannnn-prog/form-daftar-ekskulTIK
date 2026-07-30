"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Sparkles, Film, Monitor, Award, Heart, CheckCircle2 } from "lucide-react";

export default function ShowcaseSection() {
  const [showIframeModal, setShowIframeModal] = useState(false);

  return (
    <section id="showcase" className="py-16 bg-[#F4F4F0] border-t-4 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="neo-badge bg-[#A78BFA] text-black mb-3">
            <Film className="w-3.5 h-3.5 mr-1.5 inline" /> Showcase & Video Kegiatan
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            INTIP SERUNYA VIDEO & SHOWCASE EKSKUL TIK
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mt-4 font-medium">
            Saksikan video iklan resmi kegiatan kami dan eksplorasi karya web digital yang telah dibuat oleh siswa SDN 231 Sukaasih!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Google Drive Video Embed in a Neobrutalist Retro Monitor Frame */}
          <div className="lg:col-span-7">
            <div className="bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_#000000] overflow-hidden">
              {/* Window Titlebar */}
              <div className="bg-[#FFD000] border-b-4 border-black px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 border border-black block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black block" />
                  <span className="w-3 h-3 rounded-full bg-green-500 border border-black block" />
                </div>
                <span className="font-mono text-xs font-black uppercase text-black tracking-wider">
                  IKLAN_RESMI_EKSKUL_TIK.MP4
                </span>
                <span className="font-black text-xs">HD // 1080P</span>
              </div>

              {/* Responsive 16:9 Video Embed Container */}
              <div className="relative w-full pb-[56.25%] bg-black">
                <iframe
                  src="https://drive.google.com/file/d/1shwiSNEplb7Cvf46vH4Ce2uRUFDWbJ74/preview"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  title="Video Iklan Ekskul TIK SDN 231 Sukaasih"
                />
              </div>

              {/* Video Footer Caption */}
              <div className="p-4 bg-[#F4F4F0] border-t-4 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 bg-black text-[#FFD000] font-black text-xs uppercase rounded">
                    VIDEO
                  </span>
                  <p className="text-xs font-bold text-gray-800">
                    Liputan & pengenalan kegiatan Ekstrakurikuler TIK
                  </p>
                </div>
                <a
                  href="https://drive.google.com/file/d/1shwiSNEplb7Cvf46vH4Ce2uRUFDWbJ74/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black underline uppercase hover:text-[#A78BFA]"
                >
                  Buka di Drive ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Showcase Karya Siswa Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="neo-card p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="neo-badge bg-[#FFD000] text-black">
                  <Award className="w-3.5 h-3.5 mr-1" /> Showcase Website Siswa
                </span>
                <span className="text-xs font-extrabold text-gray-600">
                  WEB INTERAKTIF
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-black mb-3">
                Showcase Website Ekskul TIK SDN 231 Sukaasih
              </h3>

              <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">
                Ingin tahu karya yang bisa dibuat selama mengikuti ekskul? Eksplorasi showcase website interaktif hasil kreasi teknologi terkini dan vibe coding yang dipamerkan untuk menginspirasi siswa baru!
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2 text-sm font-bold text-black">
                  <CheckCircle2 className="w-5 h-5 text-[#4ADE80] fill-black flex-shrink-0 mt-0.5" />
                  <span>Website interaktif karya siswa hasil kreasi vibe coding</span>
                </div>
                <div className="flex items-start gap-2 text-sm font-bold text-black">
                  <CheckCircle2 className="w-5 h-5 text-[#FFD000] fill-black flex-shrink-0 mt-0.5" />
                  <span>Proyek halaman web digital edukatif & interaktif</span>
                </div>
                <div className="flex items-start gap-2 text-sm font-bold text-black">
                  <CheckCircle2 className="w-5 h-5 text-[#A78BFA] fill-black flex-shrink-0 mt-0.5" />
                  <span>Wadah apresiasi kreasi web untuk seluruh peserta ekskul</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://ojannnn-prog.github.io/showcase-ekskul-tik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-button-primary w-full text-center"
                >
                  <ExternalLink className="w-5 h-5" />
                  Buka Showcase Ekskul TIK
                </a>
              </div>
            </div>

            {/* Quick Testimonial Badge / Info */}
            <div className="neo-card p-5 bg-[#FFD000] flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-black text-[#FFD000] font-black text-xl flex items-center justify-center flex-shrink-0 border-2 border-black">
                ★
              </div>
              <div>
                <h4 className="font-extrabold text-black text-sm">
                  Dukung Potensi Anak Sejak Dini!
                </h4>
                <p className="text-xs font-semibold text-gray-900 mt-0.5">
                  Ekskul TIK membantu mengembangkan nalar logis dan kreativitas digital siswa sekolah dasar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
