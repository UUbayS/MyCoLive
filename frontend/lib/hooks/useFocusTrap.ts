import { useEffect, useRef } from "react";

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      
      // Focus first element after a small delay for animation
      const timer = setTimeout(() => {
        if (containerRef.current) {
          const focusable = containerRef.current.querySelectorAll(FOCUSABLE_ELEMENTS);
          const firstElement = focusable[0] as HTMLElement;
          if (firstElement) {
            firstElement.focus();
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Return focus when modal closes
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      const container = containerRef.current;
      if (!container) return;

      const focusable = Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS)) as HTMLElement[];
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        if (activeElement === firstElement || !container.contains(activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (activeElement === lastElement || !container.contains(activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
}
