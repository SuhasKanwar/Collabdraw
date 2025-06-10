import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, WS_SERVER_PORT } from '@repo/backend-utils/config';

const wss = new WebSocketServer({ port: WS_SERVER_PORT });

wss.on('listening', () => {
    console.log(`WebSocket server is running on port -> ${WS_SERVER_PORT}`);
    console.log(`\n\n ws://localhost:${WS_SERVER_PORT} \n\n`);
});

wss.on('connection', (ws, request) => {
    const url = request.url;
    if(!url) {
        ws.close();
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';
    const decoded = jwt.verify(token, JWT_SECRET);

    if(typeof decoded == "string") {
        ws.close();
        return;
    }
    if(!decoded || !decoded.userId) {
        ws.close();
        return;
    }

    ws.on("message", (message) => {
        ws.send(message);
    })
});