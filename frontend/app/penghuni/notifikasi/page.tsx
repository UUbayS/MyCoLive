"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck, Loader2, Clock } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";
import { getUser, isAuthenticated } from "@/lib/auth";
import { getNotifikasiList, markNotifikasiAsRead, markAllNotifikasiAsRead, NotifikasiData } from "@/lib/api";

export default function PenghuniNotifikasiPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotifikasiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    if (user?.role !== "PENGHUNI") {
      router.push("/public/katalog-properti");
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const data = await getNotifikasiList();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleClick = async (notif: NotifikasiData) => {
    if (notif.is_read) return;
    setProcessingId(notif.id);
    try {
      const updated = await markNotifikasiAsRead(notif.id);
      if (updated) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleMarkAll = async () => {
    setMarkingAll(true);
    try {
      const result = await markAllNotifikasiAsRead();
      if (result) {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMarkingAll(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Notifikasi</h1>
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAll}
              disabled={markingAll || unreadCount === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {markingAll ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCheck className="w-4 h-4" />
              )}
              Tandai Semua Dibaca
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Tidak ada notifikasi</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleClick(n)}
                disabled={processingId === n.id}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  n.is_read
                    ? "bg-gray-50 border-gray-100"
                    : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                      n.is_read ? "bg-gray-300" : "bg-[#84CC16]"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        n.is_read ? "font-normal text-gray-600" : "font-semibold text-gray-900"
                      }`}
                    >
                      {n.judul}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.pesan}</p>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(n.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {processingId === n.id && (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
