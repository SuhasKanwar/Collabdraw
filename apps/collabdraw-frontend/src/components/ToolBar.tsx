import { FloatingDock } from "@/components/ui/floating-dock";
import {
  PencilIcon,
  Eraser,
  Minus,
  RectangleHorizontal,
  Circle,
  Type,
} from "lucide-react";
import { Tool } from "@/types/tools";

export default function ToolBar({ selectedTool, setSelectedTool }: { 
  selectedTool: Tool; 
  setSelectedTool: (tool: Tool) => void 
}) {
  const links = [
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
      href: "#",
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
      href: "#",
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
      href: "#",
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
      href: "#",
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
      href: "#",
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
      href: "#",
      onClick: () => setSelectedTool(Tool.Text),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
      <FloatingDock
        mobileClassName="translate-y-0"
        items={links}
      />
    </div>
  );
}