"use client";

import { initDraw } from "@/utils/draw1";
import { useEffect, useRef, useState } from "react";
import ToolBar from "./ToolBar";

export enum Tool {
  Pencil = "pencil",
  Eraser = "eraser",
  Line = "line",
  Rectangle = "rectangle",
  Circle = "circle",
  Text = "text",
}

export default function CanvasClient({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool , setSelectedTool] = useState<Tool>(Tool.Pencil);

  useEffect(() => {
    // @ts-ignore
    window.selectedTool = selectedTool;
  }, [selectedTool]);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div className="h-screen overflow-hidden">
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
      <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}