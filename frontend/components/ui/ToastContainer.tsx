"use client";

import React from "react";
import { Toast } from "./Toast";
import type { ToastItem } from "./Toast";

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  console.log(`[ToastContainer] Rendering ${toasts.length} toasts`);
  
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 flex flex-col gap-2 md:left-auto md:right-4 md:translate-x-0">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
