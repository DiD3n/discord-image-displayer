import { sockets } from '../websockets'
import { WebsocketMessage } from "../WebsocketMessage.interface";

export const wsBroadcast = (data: WebsocketMessage) => {
    sockets.forEach(s => s.send(JSON.stringify(data)));
}
