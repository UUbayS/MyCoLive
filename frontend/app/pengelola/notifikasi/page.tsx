"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { getUser, isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function PengelolaNotifikasiPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGELOLA") {
      router.push("/public/katalog-properti");
      return;
    }
    // Placeholder data
    setNotifications([
      "Penghuni baru telah terdaftar.",
      "Komplain baru perlu ditindaklanjuti.",
    ]);
  }, [router]);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Notifikasi</h1>
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Tidak ada notifikasi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <p className="text-sm text-gray-700">{n}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
