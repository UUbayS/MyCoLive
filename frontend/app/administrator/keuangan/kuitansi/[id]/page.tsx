"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Download, Eye, CheckCircle } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getKuitansiDetail, KuitansiDetail } from "@/lib/api";

export default function KuitansiPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [detail, setDetail] = useState<KuitansiDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBukti, setShowBukti] = useState(false);

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

    const fetchData = async () => {
      try {
        const data = await getKuitansiDetail(id);
        setDetail(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-6 animate-pulse space-y-4">
          <div className="h-8 w-40 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  if (!detail) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-gray-500">
          <p>Kuitansi tidak ditemukan</p>
          <button
            onClick={() => router.push("/administrator/keuangan")}
            className="mt-4 text-[#84CC16] font-medium text-sm"
          >
            Kembali
          </button>
        </div>
      </MainLayout>
    );
  }

  const tglBayar = new Date(detail.tgl_bayar).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const waktuBayar = new Date(detail.tgl_bayar).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* Header */}
        <button
          onClick={() => router.push("/administrator/keuangan")}
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#84CC16] mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Pembayaran
        </button>

        {/* Status Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Pembayaran Dikonfirmasi
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {tglBayar}, {waktuBayar} WIB
          </p>
        </div>

        {/* Detail Kuitansi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Kuitansi Pembayaran
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Nomor Kuitansi</span>
              <span className="font-medium text-gray-900">
                {detail.nomor_kuitansi || "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nama</span>
              <span className="font-medium text-gray-900">{detail.nama}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{detail.properti_nama}</span>
              <span className="font-medium text-gray-900">
                Kamar No {detail.kamar_nomor}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Durasi</span>
              <span className="font-medium text-gray-900">
                {detail.durasi} Bulan
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Metode Pembayaran</span>
              <span className="font-medium text-gray-900">
                {detail.metode_bayar}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between">
              <span className="text-gray-900 font-semibold">Jumlah</span>
              <span className="font-bold text-gray-900">
                Rp {detail.jumlah.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => alert("Download PDF (dummy)")}
            className="flex items-center justify-center gap-2 border border-[#84CC16] text-[#84CC16] rounded-xl py-3 text-sm font-medium hover:bg-[#84CC16]/5 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={() => setShowBukti(true)}
            className="flex items-center justify-center gap-2 border border-[#84CC16] text-[#84CC16] rounded-xl py-3 text-sm font-medium hover:bg-[#84CC16]/5 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Lihat Bukti Bayar
          </button>
        </div>
      </div>

      {/* Modal Bukti Bayar */}
      {showBukti && detail.bukti && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowBukti(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Bukti Pembayaran
            </p>
            <img
              src={detail.bukti}
              alt="Bukti Bayar"
              className="w-full rounded-lg object-contain bg-gray-50"
            />
            <button
              onClick={() => setShowBukti(false)}
              className="mt-4 w-full py-2.5 bg-[#84CC16] text-white rounded-xl text-sm font-medium hover:bg-[#84CC16]/90 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
