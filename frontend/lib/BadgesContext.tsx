"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getAccessToken } from "./auth";
import type { Badges } from "./menu";

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
    const interval = setInterval(fetchBadges, 30000);
    return () => clearInterval(interval);
  }, [fetchBadges]);

  return (
    <BadgesContext.Provider value={{ badges, refresh: fetchBadges }}>
      {children}
    </BadgesContext.Provider>
  );
}

export function useBadges() {
  return useContext(BadgesContext);
}
