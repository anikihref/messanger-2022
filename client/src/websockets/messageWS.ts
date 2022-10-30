import { WebSocketCloseMessage, WebSocketMessage, WebSocketConnectionMessage } from '../types/ws/wsMessages';
export interface IMessageWebSocket {
    webSocket: WebSocket | null;
}

class MessageWebSocket implements IMessageWebSocket {
    webSocket: WebSocket | null;

    constructor() { 
        this.webSocket = null;
    }

    connect(message: WebSocketConnectionMessage, onMessage: (arg: any) => void) {
        this.webSocket = new WebSocket('ws://localhost:8000');

        this.webSocket.onopen = () => {
            this.webSocket?.send(JSON.stringify(message))
        }

        this.webSocket.onmessage = onMessage;
    }

    close(message: WebSocketCloseMessage) {
        this.webSocket?.send(JSON.stringify(message))
        this.webSocket?.close()

        if (!this.webSocket) { return }

        this.webSocket.onclose = () => {
            this.webSocket = null;
        }
    }

    send(message: WebSocketMessage) {
        const sendMessage = () => {
            this.webSocket?.send(JSON.stringify(message))
        }
        
        if (this.webSocket?.readyState === 0) {
            return setTimeout(sendMessage, 200);
        }

        sendMessage();   
    }
}

export default new MessageWebSocket()