import { IChatMessage } from '../chatMessage';
import { MongooseIDType } from "..";

export enum EVENT_TYPES {
    join = 'chat/join',
    leave = 'chat/leave',
    send = 'chat/send',
}

export interface WebSocketJoinMessage {
    roomId: MongooseIDType; // chat id
    connectionId: MongooseIDType; // user id
}

export interface WebSocketLeaveMessage {
    connectionId: MongooseIDType;
}

export interface WebSocketSendMessage {
    content: IChatMessage;
    connectionId: MongooseIDType;
    roomId: MongooseIDType;
}


export type WebSocketMessage = 
    WebSocketJoinMessage | 
    WebSocketLeaveMessage | 
    WebSocketSendMessage