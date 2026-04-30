import { useState, useEffect } from "react";
import { WS_BACKEND_URL } from "@/config";
import { useAuth } from "@/providers/AuthProvider";

export function useSocket(roomId: string) {
  const { token } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !roomId) return;

    const ws = new WebSocket(`${WS_BACKEND_URL}?token=${token}`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join_room", roomId }));
      setSocket(ws);
      setLoading(false);
    };
    ws.onerror = () => {
      setLoading(false);
    };

    return () => {
      ws.close();
    };
  }, [token, roomId]);

  return { socket, loading };
}