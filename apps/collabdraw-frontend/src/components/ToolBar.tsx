import { Circle, PencilIcon, RectangleHorizontalIcon } from "lucide-react";
import { IconButton } from "./IconButton";
import { Tool } from "./CanvasClient";

export default function ToolBar({ selectedTool, setSelectedTool } : { selectedTool: Tool; setSelectedTool: (tool: Tool) => void }) {
    return (
        <div className="fixed top-10 left-10 flex flex-row gap-3">
            <IconButton activated={selectedTool === Tool.Pencil} icon={<PencilIcon />} onClick={() => { setSelectedTool(Tool.Pencil) }} />
            <IconButton activated={selectedTool===Tool.Rectangle} icon={<RectangleHorizontalIcon />} onClick={() => { setSelectedTool(Tool.Rectangle) }} />
            <IconButton activated={selectedTool===Tool.Circle} icon={<Circle />} onClick={() => { setSelectedTool(Tool.Circle) }} />
        </div>
    );
}