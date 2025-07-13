"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
  const router = useRouter();

  const [textInput, setTextInput] = useState<{
    visible: boolean;
    screenX: number;
    screenY: number;
    worldX: number;
    worldY: number;
    value: string;
  }>({
    visible: false,
    screenX: 0,
    screenY: 0,
    worldX: 0,
    worldY: 0,
    value: "",
  });

  useEffect(() => {
    draw?.setSelectedTool(selectedTool);
  }, [selectedTool, draw]);

  useEffect(() => {
    if (canvasRef.current && socket) {
      const newDraw = new Draw(canvasRef.current, roomId, socket);
      setDraw(newDraw);

      return () => {
        newDraw.destroy();
      };
    }
  }, [canvasRef, socket, roomId]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== Tool.Text || !draw) return;
    e.preventDefault();
    const rect = canvasRef.current!.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const { x: worldX, y: worldY } = draw.screenToWorld(screenX, screenY);
    setTextInput({ visible: true, screenX, screenY, worldX, worldY, value: "" });
  };

  const commitText = () => {
    if (draw && textInput.value.trim()) {
      draw.addText(textInput.worldX, textInput.worldY, textInput.value);
    }
    setTextInput(prev => ({ ...prev, visible: false, value: "" }));
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="h-screen overflow-hidden relative">
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={handleBackToDashboard}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors border border-neutral-700"
          title="Back to Dashboard"
        >
          <ArrowLeft className="h-6 w-6 text-neutral-300" />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleCanvasMouseDown}
      />
      {textInput.visible && (
        <input
          autoFocus
          type="text"
          value={textInput.value}
          onChange={(e) =>
            setTextInput((prev) => ({ ...prev, value: e.target.value }))
          }
          onBlur={commitText}
          onKeyDown={(e) => e.key === "Enter" && commitText()}
          style={{
            position: "absolute",
            top: textInput.screenY,
            left: textInput.screenX,
            color: "#ffffff",
            background: "transparent",
            border: "1px solid #ffffff",
            outline: "none"
          }}
        />
      )}
      <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}