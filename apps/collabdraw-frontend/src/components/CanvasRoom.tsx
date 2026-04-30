"use client";

import { useSocket } from "@/hooks/useSocket";
import CanvasClient from "./CanvasClient";
import Loading from "@/app/loading";

export default function CanvasRoom({ roomId }: { roomId: string }) {
  const { socket, loading } = useSocket(roomId);

  if (loading || !socket) {
    return <Loading />;
  }

  return <CanvasClient roomId={roomId} socket={socket} />;
}