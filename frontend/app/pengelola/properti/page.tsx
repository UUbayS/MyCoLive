"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import { getPropertiList, PropertiData } from "../../../lib/api";
import { getUser } from "../../../lib/auth";
import MainLayout from "../../../components/Layout/MainLayout";

export default function PengelolaPropertiPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertiData[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const user = getUser();
    if (!user || user.role !== "PENGELOLA") {
      router.push("/auth/login");
      return;
    }

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

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Properti Saya</h1>
      </div>

      <div className="mb-4 text-sm text-gray-600">Daftar Properti yang Dikelola</div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/public/katalog-properti/${property.id}`}
              className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer block"
            >
              <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                {property.gambar && property.gambar.length > 0 ? (
                  <img
                    src={property.gambar[0]}
                    alt={property.nama}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">No Image</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{property.nama}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                  <MapPin className="w-3 h-3" />
                  <p className="truncate">{property.alamat}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {property.total_kamar ?? 0} Kamar | {property.kamar_kosong ?? 0} Kosong
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Building2 className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-1">Belum ada properti</p>
          <p className="text-center text-sm">
            Hubungi pemilik untuk menambahkan properti.
          </p>
        </div>
      )}
    </MainLayout>
  );
}
