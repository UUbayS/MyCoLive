"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../lib/auth";
import AuthLayout from "../components/Layout/AuthLayout";
import Link from "next/link";
import { Building2, Users, Wallet } from "lucide-react";
import logoMyCoLive from "../assets/myCoLive.svg";


export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (isAuthenticated()) {
        router.push("/public/katalog-properti");
      } else {
        setChecking(false);
      }
    };
    check();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Image src={logoMyCoLive} alt="MyCoLive" width={130} height={40} />
          </div>
          <p className="text-lg text-slate-500 max-w-md mx-auto">
            Solusi manajemen kos-kosan modern untuk pemilik, pengelola, dan penghuni
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full mb-12">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-[#84CC16]" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Kelola Properti</h3>
            <p className="text-sm text-slate-500">
              Kelola daftar properti dan kamar dengan mudah
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-[#84CC16]" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Manajemen Penghuni</h3>
            <p className="text-sm text-slate-500">
              Pantau data penghuni dan pembayaran
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-[#84CC16]" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Laporan Keuangan</h3>
            <p className="text-sm text-slate-500">
              Analisis pendapatan dan pengeluaran kos
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/login"
            className="bg-[#84CC16] text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-[#84CC16]/25 hover:bg-[#76b814] active:scale-[0.98] transition-all text-center"
          >
            Masuk
          </Link>
          <Link
            href="/auth/register"
            className="bg-white border-2 border-[#84CC16] text-[#84CC16] px-8 py-4 rounded-2xl font-semibold text-base hover:bg-[#84CC16]/5 active:scale-[0.98] transition-all text-center"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
