// Single-instance. Untuk multi-instance, ganti pakai Redis pub/sub atau Postgres LISTEN/NOTIFY.

export type RealtimeEvent = {
  type: string;
  data: any;
};

type EventHandler = (event: RealtimeEvent) => void;

class EventBus {
  private subscribers = new Map<string, Set<EventHandler>>();

  subscribe(userId: string, handler: EventHandler): () => void {
    if (!this.subscribers.has(userId)) {
      this.subscribers.set(userId, new Set());
    }
    this.subscribers.get(userId)!.add(handler);
    return () => {
      this.subscribers.get(userId)?.delete(handler);
      if (this.subscribers.get(userId)?.size === 0) {
        this.subscribers.delete(userId);
      }
    };
  }

  /**
   * Broadcast event ke satu atau beberapa user.
   */
  publish(userIds: string | string[], type: string, data: any): void {
    const targets = Array.isArray(userIds) ? userIds : [userIds];
    for (const userId of targets) {
      const handlers = this.subscribers.get(userId);
      if (!handlers) continue;
      handlers.forEach((handler) => {
        try {
          handler({ type, data });
        } catch (err) {
          console.error(`[EventBus] handler error for user ${userId}:`, err);
        }
      });
    }
  }

  /**
   * Cek apakah user punya subscriber aktif.
   */
  hasSubscribers(userId: string): boolean {
    return this.subscribers.has(userId) && (this.subscribers.get(userId)?.size ?? 0) > 0;
  }
}

// Singleton - share across semua route handlers
export const eventBus = new EventBus();
