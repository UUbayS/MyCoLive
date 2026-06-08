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

  const totalKamar = properti?.total_kamar || 0;

  const allFasilitas = new Set<string>();
  properti?.kamar?.forEach((kamar) => {
    kamar.fasilitas?.forEach((f) => allFasilitas.add(f));
  });
  const fasilitasList = Array.from(allFasilitas);

  const tabs: { key: TabType; label: string; icon: typeof DoorOpen; count?: number; href?: string }[] = [
    { key: "deskripsi", label: "Deskripsi", icon: MapPin },
    { key: "kamar", label: "Kamar", icon: DoorOpen, count: totalKamar, href: `/public/katalog-properti/${propertiId}/kamar` },
    { key: "fasilitas", label: "Fasilitas", icon: Wifi, count: fasilitasList.length, href: `/public/katalog-properti/${propertiId}/fasilitas` },
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
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-center flex-1">{properti.nama}</h1>
          {isPemilik && (
            <Link
              href={`/administrator/properti/${propertiId}/edit`}
              className="flex items-center gap-1 text-[#84CC16] hover:text-[#73b814]"
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm">Edit</span>
            </Link>
          )}
        </div>

        <div className="flex justify-center items-center gap-1 text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{getDisplayAlamat()}</span>
        </div>

        <ImageCarousel images={properti.gambar || []} alt={properti.nama} />
      </div>

      <div className="mb-4 md:mb-6">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const baseClasses = `flex-1 flex items-center justify-center gap-2 py-3 md:py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-[#84CC16] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`;
            const countBadge = tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  isActive
                    ? "bg-[#84CC16]/10 text-[#84CC16]"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            );

            if (tab.href) {
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={baseClasses}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {countBadge}
                </Link>
              );
            }

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={baseClasses}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {countBadge}
              </button>
            );
          })}
        </div>
      </div>

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
              className="w-full bg-gray-100 rounded-xl h-48 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
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
    </MainLayout>
  );
}
