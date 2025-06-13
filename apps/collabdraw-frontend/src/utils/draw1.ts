import { Tool } from "@/components/CanvasClient";
import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

type Shape = {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get canvas context");
        return;
    }

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if(parsedData.type === "chat") {
            const parsedShape = JSON.parse(parsedData.message);
            existingShapes.push(parsedShape);
            clearCanvas(existingShapes, canvas, ctx);
        }
    }

    clearCanvas(existingShapes, canvas, ctx);
    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })

    canvas.addEventListener("mouseup", (e) => {
        if(!clicked) return;
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        // @ts-ignore
        const selectedTool = window.selectedTool;
        let shape: Shape | null = null;
        if(selectedTool === Tool.Rectangle) {
            shape = {
                type: "rectangle",
                x: startX,
                y: startY,
                width: width,
                height: height
            };
            existingShapes.push(shape);
        }
        else if (selectedTool === Tool.Circle) {
            shape = {
                type: "circle",
                centerX: startX + width / 2,
                centerY: startY + height / 2,
                radius: Math.max(width, height) / 2
            };
            existingShapes.push(shape);
        }

        if(!shape) {
            return;
        }

        existingShapes.push(shape);
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: roomId
        }));
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!clicked) return;

        const width = e.clientX - startX;
        const height = e.clientY - startY;
        clearCanvas(existingShapes, canvas, ctx);
        ctx.strokeStyle = "rgba(255, 255, 255)";

        // @ts-ignore
        const selectedTool = window.selectedTool;
        if(selectedTool === Tool.Rectangle) {
            ctx.strokeRect(startX, startY, width, height);
        }
        else if (selectedTool === Tool.Circle) {
            const centerX = startX + width / 2;
            const centerY = startY + height / 2;
            const radius = Math.max(width, height) / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }
        else if (selectedTool === Tool.Pencil) {
        }
    });
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if(shape.type === Tool.Rectangle) {
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
        else if (shape.type === Tool.Circle) {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }
    })
}

async function getExistingShapes(roomId: string): Promise<Shape[]> {
    try {
        const response = await axios.get(`${HTTP_BACKEND_URL}/api/room/shapes/${roomId}`);
        const messages = response.data.chats;
    
        const shapes = messages.map((message: { message: string }) => {
            const messageData = JSON.parse(message.message);
            return messageData;
        });
    
        return shapes;
    }
    catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}