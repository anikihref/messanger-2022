import { MongooseIDType, ImageType } from './index';

export interface IUser {
    id: MongooseIDType; // User
    avatar: ImageType | null;
    username: string;
    email: string;
    bio: string;
    name: string;
    activated: boolean;
    phoneNumber: string;
    status: 'online' | 'offline';
    friends: MongooseIDType[] | null; // User
};
