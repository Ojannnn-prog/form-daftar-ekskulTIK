"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MousePointer, Monitor, Menu, X, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F4F4F0] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-[#FFD000] border-3 border-black p-2.5 rounded-lg shadow-[3px_3px_0px_0px_#000000] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform flex items-center gap-1.5">
              <MousePointer className="w-6 h-6 text-black fill-black" />
              <Monitor className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="block font-black text-xs uppercase tracking-widest text-[#A78BFA] bg-black px-1.5 py-0.5 w-max">
                Ekskul Resmi
              </span>
              <span className="font-black text-lg sm:text-xl tracking-tight text-black">
                SDN 231 SUKAASIH // TIK
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#tentang"
              className="font-bold text-black hover:text-[#A78BFA] transition-colors"
            >
              Kurikulum
            </a>
            <a
              href="#showcase"
              className="font-bold text-black hover:text-[#A78BFA] transition-colors"
            >
              Video & Karya
            </a>
            <a
              href="#form-daftar"
              className="font-bold text-black hover:text-[#A78BFA] transition-colors"
            >
              Form Daftar
            </a>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 bg-[#A78BFA] text-black font-extrabold px-4 py-2 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000000] transition-all text-sm"
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Portal
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-[#FFD000] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] text-black font-bold"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-white px-4 pt-4 pb-6 space-y-3">
          <a
            href="#tentang"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 font-bold text-black border-2 border-black bg-[#F4F4F0] rounded-md shadow-[2px_2px_0px_0px_#000000]"
          >
            Kurikulum Ekskul
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 font-bold text-black border-2 border-black bg-[#F4F4F0] rounded-md shadow-[2px_2px_0px_0px_#000000]"
          >
            Video & Showcase Karya
          </a>
          <a
            href="#form-daftar"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 font-bold text-black border-2 border-black bg-[#FFD000] rounded-md shadow-[2px_2px_0px_0px_#000000]"
          >
            Form Pendaftaran
          </a>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-black border-2 border-black bg-[#A78BFA] rounded-md shadow-[2px_2px_0px_0px_#000000]"
          >
            <ShieldAlert className="w-4 h-4" />
            Masuk Admin Portal
          </Link>
        </div>
      )}
    </header>
  );
}
