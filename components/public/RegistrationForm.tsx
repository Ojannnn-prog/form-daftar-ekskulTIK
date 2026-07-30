"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, User, Mail, Phone, MessageSquare } from "lucide-react";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter" })
    .max(100, { message: "Nama lengkap maksimal 100 karakter" }),
  whatsapp: z
    .string()
    .min(10, { message: "Nomor WhatsApp minimal 10 digit angka" })
    .max(15, { message: "Nomor WhatsApp maksimal 15 digit angka" })
    .regex(/^(08|628|\+628)[0-9]+$/, {
      message: "Nomor WhatsApp harus diawali 08 atau 628 dan hanya berupa angka",
    }),
  reason: z
    .string()
    .min(10, { message: "Alasan bergabung minimal 10 karakter agar pembina lebih memahamimu" })
    .max(500, { message: "Alasan maksimal 500 karakter" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegistrationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      reason: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          email: "-", // Placeholder to satisfy DB schema without needing email input
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal mengirim data pendaftaran. Silakan coba lagi.");
      }

      // Redirect to Sukses page with ticket and data parameters
      const params = new URLSearchParams({
        id: result.data.id,
        name: result.data.name,
        whatsapp: result.data.whatsapp,
      });

      router.push(`/sukses?${params.toString()}`);
    } catch (err: unknown) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form-daftar" className="py-12 sm:py-20 bg-[#F4F4F0] border-t-4 border-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#FFD000] border-b-4 border-black p-6 sm:p-8 text-center relative">
            <span className="inline-block bg-black text-white font-extrabold text-xs uppercase px-3 py-1 rounded border-2 border-black mb-3">
              ✨ Tanpa Pembuatan Akun
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
              FORMULIR PENDAFTARAN EKSKUL TIK
            </h2>
            <p className="text-sm sm:text-base font-medium text-gray-900 mt-2 max-w-xl mx-auto">
              Isi data di bawah ini dengan benar. Informasi kegiatan ekskul akan dikoordinasikan langsung melalui WhatsApp kamu!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-6">
            {apiError && (
              <div className="p-4 bg-[#F87171] border-3 border-black text-black font-extrabold text-sm rounded-xl shadow-[4px_4px_0px_0px_#000000]">
                ⚠️ {apiError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1.5">
                  Nama Lengkap Siswa *
                </label>
                <input
                  {...register("name")}
                  className="neo-input"
                  placeholder="Contoh: Ahmad Zaki"
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-extrabold text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1.5">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  {...register("whatsapp")}
                  className="neo-input"
                  placeholder="Contoh: 081234567890"
                />
                <p className="text-[11px] font-bold text-gray-600 mt-1">
                  * Untuk undangan masuk ke grup WhatsApp ekskul TIK
                </p>
                {errors.whatsapp && (
                  <p className="mt-1 text-xs font-extrabold text-red-600">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1.5">
                  Alasan Bergabung Ekskul TIK *
                </label>
                <textarea
                  {...register("reason")}
                  rows={3}
                  className="neo-input resize-none"
                  placeholder="Ceritakan hal apa yang ingin dipelajari (misal: ingin belajar membuat game atau animasi...)"
                />
                {errors.reason && (
                  <p className="mt-1 text-xs font-extrabold text-red-600">
                    {errors.reason.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="neo-button-primary w-full py-4 text-base sm:text-lg justify-center font-black"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sedang Mengirim Pendaftaran...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kirim Formulir Pendaftaran Sekarang 🚀
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs font-medium text-gray-600">
              🔒 Data kamu aman dan hanya digunakan oleh Pembina Ekskul TIK SDN 231 Sukaasih untuk keperluan koordinasi kegiatan dan informasi ekskul.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
