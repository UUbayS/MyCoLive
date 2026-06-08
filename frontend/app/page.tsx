"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Users, Wallet, Mail, Phone, MapPin, Plus, Building2Icon } from "lucide-react";
import { getUser, isAuthenticated } from "../lib/auth";
import { getKatalogProperti, getPropertiList, PropertiData } from "../lib/api";
import AuthLayout from "../components/Layout/AuthLayout";
import MainLayout from "../components/Layout/MainLayout";
import PropertyList from "../components/PropertyList";
import { PropertyData as PropertyCardData } from "../components/PropertyCard";
import StatsWidget from "../components/StatsWidget";
import logoMyCoLive from "../assets/myCoLive.svg";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProperti: 0, totalKamar: 0, totalTerisi: 0 });
  const fetchedRef = useRef(false);

  const user = getUser();
  const isLoggedIn = isAuthenticated();
  const isPemilik = user?.role === "PEMILIK";
  const isPengelola = user?.role === "PENGELOLA";
  const isPenghuni = user?.role === "PENGHUNI";
  const isPublic = !isLoggedIn;

  useEffect(() => {
    const check = () => {
      if (isPemilik || isPengelola) {
        // Redirect pemilik/pengelola ke dashboard
        if (isPemilik) {
          router.push("/administrator/properti");
        } else {
          router.push("/pengelola/properti");
        }
        return;
      }
      setChecking(false);
    };
    check();
  }, [router, isPemilik, isPengelola]);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchProperties = async () => {
      try {
        let data: PropertyCardData[] = [];

        if (isPemilik || isPengelola) {
          const result = await getPropertiList();
          data = result.map((p: PropertiData) => ({
            id: p.id,
            nama: p.nama,
            alamat: p.alamat,
            total_kamar: p.total_kamar,
            kamar_kosong: p.kamar_kosong,
            gambar: p.gambar?.[0],
          }));

          if (isPemilik) {
            const totalKamar = result.reduce((sum, p: PropertiData) => sum + (p.total_kamar || 0), 0);
            const totalTerisi = result.reduce((sum, p: PropertiData) => {
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
          data = result.map((p: PropertiData) => ({
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
  }, [isPemilik, isPengelola]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-4 border-[#84CC16] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // --- PUBLIC / UNAUTHENTICATED VIEW ---
  if (isPublic) {
    return (
      <AuthLayout>
        <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-white text-black">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center px-4 pt-8 pb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Image src={logoMyCoLive} alt="MyCoLive" width={180} height={50} />
              </div>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                Solusi manajemen kos-kosan modern untuk pemilik, pengelola, dan penghuni
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full mb-10">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-[#84CC16]" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Kelola Properti</h3>
                <p className="text-sm text-slate-500">Kelola daftar properti dan kamar dengan mudah</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#84CC16]" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Manajemen Penghuni</h3>
                <p className="text-sm text-slate-500">Pantau data penghuni dan pembayaran</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-6 h-6 text-[#84CC16]" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Laporan Keuangan</h3>
                <p className="text-sm text-slate-500">Analisis pendapatan dan pengeluaran kos</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
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

          {/* Catalog Section */}
          <div className="bg-slate-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Katalog Properti</h2>
                <p className="text-slate-500">Temukan kos-kosan terbaik yang sesuai dengan kebutuhan Anda</p>
              </div>

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
                  <Building2Icon className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-1">Belum ada properti</p>
                  <p className="text-center text-sm">Properti akan muncul di sini setelah ditambahkan oleh pemilik.</p>
                </div>
              )}
            </div>
          </div>

          {/* Kontak Section */}
          <div className="bg-white py-12 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Kontak Kami</h2>
              <p className="text-slate-500 mb-6">
                Punya pertanyaan? Hubungi tim kami untuk informasi lebih lanjut.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-5 h-5 text-[#84CC16]" />
                  <a href="mailto:support@mycolive.id" className="hover:text-[#84CC16] transition-colors">
                    support@mycolive.id
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-5 h-5 text-[#84CC16]" />
                  <a href="tel:+6281234567890" className="hover:text-[#84CC16] transition-colors">
                    +62 812-3456-7890
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-5 h-5 text-[#84CC16]" />
                  <span>Jl. Teknik Kimia, Surabaya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // --- PENGHUNI LOGGED IN VIEW ---
  // (or other authenticated users that are not pemilik/pengelola)
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Katalog Properti</h1>
          <p className="text-gray-500">Temukan kos-kosan terbaik yang sesuai dengan kebutuhan Anda</p>
        </div>

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
            <Building2Icon className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-1">Belum ada properti</p>
            <p className="text-center text-sm">Properti akan muncul di sini setelah ditambahkan oleh pemilik.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
