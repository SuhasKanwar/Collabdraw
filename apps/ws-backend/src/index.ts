import { WebSocketServer, WebSocket } from 'ws';
import { WS_SERVER_PORT } from '@repo/backend-utils/config';
import authenticate from './middlewares/authentication';
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: WS_SERVER_PORT });

wss.on('listening', () => {
    console.log(`WebSocket server is running on port -> ${WS_SERVER_PORT}`);
    console.log(`\n\n ws://localhost:${WS_SERVER_PORT} \n\n`);
});

interface User {
    ws: WebSocket;
    userId: string;
    rooms: string[];
}

const users = new Map<WebSocket, User>();

wss.on('connection', (ws, request) => {
    const url = request.url;
    if(!url) {
        ws.close();
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';
    const decodedToken = authenticate(token);
    const authenticatedUserId = decodedToken?.userId;
    const authenticatedUserName = decodedToken?.name;
    if(!authenticatedUserId) {
        ws.close();
        return;
    }

    users.set(ws, {
        ws,
        userId: authenticatedUserId,
        rooms: []
    });

    ws.on("message", async function message(data) {
        const parsedData = JSON.parse(data as unknown as string);

        if(parsedData.type == "join_room") {
            const user = users.get(ws);
            user?.rooms.push(parsedData.roomId);
        }
        else if(parsedData.type == "leave_room") {
            const user = users.get(ws);
            if(!user) return;
            user.rooms = user?.rooms.filter(room => room !== parsedData.room);
        }
        else if(parsedData.type === "shape") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            const usersInRoom = Array.from(users.values()).filter(u => u.rooms.includes(roomId));
            usersInRoom.forEach(u => {
                u.ws.send(JSON.stringify({
                    type: 'shape',
                    message: message,
                    roomId: roomId
                }));
            });

            const shapeData = JSON.parse(message);
            await prismaClient.shape.create({
                data: {
                    roomId: Number(roomId),
                    type: shapeData.type,
                    data: shapeData
                }
            });
        }
        else if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            const usersInRoom = Array.from(users.values()).filter(u => u.rooms.includes(roomId) && u.userId !== authenticatedUserId);
            usersInRoom.forEach(u => {
                u.ws.send(JSON.stringify({
                    type: 'chat',
                    message: message,
                    roomId: roomId,
                    userId: authenticatedUserId,
                    user: {
                        name: authenticatedUserName
                    },
                    createdAt: new Date()
                }));
            });

            await prismaClient.chat.create({
                data: {
                    roomId: Number(roomId),
                    userId: authenticatedUserId,
                    message: message
                }
            });
        }
    });

    ws.on('close', () => {
        users.delete(ws);
    });
});