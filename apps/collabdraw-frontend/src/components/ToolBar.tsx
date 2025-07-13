import { FloatingDock } from "@/components/ui/floating-dock";
import {
  Hand,
  PencilIcon,
  Eraser,
  Minus,
  RectangleHorizontal,
  Circle,
  Type,
  ArrowUpRight,
} from "lucide-react";
import { Tool } from "@/types/tools";

export default function ToolBar({ selectedTool, setSelectedTool }: { 
  selectedTool: Tool; 
  setSelectedTool: (tool: Tool) => void 
}) {
  const links = [
    {
      title: "Hand",
      icon: (
        <Hand
          className={`h-full w-full ${
            selectedTool === Tool.Hand ? "text-blue-500" : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Hand),
    },
    {
      title: "Pencil",
      icon: (
        <PencilIcon
          className={`h-full w-full ${
            selectedTool === Tool.Pencil
              ? "text-blue-500"
              : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Pencil),
    },
    {
      title: "Eraser",
      icon: (
        <Eraser
          className={`h-full w-full ${
            selectedTool === Tool.Eraser
              ? "text-blue-500"
              : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Eraser),
    },
    {
      title: "Line",
      icon: (
        <Minus
          className={`h-full w-full ${
            selectedTool === Tool.Line
              ? "text-blue-500"
              : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Line),
    },
    {
      title: "Rectangle",
      icon: (
        <RectangleHorizontal
          className={`h-full w-full ${
            selectedTool === Tool.Rectangle
              ? "text-blue-500"
              : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Rectangle),
    },
    {
      title: "Circle",
      icon: (
        <Circle
          className={`h-full w-full ${
            selectedTool === Tool.Circle
              ? "text-blue-500"
              : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Circle),
    },
    {
      title: "Text",
      icon: (
        <Type
          className={`h-full w-full ${
            selectedTool === Tool.Text
              ? "text-blue-500"
              : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Text),
    },
    {
      title: "Arrow",
      icon: (
        <ArrowUpRight
          className={`h-full w-full ${
            selectedTool === Tool.Arrow ? "text-blue-500" : "text-neutral-300"
          }`}
        />
      ),
      onClick: () => setSelectedTool(Tool.Arrow),
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 md:left-1/2">
      <FloatingDock
        mobileClassName="translate-y-0"
        desktopClassName="transform md:-translate-x-1/2"
        items={links}
      />
    </div>
  );
}