import ws, { WebSocket } from "ws";

import { app as config } from '../config.json';

export const wsServer = new ws.Server({ port: config.wsPort });
export let sockets: WebSocket[] = [];


wsServer.on('connection', (socket: WebSocket) => {
    sockets.push(socket);

    socket.on('message', (msg) => {
        sockets.forEach(s => s.send(msg));
    });

    socket.on('close', () => {
        sockets = sockets.filter(s => s !== socket);
    });
});
