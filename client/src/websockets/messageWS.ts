import { WSSuccessResponse } from './../types/ws/index';
import { WebSocketLeaveMessage, WebSocketJoinMessage, EVENT_TYPES, WebSocketSendMessage, WebSocketDeleteMessage } from '../types/ws/messageWS';
import { MongooseIDType } from '../types';
import { handleAsyncWS } from './helpers/handleAsyncWS';

export interface IMessageWebSocket {
    webSocket: WebSocket | null;
    handler: (evt: MessageEvent) => any;
    connectionId?: MongooseIDType;
}

type SendType<T> = T & {type: EVENT_TYPES} 

class MessageWebSocket implements IMessageWebSocket {
    webSocket: WebSocket | null;
    handler: (evt: MessageEvent) => void;
    connectionId: MongooseIDType;

    constructor() { 
        this.webSocket = null;
        this.handler = () => null;
        this.connectionId = '';
    }

    

    connect(url: string = 'ws://localhost:8000', userId: MongooseIDType) {
        this.webSocket = new WebSocket(url);
        this.connectionId = userId

        // window.addEventListener('beforeunload', () => {
        //     this.leaveRoom({
        //         connectionId: this.connectionId
        //     })

        //     this.disconnect();
        // })
    }

    async disconnect(): Promise<boolean> {
        if (this.webSocket?.readyState !== 1 || !this.webSocket) return false;

        this.webSocket.close();

        const promise: Promise<boolean> = new Promise((resolve, reject) => {
            if (!this.webSocket) return;

            setTimeout(() => {
                reject('Timed out! Could disconnect from WebSokcet Server')
            }, 500)

            this.webSocket.onclose = () => {
                this.webSocket = null;
                resolve(true)
            }
        })

        // websocket will only exist if promise rejected
        promise.catch(() => this.webSocket!.onclose = () => {})

        return promise;
    }

    async joinRoom<T extends WebSocketJoinMessage>(message: T): Promise<WSSuccessResponse | void> {
        if (!this.webSocket) return;

        const JSONMessage: SendType<T> = {
            ...message,
            type: EVENT_TYPES.join,
        }

        this.webSocket?.send(JSON.stringify(JSONMessage))
        this.webSocket?.addEventListener('message', this.handler)


        return handleAsyncWS(EVENT_TYPES.join, this.webSocket)
            .catch((error) => {
                console.error(`\nMessage WS error in event: ${error.eventType} \nError Message: ${error.message}`)
            })
    }

    async leaveRoom(message: WebSocketLeaveMessage): Promise<WSSuccessResponse | void> {
        if (!this.webSocket) return;
        const JSONMessage: SendType<WebSocketLeaveMessage> = {
            ...message,
            type: EVENT_TYPES.leave,
        }

        this.webSocket?.send(JSON.stringify(JSONMessage))

        this.webSocket?.removeEventListener('message', this.handler)

        return handleAsyncWS(EVENT_TYPES.leave, this.webSocket)
            .catch((error) => {
                console.error(`\nMessage WS error in event: ${error.eventType} \nError Message: ${error.message}`)
            })
    }

    async deleteMessage<T extends WebSocketDeleteMessage>(message: T): Promise<WSSuccessResponse | void> {
        if (!this.webSocket) return;
        const JSONMessage: SendType<T> = {
            ...message,
            type: EVENT_TYPES.delete
        }
        
        this.webSocket?.send(JSON.stringify(JSONMessage))
        
        return handleAsyncWS(EVENT_TYPES.delete, this.webSocket)
            .catch((error) => {
                console.error(`\nMessage WS error in event: ${error.eventType} \nError Message: ${error.message}`)
            })
    }

    // returns promise (.then => if message was delivered to the receiver) (.catch => if not)
    async send<T extends WebSocketSendMessage>(message: T): Promise<WSSuccessResponse | void> {
        if (!this.webSocket) return;
        const JSONMessage: SendType<T> = {
            ...message,
            type: EVENT_TYPES.send
        }
        
        this.webSocket?.send(JSON.stringify(JSONMessage))
        
        return handleAsyncWS(EVENT_TYPES.send, this.webSocket)
            .catch((error) => {
                console.error(`\nMessage WS error in event: ${error.eventType} \nError Message: ${error.message}`)
            })
    }
}

export default new MessageWebSocket()