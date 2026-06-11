"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Receipt,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  CreditCard,
  User,
  BedDouble,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import PenghuniTabs from "@/components/PenghuniTabs";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getAllPemesanan, verifikasiPemesanan, PemesananData } from "@/lib/api";

const statusPemesananBadge: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Diterima", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
  SELESAI: { label: "Selesai", color: "bg-blue-100 text-blue-700" },
};

const statusPembayaranBadge: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Belum Bayar", color: "bg-gray-100 text-gray-600" },
  DIVERIFIKASI: { label: "Menunggu Verifikasi", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Lunas", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
};

type ConfirmAction = {
  id: string;
  status: "DITERIMA" | "DITOLAK";
  label: string;
} | null;

export default function ValidasiPembayaranPage() {
  const router = useRouter();
  const [pemesananList, setPemesananList] = useState<PemesananData[]>([]);
  const [filteredList, setFilteredList] = useState<PemesananData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "verified">("all");
  const [selectedBukti, setSelectedBukti] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const fetchedRef = useRef(false);

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
        const data = await getAllPemesanan();
        setPemesananList(data);
        setFilteredList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredList(pemesananList);
    } else if (activeTab === "pending") {
      setFilteredList(pemesananList.filter((p) => p.status === "MENUNGGU"));
    } else if (activeTab === "verified") {
      setFilteredList(pemesananList.filter((p) => p.status !== "MENUNGGU"));
    }
  }, [activeTab, pemesananList]);

  const handleVerifikasi = async (id: string, status: "DITERIMA" | "DITOLAK") => {
    setProcessingId(id);
    try {
      await verifikasiPemesanan(id, status);
      const updated = await getAllPemesanan();
      setPemesananList(updated);
    } catch (err) {
      console.error(err);
      alert("Gagal memverifikasi pesanan");
    } finally {
      setProcessingId(null);
      setConfirmAction(null);
    }
  };

  const pendingCount = pemesananList.filter((p) => p.status === "MENUNGGU").length;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="md:hidden text-xl md:text-2xl font-bold text-gray-900 mb-2">Penghuni Properti</h1>
        <h1 className="hidden md:block text-xl md:text-2xl font-bold text-gray-900 mb-2">Validasi Pembayaran</h1>
        <div className="md:hidden">
          <PenghuniTabs />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: "all" as const, label: "Semua", count: pemesananList.length },
            { key: "pending" as const, label: "Menunggu", count: pendingCount },
            { key: "verified" as const, label: "Terverifikasi", count: pemesananList.length - pendingCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-[#84CC16] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <CreditCard className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada pemesanan</p>
            <p className="text-sm mt-1">Data pemesanan akan muncul setelah penghuni melakukan pemesanan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((p) => {
              const pemesananStatus = statusPemesananBadge[p.status] || { label: p.status, color: "bg-gray-100 text-gray-600" };
              const pembayaranStatus = statusPembayaranBadge[p.pembayaran?.status || "MENUNGGU"] || { label: "-", color: "bg-gray-100 text-gray-600" };
              const isPending = p.status === "MENUNGGU";
              const hasBukti = !!p.pembayaran?.bukti;

              return (
                <div key={p.id} className="bg-white rounded-xl shadow-sm p-4">
                  {/* Header */}
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                        {p.properti?.nama || "Properti"} — Kamar {p.kamar?.nomor || "-"}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${pemesananStatus.color}`}>
                        {pemesananStatus.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {p.penghuni?.user.nama || "-"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {p.durasi_sewa} bulan
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5" />
                        {new Date(p.tgl_masuk).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Total & Status */}
                  <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Total Bayar</p>
                      <p className="text-base md:text-lg font-bold text-gray-900">
                        Rp {(p.total_bayar || 0).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${pembayaranStatus.color}`}>
                      {pembayaranStatus.label}
                    </span>
                  </div>

                  {/* Bukti Bayar */}
                  {hasBukti && (
                    <button
                      onClick={() => setSelectedBukti(p.pembayaran!.bukti!)}
                      className="flex items-center gap-2 text-sm text-[#84CC16] hover:underline mb-3"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Bukti Pembayaran
                    </button>
                  )}

                  {/* Actions */}
                  {isPending && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => setConfirmAction({ id: p.id, status: "DITERIMA", label: "menerima" })}
                        disabled={processingId === p.id}
                        className="flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {processingId === p.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Terima Pesanan
                      </button>
                      <button
                        onClick={() => setConfirmAction({ id: p.id, status: "DITOLAK", label: "menolak" })}
                        disabled={processingId === p.id}
                        className="flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {processingId === p.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        Tolak Pesanan
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Konfirmasi */}
      {confirmAction && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setConfirmAction(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-sm p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Konfirmasi</h3>
                <p className="text-sm text-gray-500">
                  Apakah Anda yakin ingin {confirmAction.label} pesanan ini?
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleVerifikasi(confirmAction.id, confirmAction.status)}
                disabled={processingId === confirmAction.id}
                className={`flex-1 px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
                  confirmAction.status === "DITERIMA"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {processingId === confirmAction.id ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "Ya, Konfirmasi"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Bukti */}
      {selectedBukti && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBukti(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Bukti Pembayaran</h3>
              <button
                onClick={() => setSelectedBukti(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedBukti}
                alt="Bukti Pembayaran"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
