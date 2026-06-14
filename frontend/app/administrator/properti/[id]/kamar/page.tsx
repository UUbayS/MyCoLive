"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "../../../../../lib/ToastContext";
import Link from "next/link";
import { ArrowLeft, Search, SlidersHorizontal, Plus, Trash2, Pencil, ChevronDown, Users, Wrench, BedDouble } from "lucide-react";
import { getUser } from "../../../../../lib/auth";
import {
  getKamarByProperti,
  getPropertiById,
  deleteKamar,
  updateKamarStatus,
  KamarData,
  PropertiData,
} from "../../../../../lib/api";
import { useRealtime } from "../../../../../lib/useRealtime";
import MainLayout from "../../../../../components/Layout/MainLayout";
import ConfirmDialog from "../../../../../components/ConfirmDialog";

const statusConfig = {
  KOSONG: { label: "Kosong", color: "bg-green-100 text-green-700" },
  TERISI: { label: "Terisi", color: "bg-blue-100 text-blue-700" },
  MAINTENANCE: { label: "Maintenance", color: "bg-yellow-100 text-yellow-700" },
};

export default function AdminDaftarKamarPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [kamarList, setKamarList] = useState<KamarData[]>([]);
  const [properti, setProperti] = useState<PropertiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [kamarToDelete, setKamarToDelete] = useState<KamarData | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const { success, error } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const [propertiData, kamarData] = await Promise.all([
        getPropertiById(propertiId),
        getKamarByProperti(propertiId),
      ]);

      if (propertiData) {
        setProperti(propertiData);
      }
      setKamarList(kamarData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, [propertiId]);

  useEffect(() => {
    if (!propertiId) return;

    const user = getUser();
    if (!user || user.role !== "PEMILIK") {
      router.push("/auth/login");
      return;
    }

    fetchData();
  }, [propertiId, router, fetchData]);

  useRealtime("kamar:update", () => fetchData());
  useRealtime("pemesanan:status", () => fetchData());
  useRealtime("pemesanan:update", () => fetchData());

  const handleDelete = async () => {
    if (!kamarToDelete) return;

    try {
      const result = await deleteKamar(kamarToDelete.id);
      if (result) {
        success("Properti berhasil dihapus");
        setTimeout(() => {
          router.push("/administrator/properti/${propertiId}/kamar");
        }, 1500);
        setKamarList((prev) => prev.filter((k) => k.id !== kamarToDelete.id));
      } else {
        error("Gagal menghapus kamar. Pastikan kamar tidak sedang ditempati.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      error("Terjadi kesalahan saat menghapus kamar.");
    } finally {
      setShowDeleteDialog(false);
      setKamarToDelete(null);
    }
  };

  const handleStatusChange = async (kamarId: string, newStatus: string) => {
    setUpdatingStatus(kamarId);
    try {
      const updated = await updateKamarStatus(kamarId, newStatus);
      if (updated) {
        setKamarList((prev) =>
          prev.map((k) => (k.id === kamarId ? { ...k, status: newStatus } : k))
        );
      } else {
        error("Gagal mengubah status kamar.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      error("Terjadi kesalahan saat mengubah status.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredKamar = useMemo(() => {
    let result = kamarList;

    if (searchQuery) {
      result = result.filter((k) =>
        k.nomor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((k) => k.status === filterStatus);
    }

    return result;
  }, [searchQuery, filterStatus, kamarList]);

  const stats = {
    total: kamarList.length,
    kosong: kamarList.filter((k) => k.status === "KOSONG").length,
    terisi: kamarList.filter((k) => k.status === "TERISI").length,
    maintenance: kamarList.filter((k) => k.status === "MAINTENANCE").length,
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-56 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/administrator/properti/${propertiId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Daftar Kamar</h1>
              <p className="text-sm text-gray-500">{properti?.nama}</p>
            </div>
          </div>
          <Link
            href={`/administrator/properti/${propertiId}/kamar/tambah`}
            className="hidden md:block bg-[#84CC16] text-white px-5 py-2 rounded-full shadow-sm hover:bg-[#73b814] transition-colors items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Kamar
          </Link>
        </div>

        {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <BedDouble className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Total Kamar</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <BedDouble className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Kosong</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.kosong}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Terisi</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.terisi}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600">Maintenance</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
        </div>
      </div>

        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nomor kamar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#84CC16]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 border rounded-xl hover:bg-gray-50 ${
              showFilters ? "bg-[#84CC16]/10 border-[#84CC16]" : "border-gray-300"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {showFilters && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
            {["all", "KOSONG", "TERISI", "MAINTENANCE"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filterStatus === status
                    ? "bg-[#84CC16] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "all"
                  ? "Semua"
                  : status === "KOSONG"
                  ? "Kosong"
                  : status === "TERISI"
                  ? "Terisi"
                  : "Maintenance"}
              </button>
            ))}
          </div>
        )}

        {/* Kamar List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredKamar.map((kamar) => {
            const status = statusConfig[kamar.status as keyof typeof statusConfig];
            const tarifObj =
              typeof kamar.tarif === "object" && kamar.tarif
                ? (kamar.tarif as Record<string, number>)
                : {};
            const hargaBulanan = tarifObj["1_bulan"] || Object.values(tarifObj)[0];

            return (
              <div
                key={kamar.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/administrator/properti/${propertiId}/kamar/${kamar.id}`}>
                  <div className="h-40 bg-gray-200 flex items-center justify-center relative">
                    {kamar.gambar && kamar.gambar.length > 0 ? (
                      <img
                        src={kamar.gambar[0]}
                        alt={`Kamar ${kamar.nomor}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">No Image</span>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status?.color || "bg-gray-100 text-gray-600"}`}>
                        {status?.label || kamar.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Kamar {kamar.nomor}</h3>
                    </div>

                    {kamar.tipe && (
                      <p className="text-sm text-gray-500 mb-2">Tipe: {kamar.tipe}</p>
                    )}
                    {kamar.luas && (
                      <p className="text-sm text-gray-500 mb-2">Luas: {kamar.luas}</p>
                    )}
                    {typeof hargaBulanan === "number" && (
                      <p className="text-sm font-medium text-[#84CC16] mb-3">
                        Rp {hargaBulanan.toLocaleString("id-ID")}/bulan
                      </p>
                    )}
                  </div>
                </Link>  
              </div>
            );
          })}
        </div>

        {filteredKamar.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">Tidak ada kamar</p>
            <p className="text-sm mt-1">Belum ada kamar yang ditambahkan.</p>
          </div>
        )}
      </div>

      {/* Floating Add Button Mobile */}
      <Link
        href={`/administrator/properti/${propertiId}/kamar/tambah`}
        className="md:hidden fixed bottom-24 right-4 p-4 bg-[#84CC16] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#73b814] transition-colors z-40"
        aria-label="Tambah Kamar"
      >
        <Plus className="w-6 h-6" />
        <span>Tambah Kamar</span>
      </Link>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onCancel={() => {
          setShowDeleteDialog(false);
          setKamarToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Kamar"
        message={`Kamar "${kamarToDelete?.nomor}" akan dihapus secara permanen. Pastikan kamar tidak sedang ditempati.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        danger
      />
    </MainLayout>
  );
}
