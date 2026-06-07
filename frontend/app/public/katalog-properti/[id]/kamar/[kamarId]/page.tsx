"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Edit, MessageCircle } from "lucide-react";
import ImageCarousel from "../../../../../../components/ImageCarousel";
import TarifSelector from "../../../../../../components/TarifSelector";
import ConfirmDialog from "../../../../../../components/ConfirmDialog";
import { getUser } from "../../../../../../lib/auth";
import { getKamarById, deleteKamar, updateKamarStatus, KamarData } from "../../../../../../lib/api";
import MainLayout from "../../../../../../components/Layout/MainLayout";

export default function DetailKamarPage() {
  const router = useRouter();
  const params = useParams();
  const kamarId = params.kamarId as string;
  const propertiId = params.id as string;

  const [kamar, setKamar] = useState<KamarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("1_bulan");
  const [isAktif, setIsAktif] = useState(true);

  const user = getUser();
  const isPemilik = user?.role === "PEMILIK";
  const isPenghuni = user?.role === "PENGHUNI";
  const isPengelola = user?.role === "PENGELOLA";

  useEffect(() => {
    if (!kamarId) return;

    const fetchKamar = async () => {
      try {
        const data = await getKamarById(kamarId);
        setKamar(data);
        setIsAktif(data?.status === "KOSONG");
      } catch (error) {
        console.error("Failed to fetch kamar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKamar();
  }, [kamarId]);

  const handleDelete = async () => {
    try {
      const success = await deleteKamar(kamarId);
      if (success) {
        router.push(`/public/katalog-properti/${propertiId}/kamar`);
      } else {
        alert("Gagal menghapus kamar.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus kamar.");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleToggleAktif = async () => {
    const newStatus = isAktif ? "MAINTENANCE" : "KOSONG";
    try {
      const updated = await updateKamarStatus(kamarId, newStatus);
      if (updated) {
        setKamar(updated);
        setIsAktif(!isAktif);
      }
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const getWhatsAppLink = () => {
    if (!kamar?.properti) return "#";
    const phone = "6281234567890";
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan kamar ${kamar.nomor} di ${kamar.properti.nama}`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  const getSisaHari = () => {
    if (!kamar?.penghuni?.tgl_berakhir) return 0;
    const endDate = new Date(kamar.penghuni.tgl_berakhir);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

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
            href={`/public/katalog-properti/${propertiId}/kamar`}
            className="mt-4 inline-block text-[#84CC16] hover:underline"
          >
            Kembali ke Daftar Kamar
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isKosong = kamar.status === "KOSONG";
  const isTerisi = kamar.status === "TERISI";
  const isMaintenance = kamar.status === "MAINTENANCE";
  const tarif = (typeof kamar.tarif === "object" && kamar.tarif ? kamar.tarif : {}) as Record<string, number>;

  if (!isPemilik && isMaintenance) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">Kamar tidak tersedia</p>
          <Link
            href={`/public/katalog-properti/${propertiId}/kamar`}
            className="mt-4 inline-block text-[#84CC16] hover:underline"
          >
            Kembali ke Daftar Kamar
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header - full width */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-semibold">Kamar {kamar.nomor}</h1>
            {kamar.properti && (
              <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{kamar.properti.alamat}</span>
              </div>
            )}
          </div>
          {isPemilik && (
            <Link
              href={`/administrator/properti/${propertiId}/kamar/${kamarId}/edit`}
              className="flex items-center gap-1 text-[#84CC16] hover:text-[#73b814]"
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm">Edit</span>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop: 2 kolom | Mobile: 1 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Kolom Kiri - Gambar */}
        <div>
          {/* Image Carousel */}
          <div className="mb-4">
            <ImageCarousel images={kamar.gambar || []} alt={kamar.nomor} />
          </div>

          {/* Penghuni Aktif - hanya PEMILIK */}
          {isPemilik && kamar.penghuni && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Penghuni Aktif</h2>
              <div className="bg-white rounded-xl shadow-sm p-4">
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
            </div>
          )}
        </div>

        {/* Kolom Kanan - Detail */}
        <div className="space-y-4 md:space-y-6">
          {/* Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isKosong
                    ? "bg-green-500 text-white"
                    : isTerisi
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {isKosong ? "Kosong" : isTerisi ? "Terisi" : "Non-Aktif"}
              </span>
            </div>

            {isPemilik && (isKosong || isMaintenance) && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Kamar Aktif</span>
                <button
                  onClick={handleToggleAktif}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    isAktif ? "bg-[#84CC16]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      isAktif ? "left-6" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Deskripsi Kamar */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Deskripsi Kamar</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Lantai: {kamar.luas?.split(" - ")[0] || "1"}</p>
              <p>Ukuran: {kamar.luas?.split(" - ")[1] || kamar.luas || "-"}</p>
            </div>
          </div>

          {/* Fasilitas */}
          {kamar.fasilitas && kamar.fasilitas.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Fasilitas</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {kamar.fasilitas.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Keterangan Tambahan */}
          {kamar.deskripsi && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Keterangan Tambahan</h2>
              <p className="text-sm text-gray-600">{kamar.deskripsi}</p>
            </div>
          )}

          {/* Tarif */}
          {Object.keys(tarif).length > 0 && (
            <div>
              <TarifSelector
                tarif={tarif}
                selectedDuration={selectedDuration}
                onSelect={setSelectedDuration}
              />
            </div>
          )}
        </div>
      </div>

      {/* Tombol Aksi - full width */}
      {(isPenghuni || isPengelola) && (
        <div className="flex gap-3 mb-6">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 border-2 border-[#84CC16] text-[#84CC16] py-3 rounded-xl font-medium hover:bg-[#84CC16]/5 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat Pengurus
          </a>
          {isPenghuni && isKosong && (
            <Link
              href={`/penghuni/pesan/${kamarId}`}
              className="flex-1 bg-[#84CC16] text-white py-3 rounded-xl font-medium text-center hover:bg-[#73b814] transition-colors"
            >
              Pesan Kamar
            </Link>
          )}
        </div>
      )}

      {isPemilik && (
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="w-full border-2 border-red-500 text-red-500 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
        >
          Hapus Kamar
        </button>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Hapus Kamar"
        message="Apakah Anda yakin ingin menghapus kamar ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </MainLayout>
  );
}
