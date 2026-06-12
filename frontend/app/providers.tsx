"use client";

import { ToastProvider } from "../lib/ToastContext";
import { BadgesProvider } from "../lib/BadgesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <BadgesProvider>
        {children}
      </BadgesProvider>
    </ToastProvider>
  );
}
