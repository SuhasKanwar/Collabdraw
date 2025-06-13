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
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.type === "chat") {
                const parsedShape = JSON.parse(parsedData.message);
                this.existingShapes.push(parsedShape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type === Tool.Rectangle) {
                this.ctx.strokeStyle = "rgba(255, 255, 255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
            else if (shape.type === Tool.Circle) {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    }

    mouseDownHandler(e: MouseEvent) {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    mouseUpHandler(e: MouseEvent) {
        if (!this.clicked) return;
        this.clicked = false;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === Tool.Rectangle) {
            shape = {
                type: "rectangle",
                x: this.startX,
                y: this.startY,
                width: width,
                height: height
            };
            this.existingShapes.push(shape);
        }
        else if (selectedTool === Tool.Circle) {
            shape = {
                type: "circle",
                centerX: this.startX + width / 2,
                centerY: this.startY + height / 2,
                radius: Math.max(width, height) / 2
            };
            this.existingShapes.push(shape);
        }

        if (!shape) {
            return;
        }

        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: this.roomId
        }));
    }

    mouseMoveHandler(e: MouseEvent) {
        if (!this.clicked) return;

        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        this.clearCanvas();
        this.ctx.strokeStyle = "rgba(255, 255, 255)";

        const selectedTool = this.selectedTool;
        if (selectedTool === Tool.Rectangle) {
            this.ctx.strokeRect(this.startX, this.startY, width, height);
        }
        else if (selectedTool === Tool.Circle) {
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            const radius = Math.max(width, height) / 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else if (selectedTool === Tool.Pencil) {
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));

        this.canvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
    }
}