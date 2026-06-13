"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "../../../../lib/ToastContext";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MapPinned,
  Edit,
  Trash2,
  DoorOpen,
  AlertCircle,
  Wifi,
  ChevronRight,
  ShieldCheck,
  BedDouble,
  Users,
  Wrench,
  ExternalLink
} from "lucide-react";
import ImageCarousel from "../../../../components/ImageCarousel";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { getUser } from "../../../../lib/auth";
import { getPropertiById, deleteProperti, PropertiData } from "../../../../lib/api";
import MainLayout from "../../../../components/Layout/MainLayout";


export default function AdminDetailPropertiPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [properti, setProperti] = useState<PropertiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFullKebijakan, setShowFullKebijakan] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    if (!propertiId) return;

    const user = getUser();
    if (!user || user.role !== "PEMILIK") {
      router.push("/auth/login");
      return;
    }

    const fetchProperti = async () => {
      try {
        const data = await getPropertiById(propertiId);

        if (!data) {
          router.push("/administrator/properti");
          return;
        }
        setProperti(data);
      } catch (err) {
        console.error("Failed to fetch properti:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperti();
  }, [propertiId, router]);

  const handleDelete = async () => {
    try {
      const result = await deleteProperti(propertiId);
      if (result) {
        success("Properti berhasil dihapus");
        setTimeout(() => {
          router.push("/administrator/properti");
        }, 1500);
      } else {
        error("Gagal menghapus properti. Pastikan tidak ada kamar atau penghuni aktif.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      error("Terjadi kesalahan saat menghapus properti.");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const getJenisLabel = (jenis?: string) => {
    switch (jenis) {
      case "LAKI_LAKI": return "Kos Putra";
      case "PEREMPUAN": return "Kos Putri";
      case "CAMPUR": return "Kos Campur";
      default: return "Kos";
    }
  };

  const getJenisColor = (jenis?: string) => {
    switch (jenis) {
      case "LAKI_LAKI": return "bg-blue-50 text-blue-700 border-blue-200";
      case "PEREMPUAN": return "bg-pink-50 text-pink-700 border-pink-200";
      case "CAMPUR": return "bg-purple-50 text-purple-700 border-purple-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getDisplayAlamat = () => {
    if (!properti) return "";
    if (properti.detail_alamat) {
      return [
        properti.detail_alamat,
        properti.kecamatan ? `Kec. ${properti.kecamatan}` : null,
        properti.kota,
        properti.provinsi,
        properti.kode_pos,
      ]
        .filter(Boolean)
        .join(", ");
    }
    return properti.alamat;
  };

  const getGoogleMapsLink = () => {
    const alamat = getDisplayAlamat();
    if (!alamat) return "#";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat)}`;
  };

  const kamarList = properti?.kamar || [];
  const totalKamar = kamarList.length;
  const stats = {
    total: totalKamar,
    kosong: kamarList.filter((k) => k.status === "KOSONG").length,
    terisi: kamarList.filter((k) => k.status === "TERISI").length,
    maintenance: kamarList.filter((k) => k.status === "MAINTENANCE").length,
  };

  const fasilitasUmum = properti?.fasilitas_umum || [];
  const fasilitasRuangan = new Set<string>();
  properti?.kamar?.forEach((kamar) => {
    kamar.fasilitas_ruangan?.forEach((f) => fasilitasRuangan.add(f.nama));
  });
  const allFasilitas = [...fasilitasUmum.map((f) => f.nama)];
  const fasilitasList = Array.from(new Set(allFasilitas));

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

  if (!properti) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">Properti tidak ditemukan</p>
          <Link
            href="/administrator/properti"
            className="mt-4 inline-block text-[#84CC16] hover:underline"
          >
            Kembali ke Daftar Properti
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => router.push("/administrator/properti")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-gray-900">{properti.nama}</h1>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getJenisColor(properti.jenis)}`}>
                {getJenisLabel(properti.jenis)}
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{getDisplayAlamat()}</span>
            </div>
          </div>
          <Link
            href={`/administrator/properti/${propertiId}/edit`}
            className="flex items-center gap-2 px-2 py-2 bg-[#84CC16] text-white rounded-lg hover:bg-[#65a30d] transition-colors text-sm font-medium shadow-sm"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Properti</span>
            <span className="md:hidden">Edit</span>
          </Link>
        </div>
        <div className="flex md:hidden items-center justify-center gap-1 text-xs text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>{getDisplayAlamat()}</span>
        </div>   
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

      {/* Image Carousel */}
      <div className="mb-6">
        <ImageCarousel images={properti.gambar || []} alt={properti.nama} /> 
      </div>

      {/* Quick Actions - Vertical on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        <Link
          href={`/administrator/properti/${propertiId}/kamar`}
          className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[#84CC16]/30 transition-all"
        >
          <div className="w-9 h-9 bg-[#84CC16]/10 rounded-lg flex items-center justify-center shrink-0">
            <DoorOpen className="w-4 h-4 text-[#84CC16]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900">Lihat Kamar</p>
            <p className="text-xs text-gray-500">{totalKamar} kamar</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        </Link>
        <Link
          href={`/administrator/properti/${propertiId}/fasilitas`}
          className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[#84CC16]/30 transition-all"
        >
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900">Fasilitas</p>
            <p className="text-xs text-gray-500">{fasilitasList.length} fasilitas</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        </Link>
      </div>

      {/* Deskripsi Properti */}
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm mb-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#84CC16]" />
          Deskripsi Properti
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{properti.deskripsi}</p>
      </div>

      {/* Kebijakan */}
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
            Kebijakan
          </h3>
          <button
            onClick={() => setShowFullKebijakan(!showFullKebijakan)}
            className="text-[11px] text-[#84CC16] font-medium hover:underline"
          >
            {showFullKebijakan ? "Sembunyikan" : "Lihat Semua"}
          </button>
        </div>
        <div
          className={`text-sm text-gray-600 leading-relaxed whitespace-pre-line ${
            !showFullKebijakan ? "line-clamp-3" : ""
          }`}
        >
          {properti.kebijakan}
        </div>
      </div>

      {/* Lokasi */}
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
          <MapPinned className="w-4 h-4 text-[#84CC16]" />
          Detail Lokasi
        </h3>
        <p className="text-sm text-gray-600 mb-2 leading-relaxed">{getDisplayAlamat()}</p>
        <a
          href={getGoogleMapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-50 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Buka di Google Maps
        </a>
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
              Menghapus properti ini akan menghilangkan seluruh datanya beserta data kamarnya secara permanen.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Properti</span>
          </button>
        </div>
      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Hapus Properti"
        message={`Properti "${properti.nama}" akan dihapus secara permanen. Pastikan tidak ada kamar atau penghuni aktif.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        danger
      />
    </MainLayout>
  );
}