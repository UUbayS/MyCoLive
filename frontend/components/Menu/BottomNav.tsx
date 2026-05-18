"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, AuthUser } from "../../lib/auth";
import { getMenuByRole, MenuItem, iconMap } from "../../lib/menu";

export default function BottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const init = () => {
      const currentUser = getUser();
      setUser(currentUser);

      if (currentUser?.role) {
        setMenuItems(getMenuByRole(currentUser.role));
      }
    };
    init();

    const handleStorageChange = () => {
      const updatedUser = getUser();
      setUser(updatedUser);
      if (updatedUser?.role) {
        setMenuItems(getMenuByRole(updatedUser.role));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!user || menuItems.length === 0) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 pb-safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-7xl mx-auto">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          const IconComponent = iconMap[item.icon];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-start gap-1 flex-1 h-full py-2 transition-colors ${
                active
                  ? "text-[#84CC16]"
                  : "text-slate-400 active:text-slate-600"
              }`}
            >
              {IconComponent && (
                <IconComponent className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
              )}
              <span className={`text-center text-[10px] leading-tight font-medium ${active ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#84CC16] rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
