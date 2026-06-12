"use client";

import { createContext, useContext, useCallback, useState } from "react";
import ToastContainer from "../components/ui/ToastContainer";
import type { ToastType } from "../components/ui/Toast";

interface ToastOptions {
  duration?: number;
}

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
}

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

const defaultContextValue: ToastContextType = {
  success: () => {},
  error: () => {},
  info: () => {},
  warning: () => {},
};

const ToastContext = createContext<ToastContextType>(defaultContextValue);

const DEFAULT_DURATIONS: Record<ToastType, number> = {
  success: 3000,
  error: 5000,
  info: 4000,
  warning: 4000,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType, options?: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options?.duration || DEFAULT_DURATIONS[type];
    
    console.log(`[Toast] Adding ${type} toast: "${message}" (duration: ${duration}ms)`);
    
    setToasts((prev) => {
      // Keep max 3 toasts
      const newToasts = [...prev, { id, message, type, duration }];
      if (newToasts.length > 3) {
        return newToasts.slice(newToasts.length - 3);
      }
      return newToasts;
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message: string, options?: ToastOptions) => {
    console.log('[ToastContext.success] Called with message:', message);
    addToast(message, "success", options);
  }, [addToast]);

  const error = useCallback((message: string, options?: ToastOptions) => {
    console.log('[ToastContext.error] Called with message:', message);
    addToast(message, "error", options);
  }, [addToast]);

  const info = useCallback((message: string, options?: ToastOptions) => {
    addToast(message, "info", options);
  }, [addToast]);

  const warning = useCallback((message: string, options?: ToastOptions) => {
    addToast(message, "warning", options);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  
  // Check if context is the default (no-op) value
  const isDefault = context.success === defaultContextValue.success;
  if (isDefault) {
    console.warn('[useToast] WARNING: Using default context! ToastProvider not found in tree.');
  }
  
  return context;
}
