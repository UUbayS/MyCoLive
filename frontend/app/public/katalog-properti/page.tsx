"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Building2 } from "lucide-react";
import PropertyList from "../../../components/PropertyList";
import { PropertyData } from "../../../components/PropertyCard";
import StatsWidget from "../../../components/StatsWidget";
import { getUser } from "../../../lib/auth";
import { getKatalogProperti, getPropertiList } from "../../../lib/api";
import MainLayout from "../../../components/Layout/MainLayout";

export default function KatalogPropertiPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProperti: 0, totalKamar: 0, totalTerisi: 0 });

  const user = getUser();
  const isPemilik = user?.role === "PEMILIK";
  const isPengelola = user?.role === "PENGELOLA";
  const showTambah = isPemilik || isPengelola;
  const showStats = isPemilik;

  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      router.push("/auth/login");
      return;
    }

    const fetchProperties = async () => {
      try {
        let data: PropertyData[] = [];

        if (isPemilik || isPengelola) {
          const result = await getPropertiList();
          data = result.map((p) => ({
            id: p.id,
            nama: p.nama,
            alamat: p.alamat,
            total_kamar: p.total_kamar,
            kamar_kosong: p.kamar_kosong,
            gambar: p.gambar?.[0],
          }));

          if (isPemilik) {
            const totalKamar = result.reduce((sum, p) => sum + (p.total_kamar || 0), 0);
            const totalTerisi = result.reduce((sum, p) => {
              const kosong = p.kamar_kosong || 0;
              const total = p.total_kamar || 0;
              return sum + (total - kosong);
            }, 0);
            setStats({
              totalProperti: result.length,
              totalKamar,
              totalTerisi,
            });
          }
        } else {
          const result = await getKatalogProperti();
          data = result.map((p) => ({
            id: p.id,
            nama: p.nama,
            alamat: p.alamat,
            total_kamar: p.total_kamar,
            kamar_kosong: p.kamar_kosong,
            gambar: p.gambar?.[0],
          }));
        }

        setProperties(data);
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [router, user, isPemilik, isPengelola]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Katalog Properti</h1>
        {showTambah && (
          <Link
            href="/pengelola/properti/tambah"
            className="hidden md:flex bg-[#84CC16] text-white px-5 py-2 rounded-full shadow-sm hover:bg-[#73b814] transition-colors items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Properti
          </Link>
        )}
      </div>

      {showStats && (
        <StatsWidget
          totalProperti={stats.totalProperti}
          totalKamar={stats.totalKamar}
          totalTerisi={stats.totalTerisi}
        />
      )}

      <div className="mb-4 text-sm text-gray-600">Daftar Properti</div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <PropertyList properties={properties} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Building2 className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-1">Belum ada properti</p>
          <p className="text-center text-sm">
            {showTambah ? (
              <>Klik tombol <strong>Tambah Properti</strong> untuk menambahkan properti baru.</>
            ) : (
              "Properti akan muncul di sini setelah ditambahkan oleh pemilik."
            )}
          </p>
        </div>
      )}

      {showTambah && (
        <Link
          href="/pengelola/properti/tambah"
          className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-[#84CC16] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#73b814] transition-colors z-40"
          aria-label="Tambah Properti"
        >
          <Plus className="w-6 h-6" />
        </Link>
      )}
    </MainLayout>
  );
}
