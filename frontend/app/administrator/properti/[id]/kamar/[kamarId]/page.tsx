"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Edit,
  Trash2,
  BedDouble,
  ChevronDown,
  User,
  AlertTriangle,
  Wifi,
  Wrench,
} from "lucide-react";
import ImageCarousel from "../../../../../../components/ImageCarousel";
import ConfirmDialog from "../../../../../../components/ConfirmDialog";
import { getUser } from "../../../../../../lib/auth";
import {
  getKamarById,
  deleteKamar,
  updateKamarStatus,
  KamarData,
} from "../../../../../../lib/api";
import MainLayout from "../../../../../../components/Layout/MainLayout";

const statusConfig = {
  KOSONG: { label: "Kosong", color: "bg-green-100 text-green-700" },
  TERISI: { label: "Terisi", color: "bg-blue-100 text-blue-700" },
  MAINTENANCE: { label: "Maintenance", color: "bg-yellow-100 text-yellow-700" },
};

export default function AdminDetailKamarPage() {
  const router = useRouter();
  const params = useParams();
  const kamarId = params.kamarId as string;
  const propertiId = params.id as string;

  const [kamar, setKamar] = useState<KamarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (!kamarId) return;

    const user = getUser();
    if (!user || user.role !== "PEMILIK") {
      router.push("/auth/login");
      return;
    }

    const fetchKamar = async () => {
      try {
        const data = await getKamarById(kamarId);
        if (!data) {
          router.push(`/administrator/properti/${propertiId}/kamar`);
          return;
        }
        setKamar(data);
      } catch (error) {
        console.error("Failed to fetch kamar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKamar();
  }, [kamarId, propertiId, router]);

  const handleDelete = async () => {
    try {
      const success = await deleteKamar(kamarId);
      if (success) {
        router.push(`/administrator/properti/${propertiId}/kamar`);
      } else {
        alert("Gagal menghapus kamar. Pastikan kamar tidak sedang ditempati.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus kamar.");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === kamar?.status) return;
    setUpdatingStatus(true);
    try {
      const updated = await updateKamarStatus(kamarId, newStatus);
      if (updated) {
        setKamar(updated);
      } else {
        alert("Gagal mengubah status kamar.");
      }
    } catch (error) {
      console.error("Status update error:", error);
      alert("Terjadi kesalahan saat mengubah status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getSisaHari = () => {
    if (!kamar?.penghuni?.tgl_berakhir) return 0;
    const endDate = new Date(kamar.penghuni.tgl_berakhir);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const tarifObj =
    typeof kamar?.tarif === "object" && kamar?.tarif
      ? (kamar.tarif as Record<string, number>)
      : {};

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </MainLayout>
    );
  }

  if (!kamar) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">Kamar tidak ditemukan</p>
          <Link
            href={`/administrator/properti/${propertiId}/kamar`}
            className="mt-4 inline-block text-[#84CC16] hover:underline"
          >
            Kembali ke Daftar Kamar
          </Link>
        </div>
      </MainLayout>
    );
  }

  const status = statusConfig[kamar.status as keyof typeof statusConfig];

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => router.push(`/administrator/properti/${propertiId}/kamar`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Kamar {kamar.nomor}</h1>
          <Link
            href={`/administrator/properti/${propertiId}/kamar/${kamarId}/edit`}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>{kamar.properti?.nama || "Properti"}</span>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="mb-6">
        <ImageCarousel images={kamar.gambar || []} alt={`Kamar ${kamar.nomor}`} />
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${status?.color || "bg-gray-100 text-gray-600"}`}>
          <BedDouble className="w-4 h-4" />
          {status?.label || kamar.status}
        </span>
      </div>

      {/* Ubah Status */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold mb-4">Ubah Status</h2>
        <div className="relative max-w-xs">
          <select
            value={kamar.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updatingStatus}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#84CC16] appearance-none bg-white"
          >
            <option value="KOSONG">Kosong</option>
            <option value="TERISI">Terisi</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          {updatingStatus && (
            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-gray-500">Updating...</span>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Informasi Kamar */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Informasi Kamar</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Nomor</p>
              <p className="font-medium text-gray-900">{kamar.nomor}</p>
            </div>
            {kamar.tipe && (
              <div>
                <p className="text-sm text-gray-500">Tipe</p>
                <p className="font-medium text-gray-900">{kamar.tipe}</p>
              </div>
            )}
            {kamar.luas && (
              <div>
                <p className="text-sm text-gray-500">Luas</p>
                <p className="font-medium text-gray-900">{kamar.luas}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tarif */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Tarif</h2>
          {Object.keys(tarifObj).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(tarifObj).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-600">
                    {key === "1_bulan"
                      ? "1 Bulan"
                      : key === "3_bulan"
                      ? "3 Bulan"
                      : key === "6_bulan"
                      ? "6 Bulan"
                      : key === "12_bulan"
                      ? "1 Tahun"
                      : key}
                  </span>
                  <span className="font-medium text-gray-900">
                    Rp {value.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Belum ada tarif yang ditentukan</p>
          )}
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        {/* Penghuni Aktif - hanya PEMILIK */}
        {kamar.status === "TERISI" && kamar.penghuni && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Penghuni Aktif</h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">
                  {kamar.penghuni.user.nama.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{kamar.penghuni.user.nama}</p>
                <p className="text-sm text-gray-500">
                  {kamar.penghuni.user.email} | {kamar.penghuni.user.no_telepon || "-"}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-3">
              <p>
                Aktif dari:{" "}
                {kamar.penghuni.tgl_mulai
                  ? new Date(kamar.penghuni.tgl_mulai).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </p>
              <p>
                Jatuh Tempo:{" "}
                {kamar.penghuni.tgl_berakhir
                  ? new Date(kamar.penghuni.tgl_berakhir).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-green-600 font-medium">
                {getSisaHari()} Hari tersisa
              </span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 border-2 border-red-500 text-red-500 py-2 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors">
                Check-Out
              </button>
              <Link
                href={`/administrator/penghuni/${kamar.penghuni.id}`}
                className="flex-1 border-2 border-[#84CC16] text-[#84CC16] py-2 rounded-xl text-sm font-medium text-center hover:bg-[#84CC16]/5 transition-colors"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Fasilitas */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Fasilitas</h2>
          <span className="text-sm text-gray-500">{(kamar.fasilitas?.length || 0)} fasilitas</span>
        </div>
        {kamar.fasilitas && kamar.fasilitas.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {kamar.fasilitas.map((fasilitas, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-1"
              >
                <Wifi className="w-3 h-3" />
                {fasilitas}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Belum ada fasilitas terdaftar</p>
        )}
      </div>

      <div className="mt-8 mb-6">
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Hapus Kamar</span>
        </button>
      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Hapus Kamar"
        message={`Kamar "${kamar.nomor}" akan dihapus secara permanen. Pastikan kamar tidak sedang ditempati.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        danger
      />
    </MainLayout>
  );
}
