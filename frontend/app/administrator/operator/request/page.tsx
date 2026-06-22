"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import {
  Banknote,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  User,
  Building2,
  Loader2,
  Copy,
} from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import ImageUploader from "@/components/ImageUploader";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getPengajuanDanaList, updatePengajuanDanaStatus, PengajuanDanaData } from "@/lib/api";
import { useRealtime } from "@/lib/useRealtime";

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
  const [approveTarget, setApproveTarget] = useState<PengajuanDanaData | null>(null);
  const [buktiTransfer, setBuktiTransfer] = useState("");
  const [buktiError, setBuktiError] = useState("");
  const fetchedRef = useRef(false);
  const { success, error } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    success("No. Rekening berhasil disalin!");
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await getPengajuanDanaList();
      setDanaList(data);
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

  useRealtime("dana:baru", () => fetchData());
  useRealtime("dana:status", () => fetchData());

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

  const handleUpdateStatus = async (
    id: string,
    status: "DITERIMA" | "DITOLAK",
    bukti?: string,
  ) => {
    setProcessingId(id);
    try {
      await updatePengajuanDanaStatus(id, status, bukti);
      const updated = await getPengajuanDanaList();
      setDanaList(updated);
      success(status === "DITERIMA" ? "Request dana disetujui" : "Request dana ditolak");
    } catch (err) {
      console.error(err);
      error("Gagal update status pengajuan dana");
    } finally {
      setProcessingId(null);
      setConfirmAction(null);
    }
  };

  const handleApproveConfirm = async () => {
    if (!approveTarget) return;
    if (!buktiTransfer) {
      setBuktiError("Bukti transfer wajib diunggah");
      return;
    }
    await handleUpdateStatus(approveTarget.id, "DITERIMA", buktiTransfer);
    setApproveTarget(null);
    setBuktiTransfer("");
    setBuktiError("");
  };

  const pendingCount = danaList.filter((d) => d.status === "MENUNGGU").length;

  return (
    <>
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Jumlah</p>
                    <p className="text-base md:text-lg font-bold text-gray-900">
                      Rp {(d.jumlah || 0).toLocaleString("id-ID")}
                    </p>
                  </div>
                  {isPending && (
                    <div className="text-left sm:text-right border-t border-gray-200 pt-2 sm:border-0 sm:pt-0">
                      <p className="text-xs text-gray-500">No. Rekening</p>
                      <div className="flex items-center gap-2 justify-start sm:justify-end mt-1">
                        <p className="text-sm font-medium text-gray-900 break-all sm:break-normal">{d.no_rekening}</p>
                        <button
                          type="button"
                          onClick={() => handleCopy(d.no_rekening)}
                          className="text-[#84CC16] hover:text-[#73b814] p-1 rounded hover:bg-[#84CC16]/10 transition-colors shrink-0"
                          title="Salin No. Rekening"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}    
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

                {/* Bukti Transfer */}
                {d.bukti_transfer && (
                  <button
                    onClick={() => setSelectedFoto(d.bukti_transfer!)}
                    className="flex items-center gap-2 text-sm text-[#84CC16] hover:underline mb-3"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat Bukti Transfer
                  </button>
                )}

                {/* Actions */}
                {isPending && (
                  <div className="flex sm:flex-row gap-2">
                    <button
                      onClick={() => { setApproveTarget(d); setBuktiTransfer(""); setBuktiError(""); }}
                      disabled={processingId === d.id}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
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
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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

      <ConfirmDialog
        isOpen={!!confirmAction}
        title="Konfirmasi"
        message={`Apakah Anda yakin ingin ${confirmAction?.label} pengajuan dana ini?`}
        confirmLabel={processingId === confirmAction?.id ? "Memproses..." : "Ya, Konfirmasi"}
        cancelLabel="Batal"
        danger={confirmAction?.status === "DITOLAK"}
        onConfirm={() => {
          if (confirmAction) {
            handleUpdateStatus(confirmAction.id, confirmAction.status);
          }
        }}
        onCancel={() => setConfirmAction(null)}
      />

      {/* Modal Setujui + Bukti Transfer */}
      <Modal
        isOpen={!!approveTarget}
        onClose={() => { setApproveTarget(null); setBuktiTransfer(""); setBuktiError(""); }}
        title="Setujui Pengajuan Dana"
        size="md"
      >
        <p className="text-sm text-gray-500 mb-4">
          Unggah bukti transfer untuk menyetujui pengajuan{" "}
          <span className="font-medium text-gray-700">{approveTarget?.tujuan}</span> sebesar{" "}
          <span className="font-medium text-gray-700">
            Rp {(approveTarget?.jumlah || 0).toLocaleString("id-ID")}
          </span>.
        </p>

        <ImageUploader
          label="Bukti Transfer"
          images={buktiTransfer ? [buktiTransfer] : []}
          onChange={(imgs) => { setBuktiTransfer(imgs[0] ?? ""); setBuktiError(""); }}
          maxImages={1}
        />
        {buktiError && <p className="text-xs text-red-500 -mt-2 mb-2">{buktiError}</p>}

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => { setApproveTarget(null); setBuktiTransfer(""); setBuktiError(""); }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleApproveConfirm}
            disabled={processingId === approveTarget?.id}
            className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {processingId === approveTarget?.id ? "Memproses..." : "Setujui"}
          </button>
        </div>
      </Modal>

      {/* Modal Foto */}
      <Modal
        isOpen={!!selectedFoto}
        onClose={() => setSelectedFoto(null)}
        title="Bukti / Foto"
        size="lg"
      >
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedFoto || ""}
            alt="Bukti"
            className="w-full h-full object-contain"
          />
        </div>
      </Modal>
    </>
  );
}
