import { Tool } from "@/types/tools";

export type Point = { x: number; y: number };

export type Shape =
    | {
        type: Tool.Rectangle;
        x: number;
        y: number;
        width: number;
        height: number;
    }
    | {
        type: Tool.Circle;
        centerX: number;
        centerY: number;
        radius: number;
    }
    | {
        type: Tool.Pencil;
        points: Point[];
    }
    | {
        type: Tool.Eraser;
        points: Point[];
    }
    | {
        type: Tool.Line;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }
    | {
        type: Tool.Arrow;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }
    | {
        type: Tool.Text;
        x: number;
        y: number;
        text: string;
        color: string;
        font: string;
    };