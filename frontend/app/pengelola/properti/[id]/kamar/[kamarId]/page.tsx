"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, BedDouble, User, Wifi } from "lucide-react";
import ImageCarousel from "../../../../../../components/ImageCarousel";
import { getUser } from "../../../../../../lib/auth";
import { getKamarById, KamarData } from "../../../../../../lib/api";
import MainLayout from "../../../../../../components/Layout/MainLayout";

const statusConfig = {
  KOSONG: { label: "Kosong", color: "bg-green-100 text-green-700" },
  TERISI: { label: "Terisi", color: "bg-blue-100 text-blue-700" },
  MAINTENANCE: { label: "Maintenance", color: "bg-yellow-100 text-yellow-700" },
};

export default function PengelolaDetailKamarPage() {
  const router = useRouter();
  const params = useParams();
  const kamarId = params.kamarId as string;
  const propertiId = params.id as string;

  const [kamar, setKamar] = useState<KamarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kamarId) return;

    const user = getUser();
    if (!user || user.role !== "PENGELOLA") {
      router.push("/auth/login");
      return;
    }

    const fetchKamar = async () => {
      try {
        const data = await getKamarById(kamarId);
        if (!data) {
          router.push(`/pengelola/properti/${propertiId}/kamar`);
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
            href={`/pengelola/properti/${propertiId}/kamar`}
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
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push(`/pengelola/properti/${propertiId}/kamar`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Kembali</span>
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Kamar {kamar.nomor}</h1>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
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
            {kamar.status === "TERISI" && kamar.penghuni && (
              <div>
                <p className="text-sm text-gray-500">Penghuni</p>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <p className="font-medium text-gray-900">{kamar.penghuni.user.nama}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Sisa {getSisaHari()} hari
                </p>
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
    </MainLayout>
  );
}
