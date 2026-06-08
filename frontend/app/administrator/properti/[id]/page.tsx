"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MapPinned,
  Edit,
  Trash2,
  DoorOpen,
  Plus,
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
      } catch (error) {
        console.error("Failed to fetch properti:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperti();
  }, [propertiId, router]);

  const handleDelete = async () => {
    try {
      const success = await deleteProperti(propertiId);
      if (success) {
        router.push("/administrator/properti");
      } else {
        alert("Gagal menghapus properti. Pastikan tidak ada kamar atau penghuni aktif.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus properti.");
    } finally {
      setShowDeleteDialog(false);
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
  const stats = {
    total: kamarList.length,
    kosong: kamarList.filter((k) => k.status === "KOSONG").length,
    terisi: kamarList.filter((k) => k.status === "TERISI").length,
    maintenance: kamarList.filter((k) => k.status === "MAINTENANCE").length,
  };

  const fasilitasUmum = properti?.fasilitas_umum || [];
  const fasilitasRuangan = new Set<string>();
  properti?.kamar?.forEach((kamar) => {
    kamar.fasilitas_ruangan?.forEach((f) => fasilitasRuangan.add(f.nama));
  });
  const allFasilitas = [...fasilitasUmum.map((f) => f.nama), ...Array.from(fasilitasRuangan)];
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
          <h1 className="text-xl font-bold text-gray-900">{properti.nama}</h1>
          <Link
            href={`/administrator/properti/${propertiId}/edit`}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
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

      {/* Kamar Section */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Daftar Kamar</h2>
            <p className="text-sm text-gray-500 mt-1">
              {stats.total} kamar total | {stats.kosong} kosong | {stats.terisi} terisi | {stats.maintenance} maintenance
            </p>
          </div>
          <Link
            href={`/administrator/properti/${propertiId}/kamar/tambah`}
            className="hidden md:flex items-center gap-1 px-4 py-2 bg-[#84CC16] text-white rounded-lg hover:bg-[#73b814] transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Tambah Kamar
          </Link>
        </div>

        <Link
          href={`/administrator/properti/${propertiId}/kamar`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          <DoorOpen className="w-4 h-4" />
          Lihat Semua Kamar
        </Link>
      </div>

      {/* Deskripsi & Kebijakan */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Deskripsi & Kebijakan</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {properti.deskripsi || "Tidak ada deskripsi"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Kebijakan</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {properti.kebijakan || "Tidak ada kebijakan"}
            </p>
          </div>
        </div>
      </div>

      {/* Fasilitas */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Fasilitas</h2>
          <span className="text-sm text-gray-500">{fasilitasList.length} fasilitas</span>
        </div>
        {fasilitasList.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {fasilitasList.map((fasilitas, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
              >
                {fasilitas}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Belum ada fasilitas terdaftar</p>
        )}
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
      
      <div className="mt-8 mb-6">
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Hapus Properti</span>
        </button>
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
