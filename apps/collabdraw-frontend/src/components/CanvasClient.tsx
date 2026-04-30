"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, X } from "lucide-react";
import ToolBar from "./ToolBar";
import { Draw } from "@/utils/draw";
import { Tool } from "@/types/tools";
import ChatBox from "./ChatBox";
import ConfirmationModal from "./ConfirmationModal";
import { motion } from "motion/react";

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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
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
    setTextInput({
      visible: true,
      screenX,
      screenY,
      worldX,
      worldY,
      value: "",
    });
  };

  const commitText = () => {
    if (draw && textInput.value.trim()) {
      draw.addText(textInput.worldX, textInput.worldY, textInput.value);
    }
    setTextInput((prev) => ({ ...prev, visible: false, value: "" }));
  };

  const handleBackToDashboard = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    router.push("/dashboard");
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
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

      <div className="fixed top-6 right-6 z-50">
        <motion.button
          onClick={toggleChat}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors border border-neutral-700 ${
            isChatOpen
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-neutral-900 hover:bg-neutral-800"
          }`}
          title="Toggle Chat"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            key={isChatOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isChatOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-neutral-300" />
            )}
          </motion.div>
        </motion.button>
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
            outline: "none",
          }}
        />
      )}

      <ChatBox roomId={roomId} isOpen={isChatOpen} />
      <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      
      <ConfirmationModal
        open={showExitConfirmation}
        onOpenChange={setShowExitConfirmation}
        title="Leave Room"
        description="Are you sure you want to leave this collaboration room? Any unsaved changes will be lost."
        confirmText="Leave Room"
        cancelText="Stay"
        variant="destructive"
        onConfirm={confirmExit}
      />
    </div>
  );
}