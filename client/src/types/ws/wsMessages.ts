import { IChatMessage } from './../chatMessage';
import { MongooseIDType } from "..";

export interface WebSocketConnectionMessage {
    type: 'chat/connection';
    roomId: MongooseIDType; // chat id
    connectionId: MongooseIDType; // user id
}

export interface WebSocketCloseMessage {
    type: 'chat/close';
    connectionId: MongooseIDType;
}

export interface WebSocketMessage {
    type: 'chat/message';
    content: IChatMessage;
    connectionId: MongooseIDType;
    roomId: MongooseIDType;
}


export type WebSocketMessages = 
    WebSocketCloseMessage | 
    WebSocketConnectionMessage | 
    WebSocketMessage