import { IChatMessage } from './../chatMessage';
import { MongooseIDType } from "..";

export interface WebSocketConnectionMessage {
    type: 'chat/connection';
    roomId: MongooseIDType; // chat id
    connectionId: MongooseIDType; // user id
}

export interface WebSocketCloseConnectionMessage {
    type: 'chat/close';
    connectionId: MongooseIDType;
}

export interface WebSocketSendMessage {
    type: 'chat/message/send';
    content: IChatMessage;
    connectionId: MongooseIDType;
    roomId: MongooseIDType;
}

export interface WebSocketDeleteMessage {
    type: 'chat/message/delete';
    messageId: MongooseIDType;
    connectionId: MongooseIDType;
    roomId: MongooseIDType;
}


export type WebSocketMessages = 
    WebSocketDeleteMessage | 
    WebSocketConnectionMessage |
    WebSocketCloseConnectionMessage | 
    WebSocketSendMessage