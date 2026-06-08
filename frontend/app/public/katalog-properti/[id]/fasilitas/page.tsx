"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { getPropertiById } from "../../../../../lib/api";
import MainLayout from "../../../../../components/Layout/MainLayout";

export default function FasilitasPropertiPage() {
  const router = useRouter();
  const params = useParams();
  const propertiId = params.id as string;

  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [propertiNama, setPropertiNama] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertiId) return;

    const fetchProperti = async () => {
      try {
        const properti = await getPropertiById(propertiId);
        if (properti) {
          setPropertiNama(properti.nama);

          const fasilitasUmum = properti.fasilitas_umum || [];
          const fasilitasRuangan = new Set<string>();
          properti.kamar?.forEach((kamar) => {
            kamar.fasilitas_ruangan?.forEach((f) => fasilitasRuangan.add(f.nama));
          });
          const allFasilitas = [...fasilitasUmum.map((f) => f.nama), ...Array.from(fasilitasRuangan)];
          setFasilitas(Array.from(new Set(allFasilitas)));
        }
      } catch (error) {
        console.error("Failed to fetch properti:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperti();
  }, [propertiId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Daftar Fasilitas</h1>
            <p className="text-sm text-gray-500">{propertiNama}</p>
          </div>
        </div>

        {fasilitas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fasilitas.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 bg-[#84CC16]/10 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#84CC16]" />
                </div>
                <span className="text-sm font-medium text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Belum ada fasilitas</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
