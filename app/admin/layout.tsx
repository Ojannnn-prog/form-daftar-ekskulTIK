import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F4F4F0]">
      <AdminSidebar />
      <main className="w-full lg:flex-1 overflow-x-hidden p-3 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
