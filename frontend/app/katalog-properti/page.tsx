"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyList from "./components/PropertyList";
import PropertyCard, { PropertyData } from "./components/PropertyCard";
import { getUser } from "../../lib/auth";

// Dummy data untuk placeholder saat API belum tersedia
const dummyProperties: PropertyData[] = [
  {
    id: "1",
    nama: "Kosan A",
    alamat: "Jl Parakan Ayu III No 8, Bandung",
    total_kamar: 7,
    kamar_kosong: 3,
  },
  {
    id: "2",
    nama: "Kosan B",
    alamat: "Jl Parakan Ayu III No 7, Bandung",
    total_kamar: 10,
    kamar_kosong: 0,
  },
];

export default function KatalogPropertiPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil peran user untuk menampilkan tombol tambahkan properti jika perlu
  const user = getUser();
  const showTambah = !!user && (user!.role === "PEMILIK" || user!.role === "PENGELOLA");

  useEffect(() => {
    // Guard autentikasi: jika tidak login, redirect ke login
    if (typeof window !== "undefined" && !user) {
      router.push("/login");
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/katalog", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data && data.status === "success" && Array.isArray(data.data)) {
          if (data.data.length > 0) {
            setProperties(data.data as PropertyData[]);
          } else {
            // fallback dummy jika API ada tapi kosong
            setProperties(dummyProperties);
          }
        } else {
          setProperties(dummyProperties);
        }
      } catch {
        // fallback dummy data saat gagal fetch
        setProperties(dummyProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [router, user]);

  return (
    <div className="min-h-screen bg-white text-black px-4 pt-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Katalog Properti</h1>
        {showTambah && (
          <button
            className="bg-emerald-500 text-white px-5 py-2 rounded-full shadow-sm opacity-80 hover:opacity-100 cursor-default"
            onClick={() => {}}
            aria-label="Tambah Properti"
          >
            + Tambah Properti
          </button>
        )}
      </div>

      <div className="mb-4 text-sm text-gray-600">Daftar Properti</div>

      {loading ? (
        <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
      ) : (
        <PropertyList properties={properties} />
      )}
    </div>
  );
}
