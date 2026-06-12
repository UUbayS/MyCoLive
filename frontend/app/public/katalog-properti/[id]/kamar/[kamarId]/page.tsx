"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, User, MessageCircle, LogIn, Home } from "lucide-react";
import ImageCarousel from "../../../../../../components/ImageCarousel";
import TarifSelector from "../../../../../../components/TarifSelector";
import { getUser, isAuthenticated } from "../../../../../../lib/auth";
import { getKamarById, getMyPenghuni, KamarData, PropertiData } from "../../../../../../lib/api";
import MainLayout from "../../../../../../components/Layout/MainLayout";

export default function DetailKamarPage() {
  const router = useRouter();
  const params = useParams();
  const kamarId = params.kamarId as string;
  const propertiId = params.id as string;

  const [kamar, setKamar] = useState<KamarData | null>(null);
  const [properti] = useState<PropertiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState("1_bulan");
  const [isAktif, setIsAktif] = useState(true);
  const [hasActiveRoom, setHasActiveRoom] = useState(false);
  const [checkingRoom, setCheckingRoom] = useState(true);

  const user = getUser();
  const isLoggedIn = isAuthenticated();
  const isPenghuni = user?.role === "PENGHUNI";

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

  useEffect(() => {
    if (!isPenghuni) {
      setCheckingRoom(false);
      return;
    }

    const checkPenghuniRoom = async () => {
      try {
        const myPenghuni = await getMyPenghuni();
        if (myPenghuni && myPenghuni.kamar && myPenghuni.status_sewa === "AKTIF") {
          setHasActiveRoom(true);
        }
      } catch (error) {
        console.error("Failed to check penghuni room:", error);
      } finally {
        setCheckingRoom(false);
      }
    };

    checkPenghuniRoom();
  }, [isPenghuni]);

  const getWhatsAppLink = () => {
    if (!kamar?.properti) return "#";
    const phone = "6281234567890";
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan kamar ${kamar.nomor} di ${kamar.properti.nama}`
    );
    return `https://wa.me/${phone}?text=${message}`;
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
  const tarif = (typeof kamar.tarif === "object" && kamar.tarif ? kamar.tarif : {}) as Record<string, number>;

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
                <span>{kamar.properti?.nama || "Properti"} - {kamar.properti.alamat}</span>
              </div>
            )}
          </div>
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
          {/* Kontak Pengurus */}
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-[#84CC16]" />
              Kontak Pengurus
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-sm text-gray-900">{properti?.admin?.nama || "Pengurus"}</p>
                <p className="text-xs text-gray-500">Pengelola Properti</p>
              </div>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
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
          </div>

          {/* Deskripsi Kamar */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Deskripsi Kamar</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Lantai: {kamar.luas?.split(" - ")[0] || "1"}</p>
              <p>Ukuran: {kamar.luas?.split(" - ")[1] || kamar.luas || "-"}</p>
            </div>
          </div>

          {/* Fasilitas Ruangan */}
          {kamar.fasilitas_ruangan && kamar.fasilitas_ruangan.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Fasilitas Ruangan</h2>
              <div className="flex flex-wrap gap-2">
                {kamar.fasilitas_ruangan.map((f) => (
                  <span
                    key={f.id}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-100"
                  >
                    {f.nama}
                  </span>
                ))}
              </div>
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
              <h2 className="text-lg font-semibold mb-2">Tarif Ruangan</h2>
              <TarifSelector
                tarif={tarif}
                selectedDuration={selectedDuration}
                onSelect={setSelectedDuration}
              />
            </div>
          )}
          {/* Tombol Aksi - full width */}
          <div className="mb-6">        
            {/* Pesan Kamar - for unauthenticated users */}
            {!isLoggedIn && isKosong && (
              <Link
                href={`/auth/login?redirect=${encodeURIComponent(`/penghuni/pesan/${kamarId}?durasi=${selectedDuration}`)}`}
                className="flex items-center justify-center gap-2 w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium text-center hover:bg-[#73b814] transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Pesan Kamar
              </Link>
            )}

            {/* Pesan Kamar - for penghuni without active room */}
            {isPenghuni && isKosong && !checkingRoom && !hasActiveRoom && (
              <Link
                href={`/penghuni/pesan/${kamarId}?durasi=${selectedDuration}`}
                className="flex items-center justify-center gap-2 w-full bg-[#84CC16] text-white py-3 rounded-xl font-medium text-center hover:bg-[#73b814] transition-colors"
              >
                <Home className="w-5 h-5" />
                Pesan Kamar
              </Link>
            )}
          </div>

          {/* Info for penghuni with active room */}
          {isPenghuni && isKosong && !checkingRoom && hasActiveRoom && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 text-center">
              <p className="text-yellow-700 font-medium text-sm">
                Anda sudah memiliki kamar aktif. Tidak dapat memesan kamar tambahan.
              </p>
            </div>
          )}
        </div>      
      </div>
    </MainLayout>
  );
}
