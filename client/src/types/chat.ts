import { MongooseIDType } from './index';


export interface IChat {
    id: MongooseIDType; // Chat
    lastMessage: MongooseIDType; // Message
    title: string;
    createdAt: Date;
    members: MongooseIDType[]; // User
}