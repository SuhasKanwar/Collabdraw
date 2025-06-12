"use client";

import { WS_BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";
import CanvasClient from "./CanvasClient";

export default function CanvasRoom({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWUyZTc2MS1iNGQzLTQ0NjAtOTliNS0wMjI3NWI0N2NjMDkiLCJpYXQiOjE3NDk2NTI5NDR9.CfKN2lSmKhAN2x5CRMcT1LvJxI1qI_mwpsEoaKZ5vVg`);

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