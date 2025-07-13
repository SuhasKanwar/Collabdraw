"use client";

import { WS_BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";
import CanvasClient from "./CanvasClient";
import { useAuth } from "@/providers/AuthProvider";

export default function CanvasRoom({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const ws = new WebSocket(`${WS_BACKEND_URL}?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({ type: "join_room", roomId: roomId }));
    };
  }, []);

  if(!socket) {
    return <div>Connecting to the drawing room...</div>;
  }

  return (
    <CanvasClient roomId={roomId} socket={socket} />
  );
}