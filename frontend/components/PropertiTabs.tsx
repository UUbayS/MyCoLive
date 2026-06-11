"use client";

import {useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Kelola Properti", href: "/administrator/properti", hasBadge: false },
  { label: "Kelola Fasilitas", href: "/administrator/fasilitas", hasBadge: true }
];

export default function PropertiTabs() {
  const pathname = usePathname();
  const [error] = useState<string | null>(null);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const active = isActive(tab.href);

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
