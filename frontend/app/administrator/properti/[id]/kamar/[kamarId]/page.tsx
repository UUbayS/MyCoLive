"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  BedDouble,
  ChevronDown,
  User,
  Wrench,
  Wifi,
  Plus,
  AlertCircle
} from "lucide-react";
import ImageCarousel from "../../../../../../components/ImageCarousel";
import ConfirmDialog from "../../../../../../components/ConfirmDialog";
import { getUser } from "../../../../../../lib/auth";
import {
  getKamarById,
  deleteKamar,
  updateKamarStatus,
  KamarData,
  PropertiData,
} from "../../../../../../lib/api";
import MainLayout from "../../../../../../components/Layout/MainLayout";
import TarifSelector from "@/components/TarifSelector";

const statusConfig = {
  KOSONG: { icon: BedDouble, label: "Kosong", color: "bg-green-100 text-green-700" },
  TERISI: { icon: BedDouble, label: "Terisi", color: "bg-blue-100 text-blue-700" },
  MAINTENANCE: { icon: Wrench, label: "Maintenance", color: "bg-yellow-100 text-yellow-700" },
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
  const [selectedDuration, setSelectedDuration] = useState("1_bulan");

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
  const Icon = status.icon;

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/administrator/properti/${propertiId}/kamar`)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Kamar {kamar.nomor} - {kamar.properti?.nama || "Properti"}
            </h1>
          </div>
        </div>
        <Link
          href={`/administrator/properti/${propertiId}/kamar/${kamarId}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-[#84CC16] text-white rounded-lg hover:bg-[#65a30d] transition-colors text-sm font-medium shadow-sm"
        >
          <Edit className="w-4 h-4" />
          <span className="hidden sm:inline">Edit Kamar</span>
        </Link>
      </div>

      {/* Image Carousel & Status Overlay */}
      <div className="relative mb-6 rounded-xl overflow-hidden shadow-sm">
        <ImageCarousel images={kamar.gambar || []} alt={`Kamar ${kamar.nomor}`} />
        <div className="absolute bottom-4 right-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md ${status?.color || "bg-gray-100 text-gray-600"}`}>
            <Icon className="w-4 h-4" />
            {status?.label || kamar.status}
          </span>
        </div>
      </div>

      {/* Informasi Kamar & Tarif (Digabungkan) */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Informasi Kamar</h2>
          {/* Menu Ubah Status (Inline) */}
          <div className="relative w-full sm:w-auto">
            <span>Ubah Status: </span>
            <select
              value={kamar.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updatingStatus}
              className="w-full sm:w-auto pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#84CC16] appearance-none bg-white font-medium cursor-pointer disabled:opacity-50"
            >
              <option value="KOSONG">Kosong</option>
              <option value="TERISI">Terisi</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            {updatingStatus && (
              <span className="absolute -top-6 right-0 text-xs text-blue-500 font-medium">Menyimpan...</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri: Spesifikasi */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center border-b border-gray-50 pb-3">
              <span className="text-sm text-gray-500">Nomor Kamar</span>
              <span className="text-sm font-medium text-gray-900 col-span-2">{kamar.nomor}</span>
            </div>
            {kamar.tipe && (
              <div className="grid grid-cols-3 items-center border-b border-gray-50 pb-3">
                <span className="text-sm text-gray-500">Tipe</span>
                <span className="text-sm font-medium text-gray-900 col-span-2">{kamar.tipe}</span>
              </div>
            )}
            {kamar.luas && (
              <div className="grid grid-cols-3 items-center border-b border-gray-50 pb-3">
                <span className="text-sm text-gray-500">Luas</span>
                <span className="text-sm font-medium text-gray-900 col-span-2">{kamar.luas}</span>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Tarif */}
          <div>
            {/* Tarif */}
            <h2 className="text-lg font-semibold text-gray-900">Tarif Kamar</h2>
            {Object.keys(tarifObj).length > 0 ? (
              <div>
                <TarifSelector
                  tarif={tarifObj}
                  selectedDuration={selectedDuration}
                  onSelect={setSelectedDuration}
                />
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-sm text-gray-500">
                Belum ada tarif yang ditentukan
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Penghuni Aktif */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Penghuni Aktif</h2>
        {kamar.status === "TERISI" && kamar.penghuni ? (
          <div>  
            <div className="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-lg font-bold text-[#84CC16]">
                  {kamar.penghuni.user.nama.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{kamar.penghuni.user.nama}</p>
                <p className="text-sm text-gray-500">
                  {kamar.penghuni.user.no_telepon || kamar.penghuni.user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-5">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Mulai Masuk</p>
                <p className="font-medium text-gray-900">
                  {kamar.penghuni.tgl_mulai ? new Date(kamar.penghuni.tgl_mulai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Jatuh Tempo</p>
                <p className="font-medium text-gray-900">
                  {kamar.penghuni.tgl_berakhir ? new Date(kamar.penghuni.tgl_berakhir).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex-1 bg-green-50 text-green-700 py-2.5 rounded-lg text-sm font-semibold text-center border border-green-100">
                Sisa {getSisaHari()} Hari
              </span>
              <button className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors border border-red-100">
                Check-Out
              </button>
              <Link
                href={`/administrator/penghuni/${kamar.penghuni.id}`}
                className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-gray-50 transition-colors"
              >
                Detail
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-4">Kamar ini belum memiliki penghuni.</p>
            <button className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm">
              <Plus className="w-4 h-4" />
              Tambah Penghuni
            </button>
          </div>
        )}
      </div>

      {/* Fasilitas */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Fasilitas Kamar</h2>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
            {(kamar.fasilitas_kamar?.length || 0)} fasilitas
          </span>
        </div>
        {kamar.fasilitas_kamar && kamar.fasilitas_kamar.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {kamar.fasilitas_kamar.map((f) => (
              <span
                key={f.id}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm flex items-center gap-1.5 font-medium"
              >
                {f.nama}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">Belum ada fasilitas terdaftar</p>
        )}
      </div>

      {/* Keterangan Tambahan */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Keterangan Tambahan</h2>
        {kamar.deskripsi ? (
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
            {kamar.deskripsi}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic">Tidak ada keterangan tambahan.</p>
        )}
      </div>

      {/* Zona Berbahaya */}
      <div className="bg-red-50 rounded-xl p-5 border border-red-100 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Zona Berbahaya
            </h2>
            <p className="text-sm text-red-600 mt-1">
              Menghapus kamar ini akan menghilangkan seluruh datanya secara permanen.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Kamar</span>
          </button>
        </div>
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