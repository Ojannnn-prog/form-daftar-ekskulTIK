"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  MousePointer,
  Monitor,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, don't show sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    { name: "Overview Dasbor", href: "/admin", icon: LayoutDashboard },
    { name: "Data Pendaftar", href: "/admin/pendaftar", icon: Users },
    { name: "Pengaturan & Kuota", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#FFD000] border-b-4 border-black p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-black text-[#FFD000] p-1.5 rounded border-2 border-black">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-black text-black uppercase tracking-tight">
            ADMIN SDN 231 TIK
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000]"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#F4F4F0] border-r-4 border-black flex flex-col justify-start space-y-6 p-6 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:min-h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo Brand */}
          <div className="flex items-center justify-between pb-5 border-b-4 border-black mb-5">
            <div className="flex items-center gap-3">
              <div className="bg-[#FFD000] border-3 border-black p-2 rounded-lg shadow-[3px_3px_0px_0px_#000000]">
                <Monitor className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="block font-black text-xs uppercase tracking-widest text-[#A78BFA] bg-black px-1.5 py-0.5 rounded w-max">
                  ADMIN PANEL
                </span>
                <span className="font-black text-lg tracking-tight text-black">
                  SDN 231 TIK
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 text-black font-bold"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="space-y-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-black text-sm uppercase transition-all border-2 border-black ${
                    active
                      ? "bg-[#FFD000] text-black shadow-[4px_4px_0px_0px_#000000] translate-x-[2px]"
                      : "bg-white text-gray-800 hover:bg-[#A78BFA] hover:text-black hover:shadow-[3px_3px_0px_0px_#000000]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions - compact right below nav items */}
        <div className="space-y-2.5 pt-4 border-t-2 border-black">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-black rounded-lg text-xs font-black uppercase text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_#000000] transition-all"
          >
            <ExternalLink className="w-4 h-4" /> Buka Situs Publik
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F87171] border-2 border-black rounded-lg text-xs font-black uppercase text-black hover:bg-red-500 shadow-[3px_3px_0px_0px_#000000] transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {loggingOut ? "Keluar..." : "Keluar Sesi Admin"}
          </button>
        </div>
      </aside>
    </>
  );
}
