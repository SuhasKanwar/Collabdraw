import { Shape } from "@/types/shapes";
import { getExistingShapes } from "./shapes";
import { Tool } from "@/types/tools";

export class Draw {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX: number = 0;
    private startY: number = 0;
    private selectedTool: Tool = Tool.Pencil;
    private currentPath: { x: number; y: number }[] = [];
    private offsetX: number = 0;
    private offsetY: number = 0;
    private scale: number = 1;
    private isPanning: boolean = false;
    private panStart = { x: 0, y: 0 };
    private startOffset = { x: 0, y: 0 };
    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.clicked = false;
        this.socket = socket;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
        this.canvas.style.cursor = "crosshair";
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler.bind(this));
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler.bind(this));
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler.bind(this));
        this.socket.close();
    }

    setSelectedTool(tool: Tool) {
        this.selectedTool = tool;
        if (tool === Tool.Hand) {
            this.canvas.style.cursor = "grab";
        } else {
            this.canvas.style.cursor = "crosshair";
        }
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.type === "shape") {
                const parsedShape = JSON.parse(parsedData.message);
                this.existingShapes.push(parsedShape);
                this.clearCanvas();
            }
        }
    }

    private getMousePosition(e: MouseEvent): { x: number; y: number } {
        const rect = this.canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        return {
            x: (screenX - this.offsetX) / this.scale,
            y: (screenY - this.offsetY) / this.scale
        };
    }

    mouseDownHandler(e: MouseEvent) {
        if (this.selectedTool === Tool.Hand) {
            this.isPanning = true;
            this.panStart = { x: e.clientX, y: e.clientY };
            this.startOffset = { x: this.offsetX, y: this.offsetY };
            this.canvas.style.cursor = "grabbing";
            return;
        }
        const { x, y } = this.getMousePosition(e);
        this.clicked = true;
        this.startX = x; this.startY = y;
        if (this.selectedTool === Tool.Pencil || this.selectedTool === Tool.Eraser) {
            this.currentPath = [{ x, y }];
            this.ctx.beginPath(); this.ctx.moveTo(x, y);
            if (this.selectedTool === Tool.Pencil) {
                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.lineWidth = 2 / this.scale;
                this.ctx.strokeStyle = "rgba(255,255,255)";
            } else {
                this.ctx.globalCompositeOperation = "source-over";    // <-- changed
                this.ctx.strokeStyle = "rgba(0,0,0)";                  // <-- added
                this.ctx.lineWidth = 10 / this.scale;
            }
        }
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.isPanning) {
            const dx = e.clientX - this.panStart.x;
            const dy = e.clientY - this.panStart.y;
            this.offsetX = this.startOffset.x + dx;
            this.offsetY = this.startOffset.y + dy;
            this.clearCanvas();
            return;
        }

        if (!this.clicked) return;
        const { x, y } = this.getMousePosition(e);

        if (this.selectedTool === Tool.Pencil || this.selectedTool === Tool.Eraser) {
            this.currentPath.push({ x, y });
            this.clearCanvas();  // redraw history
            if (this.selectedTool === Tool.Pencil) {
                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.lineWidth = 2 / this.scale;
            } else {
                this.ctx.globalCompositeOperation = "source-over";    // <-- changed
                this.ctx.strokeStyle = "rgba(0,0,0)";                  // <-- added
                this.ctx.lineWidth = 10 / this.scale;
            }
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentPath[0].x, this.currentPath[0].y);
            this.currentPath.forEach(pt => this.ctx.lineTo(pt.x, pt.y));
            this.ctx.stroke();
            return;
        }

        const width = x - this.startX;
        const height = y - this.startY;
        this.clearCanvas();

        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.strokeStyle = "rgba(255, 255, 255)";
        this.ctx.lineWidth = 2 / this.scale;

        if (this.selectedTool === Tool.Line) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else if (this.selectedTool === Tool.Rectangle) {
            this.ctx.strokeRect(this.startX, this.startY, width, height);
        }
        else if (this.selectedTool === Tool.Circle) {
            this.ctx.beginPath();
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else if (this.selectedTool === Tool.Arrow) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            const head = 10 / this.scale;
            const ang = Math.atan2(y - this.startY, x - this.startX);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(
                x - head * Math.cos(ang - Math.PI / 6),
                y - head * Math.sin(ang - Math.PI / 6)
            );
            this.ctx.lineTo(
                x - head * Math.cos(ang + Math.PI / 6),
                y - head * Math.sin(ang + Math.PI / 6)
            );
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    mouseUpHandler(e: MouseEvent) {
        if (this.isPanning) {
            this.isPanning = false;
            this.canvas.style.cursor = "grab";
            return;
        }

        if (!this.clicked) return;
        this.clicked = false;
        const { x, y } = this.getMousePosition(e);
        let shape: Shape | null = null;

        if (this.selectedTool === Tool.Pencil) {
            shape = { type: Tool.Pencil, points: this.currentPath };
        }
        else if (this.selectedTool === Tool.Eraser) {
            shape = { type: Tool.Eraser, points: this.currentPath };
        }
        else if (this.selectedTool === Tool.Line) {
            shape = { type: Tool.Line, x1: this.startX, y1: this.startY, x2: x, y2: y };
        }
        else if (this.selectedTool === Tool.Text) {
            this.clicked = false;
            return;
        }
        else if (this.selectedTool === Tool.Rectangle) {
            const width = x - this.startX;
            const height = y - this.startY;
            shape = { type: Tool.Rectangle, x: this.startX, y: this.startY, width, height };
        }
        else if (this.selectedTool === Tool.Circle) {
            const width = x - this.startX;
            const height = y - this.startY;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            shape = { type: Tool.Circle, centerX, centerY, radius };
        }
        else if (this.selectedTool === Tool.Arrow) {
            shape = { type: Tool.Arrow, x1: this.startX, y1: this.startY, x2: x, y2: y };
        }

        if (!shape) return;
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "shape",
            message: JSON.stringify(shape),
            roomId: this.roomId
        }));
    }

    public addText(x: number, y: number, text: string, color = "#ffffff", font = "16px sans-serif") {
        const shape: Shape = { type: Tool.Text, x, y, text, color, font };
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "shape",
            message: JSON.stringify(shape),
            roomId: this.roomId,
        }));
        this.clearCanvas();
    }

    private wheelHandler(e: WheelEvent) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const worldX = (mouseX - this.offsetX) / this.scale;
        const worldY = (mouseY - this.offsetY) / this.scale;
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        this.scale = Math.min(this.scale * factor, 5);
        this.offsetX = mouseX - worldX * this.scale;
        this.offsetY = mouseY - worldY * this.scale;
        this.clearCanvas();
    }

    clearCanvas() {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);

        this.existingShapes.forEach(shape => {
            this.ctx.globalCompositeOperation = "source-over";
            this.ctx.strokeStyle = "rgba(255,255,255)";
            this.ctx.fillStyle = "rgba(255,255,255)";
            switch (shape.type) {
                case Tool.Pencil:
                    this.ctx.lineWidth = 2 / this.scale;
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
                    shape.points.forEach(pt => this.ctx.lineTo(pt.x, pt.y));
                    this.ctx.stroke();
                    this.ctx.closePath();
                    break;
                case Tool.Eraser:
                    this.ctx.globalCompositeOperation = "source-over";
                    this.ctx.strokeStyle = "rgba(0,0,0)";
                    this.ctx.lineWidth = 10 / this.scale;
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
                    shape.points.forEach(pt => this.ctx.lineTo(pt.x, pt.y));
                    this.ctx.stroke();
                    this.ctx.closePath();
                    break;
                case Tool.Line:
                    this.ctx.lineWidth = 2 / this.scale;
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.x1, shape.y1);
                    this.ctx.lineTo(shape.x2, shape.y2);
                    this.ctx.stroke();
                    this.ctx.closePath();
                    break;
                case Tool.Rectangle:
                    this.ctx.lineWidth = 2 / this.scale;
                    this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                    break;
                case Tool.Circle:
                    this.ctx.lineWidth = 2 / this.scale;
                    this.ctx.beginPath();
                    this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.closePath();
                    break;
                case Tool.Text:
                    this.ctx.font = shape.font;
                    this.ctx.fillStyle = shape.color;
                    this.ctx.fillText(shape.text, shape.x, shape.y);
                    break;
                case Tool.Arrow:
                    this.ctx.lineWidth = 2 / this.scale;
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.x1, shape.y1);
                    this.ctx.lineTo(shape.x2, shape.y2);
                    this.ctx.stroke();
                    const head = 10 / this.scale;
                    const ang = Math.atan2(shape.y2 - shape.y1, shape.x2 - shape.x1);
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.x2, shape.y2);
                    this.ctx.lineTo(
                      shape.x2 - head * Math.cos(ang - Math.PI / 6),
                      shape.y2 - head * Math.sin(ang - Math.PI / 6)
                    );
                    this.ctx.lineTo(
                      shape.x2 - head * Math.cos(ang + Math.PI / 6),
                      shape.y2 - head * Math.sin(ang + Math.PI / 6)
                    );
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;
            }
        });
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        this.canvas.addEventListener("mouseup",   this.mouseUpHandler.bind(this));
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        this.canvas.addEventListener("wheel",     this.wheelHandler.bind(this), { passive: false });
    }

    public screenToWorld(screenX: number, screenY: number): { x: number; y: number } {
        return {
            x: (screenX - this.offsetX) / this.scale,
            y: (screenY - this.offsetY) / this.scale,
        };
    }
}