"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import Link from "next/link";
import { ArrowLeft, CreditCard, QrCode, CheckCircle, Clock, AlertCircle } from "lucide-react";
import ImageUploader from "../../../../components/ImageUploader";
import { getUser, isAuthenticated } from "../../../../lib/auth";
import { getPemesananById, uploadBuktiBayar, PemesananData } from "../../../../lib/api";
import MainLayout from "../../../../components/Layout/MainLayout";

const statusPemesananLabel: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Diterima", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
  SELESAI: { label: "Selesai", color: "bg-blue-100 text-blue-700" },
};

const statusPembayaranLabel: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Belum Bayar", color: "bg-gray-100 text-gray-600" },
  DIVERIFIKASI: { label: "Menunggu Verifikasi", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Lunas", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
};

export default function DetailTransaksiPage() {
  const router = useRouter();
  const params = useParams();
  const pemesananId = params.id as string;

  const [pemesanan, setPemesanan] = useState<PemesananData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bukti, setBukti] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGHUNI") {
      router.push("/public/katalog-properti");
      return;
    }

    if (!pemesananId) return;

    const fetchData = async () => {
      try {
        const pemesananData = await getPemesananById(pemesananId);
        setPemesanan(pemesananData);
        if (pemesananData?.pembayaran?.bukti) {
          setBukti(pemesananData.pembayaran.bukti);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pemesananId, router]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bukti) {
      error("Upload bukti pembayaran terlebih dahulu.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await uploadBuktiBayar(pemesananId, bukti);
      if (result) {
        setUploadSuccess(true);
        const updated = await getPemesananById(pemesananId);
        setPemesanan(updated);
      } else {
        error("Gagal mengupload bukti. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      error("Terjadi kesalahan saat upload bukti.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!pemesanan) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">Pesanan tidak ditemukan</p>
          <Link
            href="/penghuni/transaksi"
            className="mt-4 inline-block text-[#84CC16] hover:underline"
          >
            Kembali ke Riwayat Transaksi
          </Link>
        </div>
      </MainLayout>
    );
  }

  const pemesananStatus = statusPemesananLabel[pemesanan.status] || { label: pemesanan.status, color: "bg-gray-100 text-gray-600" };
  const pembayaranStatus = statusPembayaranLabel[pemesanan.pembayaran?.status || "MENUNGGU"] || { label: "-", color: "bg-gray-100 text-gray-600" };
  const canUpload = pemesanan.status === "MENUNGGU" && pemesanan.pembayaran?.status === "MENUNGGU";
  const isWaitingVerification = pemesanan.pembayaran?.status === "DIVERIFIKASI";
  const isPaid = pemesanan.pembayaran?.status === "DITERIMA";

  // Data rekening dari response pemesanan
  const settings = pemesanan.properti?.admin?.settings;
  const hasPaymentInfo = settings && (
    settings.nama_rekening ||
    settings.nomor_rekening ||
    settings.bank ||
    settings.qris_image
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Detail Pesanan</h1>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${pemesananStatus.color}`}>
            {pemesananStatus.label}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${pembayaranStatus.color}`}>
            {pembayaranStatus.label}
          </span>
        </div>

        {/* Detail Kamar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Informasi Kamar</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="text-gray-400">Properti:</span>{" "}
              <span className="font-medium">{pemesanan.properti?.nama || "-"}</span>
            </p>
            <p>
              <span className="text-gray-400">Kamar:</span>{" "}
              <span className="font-medium">{pemesanan.kamar?.nomor || "-"}</span>
            </p>
            <p>
              <span className="text-gray-400">Durasi Sewa:</span>{" "}
              <span className="font-medium">{pemesanan.durasi_sewa} bulan</span>
            </p>
            <p>
              <span className="text-gray-400">Tanggal Masuk:</span>{" "}
              <span className="font-medium">
                {new Date(pemesanan.tgl_masuk).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
            <p>
              <span className="text-gray-400">Metode Bayar:</span>{" "}
              <span className="font-medium">
                {pemesanan.metode_bayar === "TRANSFER" ? "Transfer Bank" : "QRIS"}
              </span>
            </p>
          </div>
        </div>

        {/* Total Bayar */}
        <div className="flex items-center justify-between p-4 bg-[#84CC16]/5 rounded-xl border border-[#84CC16]/20 mb-4">
          <span className="text-sm font-medium text-gray-700">Total Bayar</span>
          <span className="text-xl font-bold text-[#84CC16]">
            Rp {(pemesanan.total_bayar || 0).toLocaleString("id-ID")}
          </span>
        </div>

        {/* Info Pembayaran PEMILIK */}
        {canUpload && hasPaymentInfo && (
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Informasi Pembayaran</h3>
            {pemesanan.metode_bayar === "TRANSFER" ? (
              <div className="space-y-2 text-sm">
                {settings?.bank && (
                  <p>
                    <span className="text-gray-500">Bank:</span>{" "}
                    <span className="font-medium">{settings.bank}</span>
                  </p>
                )}
                {settings?.nomor_rekening && (
                  <p>
                    <span className="text-gray-500">No. Rekening:</span>{" "}
                    <span className="font-medium">{settings.nomor_rekening}</span>
                  </p>
                )}
                {settings?.nama_rekening && (
                  <p>
                    <span className="text-gray-500">Atas Nama:</span>{" "}
                    <span className="font-medium">{settings.nama_rekening}</span>
                  </p>
                )}
                {!settings?.bank && !settings?.nomor_rekening && !settings?.nama_rekening && (
                  <p className="text-sm text-gray-500">Data rekening belum lengkap</p>
                )}
              </div>
            ) : (
              <div>
                {settings?.qris_image ? (
                  <img
                    src={settings.qris_image}
                    alt="QRIS"
                    className="w-48 h-auto mx-auto rounded-lg"
                  />
                ) : (
                  <p className="text-sm text-gray-500 text-center">QRIS belum diatur</p>
                )}
              </div>
            )}
          </div>
        )}

        {canUpload && !hasPaymentInfo && (
          <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-xl text-yellow-700 text-sm mb-4">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Informasi pembayaran pengurus belum tersedia. Hubungi pengurus untuk konfirmasi pembayaran.</span>
          </div>
        )}

        {/* Upload Bukti / Status */}
        {canUpload && hasPaymentInfo ? (
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Upload Bukti Pembayaran</h3>
              <ImageUploader
                label="Upload bukti transfer/QRIS"
                images={bukti ? [bukti] : []}
                onChange={(images) => setBukti(images[0] || "")}
              />
            </div>

            {uploadSuccess && (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-green-700 text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Bukti berhasil diupload. Menunggu verifikasi pengurus.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !bukti}
              className="w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium hover:bg-[#73b814] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Mengupload..." : "Konfirmasi Pembayaran"}
            </button>
          </form>
        ) : canUpload && !hasPaymentInfo ? (
          <button
            disabled
            className="w-full bg-gray-300 text-white py-3 rounded-xl font-medium cursor-not-allowed opacity-50"
          >
            Konfirmasi Pembayaran
          </button>
        ) : isWaitingVerification ? (
          <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-xl text-yellow-700 text-sm">
            <Clock className="w-5 h-5" />
            <span>Bukti pembayaran sedang diverifikasi oleh pengurus.</span>
          </div>
        ) : isPaid ? (
          <div className="flex items-center gap-2 p-4 bg-green-50 rounded-xl text-green-700 text-sm">
            <CheckCircle className="w-5 h-5" />
            <span>Pembayaran telah diverifikasi. Pesanan Anda sudah aktif.</span>
          </div>
        ) : null}

        {/* Bukti yang sudah diupload */}
        {pemesanan.pembayaran?.bukti && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Bukti Pembayaran</h3>
            <img
              src={pemesanan.pembayaran.bukti}
              alt="Bukti pembayaran"
              className="w-full max-w-md rounded-xl border border-gray-200"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
