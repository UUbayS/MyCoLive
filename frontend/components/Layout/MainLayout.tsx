"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import SidebarMenu from "../Menu/SidebarMenu";
import BottomNav from "../Menu/BottomNav";
import SubmenuTabs from "../Menu/SubmenuTabs";
import { setupInactivityTimer } from "../../lib/auth";

interface MainLayoutProps {
  children: React.ReactNode;
  submenuTabs?: { label: string; href: string }[];
}

export default function MainLayout({ children, submenuTabs }: MainLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const cleanup = setupInactivityTimer(() => {
      router.push("/auth/login");
    });
    return cleanup;
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 mb-4">
      <Header />

      <div className="flex pt-16">
        <SidebarMenu />

        <div className="flex-1 min-h-screen pb-16 md:pb-0">
          {submenuTabs && submenuTabs.length > 0 && (
            <SubmenuTabs tabs={submenuTabs} />
          )}
          <main className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-10 lg:py-12 text-black">{children}</main>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
