"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Loader2,
  Settings,
  Check,
  AlertTriangle,
} from "lucide-react";
import MainLayout from "../../../../../components/Layout/MainLayout";
import { getUser, isAuthenticated } from "../../../../../lib/auth";
import { getKamarByProperti, updateKamarStatus, getPropertiById, KamarData, PropertiData } from "../../../../../lib/api";

const statusBadge: Record<string, { label: string; color: string }> = {
  KOSONG: { label: "Kosong", color: "bg-gray-100 text-gray-600" },
  TERISI: { label: "Terisi", color: "bg-green-100 text-green-700" },
  MAINTENANCE: { label: "Maintenance", color: "bg-yellow-100 text-yellow-700" },
};

export default function PengelolaKamarPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;
  const [kamarList, setKamarList] = useState<KamarData[]>([]);
  const [properti, setProperti] = useState<PropertiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedKamar, setSelectedKamar] = useState<KamarData | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [errorModal, setErrorModal] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: "",
    message: "",
  });
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGELOLA") {
      router.push("/public/katalog-properti");
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const [kamarData, propertiData] = await Promise.all([
          getKamarByProperti(propertiId),
          getPropertiById(propertiId),
        ]);
        setKamarList(kamarData);
        setProperti(propertiData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, propertiId]);

  const handleUpdateStatus = async () => {
    if (!selectedKamar || !newStatus) return;
    setUpdating(true);
    try {
      const updated = await updateKamarStatus(selectedKamar.id, newStatus);
      if (updated) {
        setKamarList((prev) =>
          prev.map((k) => (k.id === selectedKamar.id ? { ...k, status: newStatus } : k))
        );
        setSelectedKamar(null);
        setNewStatus("");
      } else {
        setErrorModal({
          open: true,
          title: "Gagal Mengubah Status",
          message: "Kamar mungkin sedang ditempati penghuni aktif atau terjadi kesalahan saat menyimpan.",
        });
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.message || "";
      if (msg.includes("ditempati") || msg.includes("penghuni aktif")) {
        setErrorModal({
          open: true,
          title: "Kamar Ditempati",
          message: "Kamar ini sedang ditempati oleh penghuni aktif. Silakan checkout penghuni terlebih dahulu sebelum mengubah status kamar.",
        });
      } else {
        setErrorModal({
          open: true,
          title: "Terjadi Kesalahan",
          message: "Gagal mengubah status kamar. Silakan coba lagi nanti.",
        });
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* Back */}
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/pengelola/properti"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Daftar Kamar</h1>
        </div>
        <h2 className="hidden md:block text-base font-medium text-gray-600 mb-4">
          {properti ? `Properti Saya — ${properti.nama}` : "Properti Saya — Kelola Kamar"}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : kamarList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <BedDouble className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Belum ada kamar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kamarList.map((k) => {
              const badge = statusBadge[k.status] || { label: k.status, color: "bg-gray-100 text-gray-600" };
              return (
                <div
                  key={k.id}
                  className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">Kamar {k.nomor}</h3>
                      <p className="text-sm text-gray-500">{k.tipe}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {k.luas && <p>Luas: {k.luas}</p>}
                    <p>Fasilitas: {k.fasilitas?.length ? k.fasilitas.join(", ") : "-"}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedKamar(k);
                      setNewStatus(k.status);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-[#84CC16] bg-[#84CC16]/10 rounded-lg hover:bg-[#84CC16]/20 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Ubah Status
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Ubah Status */}
      {selectedKamar && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedKamar(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-sm p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-gray-900 mb-1">
              Ubah Status Kamar {selectedKamar.nomor}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Pilih status baru untuk kamar ini.
            </p>
            <div className="space-y-2 mb-5">
              {["KOSONG", "TERISI", "MAINTENANCE"].map((s) => (
                <button
                  key={s}
                  onClick={() => setNewStatus(s)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                    newStatus === s
                      ? "border-[#84CC16] bg-[#84CC16]/10 text-[#84CC16]"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{statusBadge[s].label}</span>
                  {newStatus === s && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedKamar(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={updating || newStatus === selectedKamar.status}
                className="flex-1 px-4 py-2.5 bg-[#84CC16] text-white text-sm font-medium rounded-lg hover:bg-[#73b814] transition-colors disabled:opacity-50"
              >
                {updating ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Error Kamar Ditempati */}
      {errorModal.open && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4"
          onClick={() => setErrorModal((prev) => ({ ...prev, open: false }))}
        >
          <div
            className="bg-white rounded-xl w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {errorModal.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {errorModal.message}
            </p>
            <button
              onClick={() => setErrorModal((prev) => ({ ...prev, open: false }))}
              className="w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
