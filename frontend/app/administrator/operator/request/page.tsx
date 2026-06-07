"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Banknote,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  User,
  Building2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import OperatorTabs from "@/components/OperatorTabs";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getPengajuanDanaList, updatePengajuanDanaStatus, PengajuanDanaData } from "@/lib/api";

const statusBadge: Record<string, { label: string; color: string }> = {
  MENUNGGU: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  DITERIMA: { label: "Diterima", color: "bg-green-100 text-green-700" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-700" },
};

export default function RequestDanaPage() {
  const router = useRouter();
  const [danaList, setDanaList] = useState<PengajuanDanaData[]>([]);
  const [filteredList, setFilteredList] = useState<PengajuanDanaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    status: "DITERIMA" | "DITOLAK";
    label: string;
  } | null>(null);
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
        const data = await getPengajuanDanaList();
        setDanaList(data);
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
      setFilteredList(danaList);
    } else if (activeTab === "pending") {
      setFilteredList(danaList.filter((d) => d.status === "MENUNGGU"));
    } else if (activeTab === "accepted") {
      setFilteredList(danaList.filter((d) => d.status === "DITERIMA"));
    } else if (activeTab === "rejected") {
      setFilteredList(danaList.filter((d) => d.status === "DITOLAK"));
    }
  }, [activeTab, danaList]);

  const handleUpdateStatus = async (id: string, status: "DITERIMA" | "DITOLAK") => {
    setProcessingId(id);
    try {
      await updatePengajuanDanaStatus(id, status);
      const updated = await getPengajuanDanaList();
      setDanaList(updated);
    } catch (err) {
      console.error(err);
      alert("Gagal update status pengajuan dana");
    } finally {
      setProcessingId(null);
      setConfirmAction(null);
    }
  };

  const pendingCount = danaList.filter((d) => d.status === "MENUNGGU").length;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Operator Properti</h1>
        <h2 className="hidden md:block text-base font-medium text-gray-600 mb-4">Operator Properti — Request Dana</h2>
        <div className="md:hidden">
          <OperatorTabs />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: "all" as const, label: "Semua", count: danaList.length },
            { key: "pending" as const, label: "Menunggu", count: pendingCount },
            { key: "accepted" as const, label: "Diterima", count: danaList.filter((d) => d.status === "DITERIMA").length },
            { key: "rejected" as const, label: "Ditolak", count: danaList.filter((d) => d.status === "DITOLAK").length },
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
            <Banknote className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada pengajuan dana</p>
            <p className="text-sm mt-1">Pengajuan dana dari operator akan muncul di sini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((d) => {
              const badge = statusBadge[d.status] || { label: d.status, color: "bg-gray-100 text-gray-600" };
              const isPending = d.status === "MENUNGGU";
              const hasFoto = !!d.foto;

              return (
                <div key={d.id} className="bg-white rounded-xl shadow-sm p-4">
                  {/* Header */}
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{d.tujuan}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {d.operator?.user.nama || "-"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {d.properti?.nama || "-"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(d.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Detail */}
                  <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Jumlah</p>
                      <p className="text-base md:text-lg font-bold text-gray-900">
                        Rp {(d.jumlah || 0).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">No. Rekening</p>
                      <p className="text-sm font-medium text-gray-900">{d.no_rekening}</p>
                    </div>
                  </div>

                  {/* Foto */}
                  {hasFoto && (
                    <button
                      onClick={() => setSelectedFoto(d.foto!)}
                      className="flex items-center gap-2 text-sm text-[#84CC16] hover:underline mb-3"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Bukti / Foto
                    </button>
                  )}

                  {/* Actions */}
                  {isPending && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => setConfirmAction({ id: d.id, status: "DITERIMA", label: "menerima" })}
                        disabled={processingId === d.id}
                        className="flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {processingId === d.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Setujui
                      </button>
                      <button
                        onClick={() => setConfirmAction({ id: d.id, status: "DITOLAK", label: "menolak" })}
                        disabled={processingId === d.id}
                        className="flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {processingId === d.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        Tolak
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
                  Apakah Anda yakin ingin {confirmAction.label} pengajuan dana ini?
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
                onClick={() => handleUpdateStatus(confirmAction.id, confirmAction.status)}
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

      {/* Modal Foto */}
      {selectedFoto && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFoto(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Bukti / Foto</h3>
              <button
                onClick={() => setSelectedFoto(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedFoto}
                alt="Bukti"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
