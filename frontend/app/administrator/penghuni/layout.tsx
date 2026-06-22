"use client";

import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layout/MainLayout";
import PenghuniTabs from "@/components/PenghuniTabs";

export default function PenghuniAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isTabRoute = ["/administrator/penghuni/daftar", "/administrator/penghuni/validasi", "/administrator/penghuni/komplain"].includes(pathname);

  let pageTitle = "Daftar Penghuni";
  if (pathname.includes("/validasi")) pageTitle = "Validasi Pembayaran";
  if (pathname.includes("/komplain")) pageTitle = "Komplain";

  return (
    <MainLayout>
      {isTabRoute ? (
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
          <h1 className="md:hidden text-xl md:text-2xl font-bold text-gray-900 mb-2">Penghuni Properti</h1>
          <h1 className="hidden md:block text-xl md:text-2xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <div className="md:hidden">
            <PenghuniTabs />
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </MainLayout>
  );
}
