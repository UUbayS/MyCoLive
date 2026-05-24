"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Edit, MessageCircle, DoorOpen, Wifi } from "lucide-react";
import ImageCarousel from "../../../../components/ImageCarousel";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { getUser } from "../../../../lib/auth";
import { getPropertiById, deleteProperti, PropertiData } from "../../../../lib/api";
import MainLayout from "../../../../components/Layout/MainLayout";

type TabType = "kamar" | "fasilitas" | "deskripsi";

export default function DetailPropertiPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [properti, setProperti] = useState<PropertiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFullKebijakan, setShowFullKebijakan] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("kamar");

  const user = getUser();
  const isPemilik = user?.role ==="PEMILIK";
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
        router.push("/public/katalog-properti");
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

  const kamarTersedia = properti?.kamar?.filter((k) => k.status === "KOSONG") || [];
  const totalKamar = properti?.total_kamar || 0;

  const allFasilitas = new Set<string>();
  properti?.kamar?.forEach((kamar) => {
    kamar.fasilitas?.forEach((f) => allFasilitas.add(f));
  });
  const fasilitasList = Array.from(allFasilitas);

  const tabs: { key: TabType; label: string; icon: typeof DoorOpen; count?: number }[] = [
    { key: "kamar", label: "Kamar", icon: DoorOpen, count: totalKamar },
    { key: "fasilitas", label: "Fasilitas", icon: Wifi, count: fasilitasList.length },
    { key: "deskripsi", label: "Deskripsi", icon: MapPin },
  ];

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
            href="/public/katalog-properti"
            className="mt-4 inline-block text-[#84CC16] hover:underline"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-center flex-1">{properti.nama}</h1>
          {isPemilik && (
            <Link
              href={`/pengelola/properti/${propertiId}/edit`}
              className="flex items-center gap-1 text-[#84CC16] hover:text-[#73b814]"
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm">Edit</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{getDisplayAlamat()}</span>
        </div>

        <ImageCarousel images={properti.gambar || []} alt={properti.nama} />
      </div>

      <div className="mb-6">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-[#84CC16] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      isActive
                        ? "bg-[#84CC16]/10 text-[#84CC16]"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "kamar" && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Daftar Kamar</h2>
            <span className="text-sm text-gray-500">
              {kamarTersedia.length} kosong / {totalKamar} total
            </span>
          </div>

          {totalKamar > 0 ? (
            <>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {(properti.kamar || []).slice(0, 5).map((kamar) => {
                  const isKosong = kamar.status === "KOSONG";
                  return (
                    <Link
                      key={kamar.id}
                      href={`/public/katalog-properti/${propertiId}/kamar/${kamar.id}`}
                      className="shrink-0 w-64 rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-32 bg-gray-200 relative">
                        {kamar.gambar?.[0] ? (
                          <img
                            src={kamar.gambar[0]}
                            alt={kamar.nomor}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            No Image
                          </div>
                        )}
                        <span
                          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                            isKosong
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {isKosong ? "Kosong" : "Terisi"}
                        </span>
                      </div>
                      <div className="p-3">
                        <span className="font-medium text-sm">{kamar.nomor}</span>
                        <p className="text-xs text-gray-500 mt-1">
                          {(() => {
                            const tarifObj = typeof kamar.tarif === "object" && kamar.tarif ? kamar.tarif as Record<string, number> : {};
                            const hargaBulanan = tarifObj["1_bulan"] || Object.values(tarifObj)[0];
                            return hargaBulanan ? `Rp ${Number(hargaBulanan).toLocaleString("id-ID")}/bln` : "";
                          })()}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                href={`/public/katalog-properti/${propertiId}/kamar`}
                className="mt-3 w-full bg-[#84CC16] text-white py-2.5 rounded-xl text-sm font-medium text-center block hover:bg-[#73b814] transition-colors"
              >
                Lihat Semua Kamar
              </Link>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <DoorOpen className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Belum ada kamar</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "fasilitas" && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Daftar Fasilitas</h2>
          {fasilitasList.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {fasilitasList.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-8 h-8 bg-[#84CC16]/10 rounded-full flex items-center justify-center shrink-0">
                    <Wifi className="w-4 h-4 text-[#84CC16]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">{f}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Wifi className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Belum ada fasilitas</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "deskripsi" && (
        <div className="mb-6 space-y-6">
          {properti.deskripsi && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Deskripsi Properti</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{properti.deskripsi}</p>
            </div>
          )}

          {properti.kebijakan && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Kebijakan Properti</h2>
                <button
                  onClick={() => setShowFullKebijakan(!showFullKebijakan)}
                  className="text-sm text-[#84CC16] hover:underline"
                >
                  {showFullKebijakan ? "Tutup" : "Lihat Selengkapnya"}
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

          <div>
            <h2 className="text-lg font-semibold mb-2">Detail Lokasi</h2>
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{getDisplayAlamat()}</span>
            </div>
            <a
              href={getGoogleMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-100 rounded-xl h-48 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <MapPin className="w-8 h-8 mb-2" />
              <span className="text-sm">Buka di Google Maps</span>
            </a>
          </div>
        </div>
      )}

      {!isPengurus && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Kontak Pengurus</h2>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border-2 border-[#84CC16] text-[#84CC16] py-3 rounded-xl font-medium hover:bg-[#84CC16]/5 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat via WhatsApp
          </a>
        </div>
      )}

      {isPengurus && (
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="w-full border-2 border-red-500 text-red-500 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
        >
          Hapus Properti
        </button>
      )}

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
