"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { User } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { getUser, isAuthenticated } from "@/lib/auth";

export default function DetailPenghuniPage() {
  const router = useRouter();
  const params = useParams();
  const penghuniId = params.id as string;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PEMILIK" && user?.role !== "PENGELOLA") {
      router.push("/public/katalog-properti");
      return;
    }
  }, [router]);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Detail Penghuni</h1>
        <div className="text-center py-12 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Halaman detail penghuni sedang dalam pengembangan.</p>
          <p className="text-sm mt-2">ID Penghuni: {penghuniId}</p>
        </div>
      </div>
    </MainLayout>
  );
}
