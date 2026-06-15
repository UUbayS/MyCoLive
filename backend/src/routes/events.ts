import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { verifyToken } from "../utils/jwt";
import { eventBus } from "../lib/event-bus";

const app = new Hono();

const HEARTBEAT_MS = 25_000;

app.get("/", async (c) => {
  // EventSource tidak bisa set custom header, jadi token via query param
  const token = c.req.query("token");
  if (!token) {
    return c.json({ status: "error", message: "Token required" }, 401);
  }

  const payload = verifyToken(token);
  if (!payload) {
    return c.json({ status: "error", message: "Invalid token" }, 401);
  }

  return streamSSE(c, async (stream) => {
    const writeEvent = async (type: string, data: unknown) => {
      try {
        await stream.writeSSE({
          event: type,
          data: JSON.stringify(data),
        });
      } catch {
        // Connection already closed
      }
    };

    const unsubscribe = eventBus.subscribe(payload.userId, (event) => {
      writeEvent(event.type, event.data);
    });

    await writeEvent("connected", { userId: payload.userId, ts: Date.now() });

    const heartbeat = setInterval(() => {
      writeEvent("ping", { ts: Date.now() });
    }, HEARTBEAT_MS);

    stream.onAbort(() => {
      unsubscribe();
      clearInterval(heartbeat);
    });

    // Keep connection alive sampai abort
    while (!stream.aborted) {
      await stream.sleep(1000);
    }
  });
});

export default app;
