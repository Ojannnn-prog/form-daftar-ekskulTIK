"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, Lock, User, AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login gagal");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col justify-center items-center p-4">
      {/* Top back link */}
      <div className="max-w-md w-full mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-black text-xs uppercase hover:text-[#A78BFA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Halaman Publik
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] overflow-hidden">
        {/* Banner */}
        <div className="bg-[#FFD000] border-b-4 border-black p-6 text-center">
          <div className="w-14 h-14 bg-black text-[#FFD000] rounded-xl border-3 border-black mx-auto mb-3 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <span className="block font-extrabold text-xs uppercase bg-black text-white px-2 py-0.5 rounded w-max mx-auto mb-1">
            PORTAL KHUSUS PEMBINA
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-black">
            LOGIN ADMIN EKSKUL TIK
          </h1>
          <p className="text-xs font-bold text-gray-800 mt-1">
            SDN 231 Sukaasih // Sistem Manajemen Pendaftar
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} autoComplete="off" className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="bg-[#F87171] border-2 border-black p-3 rounded-lg shadow-[3px_3px_0px_0px_#000000] flex items-center gap-2 text-sm font-bold text-black">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="admin_user_field" className="block text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User className="w-4 h-4" /> Username Admin
            </label>
            <input
              id="admin_user_field"
              name="admin_username_no_autofill"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="neo-input"
              placeholder="Masukkan Username Admin..."
            />
          </div>

          <div>
            <label htmlFor="admin_pass_field" className="block text-xs font-black text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> Password Admin
            </label>
            <div className="relative">
              <input
                id="admin_pass_field"
                name="admin_password_no_autofill"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="neo-input pr-12"
                placeholder="Masukkan Password Admin..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-700 hover:text-black transition-colors"
                title={showPassword ? "Sembunyikan Password" : "Lihat Password (Mata Elang)"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="neo-button-primary w-full py-3.5 font-black uppercase text-sm mt-4"
          >
            {loading ? "Memverifikasi..." : "MASUK KE DASHBOARD ADMIN 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}
