"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubmenuTabsProps {
  tabs: { label: string; href: string }[];
}

export default function SubmenuTabs({ tabs }: SubmenuTabsProps) {
  const pathname = usePathname();

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const active = isActive(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  active
                    ? "text-[#84CC16]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#84CC16] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
