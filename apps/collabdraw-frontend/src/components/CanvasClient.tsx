"use client";

import { useEffect, useRef, useState } from "react";
import ToolBar from "./ToolBar";
import { Draw } from "@/utils/draw";
import { Tool } from "@/types/tools";

export default function CanvasClient({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [draw, setDraw] = useState<Draw>();
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Pencil);

  useEffect(() => {
    draw?.setSelectedTool(selectedTool);
  }, [selectedTool, draw]);

  useEffect(() => {
    if (canvasRef.current) {
      const newDraw = new Draw(canvasRef.current, roomId, socket);
      setDraw(newDraw);

      return () => {
        newDraw.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div className="h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}