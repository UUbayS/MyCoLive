"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MapPin,
  DoorOpen,
  Users,
  Banknote,
  MessageSquareWarning,
  BedDouble,
  Wrench,
  Trees,
  Users as UsersIcon,
  HelpCircle,
  Loader2,
} from "lucide-react";
import MainLayout from "../../../components/Layout/MainLayout";
import ImageCarousel from "../../../components/ImageCarousel";
import { getUser, isAuthenticated } from "../../../lib/auth";
import { getPropertiList, PropertiData } from "../../../lib/api";

export default function PengelolaPropertiPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertiData[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGELOLA") {
      router.push("/public/katalog-properti");
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchProperties = async () => {
      try {
        const result = await getPropertiList();
        setProperties(result);
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-6 animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (properties.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-gray-500">
          <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h1 className="text-xl font-semibold mb-1">Belum Ada Properti</h1>
          <p className="text-sm mb-4">Anda belum ditugaskan mengelola properti apapun.</p>
          <p className="text-sm">Hubungi pemilik untuk menambahkan properti.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Properti Saya</h1>

        <div className="space-y-6">
          {properties.map((property) => {
            const total = property.total_kamar ?? 0;
            const kosong = property.kamar_kosong ?? 0;
            const terisi = total - kosong;

            return (
              <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Gambar Properti */}
                <ImageCarousel
                  images={property.gambar || []}
                  alt={property.nama}
                  height="h-56"
                />

                {/* Detail Properti */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{property.nama}</h2>
                  <div className="flex items-start gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      {[
                        property.detail_alamat,
                        property.kecamatan ? `Kec. ${property.kecamatan}` : null,
                        property.kota,
                        property.provinsi,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.jenis && (
                      <span className="px-2.5 py-1 bg-[#84CC16]/10 text-[#84CC16] text-xs font-medium rounded-full">
                        {property.jenis.replace("_", " ")}
                      </span>
                    )}
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {total} Kamar
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {kosong} Kosong
                    </span>
                  </div>
                </div>

                {/* Info Kamar */}
                <div className="mx-4 mb-4 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BedDouble className="w-4 h-4" />
                    Informasi Properti
                  </h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 bg-white rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{total}</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg">
                      <p className="text-lg font-bold text-green-600">{kosong}</p>
                      <p className="text-xs text-gray-500">Kosong</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{terisi}</p>
                      <p className="text-xs text-gray-500">Terisi</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pb-4 flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/pengelola/properti/${property.id}/kamar`}
                    className="flex items-center justify-center gap-2 flex-1 py-3 bg-[#84CC16] text-white text-sm font-medium rounded-xl hover:bg-[#73b814] transition-colors"
                  >
                    <DoorOpen className="w-4 h-4" />
                    Lihat Kamar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
