"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { getUser, isAuthenticated } from "@/lib/auth";

export default function PesanKamarPage() {
  const router = useRouter();
  const params = useParams();
  const kamarId = params.id as string;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGHUNI") {
      router.push("/public/katalog-properti");
      return;
    }
  }, [router]);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Pesan Kamar</h1>
        <div className="text-center py-12 text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Fitur pemesanan kamar sedang dalam pengembangan.</p>
          <p className="text-sm mt-2">ID Kamar: {kamarId}</p>
        </div>
      </div>
    </MainLayout>
  );
}
