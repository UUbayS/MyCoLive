"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  DoorOpen,
  Wifi,
  BedDouble,
  User,
  ChevronRight,
  ExternalLink,
  Home,
  Users,
  ShieldCheck,
  MapPinned,
} from "lucide-react";
import ImageCarousel from "../../../../components/ImageCarousel";
import { getPropertiById, PropertiData } from "../../../../lib/api";
import MainLayout from "../../../../components/Layout/MainLayout";

export default function DetailPropertiPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [properti, setProperti] = useState<PropertiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullKebijakan, setShowFullKebijakan] = useState(false);

  useEffect(() => {
    if (!propertiId) return;
    const fetchProperti = async () => {
      try {
        const data = await getPropertiById(propertiId);
        setProperti(data);
      } catch (error) {
        console.error("Failed to fetch properti:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperti();
  }, [propertiId]);

  const getWhatsAppLink = () => {
    if (!properti?.admin?.no_telepon) return "#";
    const phone = properti.admin.no_telepon.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(`Halo, saya tertarik dengan properti ${properti.nama}`);
    return `https://wa.me/${phone}?text=${message}`;
  };

  const getDisplayAlamat = () => {
    if (!properti) return "";
    const parts = [
      properti.detail_alamat,
      properti.kecamatan ? `Kec. ${properti.kecamatan}` : null,
      properti.kota,
      properti.provinsi,
      properti.kode_pos,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : properti.alamat;
  };

  const getGoogleMapsLink = () => {
    const alamat = getDisplayAlamat();
    if (!alamat) return "#";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat)}`;
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

  const kamarList = properti?.kamar || [];
  const totalKamar = properti?.total_kamar;
  const kamarKosong = kamarList.filter(k => k.status === "KOSONG").length;
  const kamarTerisi = kamarList.filter(k => k.status === "TERISI").length;
  const kamarMaintenance = kamarList.filter(k => k.status === "MAINTENANCE").length;

  const fasilitasUmum = properti?.fasilitas_umum || [];
  const fasilitasRuangan = new Set<string>();
  properti?.kamar?.forEach((kamar) => {
    kamar.fasilitas_ruangan?.forEach((f) => fasilitasRuangan.add(f.nama));
  });
  const allFasilitas = [...fasilitasUmum.map((f) => f.nama)];
  const fasilitasList = Array.from(new Set(allFasilitas));

  const stats = [
    { label: "Total", value: totalKamar, sub: "Kamar", icon: Home, color: "bg-blue-50 text-blue-600" },
    { label: "Kosong", value: kamarKosong, sub: "Tersedia", icon: BedDouble, color: "bg-green-50 text-green-600" },
    { label: "Terisi", value: kamarTerisi, sub: "Penghuni", icon: Users, color: "bg-orange-50 text-orange-600" },
    { label: "Maint", value: kamarMaintenance, sub: "Perbaikan", icon: ShieldCheck, color: "bg-gray-50 text-gray-600" },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="w-full max-w-3xl mx-auto py-6 animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-20 bg-gray-200 rounded-xl" />
          </div>
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!properti) {
    return (
      <MainLayout>
        <div className="w-full max-w-3xl mx-auto py-12 text-center">
          <p className="text-lg text-gray-500">Properti tidak ditemukan</p>
          <Link href="/" className="mt-4 inline-block text-[#84CC16] hover:underline">
            Kembali ke Katalog
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
              onClick={() => router.back()}
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
              <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{getDisplayAlamat()}</span>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
        {/* Image Carousel */}
        <div className="mb-4 rounded-xl overflow-hidden shadow-sm w-full">
          <ImageCarousel images={properti.gambar || []} alt={properti.nama} height="h-48 md:h-64" />
        </div>

        {/* Info Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 w-full">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl py-2.5 px-3 shadow-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 leading-none">{stat.value}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions - Vertical on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <Link
            href={`/public/katalog-properti/${propertiId}/kamar`}
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
            href={`/public/katalog-properti/${propertiId}/fasilitas`}
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

        {/* Kontak Pemilik */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-[#84CC16]" />
            Kontak Pemilik
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-medium text-sm text-gray-900">{properti?.admin?.nama || "Pengurus"}</p>
              <p className="text-xs text-gray-500">Pemilik Properti</p>
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
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
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
    </MainLayout>
  );
}
