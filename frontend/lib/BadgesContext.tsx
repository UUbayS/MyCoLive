"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getAccessToken } from "./auth";
import type { Badges } from "./menu";
import { useRealtime, realtimeClient } from "./useRealtime";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface BadgesContextType {
  badges: Badges | null;
  refresh: () => void;
}

const BadgesContext = createContext<BadgesContextType>({ badges: null, refresh: () => {} });

export function BadgesProvider({ children }: { children: React.ReactNode }) {
  const [badges, setBadges] = useState<Badges | null>(null);

  const fetchBadges = useCallback(async () => {
    try {
      const token = getAccessToken();
      if (!token) return;
      const res = await fetch(`${API_URL}/api/badges`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success") {
        setBadges(data.data);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchBadges();
    // Fallback polling tiap 60 detik, jaga-jaga kalau SSE drop
    const interval = setInterval(fetchBadges, 60000);
    return () => clearInterval(interval);
  }, [fetchBadges]);

  useRealtime("notifikasi", () => fetchBadges());
  useRealtime("pemesanan:baru", () => fetchBadges());
  useRealtime("pemesanan:status", () => fetchBadges());
  useRealtime("komplain:baru", () => fetchBadges());
  useRealtime("komplain:status", () => fetchBadges());
  useRealtime("dana:baru", () => fetchBadges());
  useRealtime("dana:status", () => fetchBadges());

  return (
    <BadgesContext.Provider value={{ badges, refresh: fetchBadges }}>
      {children}
    </BadgesContext.Provider>
  );
}

export function useBadges() {
  return useContext(BadgesContext);
}

export { realtimeClient };
