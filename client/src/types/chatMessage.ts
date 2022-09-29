import { IUser } from './user';
import { ImageType, MongooseIDType } from './index';

export interface IChatMessage {
    id: MongooseIDType; // Chat Message
    content: string | ImageType;
    createdAt: Date;
    updatedAt: Date;
    creator: IUser; // User
    chat: MongooseIDType; // Chat
    type: 'text' | 'image';
}