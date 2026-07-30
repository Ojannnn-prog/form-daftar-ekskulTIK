"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  Trash2,
  Download,
  Upload,
  FileSpreadsheet,
  FileText,
  Loader2,
  Send,
  Sparkles,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { exportToExcel, exportToPDF, parseCSVImport, RegistrantData } from "@/lib/exportImport";
import RegistrantDetailModal from "./RegistrantDetailModal";
import RegistrantEditModal from "./RegistrantEditModal";

export default function PendaftarTable() {
  const [registrants, setRegistrants] = useState<RegistrantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modals state
  const [selectedRegistrant, setSelectedRegistrant] = useState<RegistrantData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Approval flow confirmation state
  const [approvalTarget, setApprovalTarget] = useState<{
    registrant: RegistrantData;
    decision: "APPROVED" | "REJECTED";
  } | null>(null);
  const [approving, setApproving] = useState(false);

  // Import CSV modal state
  const [showImportModal, setShowImportModal] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [importing, setImporting] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<RegistrantData | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRegistrants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (search) params.append("search", search);

      const res = await fetch(`/api/admin/registrants?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setRegistrants(data.data.registrants);
      }
    } catch (error) {
      console.error("Failed to fetch registrants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRegistrants();
    }, 0);
    return () => clearTimeout(timer);
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRegistrants();
  };

  // Execute approval / rejection
  const handleConfirmDecision = async () => {
    if (!approvalTarget) return;
    setApproving(true);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: approvalTarget.registrant.id,
          status: approvalTarget.decision,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchRegistrants();
        setApprovalTarget(null);
      } else {
        alert(data.error || "Gagal mengubah status");
      }
    } catch (e) {
      alert("Terjadi kesalahan sistem saat memproses keputusan.");
    } finally {
      setApproving(false);
    }
  };

  // Execute delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/registrants/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchRegistrants();
        setDeleteTarget(null);
      } else {
        alert("Gagal menghapus data");
      }
    } catch (e) {
      alert("Terjadi kesalahan sistem");
    } finally {
      setDeleting(false);
    }
  };

  // Execute CSV import
  const handleImportCSV = async () => {
    if (!csvText.trim()) return;
    setImporting(true);
    try {
      const parsed = parseCSVImport(csvText);
      if (parsed.length === 0) {
        alert("Format CSV kosong atau tidak valid.");
        setImporting(false);
        return;
      }

      const res = await fetch("/api/admin/registrants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Berhasil mengimpor ${data.count} siswa!`);
        setShowImportModal(false);
        setCsvText("");
        fetchRegistrants();
      } else {
        alert(data.error || "Gagal impor");
      }
    } catch (e) {
      alert("Terjadi kesalahan import");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Search, Filter, Export Excel/PDF, Import CSV) */}
      <div className="neo-card p-6 bg-white space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 flex-1 max-w-lg"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama siswa, email, atau WhatsApp..."
                className="neo-input pl-9 py-2.5 text-sm"
              />
            </div>
            <button
              type="submit"
              className="neo-button-primary py-2.5 px-4 text-sm"
            >
              Cari
            </button>
          </form>

          {/* Export & Import Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportToExcel(registrants)}
              className="neo-button-success bg-[#4ADE80] text-black text-xs py-2 px-3 flex items-center gap-1.5 font-black"
              title="Download format Excel .xlsx"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export Excel (.xlsx)
            </button>
            <button
              onClick={() => exportToPDF(registrants)}
              className="neo-button-secondary bg-[#FFD000] text-black text-xs py-2 px-3 flex items-center gap-1.5 font-black"
              title="Download laporan PDF"
            >
              <FileText className="w-4 h-4" /> Export PDF
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="neo-button-outline text-xs py-2 px-3 flex items-center gap-1.5 font-black"
              title="Impor siswa masal dari CSV"
            >
              <Upload className="w-4 h-4" /> Impor CSV
            </button>
            <button
              onClick={fetchRegistrants}
              className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] hover:bg-gray-100"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Filter Status Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-black">
          <span className="text-xs font-black uppercase text-gray-600 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Status:
          </span>
          {[
            { id: "ALL", label: "Semua" },
            { id: "PENDING", label: "⌛ Menunggu (Pending)" },
            { id: "APPROVED", label: "✓ Diterima (Approved)" },
            { id: "REJECTED", label: "✕ Ditolak (Rejected)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold border-2 border-black transition-all duration-300 ease-in-out active:scale-95 cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-black text-[#FFD000] shadow-[3px_3px_0px_0px_#FFD000] -translate-y-0.5"
                  : "bg-white text-gray-800 hover:bg-gray-100 hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_#000000]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card with Smooth Tab Animation */}
      <div key={statusFilter} className="neo-card bg-white overflow-hidden animate-tab-smooth">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-black mb-3" />
            <p className="font-black text-sm uppercase tracking-wider">
              Memuat Data Pendaftar...
            </p>
          </div>
        ) : registrants.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-black text-lg text-gray-700">
              Tidak ada data pendaftar yang sesuai filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFD000] border-b-4 border-black font-black text-xs uppercase tracking-wider text-black">
                  <th className="py-4 px-4">No</th>
                  <th className="py-4 px-4">Nama Siswa</th>
                  <th className="py-4 px-4">Nomor WhatsApp</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Alasan Bergabung</th>
                  <th className="py-4 px-4">Tanggal</th>
                  <th className="py-4 px-4 text-center">Aksi & Seleksi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black text-sm font-medium">
                {registrants.map((reg, idx) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-[#F4F4F0]/80 transition-colors"
                  >
                    <td className="py-4 px-4 font-black font-mono">{idx + 1}</td>
                    <td className="py-4 px-4 font-black text-black">
                      {reg.name}
                      {reg.notes && (
                        <span className="block text-[11px] font-bold text-gray-500 italic mt-0.5">
                          📝 {reg.notes}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-xs font-bold text-gray-900">
                        WA: {reg.whatsapp}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`neo-badge ${
                          reg.status === "APPROVED"
                            ? "bg-[#4ADE80] text-black"
                            : reg.status === "REJECTED"
                            ? "bg-[#F87171] text-black"
                            : "bg-[#FFD000] text-black"
                        }`}
                      >
                        {reg.status === "APPROVED"
                          ? "✓ Diterima"
                          : reg.status === "REJECTED"
                          ? "✕ Ditolak"
                          : "⌛ Menunggu"}
                      </span>
                    </td>
                    <td className="py-4 px-4 max-w-xs truncate text-gray-700">
                      {reg.reason}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-600 whitespace-nowrap">
                      {new Date(reg.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Approval Flow Buttons */}
                        {reg.status !== "APPROVED" && (
                          <button
                            onClick={() =>
                              setApprovalTarget({ registrant: reg, decision: "APPROVED" })
                            }
                            className="neo-button-success bg-[#4ADE80] text-black text-xs py-1.5 px-2.5"
                            title="Terima Siswa Ini & Kirim Email"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Terima
                          </button>
                        )}
                        {reg.status !== "REJECTED" && (
                          <button
                            onClick={() =>
                              setApprovalTarget({ registrant: reg, decision: "REJECTED" })
                            }
                            className="neo-button-danger bg-[#F87171] text-black text-xs py-1.5 px-2.5"
                            title="Tolak Siswa Ini & Kirim Email"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Tolak
                          </button>
                        )}

                        {/* View Detail Modal */}
                        <button
                          onClick={() => {
                            setSelectedRegistrant(reg);
                            setShowDetailModal(true);
                          }}
                          className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] hover:bg-[#FFD000] transition-colors"
                          title="Lihat Detail & Riwayat Email"
                        >
                          <Eye className="w-4 h-4 text-black" />
                        </button>

                        {/* Edit Modal */}
                        <button
                          onClick={() => {
                            setSelectedRegistrant(reg);
                            setShowEditModal(true);
                          }}
                          className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] hover:bg-[#A78BFA] transition-colors"
                          title="Edit Data"
                        >
                          <Edit3 className="w-4 h-4 text-black" />
                        </button>

                        {/* Delete Action */}
                        <button
                          onClick={() => setDeleteTarget(reg)}
                          className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] hover:bg-red-500 hover:text-white transition-colors"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-4 h-4 text-black" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approval Confirmation Modal (triggers email) */}
      {approvalTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] max-w-md w-full p-6 text-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full border-3 border-black mx-auto flex items-center justify-center ${
                approvalTarget.decision === "APPROVED"
                  ? "bg-[#4ADE80]"
                  : "bg-[#F87171]"
              }`}
            >
              {approvalTarget.decision === "APPROVED" ? (
                <CheckCircle2 className="w-10 h-10 text-black" />
              ) : (
                <XCircle className="w-10 h-10 text-black" />
              )}
            </div>

            <h3 className="text-xl font-black uppercase text-black">
              {approvalTarget.decision === "APPROVED"
                ? "TERIMA SISWA INI?"
                : "TOLAK PENDAFTARAN INI?"}
            </h3>

            <p className="text-sm font-medium text-gray-800">
              Apakah Anda yakin ingin mengubah status{" "}
              <strong className="text-black underline">
                {approvalTarget.registrant.name}
              </strong>{" "}
              menjadi{" "}
              <strong>
                {approvalTarget.decision === "APPROVED"
                  ? "DITERIMA"
                  : "DITOLAK"}
              </strong>
              ?
            </p>

            <div className="p-3 bg-[#F4F4F0] border-2 border-black rounded-lg text-xs font-bold text-left">
              <p className="text-black mb-1">
                ⚡ <strong>Tindakan ini akan langsung:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1 text-gray-700">
                <li>
                  Mengubah status siswa menjadi{" "}
                  <strong>
                    {approvalTarget.decision === "APPROVED" ? "DITERIMA" : "DITOLAK"}
                  </strong>{" "}
                  secara instan
                </li>
                <li>
                  Data akan terperbarui langsung di tabel pendaftar tanpa pengiriman email
                </li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setApprovalTarget(null)}
                className="neo-button-outline w-full"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={approving}
                onClick={handleConfirmDecision}
                className={`w-full font-black text-sm uppercase py-3 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center gap-2 cursor-pointer ${
                  approvalTarget.decision === "APPROVED"
                    ? "bg-[#4ADE80] text-black"
                    : "bg-[#F87171] text-black"
                }`}
              >
                {approving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Ya, Konfirmasi Status Sekarang
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#F87171] border-3 border-black mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-lg font-black uppercase text-black">
              HAPUS DATA PENDAFTAR?
            </h3>
            <p className="text-sm text-gray-700">
              Hapus permanen data <strong>{deleteTarget.name}</strong>? Tindakan
              ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="neo-button-outline w-full"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="neo-button-danger bg-[#F87171] w-full"
              >
                {deleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000000] max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="font-black text-lg uppercase text-black">
                IMPOR SISWA DARI FILE CSV
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1 font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs font-semibold text-gray-700">
              Tempel (Paste) isi data format CSV dengan urutan kolom:{" "}
              <code>Nama, Email, WhatsApp, Alasan, Status</code>. Baris pertama
              dianggap sebagai header.
            </p>
            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={`Nama,Email,WhatsApp,Alasan,Status\nSandi Pratama,sandi@email.com,081234567890,Ingin belajar robotika,PENDING\nSiti Rahma,siti@email.com,081345678912,Ingin belajar desain,APPROVED`}
              className="neo-input font-mono text-xs resize-none"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="neo-button-outline text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={importing}
                onClick={handleImportCSV}
                className="neo-button-primary text-xs"
              >
                {importing ? "Mengimpor..." : "Mulai Impor CSV"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <RegistrantDetailModal
          registrant={selectedRegistrant}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedRegistrant(null);
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <RegistrantEditModal
          key={selectedRegistrant?.id || "edit"}
          registrant={selectedRegistrant}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRegistrant(null);
          }}
          onSaved={fetchRegistrants}
        />
      )}
    </div>
  );
}
