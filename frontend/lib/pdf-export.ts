import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { TransaksiItem } from "./api";

export type PdfExportType = "SELURUH" | "HARIAN" | "BULANAN" | "TAHUNAN";

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getPeriodLabel(periode: string, customRange?: { start: Date | null; end: Date | null }) {
  if (periode === "SEBULAN") return "Sebulan Terakhir";
  if (periode === "SETAHUN") return "Setahun Terakhir";
  if (periode === "KUSTOM" && customRange?.start && customRange?.end) {
    return `${customRange.start.toLocaleDateString("id-ID")} - ${customRange.end.toLocaleDateString("id-ID")}`;
  }
  return "Semua Waktu";
}

function addHeader(doc: jsPDF, title: string, periode: string, customRange?: { start: Date | null; end: Date | null }) {
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("Laporan Keuangan MyCoLive", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const periodLabel = getPeriodLabel(periode, customRange);
  doc.text(`Periode: ${periodLabel}`, 14, 28);
  doc.text(`Tanggal Export: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`, 14, 34);

  doc.setDrawColor(200, 200, 200);
  doc.line(14, 38, 196, 38);
}

function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Halaman ${i} dari ${pageCount} | MyCoLive`, 14, 285);
  }
}

export function generateSeluruhTransaksiPDF(
  transaksi: TransaksiItem[],
  summary: { total_pendapatan: number; total_pengeluaran: number; total_bersih: number },
  periode: string,
  customRange?: { start: Date | null; end: Date | null }
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  addHeader(doc, "Seluruh Transaksi", periode, customRange);

  // Summary Box
  let currentY = 45;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("Ringkasan Keuangan", 14, currentY);
  currentY += 6;

  // Summary table
  autoTable(doc, {
    startY: currentY,
    body: [
      ["Total Pendapatan", formatRupiah(summary.total_pendapatan)],
      ["Total Pengeluaran", formatRupiah(summary.total_pengeluaran)],
      ["Total Bersih", formatRupiah(summary.total_bersih)],
    ],
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50 },
      1: { halign: "right" },
    },
    margin: { left: 14, right: 14 },
  });

  currentY = (doc as any).lastAutoTable?.finalY || 65;
  currentY += 8;

  // Transaksi table
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("Daftar Transaksi", 14, currentY);
  currentY += 6;

  const body = transaksi.map((t) => {
    const isPemasukan = t.tipe === "PEMASUKAN";
    const isPengeluaran = t.tipe === "PENGELUARAN";
    const prefix = isPemasukan ? "+" : isPengeluaran ? "-" : "";
    return [
      formatDate(t.tanggal),
      t.nama,
      t.properti_nama,
      t.status_badge,
      `${prefix}${formatRupiah(t.jumlah)}`,
      t.detail_info || "-",
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [["Tanggal", "Nama", "Properti", "Status", "Jumlah", "Detail"]],
    body,
    theme: "striped",
    headStyles: {
      fillColor: [132, 204, 22],
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: "linebreak",
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 35 },
      2: { cellWidth: 35 },
      3: { cellWidth: 25 },
      4: { cellWidth: 35, halign: "right" },
      5: { cellWidth: 35 },
    },
    margin: { left: 14, right: 14 },
    pageBreak: "auto",
  });

  addFooter(doc);

  const periodLabel = getPeriodLabel(periode, customRange).replace(/\s+/g, "-").toLowerCase();
  doc.save(`laporan-keuangan-${periodLabel}-${new Date().toISOString().split("T")[0]}.pdf`);
}

export function generateIncomeLossPDF(
  transaksi: TransaksiItem[],
  type: "HARIAN" | "BULANAN" | "TAHUNAN",
  periode: string,
  customRange?: { start: Date | null; end: Date | null }
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const title = type === "HARIAN" ? "Income/Loss Harian" : type === "BULANAN" ? "Income/Loss Bulanan" : "Income/Loss Tahunan";
  addHeader(doc, title, periode, customRange);

  // Agregasi data
  const map = new Map<string, { label: string; pemasukan: number; pengeluaran: number; bersih: number }>();

  if (type === "HARIAN") {
    transaksi.forEach((t) => {
      const d = new Date(t.tanggal);
      const key = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
      if (!map.has(key)) map.set(key, { label, pemasukan: 0, pengeluaran: 0, bersih: 0 });
      const entry = map.get(key)!;
      if (t.tipe === "PEMASUKAN") entry.pemasukan += t.jumlah;
      else if (t.tipe === "PENGELUARAN") entry.pengeluaran += t.jumlah;
      entry.bersih = entry.pemasukan - entry.pengeluaran;
    });
  } else if (type === "BULANAN") {
    transaksi.forEach((t) => {
      const d = new Date(t.tanggal);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
      if (!map.has(key)) map.set(key, { label, pemasukan: 0, pengeluaran: 0, bersih: 0 });
      const entry = map.get(key)!;
      if (t.tipe === "PEMASUKAN") entry.pemasukan += t.jumlah;
      else if (t.tipe === "PENGELUARAN") entry.pengeluaran += t.jumlah;
      entry.bersih = entry.pemasukan - entry.pengeluaran;
    });
  } else {
    // TAHUNAN
    transaksi.forEach((t) => {
      const d = new Date(t.tanggal);
      const key = String(d.getFullYear());
      const label = String(d.getFullYear());
      if (!map.has(key)) map.set(key, { label, pemasukan: 0, pengeluaran: 0, bersih: 0 });
      const entry = map.get(key)!;
      if (t.tipe === "PEMASUKAN") entry.pemasukan += t.jumlah;
      else if (t.tipe === "PENGELUARAN") entry.pengeluaran += t.jumlah;
      entry.bersih = entry.pemasukan - entry.pengeluaran;
    });
  }

  const sorted = Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, v]) => v);

  let currentY = 45;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(title, 14, currentY);
  currentY += 6;

  const body = sorted.map((item) => {
    const prefix = item.bersih >= 0 ? "+" : "";
    return [
      item.label,
      formatRupiah(item.pemasukan),
      formatRupiah(item.pengeluaran),
      `${prefix}${formatRupiah(item.bersih)}`,
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [["Periode", "Pendapatan", "Pengeluaran", "Bersih (+/-)"]],
    body,
    theme: "striped",
    headStyles: {
      fillColor: [132, 204, 22],
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 45, halign: "right" },
      2: { cellWidth: 45, halign: "right" },
      3: { cellWidth: 45, halign: "right" },
    },
    margin: { left: 14, right: 14 },
    pageBreak: "auto",
  });

  addFooter(doc);

  const typeLabel = type.toLowerCase();
  const periodLabel = getPeriodLabel(periode, customRange).replace(/\s+/g, "-").toLowerCase();
  doc.save(`income-loss-${typeLabel}-${periodLabel}-${new Date().toISOString().split("T")[0]}.pdf`);
}

// ─── KUITANSI PDF ───

export async function generateKuitansiPDF(detail: {
  id: string;
  nomor_kuitansi: string | null;
  nama: string;
  properti_nama: string;
  alamat: string;
  kamar_nomor: string;
  durasi: number;
  metode_bayar: string;
  jumlah: number;
  tgl_bayar: string;
  bukti?: string | null;
  no_telepon_admin: string | null;
}) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Helper: load image from URL
  const loadImage = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
  };

  // Title
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text("KUITANSI PEMBAYARAN", pageWidth / 2, 30, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("MyCoLive", pageWidth / 2, 38, { align: "center" });

  // Green line
  doc.setDrawColor(132, 204, 22);
  doc.setLineWidth(0.5);
  doc.line(margin, 44, pageWidth - margin, 44);

  // Status Box
  const statusY = 52;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, statusY, pageWidth - margin * 2, 20, 3, 3, "F");
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, statusY, pageWidth - margin * 2, 20, 3, 3, "S");

  doc.setFontSize(12);
  doc.setTextColor(22, 101, 52);
  doc.text("PEMBAYARAN DIKONFIRMASI", pageWidth / 2, statusY + 8, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const tglBayar = new Date(detail.tgl_bayar).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const waktuBayar = new Date(detail.tgl_bayar).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(`${tglBayar}, ${waktuBayar} WIB`, pageWidth / 2, statusY + 15, { align: "center" });

  // Detail Section
  let currentY = 82;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("Detail Kuitansi", margin, currentY);
  currentY += 8;

  const details = [
    ["Nomor Kuitansi", detail.nomor_kuitansi || "-"],
    ["Nama Penghuni", detail.nama],
    ["Properti", detail.properti_nama],
    ["Alamat", detail.alamat],
    ["No. Telepon Admin", detail.no_telepon_admin || "-"],
    ["Kamar No", detail.kamar_nomor],
    ["Durasi", `${detail.durasi} Bulan`],
    ["Metode Pembayaran", detail.metode_bayar],
  ];

  autoTable(doc, {
    startY: currentY,
    body: details,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50, textColor: 100 },
      1: { cellWidth: 110 },
    },
    margin: { left: margin, right: margin },
  });

  currentY = (doc as any).lastAutoTable?.finalY || currentY + 30;
  currentY += 8;

  // Total line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 8;

  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text("JUMLAH", margin, currentY);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(formatRupiah(detail.jumlah), pageWidth - margin, currentY, { align: "right" });
  doc.setFont("helvetica", "normal");

  currentY += 15;

  // Bukti Pembayaran
  if (detail.bukti) {
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Bukti Pembayaran", margin, currentY);
    currentY += 8;

    try {
      const imageData = await loadImage(detail.bukti);
      const imgWidth = 80;
      const imgHeight = 80;
      const xPos = (pageWidth - imgWidth) / 2;
      doc.addImage(imageData, "JPEG", xPos, currentY, imgWidth, imgHeight);
      currentY += imgHeight + 10;
    } catch {
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("(Gambar bukti tidak dapat dimuat)", margin, currentY);
      currentY += 10;
    }
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Dicetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} | MyCoLive`, pageWidth / 2, 280, { align: "center" });

  const filename = detail.nomor_kuitansi
    ? `kuitansi-${detail.nomor_kuitansi}.pdf`
    : `kuitansi-${detail.id}.pdf`;
  doc.save(filename);
}
