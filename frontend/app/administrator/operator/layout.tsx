"use client";

import { usePathname } from "next/navigation";
import MainLayout from "@/components/Layout/MainLayout";
import OperatorTabs from "@/components/OperatorTabs";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isTabRoute = ["/administrator/operator/daftar", "/administrator/operator/request"].includes(pathname);

  let pageTitle = "Daftar Operator";
  if (pathname.includes("/request")) pageTitle = "Request Dana";

  return (
    <MainLayout>
      {isTabRoute ? (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-20 md:px-6 md:pt-8 md:pb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Operator Properti</h1>
          <h2 className="hidden md:block text-base font-medium text-gray-600 mb-4">Operator Properti — {pageTitle}</h2>
          <div className="md:hidden">
            <OperatorTabs />
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </MainLayout>
  );
}
