"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getUser, AuthUser } from "../../lib/auth";
import { getMenuByRole, MenuItem, iconMap } from "../../lib/menu";

export default function SidebarMenu() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const init = () => {
      const currentUser = getUser();
      setUser(currentUser);

      if (currentUser?.role) {
        setMenuItems(getMenuByRole(currentUser.role));
      }
    };
    init();
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleSubmenu = (href: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  if (!user || menuItems.length === 0) {
    return null;
  }

  return (
    <aside className="hidden md:flex md:flex-col md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:border-r md:border-slate-100 md:bg-white md:pt-safe-top">
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = iconMap[item.icon];
              const active = isActive(item.href);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = expandedMenus[item.href];

              return (
                <li key={item.href}>
                  {hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.href)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? "bg-[#84CC16]/10 text-[#84CC16]"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                        <span className="flex-1 text-left">{item.label}</span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {isExpanded && (
                        <ul className="ml-8 mt-1 space-y-1">
                          {item.submenu!.map((sub) => {
                            const subActive = isActive(sub.href);
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                    subActive
                                      ? "bg-[#84CC16]/10 text-[#84CC16] font-medium"
                                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#84CC16]/10 text-[#84CC16]"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
