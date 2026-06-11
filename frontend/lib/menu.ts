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
  Megaphone,
} from "lucide-react";

export type SubMenuItem = {
  label: string;
  href: string;
  badgeKey?: string;
};

export type Badges = {
  validasiBayar: number;
  komplain: number;
  pengajuanCheckout: number;
  requestDana: number;
};

export type MenuItem = {
  label: string;
  href: string;
  icon: string;
  badgeKey?: string;
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
  Megaphone,
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
      label: "Riwayat Transaksi",
      href: "/penghuni/transaksi",
      icon: "Receipt",
    },
    {
      label: "Komplain",
      href: "/penghuni/komplain",
      icon: "MessageSquareWarning",
      badgeKey: "komplain",
    },
    {
      label: "Profile",
      href: "/penghuni/profile",
      icon: "User",
    },
  ],
  PENGELOLA: [
    {
      label: "Properti Saya",
      href: "/pengelola/properti",
      icon: "Building2",
    },
    {
      label: "Penghuni",
      href: "/pengelola/penghuni",
      icon: "Users",
      submenu: [
        { label: "Daftar Penghuni", href: "/pengelola/penghuni/daftar", badgeKey: "pengajuanCheckout" },
        { label: "Komplain", href: "/pengelola/penghuni/komplain", badgeKey: "komplain" },
        { label: "Pengumuman", href: "/pengelola/pengumuman"}
      ],
    },
    {
      label: "Request Dana",
      href: "/pengelola/request-dana",
      icon: "Banknote",
      badgeKey: "requestDana",
    },
    {
      label: "Profil",
      href: "/pengelola/profile",
      icon: "User",
    },
  ],
  PEMILIK: [
    {
      label: "Properti Saya",
      href: "/administrator/properti",
      icon: "Building2",
      submenu: [
        { label: "Kelola Properti", href: "/administrator/properti" },
        { label: "Kelola Fasilitas", href: "/administrator/fasilitas" },
      ],
    },
    {
      label: "Penghuni",
      href: "/administrator/penghuni",
      icon: "Users",
      submenu: [
        { label: "Daftar Penghuni", href: "/administrator/penghuni/daftar", badgeKey: "pengajuanCheckout" },
        { label: "Validasi Bayar", href: "/administrator/penghuni/validasi", badgeKey: "validasiBayar" },
        { label: "Komplain", href: "/administrator/penghuni/komplain", badgeKey: "komplain" },
        { label: "Pengumuman", href: "/administrator/pengumuman"}
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
      icon: "Wrench",
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
