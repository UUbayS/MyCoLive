import {
  Building2,
  Receipt,
  MessageSquareWarning,
  User,
  Users,
  Banknote,
  Wallet,
  Shield,
  LayoutDashboard,
  BedDouble,
  Wrench,
} from "lucide-react";

export type SubMenuItem = {
  label: string;
  href: string;
};

export type MenuItem = {
  label: string;
  href: string;
  icon: string;
  submenu?: SubMenuItem[];
};

export type Role = "PENGHUNI" | "PENGELOLA" | "PEMILIK";

export const iconMap: Record<string, typeof Building2> = {
  Building2,
  Receipt,
  MessageSquareWarning,
  User,
  Users,
  Banknote,
  Wallet,
  Shield,
  LayoutDashboard,
  BedDouble,
  Wrench,
};

export const menuConfig: Record<Role, MenuItem[]> = {
  PENGHUNI: [
    {
      label: "Kamar Saya",
      href: "/penghuni/kamar-saya",
      icon: "LayoutDashboard",
    },
    {
      label: "Katalog Properti",
      href: "/public/katalog-properti",
      icon: "Building2",
    },
    {
      label: "Semua Kamar",
      href: "/public/katalog-properti/kamar",
      icon: "BedDouble",
    },
    {
      label: "Riwayat Transaksi",
      href: "/penghuni/transaksi",
      icon: "Receipt",
    },
    {
      label: "Komplain",
      href: "/penghuni/komplain",
      icon: "MessageSquareWarning",
    },
    {
      label: "Profile",
      href: "/penghuni/profile",
      icon: "User",
    },
  ],
  PENGELOLA: [
    {
      label: "Katalog Properti",
      href: "/public/katalog-properti",
      icon: "Building2",
    },
    {
      label: "Semua Kamar",
      href: "/public/katalog-properti/kamar",
      icon: "BedDouble",
    },
    {
      label: "Penghuni",
      href: "/pengelola/penghuni",
      icon: "Users",
      submenu: [
        { label: "Daftar Penghuni", href: "/pengelola/penghuni/daftar" },
        { label: "Komplain", href: "/pengelola/penghuni/komplain" },
      ],
    },
    {
      label: "Request Dana",
      href: "/pengelola/request-dana",
      icon: "Banknote",
    },
    {
      label: "Profil",
      href: "/pengelola/profile",
      icon: "User",
    },
  ],
  PEMILIK: [
    {
      label: "Katalog Properti",
      href: "/public/katalog-properti",
      icon: "Building2",
    },
    {
      label: "Semua Kamar",
      href: "/public/katalog-properti/kamar",
      icon: "BedDouble",
    },
    {
      label: "Penghuni",
      href: "/administrator/penghuni",
      icon: "Users",
      submenu: [
        { label: "Daftar Penghuni", href: "/administrator/penghuni/daftar" },
        { label: "Validasi Pembayaran", href: "/administrator/penghuni/validasi" },
        { label: "Komplain", href: "/administrator/penghuni/komplain" },
      ],
    },
    {
      label: "Managemen Keuangan",
      href: "/administrator/keuangan",
      icon: "Wallet",
    },
    {
      label: "Operator",
      href: "/administrator/operator",
      icon: "Shield",
      submenu: [
        { label: "Daftar Operator", href: "/administrator/operator/daftar" },
        { label: "Request", href: "/administrator/operator/request" },
      ],
    },
    {
      label: "Profile",
      href: "/administrator/profile",
      icon: "User",
    },
  ],
};

export function getMenuByRole(role: Role): MenuItem[] {
  return menuConfig[role] || [];
}
