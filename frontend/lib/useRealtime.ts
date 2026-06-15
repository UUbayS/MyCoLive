"use client";

import { useEffect, useRef } from "react";
import { getAccessToken, refreshAccessToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type RealtimeHandler = (data: any) => void;

class RealtimeClient {
  private es: EventSource | null = null;
  private handlers = new Map<string, Set<RealtimeHandler>>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isConnecting = false;

  private attachListener(eventName: string) {
    if (!this.es) return;
    this.es.addEventListener(eventName, (e: MessageEvent) => {
      let data: unknown;
      try {
        data = JSON.parse(e.data);
      } catch {
        data = e.data;
      }
      this.handlers.get(eventName)?.forEach((h) => {
        try {
          h(data);
        } catch (err) {
          console.error(`[Realtime] handler error for ${eventName}:`, err);
        }
      });
    });
  }

  private startConnection() {
    if (this.isConnecting) return;
    if (this.es && this.es.readyState !== EventSource.CLOSED) return;

    const token = getAccessToken();
    if (!token) return;

    this.isConnecting = true;
    this.es = new EventSource(
      `${API_URL}/api/events?token=${encodeURIComponent(token)}`,
    );

    this.es.addEventListener("connected", () => {
      this.isConnecting = false;
    });

    for (const eventName of this.handlers.keys()) {
      this.attachListener(eventName);
    }

    this.es.onerror = async () => {
      this.isConnecting = false;
      this.es?.close();
      this.es = null;

      const refreshed = await refreshAccessToken();
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
      this.reconnectTimer = setTimeout(
        () => this.startConnection(),
        refreshed ? 1000 : 5000,
      );
    };
  }

  subscribe(eventName: string, handler: RealtimeHandler): () => void {
    const isNew = !this.handlers.has(eventName);
    if (isNew) this.handlers.set(eventName, new Set());
    this.handlers.get(eventName)!.add(handler);

    if (this.es?.readyState === EventSource.OPEN && isNew) {
      this.attachListener(eventName);
    }

    if (!this.es || this.es.readyState === EventSource.CLOSED) {
      this.startConnection();
    }

    return () => {
      this.handlers.get(eventName)?.delete(handler);
    };
  }

  disconnect() {
    if (this.es) {
      this.es.close();
      this.es = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.isConnecting = false;
  }

  reconnect() {
    this.disconnect();
    this.startConnection();
  }
}

export const realtimeClient = new RealtimeClient();

export function useRealtime(eventName: string, handler: RealtimeHandler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrapped: RealtimeHandler = (data) => handlerRef.current(data);
    return realtimeClient.subscribe(eventName, wrapped);
  }, [eventName]);
}
