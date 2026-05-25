"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUser, clearAuth, isAuthenticated, AuthUser } from "../lib/auth";
import logoMyCoLive from "../assets/myCoLive.svg";

function getDashboardLink(user: AuthUser | null): string {
  if (!user) return "/";
  switch (user.role) {
    case "PENGHUNI":
      return "/penghuni/kamar-saya";
    case "PEMILIK":
      return "/public/katalog-properti";
    case "PENGELOLA":
      return "/public/katalog-properti";
    default:
      return "/";
  }
}

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        setUser(getUser());
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setIsLoggedIn(false);
    setUser(null);
    setShowDropdown(false);
    router.push("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 pt-safe-top">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={getDashboardLink(user)} className="flex items-center">
            <Image src={logoMyCoLive} alt="MyCoLive" width={130} height={40} />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-[#84CC16] px-4 py-2 rounded-lg hover:bg-[#84CC16]/10 transition-colors"
            >
              Masuk
            </Link>
          ) : (
            <>
              <Link
                href={
                  user?.role === "PEMILIK"
                    ? "/administrator/notifikasi"
                    : user?.role === "PENGELOLA"
                    ? "/pengelola/notifikasi"
                    : "/penghuni/notifikasi"
                }
                className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Notifikasi"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </Link>

              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#84CC16] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user ? getInitials(user.nama) : "U"}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-semibold text-slate-900">{user?.nama}</p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[#84CC16]/10 text-[#84CC16] text-xs font-medium rounded-full">
                        {user?.role}
                      </span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
