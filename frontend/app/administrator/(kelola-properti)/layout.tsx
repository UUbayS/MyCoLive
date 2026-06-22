"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import PropertiTabs from "@/components/PropertiTabs";

export default function KelolaPropertiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isPropertiRoute = pathname === "/administrator/properti";
  const isFasilitasRoute = pathname === "/administrator/fasilitas";
  const isTabRoute = isPropertiRoute || isFasilitasRoute;

  return (
    <MainLayout>
      {isTabRoute ? (
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
          <div className={`flex items-center justify-between ${isPropertiRoute ? 'mb-4' : 'md:hidden mb-4'}`}>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Properti Saya</h1>
              <p className="text-sm text-gray-500 mt-1">Kelola semua properti dan kamar Anda</p>
            </div>
            {isPropertiRoute && (
              <Link
                href="/administrator/properti/tambah"
                className="hidden md:flex bottom-24 right-4 p-4 bg-[#84CC16] text-white px-5 py-2.5 rounded-full shadow-sm hover:bg-[#73b814] transition-colors items-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4" />
                Tambah Properti
              </Link>
            )}
          </div>
          
          {isFasilitasRoute && (
            <div className="hidden md:block items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Kelola Fasilitas</h1>
            </div>
          )}
          
          <div className="md:hidden">
            <PropertiTabs />
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </MainLayout>
  );
}
