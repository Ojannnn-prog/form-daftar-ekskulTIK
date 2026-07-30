import React, { Suspense } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import SuccessContent from "@/components/public/SuccessContent";

export default function SuksesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F0]">
      <Navbar />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="max-w-xl mx-auto py-20 text-center font-black text-xl uppercase">
              Memuat Tiket Pendaftaran...
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
