"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getUser, AuthUser } from "../../lib/auth";
import { getMenuByRole, MenuItem, iconMap, Badges } from "../../lib/menu";
import { useBadges } from "../../lib/BadgesContext";

const STORAGE_KEY = "sidebar-expanded";

export default function SidebarMenu() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const { badges } = useBadges();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);

    if (currentUser?.role) {
      const items = getMenuByRole(currentUser.role);
      setMenuItems(items);

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setExpandedMenus(JSON.parse(saved));
        } else {
          const initial: Record<string, boolean> = {};
          items.forEach((item) => {
            if (item.submenu && item.submenu.length > 0) {
              const isGroupActive = item.submenu.some(
                (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")
              );
              if (isGroupActive) {
                initial[item.href] = true;
              }
            }
          });
          setExpandedMenus(initial);
        }
      } catch {
        // ignore localStorage errors
      }
    }
  }, []);

  useEffect(() => {
    if (menuItems.length === 0) return;

    setExpandedMenus((prev) => {
      let needsUpdate = false;
      const nextState = { ...prev };

      menuItems.forEach((item) => {
        if (item.submenu && item.submenu.length > 0) {
          const isGroupActive = item.submenu.some(
            (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")
          );
          if (isGroupActive && !nextState[item.href]) {
            nextState[item.href] = true;
            needsUpdate = true;
          }
        }
      });
      return needsUpdate ? nextState : prev;
    });
  }, [pathname, menuItems]);

  useEffect(() => {
    if (Object.keys(expandedMenus).length > 0 || menuItems.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expandedMenus));
      } catch {
        // ignore localStorage errors
      }
    }
  }, [expandedMenus, menuItems]);

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

  const getBadgeCount = (href: string, badgeKey?: string): number | null => {
    if (!badges || !badgeKey) return null;
    const count = badges[badgeKey as keyof Badges];
    return count > 0 ? count : null;
  };

  const getParentBadgeCount = (item: MenuItem): number | null => {
    if (!badges || !item.submenu) return null;
    let total = 0;
    item.submenu.forEach((sub) => {
      if (sub.badgeKey) {
        total += badges[sub.badgeKey as keyof Badges] || 0;
      }
    });
    if (item.badgeKey) {
      total += badges[item.badgeKey as keyof Badges] || 0;
    }
    return total > 0 ? total : null;
  };

  if (!user || menuItems.length === 0) {
    return null;
  }

  return (
    <aside className="hidden md:flex md:flex-col md:sticky md:top-21 md:self-start md:h-[calc(100vh-4rem)] md:w-64 md:border-r md:border-slate-100 md:bg-white md:pt-safe-top">
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = iconMap[item.icon];
              const active = isActive(item.href);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = expandedMenus[item.href];
              const parentBadge = getParentBadgeCount(item);
              const directBadge = !hasSubmenu ? getBadgeCount(item.href, item.badgeKey) : null;

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
                        {parentBadge && (
                          <span className="bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-[2px] leading-none">
                            {parentBadge > 99 ? "99+" : parentBadge}
                          </span>
                        )}
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
                            const subBadge = getBadgeCount(sub.href, sub.badgeKey);
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                    subActive
                                      ? "bg-[#84CC16]/10 text-[#84CC16] font-medium"
                                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                  }`}
                                >
                                  <span className="flex-1">{sub.label}</span>
                                  {subBadge && (
                                    <span className="bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-[2px] leading-none">
                                      {subBadge > 99 ? "99+" : subBadge}
                                    </span>
                                  )}
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
                      <span className="flex-1">{item.label}</span>
                      {directBadge && (
                        <span className="bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-[2px] leading-none">
                          {directBadge > 99 ? "99+" : directBadge}
                        </span>
                      )}
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
