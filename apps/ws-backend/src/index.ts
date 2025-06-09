import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from './config';

const PORT: number = parseInt(process.env.WS_SERVER_PORT ?? "8080", 10);
const wss = new WebSocketServer({ port: PORT });

wss.on('listening', () => {
    console.log(`WebSocket server is running on port -> ${PORT}`);
    console.log(`\n\n ws://localhost:${PORT} \n\n`);
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

    if(!decoded || !(decoded as JwtPayload).userId) {
        ws.close();
        return;
    }
});