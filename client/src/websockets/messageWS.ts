import { WSSuccessResponse, WSErrorResponse } from './../types/ws/index';
import { WebSocketLeaveMessage, WebSocketJoinMessage, EVENT_TYPES, WebSocketSendMessage } from '../types/ws/messageWS';
import { MongooseIDType } from '../types';

export interface IMessageWebSocket {
    webSocket: WebSocket | null;
    handler: (evt: MessageEvent) => any;
    connectionId?: MongooseIDType;
}

type SendType<T> = T & {type: EVENT_TYPES.join | EVENT_TYPES.leave | EVENT_TYPES.send} 

class MessageWebSocket implements IMessageWebSocket {
    webSocket: WebSocket | null;
    handler: (evt: MessageEvent) => void;
    connectionId: MongooseIDType;

    constructor() { 
        this.webSocket = null;
        this.handler = () => null;
        this.connectionId = '';
    }

    handleResponse<T extends WSSuccessResponse>(
        eventType: EVENT_TYPES,
    ): Promise<T> {
        let resolveScoped: (value: T | PromiseLike<T>) => void;
        let rejectScoped: (reason?: any) => void; 

        function responseHandler (
            evt: MessageEvent<any>
        ) {
            const response: T = JSON.parse(evt.data);
            if (!resolveScoped || !rejectScoped) return; 
            
            if (response.eventType === eventType) {
                if (response.responseState === 'success') {
                    resolveScoped(response)
                } else {
                    rejectScoped(response)
                }
            }
        }
    
        const promise: Promise<T> = new Promise((resolve, reject) => {
            resolveScoped = resolve
            rejectScoped = reject
    
            this.webSocket?.addEventListener('message', responseHandler)
        })
    
        promise
            .then(() => {
                console.log(eventType)
            })
            .catch((error: WSErrorResponse) => {
                console.error(`\nMessage WS error in event: ${error.eventType} \nError Message: ${error.message}`)
            })
            .finally(() => {
                this.webSocket?.removeEventListener('message', responseHandler)
            })


        return promise
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

    async joinRoom<T extends WebSocketJoinMessage>(message: T): Promise<WSSuccessResponse> {
        const JSONMessage: SendType<T> = {
            ...message,
            type: EVENT_TYPES.join,
        }

        this.webSocket?.send(JSON.stringify(JSONMessage))

        this.webSocket?.addEventListener('message', this.handler)
        
        return this.handleResponse<WSSuccessResponse>(EVENT_TYPES.join);
    }

    async leaveRoom(message: WebSocketLeaveMessage): Promise<WSSuccessResponse> {
        const JSONMessage: SendType<WebSocketLeaveMessage> = {
            ...message,
            type: EVENT_TYPES.leave,
        }

        this.webSocket?.send(JSON.stringify(JSONMessage))

        this.webSocket?.removeEventListener('message', this.handler)

        return this.handleResponse<WSSuccessResponse>(EVENT_TYPES.leave)
    }

    // returns promise (.then => if message was delivered to the receiver) (.catch => if not)
    async send<T extends WebSocketSendMessage>(message: T): Promise<WSSuccessResponse> {
        const JSONMessage: SendType<T> = {
            ...message,
            type: EVENT_TYPES.send
        }
        
        this.webSocket?.send(JSON.stringify(JSONMessage))
        
        return this.handleResponse<WSSuccessResponse>(EVENT_TYPES.send);
    }
}

export default new MessageWebSocket()