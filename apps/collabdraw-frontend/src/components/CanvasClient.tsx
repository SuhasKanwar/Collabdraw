"use client";

import { initDraw } from "@/utils/draw";
import { useEffect, useRef } from "react";

export default function CanvasClient({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} width={900} height={900}></canvas>
    </div>
  );
}