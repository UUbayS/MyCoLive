"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { apiFetch } from "@/lib/auth";

const tabs = [
  { label: "Daftar Penghuni", href: "/pengelola/penghuni/daftar", hasBadge: false },
  { label: "Komplain", href: "/pengelola/penghuni/komplain", hasBadge: true },
];

export default function PengelolaPenghuniTabs() {
  const pathname = usePathname();
  const [komplainCount, setKomplainCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await apiFetch<{ status: string; data: any[] }>("/api/komplain");
        const baruCount = res.data?.filter((k) => k.status === "BARU").length || 0;
        setKomplainCount(baruCount);
      } catch (err) {
        console.error("Error fetching komplain count:", err);
      }
    };

    fetchCounts();
  }, []);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const showBadge = tab.hasBadge && komplainCount > 0;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex items-center gap-1.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? "text-[#84CC16]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span>{tab.label}</span>
              {showBadge && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#84CC16] text-white text-[10px] sm:text-xs font-bold rounded-full">
                  {komplainCount}
                </span>
              )}
              {active && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#84CC16] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
