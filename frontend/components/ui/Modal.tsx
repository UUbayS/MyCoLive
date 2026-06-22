"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "../../lib/hooks/useFocusTrap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  position?: "center" | "bottom";
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  position = "center",
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = "",
}: ModalProps) {
  const containerRef = useFocusTrap(isOpen);

  // ESC key handler
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isBottomSheet = position === "bottom";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`
          relative bg-white shadow-xl overflow-hidden
          animate-in fade-in zoom-in duration-200
          ${isBottomSheet 
            ? "w-full md:max-w-md rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto self-end md:self-center"
            : `w-full ${sizeClasses[size]} rounded-2xl max-h-[90vh] overflow-y-auto`
          }
          ${className}
        `}
      >
        {/* Header with close button */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${title ? "" : "ml-auto"}`}
                aria-label="Tutup"
              >
                <X size={20} className="text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={isBottomSheet ? "p-4" : "p-6"}>
          {children}
        </div>
      </div>
    </div>
  );
}
