"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import Link from "next/link";
import {
  User,
  BedDouble,
  MapPin,
  Calendar,
  ChevronLeft,
  ArrowLeft,
  CreditCard,
  Receipt,
  MessageCircle,
  LogOut,
  Loader2,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import Modal from "@/components/ui/Modal";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getPenghuniById, PenghuniData, checkoutPenghuni } from "@/lib/api";

const statusBadge: Record<string, { label: string; color: string }> = {
  "Belum Menyewa": { label: "Belum Menyewa", color: "bg-gray-100 text-gray-600" },
  "Menyewa": { label: "Menyewa", color: "bg-green-100 text-green-700" },
  "Sewa Berakhir": { label: "Sewa Berakhir", color: "bg-red-100 text-red-700" },
  AKTIF: { label: "Aktif", color: "bg-green-100 text-green-700" },
  BERAKHIR: { label: "Berakhir", color: "bg-red-100 text-red-700" },
  PENGAJUAN_CHECKOUT: { label: "Pengajuan Checkout", color: "bg-yellow-100 text-yellow-700" },
};

const statusPemesananBadge: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Diterima", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
  SELESAI: { label: "Selesai", color: "bg-blue-100 text-blue-700" },
};

function formatWAPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) return "62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return cleaned;
  if (cleaned.startsWith("+")) return cleaned.slice(1);
  return "62" + cleaned;
}

export default function DetailPenghuniPage() {
  const router = useRouter();
  const params = useParams();
  const penghuniId = params.id as string;
  const [penghuni, setPenghuni] = useState<PenghuniData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
  const [checkoutReason, setCheckoutReason] = useState("");
  const fetchedRef = useRef(false);
  const { success, error } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PEMILIK") {
      router.push("/public/katalog-properti");
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const data = await getPenghuniById(penghuniId);
        setPenghuni(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, penghuniId]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const updated = await checkoutPenghuni(penghuniId, checkoutReason);
      if (updated) {
        setPenghuni(updated);
        setShowCheckoutConfirm(false);
        setCheckoutReason("");
        success("Check out berhasil dilakukan");
      } else {
        error("Gagal melakukan check out");
      }
    } catch {
      error("Terjadi kesalahan saat check out");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!penghuni) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 text-center text-gray-500">
          <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Penghuni tidak ditemukan</p>
          <Link
            href="/administrator/penghuni/daftar"
            className="inline-flex items-center gap-1 text-[#84CC16] hover:underline mt-2 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Daftar Penghuni
          </Link>
        </div>
      </MainLayout>
    );
  }

  const badge = statusBadge[penghuni.status_display] || statusBadge[penghuni.status_sewa] || { label: penghuni.status_display, color: "bg-gray-100 text-gray-600" };
  const waNumber = formatWAPhone(penghuni.user.no_telepon);
  const canCheckout = penghuni.status_sewa === "AKTIF" && penghuni.kamar;
  const isPengajuanCheckout = penghuni.status_sewa === "PENGAJUAN_CHECKOUT";

  // Cast pemesanan jika ada (backend include pemesanan di detail)
  const pemesananList = (penghuni as any).pemesanan || [];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* Header: Back + Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Detail Penghuni</h1>
            </div>
          </div>
        </div>

        {/* Pengajuan Checkout Alert */}
        {isPengajuanCheckout && (
          <div className="bg-yellow-50 rounded-xl p-4 md:p-5 mb-4 border border-yellow-200">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Pengajuan Checkout
            </h3>
            <p className="text-sm text-yellow-700 mb-3">
              Penghuni ini mengajukan checkout dan menunggu persetujuan Anda.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCheckoutConfirm(true)}
                disabled={checkoutLoading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Terima
              </button>
              <button
                onClick={() => setShowCheckoutConfirm(true)}
                disabled={checkoutLoading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Tolak
              </button>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 mb-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#84CC16]/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 md:w-6 md:h-6 text-[#84CC16]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 truncate">{penghuni.user.nama}</h2>
                <p className="text-xs md:text-sm text-gray-500 truncate">{penghuni.user.email}</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium shrink-0 ${badge.color}`}>
              {badge.label}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-400 shrink-0">Username:</span>
              <span className="font-medium">{penghuni.user.username}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Receipt className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-400 shrink-0">No. Telepon:</span>
              <span className="font-medium">{penghuni.user.no_telepon || "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-400 shrink-0">Tanggal Mulai:</span>
              <span className="font-medium">
                {new Date(penghuni.tgl_mulai).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            {penghuni.tgl_berakhir && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-400 shrink-0">Tanggal Berakhir:</span>
                <span className="font-medium">
                  {new Date(penghuni.tgl_berakhir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-4 border-t border-gray-100">
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-[#25D366] text-white text-sm font-medium rounded-xl hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp
              </a>
            )}
            {canCheckout && (
              <button
                onClick={() => setShowCheckoutConfirm(true)}
                disabled={checkoutLoading}
                className="flex items-center justify-center gap-2 flex-1 py-2.5 border-2 border-red-500 text-red-500 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                Check Out Penghuni
              </button>
            )}
            {isPengajuanCheckout && (
              <div className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-yellow-50 border-2 border-yellow-400 text-yellow-700 text-sm font-medium rounded-xl">
                <LogOut className="w-4 h-4" />
                Menunggu Checkout
              </div>
            )}
          </div>
        </div>

        {/* Kamar Info */}
        {penghuni.kamar && (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BedDouble className="w-4 h-4" />
              Informasi Kamar
            </h2>
            <div className="grid grid-cols-1 gap-3 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <BedDouble className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-400 shrink-0">Nomor Kamar:</span>
                <span className="font-medium">{penghuni.kamar.nomor}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-400 shrink-0">Properti:</span>
                <span className="font-medium">{penghuni.kamar.properti}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-400 shrink-0">Alamat:</span>
                <span className="font-medium">{penghuni.kamar.alamat}</span>
              </div>
            </div>
          </div>
        )}   

        {/* Riwayat Pemesanan */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Riwayat Pemesanan
          </h2>

          {pemesananList.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              <Receipt className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Belum ada riwayat pemesanan</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pemesananList.map((p: any) => {
                const badge = statusPemesananBadge[p.status] || { label: p.status, color: "bg-gray-100 text-gray-600" };
                return (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">
                          Kamar {p.kamar?.nomor || "-"} — {p.properti?.nama || "-"}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {p.durasi_sewa} bulan •{" "}
                        {new Date(p.tgl_masuk).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 shrink-0">
                      Rp {(p.total_bayar || 0).toLocaleString("id-ID")}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showCheckoutConfirm}
        onClose={() => setShowCheckoutConfirm(false)}
        title="Konfirmasi Check Out"
        size="sm"
      >
        <p className="text-sm text-gray-500 mb-3">
          Check out penghuni <strong>{penghuni.user.nama}</strong> dari Kamar {penghuni.kamar?.nomor}? Penghuni akan keluar dari kamar ini dan tidak bisa menyewa kembali kecuali melakukan pemesanan baru.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Alasan (opsional)</label>
          <textarea
            value={checkoutReason}
            onChange={(e) => setCheckoutReason(e.target.value)}
            placeholder="Contoh: Melanggar peraturan, tidak membayar, masa sewa habis, dll."
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCheckoutConfirm(false)}
            className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="flex-1 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {checkoutLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              "Ya, Check Out"
            )}
          </button>
        </div>
      </Modal>
    </MainLayout>
  );
}
