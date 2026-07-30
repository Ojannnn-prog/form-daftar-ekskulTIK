"use client";

import React, { useEffect, useState } from "react";
import AdminOverview from "@/components/admin/AdminOverview";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    maxQuota: 50,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/registrants");
        const data = await res.json();
        if (data.success) {
          setStats(data.data.stats);
        }
      } catch (e) {
        console.error("Failed to load dashboard stats", e);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-3" />
        <p className="font-black text-sm uppercase">Memuat Analitik Dasbor...</p>
      </div>
    );
  }

  return <AdminOverview stats={stats} />;
}
