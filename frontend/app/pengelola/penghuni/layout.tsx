"use client";

import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layout/MainLayout";
import PengelolaPenghuniTabs from "@/components/PengelolaPenghuniTabs";

export default function PengelolaPenghuniLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isTabRoute = ["/pengelola/penghuni/daftar", "/pengelola/penghuni/komplain"].includes(pathname);

  let pageTitle = "Daftar Penghuni";
  if (pathname.includes("/komplain")) pageTitle = "Komplain";

  return (
    <MainLayout>
      {isTabRoute ? (
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Penghuni Properti</h1>
          <h2 className="hidden md:block text-base font-medium text-gray-600 mb-4">Penghuni Properti — {pageTitle}</h2>
          <div className="md:hidden">
            <PengelolaPenghuniTabs />
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </MainLayout>
  );
}
