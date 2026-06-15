"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import {
  MessageSquareWarning,
  CheckCircle,
  Clock,
  Loader2,
  User,
  Wrench,
  Trees,
  Users,
  HelpCircle,
} from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import PenghuniTabs from "@/components/PenghuniTabs";
import Modal from "@/components/ui/Modal";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getKomplainList, updateKomplainStatus, KomplainData } from "@/lib/api";
import { useRealtime } from "@/lib/useRealtime";

const jenisIcon: Record<string, typeof Wrench> = {
  FASILITAS: Wrench,
  LINGKUNGAN: Trees,
  PENGHUNI_LAIN: Users,
  LAINNYA: HelpCircle,
};

const statusBadge: Record<string, { label: string; color: string }> = {
  BARU: { label: "Baru", color: "bg-red-100 text-red-700" },
  DIPROSES: { label: "Diproses", color: "bg-yellow-100 text-yellow-700" },
  SELESAI: { label: "Selesai", color: "bg-green-100 text-green-700" },
};

export default function KomplainAdminPage() {
  const router = useRouter();
  const [komplainList, setKomplainList] = useState<KomplainData[]>([]);
  const [filteredList, setFilteredList] = useState<KomplainData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fetchedRef = useRef(false);
  const { success, error } = useToast();

  const baruCount = komplainList.filter((k) => k.status === "BARU").length;

  const fetchData = useCallback(async () => {
    try {
      const data = await getKomplainList();
      setKomplainList(data);
      setFilteredList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

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

    fetchData();
  }, [router, fetchData]);

  useRealtime("komplain:baru", () => fetchData());
  useRealtime("komplain:status", () => fetchData());

  useEffect(() => {
    if (statusFilter) {
      setFilteredList(komplainList.filter((k) => k.status === statusFilter));
    } else {
      setFilteredList(komplainList);
    }
  }, [statusFilter, komplainList]);

  const handleUpdateStatus = async (id: string, status: "DIPROSES" | "SELESAI") => {
    setProcessingId(id);
    try {
      await updateKomplainStatus(id, status);
      await fetchData();
    } catch (err) {
      console.error(err);
      error("Gagal update status komplain");
    } finally {
      setProcessingId(null);
    }
  };

  const getJenisLabel = (jenis: string) => {
    const labels: Record<string, string> = {
      FASILITAS: "Fasilitas",
      LINGKUNGAN: "Lingkungan",
      PENGHUNI_LAIN: "Penghuni Lain",
      LAINNYA: "Lainnya",
    };
    return labels[jenis] || jenis;
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <h1 className="md:hidden text-xl md:text-2xl font-bold text-gray-900 mb-2">Penghuni Properti</h1>
        <h1 className="hidden md:block text-xl md:text-2xl font-bold text-gray-900 mb-2">Komplain</h1>
        <div className="md:hidden">
          <PenghuniTabs />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: "", label: "Semua", count: komplainList.length },
            { key: "BARU", label: "Baru", count: komplainList.filter((k) => k.status === "BARU").length },
            { key: "DIPROSES", label: "Diproses", count: komplainList.filter((k) => k.status === "DIPROSES").length },
            { key: "SELESAI", label: "Selesai", count: komplainList.filter((k) => k.status === "SELESAI").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                statusFilter === tab.key
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
              <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <MessageSquareWarning className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada komplain</p>
            <p className="text-sm mt-1">Komplain dari penghuni akan muncul di sini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((k) => {
              const Icon = jenisIcon[k.jenis] || HelpCircle;
              const badge = statusBadge[k.status] || { label: k.status, color: "bg-gray-100 text-gray-600" };
              const isBaru = k.status === "BARU";
              const isDiproses = k.status === "DIPROSES";

              return (
                <div key={k.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{k.masalah}</h3>
                        <p className="text-xs text-gray-500">
                          {getJenisLabel(k.jenis)} • {k.properti?.nama || "-"}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium shrink-0 ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{k.deskripsi}</p>

                  {k.foto && (
                    <button
                      onClick={() => setSelectedImage(k.foto!)}
                      className="mb-3 block w-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={k.foto}
                        alt="Foto Komplain"
                        className="w-full max-h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                      />
                    </button>
                  )}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {k.penghuni?.user.nama || "-"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(k.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {isBaru && (
                        <button
                          onClick={() => handleUpdateStatus(k.id, "DIPROSES")}
                          disabled={processingId === k.id}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-1.5 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                        >
                          {processingId === k.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          Proses
                        </button>
                      )}
                      {(isBaru || isDiproses) && (
                        <button
                          onClick={() => handleUpdateStatus(k.id, "SELESAI")}
                          disabled={processingId === k.id}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {processingId === k.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5" />
                          )}
                          Selesai
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title="Foto Komplain"
        size="lg"
      >
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage || ""}
            alt="Foto Komplain"
            className="w-full h-full object-contain"
          />
        </div>
      </Modal>
    </MainLayout>
  );
}
