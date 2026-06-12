"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
};

const bgMap: Record<ToastType, string> = {
  success: "bg-green-50 border-green-200",
  error: "bg-red-50 border-red-200",
  info: "bg-blue-50 border-blue-200",
  warning: "bg-yellow-50 border-yellow-200",
};

export function Toast({ toast, onRemove }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setMounted(true));

    const startTime = Date.now();
    const duration = toast.duration;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        handleRemove();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [toast.duration]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
      `}</style>
      <div
        className={`
          relative flex items-start gap-3 p-4 rounded-xl border shadow-lg min-w-[300px] max-w-[400px]
          ${bgMap[toast.type]}
        `}
        style={{
          animation: isExiting
            ? "toastSlideOut 0.3s ease-out forwards"
            : mounted
            ? "toastSlideIn 0.3s ease-out forwards"
            : "none",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-10px)",
          transition: isExiting ? "none" : "opacity 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        <div className="shrink-0 mt-0.5">{iconMap[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800">{toast.message}</p>
        </div>
        <button
          onClick={handleRemove}
          className="shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-current opacity-30 transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              backgroundColor: toast.type === "success" ? "#22c55e"
                : toast.type === "error" ? "#ef4444"
                : toast.type === "info" ? "#3b82f6"
                : "#eab308",
            }}
          />
        </div>
      </div>
    </>
  );
}
