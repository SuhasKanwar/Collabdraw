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

const users: User[] = [];

wss.on('connection', (ws, request) => {
    const url = request.url;
    if(!url) {
        ws.close();
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';
    const authenticatedUserId = authenticate(token);
    if(!authenticatedUserId) {
        ws.close();
        return;
    }

    users.push({
        ws,
        userId: authenticatedUserId,
        rooms: []
    });

    ws.on("message", async function message(data) {
        const parsedData = JSON.parse(data as unknown as string);

        if(parsedData.type == "join_room") {
            const user = users.find(user => user.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }
        else if(parsedData.type == "leave_room") {
            const user = users.find(user => user.ws === ws);
            if(!user) return;
            user.rooms = user?.rooms.filter(room => room !== parsedData.room);
        }
        else if(parsedData.type == "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            users.forEach(user => {
                if(user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: 'chat',
                        message: message,
                        roomId: roomId
                    }));
                }
            });
            
            await prismaClient.chat.create({
                data: {
                    userId: authenticatedUserId,
                    roomId: roomId,
                    message: message
                }
            });
        }
    })
});