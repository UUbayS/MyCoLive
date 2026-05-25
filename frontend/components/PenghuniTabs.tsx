"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { apiFetch } from "@/lib/auth";

const tabs = [
  { label: "Daftar Penghuni", href: "/administrator/penghuni/daftar", hasBadge: false },
  { label: "Validasi Bayar", href: "/administrator/penghuni/validasi", hasBadge: true },
  { label: "Komplain", href: "/administrator/penghuni/komplain", hasBadge: true },
];

export default function PenghuniTabs() {
  const pathname = usePathname();
  const [counts, setCounts] = useState({
    validasi: 0,
    komplain: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch pemesanan count
        const pemesananRes = await apiFetch<{ data: any[] }>("/api/pemesanan");
        const pendingCount = pemesananRes.data.filter((p) => p.status === "MENUNGGU").length;

        // Fetch komplain count
        const komplainRes = await apiFetch<{ data: any[] }>("/api/komplain");
        const baruCount = komplainRes.data.filter((k) => k.status === "BARU").length;

        setCounts({
          validasi: pendingCount,
          komplain: baruCount,
        });
      } catch (err) {
        console.error("Error fetching tab counts:", err);
      }
    };

    fetchCounts();
  }, []);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const getCount = (href: string) => {
    if (href.includes("validasi")) return counts.validasi;
    if (href.includes("komplain")) return counts.komplain;
    return 0;
  };

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        const count = getCount(tab.href);
        const showBadge = tab.hasBadge && count > 0;

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
                {count}
              </span>
            )}
            {active && (
              <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#84CC16] rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
