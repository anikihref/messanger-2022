import { IChatMessage } from './chatMessage';
import { MongooseIDType } from './index';


export interface IChat {
    id: MongooseIDType; // Chat
    lastMessage: IChatMessage | string; // Message
    title: string;
    createdAt: Date;
    members: MongooseIDType[]; // User
}