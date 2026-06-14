"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone } from "lucide-react";
import { getUser, isAuthenticated } from "../../../lib/auth";
import { getPropertiList, PropertiData } from "../../../lib/api";
import MainLayout from "../../../components/Layout/MainLayout";
import PenghuniTabs from "@/components/PenghuniTabs";
import PengumumanForm from "../../../components/PengumumanForm";

const targetOptions = [
  { value: "ALL", label: "Semua User" },
  { value: "PENGHUNI", label: "Semua Penghuni" },
  { value: "PENGELOLA", label: "Semua Pengelola" },
  { value: "PENGHUNI_PROPERTI", label: "Penghuni di Properti Tertentu" },
];

export default function PengumumanAdminPage() {
  const router = useRouter();
  const [propertiList, setPropertiList] = useState<PropertiData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PEMILIK") {
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
        <h1 className="md:hidden text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Pengumuman Massal
        </h1>
        <div className="hidden md:flex items-center gap-3 mb-6">
          <Megaphone className="w-6 h-6 text-[#84CC16]" />
          <h1 className="text-xl font-semibold">Pengumuman Massal</h1>
        </div>
        <div className="md:hidden mb-4">
          <PenghuniTabs />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : (
          <PengumumanForm
            propertiList={propertiList}
            availableTargets={targetOptions}
            showTargetSelector
            defaultTarget="PENGHUNI_PROPERTI"
          />
        )}
      </div>
    </MainLayout>
  );
}
