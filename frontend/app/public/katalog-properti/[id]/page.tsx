"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Edit,
  MessageCircle,
  DoorOpen,
  Wifi,
  BedDouble,
  CheckCircle,
  User,
  Phone,
  ChevronRight,
  ExternalLink,
  Home,
  Users,
  ShieldCheck,
  MapPinned,
} from "lucide-react";
import ImageCarousel from "../../../../components/ImageCarousel";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { getUser } from "../../../../lib/auth";
import { getPropertiById, deleteProperti, PropertiData } from "../../../../lib/api";
import MainLayout from "../../../../components/Layout/MainLayout";

type TabType = "deskripsi" | "kamar" | "fasilitas";

export default function DetailPropertiPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [properti, setProperti] = useState<PropertiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFullKebijakan, setShowFullKebijakan] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("deskripsi");

  const user = getUser();
  const isPemilik = user?.role === "PEMILIK";
  const isPengurus = user?.role === "PEMILIK" || user?.role === "PENGELOLA";

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

  const handleDelete = async () => {
    try {
      const success = await deleteProperti(propertiId);
      if (success) {
        router.push("/");
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
  const totalKamar = kamarList.length;
  const kamarKosong = kamarList.filter(k => k.status === "KOSONG").length;
  const kamarTerisi = kamarList.filter(k => k.status === "TERISI").length;
  const kamarMaintenance = kamarList.filter(k => k.status === "MAINTENANCE").length;
  const kamarKosongList = kamarList.filter(k => k.status === "KOSONG");

  const fasilitasUmum = properti?.fasilitas_umum || [];
  const fasilitasRuangan = new Set<string>();
  properti?.kamar?.forEach((kamar) => {
    kamar.fasilitas_ruangan?.forEach((f) => fasilitasRuangan.add(f.nama));
  });
  const allFasilitas = [...fasilitasUmum.map((f) => f.nama), ...Array.from(fasilitasRuangan)];
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
      <div className="w-full max-w-3xl mx-auto py-6 md:py-8">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            {isPemilik && (
              <Link
                href={`/administrator/properti/${propertiId}/edit`}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-[#84CC16] transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Link>
            )}
          </div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-1.5">{properti.nama}</h1>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getJenisColor(properti.jenis)}`}>
              {getJenisLabel(properti.jenis)}
            </span>
          </div>
          <div className="flex items-start gap-1 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span className="leading-relaxed">{getDisplayAlamat()}</span>
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

        {/* Kontak Pengurus */}
        {!isPengurus && properti?.admin && (
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-[#84CC16]" />
              Kontak Pengurus
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-sm text-gray-900">{properti.admin.nama || "Pengurus"}</p>
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
        )}

        {/* Tab: Deskripsi */}
        {activeTab === "deskripsi" && (
          <div className="space-y-3">
            {/* Deskripsi Properti */}
            {properti.deskripsi && (
              <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#84CC16]" />
                  Deskripsi Properti
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{properti.deskripsi}</p>
              </div>
            )}

            {/* Kebijakan */}
            {properti.kebijakan && (
              <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
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
            )}

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
          </div>
        )}

        {/* Tab: Kamar */}
        {activeTab === "kamar" && (
          <div className="space-y-3">
            {kamarKosongList.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl">
                <BedDouble className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500 font-medium text-sm">Tidak Ada Kamar Kosong</p>
                <p className="text-xs text-gray-400 mt-1">Semua kamar saat ini sudah terisi.</p>
                <Link
                  href={`/public/katalog-properti/${propertiId}/kamar`}
                  className="inline-flex items-center gap-2 mt-3 text-sm text-[#84CC16] font-medium hover:underline"
                >
                  Lihat Semua Kamar <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-500 mb-2">
                  {kamarKosongList.length} kamar kosong
                </p>
                <div className="space-y-2">
                  {kamarKosongList.map((k) => (
                    <Link
                      key={k.id}
                      href={`/public/katalog-properti/${propertiId}/kamar/${k.id}`}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[#84CC16]/30 transition-all"
                    >
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        {k.gambar && k.gambar[0] ? (
                          <img src={k.gambar[0]} alt={k.nomor} className="w-full h-full object-cover" />
                        ) : (
                          <BedDouble className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm text-gray-900">Kamar {k.nomor}</p>
                          <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[11px] font-medium rounded-full">
                            Kosong
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{k.tipe}</p>
                        {k.tarif && typeof k.tarif === "object" && (
                          <p className="text-xs font-medium text-[#84CC16] mt-0.5">
                            Rp {(k.tarif["1_bulan"] || Object.values(k.tarif)[0])?.toLocaleString("id-ID")}/bulan
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab: Fasilitas */}
        {activeTab === "fasilitas" && (
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
            {fasilitasList.length === 0 ? (
              <div className="text-center py-6">
                <Wifi className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500 font-medium text-sm">Belum Ada Fasilitas</p>
                <p className="text-xs text-gray-400 mt-1">Fasilitas akan muncul setelah ditambahkan.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {fasilitasList.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 text-gray-700 text-xs rounded-lg border border-gray-100"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#84CC16]" />
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Admin Actions */}
        {isPemilik && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="w-full py-2.5 border-2 border-red-200 text-red-600 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
            >
              Hapus Properti
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Hapus Properti"
        message="Apakah Anda yakin ingin menghapus properti ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </MainLayout>
  );
}
