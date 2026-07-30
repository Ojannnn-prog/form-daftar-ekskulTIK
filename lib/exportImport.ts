import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface RegistrantData {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  reason: string;
  status: string;
  notes?: string | null;
  createdAt: string | Date;
}

/**
 * Export registrants to Excel (.xlsx) file
 */
export function exportToExcel(registrants: RegistrantData[], fileName = "Data_Pendaftar_Ekskul_TIK_SDN231.xlsx") {
  const formattedData = registrants.map((r, index) => ({
    No: index + 1,
    "Nama Lengkap": r.name,
    "Email Aktif": r.email,
    "No. WhatsApp": r.whatsapp,
    "Alasan Bergabung": r.reason,
    Status:
      r.status === "APPROVED"
        ? "Diterima"
        : r.status === "REJECTED"
        ? "Ditolak"
        : "Menunggu",
    Catatan: r.notes || "-",
    "Tanggal Daftar": new Date(r.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Set column widths
  worksheet["!cols"] = [
    { wch: 5 },  // No
    { wch: 25 }, // Nama
    { wch: 25 }, // Email
    { wch: 16 }, // WA
    { wch: 40 }, // Alasan
    { wch: 12 }, // Status
    { wch: 20 }, // Catatan
    { wch: 15 }, // Tanggal
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftar TIK");
  XLSX.writeFile(workbook, fileName);
}

/**
 * Export registrants to PDF school report
 */
export function exportToPDF(registrants: RegistrantData[], fileName = "Laporan_Pendaftar_Ekskul_TIK_SDN231.pdf") {
  const doc = new jsPDF("landscape", "mm", "a4");

  // Title & School Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("LAPORAN DATA PENDAFTAR EKSTRAKURIKULER TIK", 14, 16);
  doc.setFontSize(12);
  doc.text("SDN 231 SUKAASIH // TAHUN AJARAN 2026/2027", 14, 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Total Data: ${registrants.length} Siswa | Dicetak Pada: ${new Date().toLocaleString("id-ID")}`,
    14,
    30
  );

  const tableColumn = [
    "No",
    "Nama Lengkap",
    "Email",
    "WhatsApp",
    "Status",
    "Alasan Bergabung",
    "Tanggal",
  ];

  const tableRows = registrants.map((r, idx) => [
    idx + 1,
    r.name,
    r.email,
    r.whatsapp,
    r.status === "APPROVED"
      ? "Diterima"
      : r.status === "REJECTED"
      ? "Ditolak"
      : "Menunggu",
    r.reason.length > 50 ? r.reason.slice(0, 50) + "..." : r.reason,
    new Date(r.createdAt).toLocaleDateString("id-ID"),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 36,
    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [255, 208, 0], // #FFD000 Yellow
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [244, 244, 240], // #F4F4F0
    },
  });

  doc.save(fileName);
}

/**
 * Parse CSV file text into registrant data objects
 */
export function parseCSVImport(csvText: string): Array<{
  name: string;
  email: string;
  whatsapp: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}> {
  const lines = csvText
    .split(/\r\n|\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length <= 1) return [];

  const result = [];
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.replace(/^["']|["']$/g, "").trim());
    if (cols.length >= 3) {
      result.push({
        name: cols[0] || "Siswa Baru",
        email: cols[1] || `siswa_${i}@sample.id`,
        whatsapp: cols[2] || "081234567890",
        reason: cols[3] || "Ingin belajar TIK bersama ekskul SDN 231 Sukaasih",
        status:
          (cols[4] as "PENDING" | "APPROVED" | "REJECTED") || "PENDING",
      });
    }
  }

  return result;
}
