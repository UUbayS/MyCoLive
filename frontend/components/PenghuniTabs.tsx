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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setError(null);
        
        // Fetch pemesanan count
        let pendingCount = 0;
        try {
          const pemesananRes = await apiFetch<{ status: string; data: any[] }>("/api/pemesanan");
          pendingCount = pemesananRes.data?.filter((p) => p.status === "MENUNGGU").length || 0;
        } catch (err) {
          console.error("Error fetching pemesanan:", err);
        }

        // Fetch komplain count
        let baruCount = 0;
        try {
          const komplainRes = await apiFetch<{ status: string; data: any[] }>("/api/komplain");
          baruCount = komplainRes.data?.filter((k) => k.status === "BARU").length || 0;
        } catch (err) {
          console.error("Error fetching komplain:", err);
        }

        setCounts({
          validasi: pendingCount,
          komplain: baruCount,
        });
      } catch (err) {
        console.error("Error fetching tab counts:", err);
        setError("Gagal memuat data notifikasi");
        setCounts({
          validasi: 0,
          komplain: 0,
        });
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
    <div className="mb-6">
      <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto scrollbar-hide">
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
      {error && (
        <div className="text-center mt-2">
          <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-lg">
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
