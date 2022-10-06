import { IChatMessage } from "./chatMessage";

export type IDType = string;
export type ImageType = string;
export type MongooseIDType = string;
export type JSONString = string;

export interface WSMessage {
    type: 'message' | 'connectionMessage' | 'closeMessage' | 'changeRoom';
    roomId?: MongooseIDType; // chat id
    connectionId: MongooseIDType; // user id
    message?: IChatMessage;
}
  