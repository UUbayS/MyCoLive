"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone } from "lucide-react";
import { getUser, isAuthenticated } from "../../../lib/auth";
import { getPropertiList, PropertiData } from "../../../lib/api";
import MainLayout from "../../../components/Layout/MainLayout";
import PengumumanForm from "../../../components/PengumumanForm";

export default function PengumumanPengelolaPage() {
  const router = useRouter();
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [loading, setLoading] = useState(true);

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

    const fetchProperti = async () => {
      try {
        const data = await getPropertiList();
        setPropertiList(data);
      } catch (err) {
        console.error("Failed to fetch properti:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperti();
  }, [router]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center gap-3 mb-2">
          <Megaphone className="w-6 h-6 text-[#84CC16]" />
          <h1 className="text-xl font-semibold">Pengumuman ke Penghuni</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Kirim pengumuman ke semua penghuni aktif di properti yang Anda kelola.
        </p>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : (
          <PengumumanForm propertiList={propertiList} />
        )}
      </div>
    </MainLayout>
  );
}
