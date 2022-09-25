import { IUser } from './../types/user';
import { MongooseIDType } from './../types/index';
import { baseURL, URLs } from './index';
import axios, { AxiosResponse } from "axios";

const baseUserUrl = axios.create({
    baseURL: baseURL + URLs.User
});

export const userApi = {
    async getUserById(userId: MongooseIDType): Promise<AxiosResponse<IUser, any>> {
        return await baseUserUrl.get<IUser>(`/${userId}`);
    },

    async getUser(key: 'username' | 'email' | 'phone', value: string): Promise<AxiosResponse<IUser, any>> {
        return await baseUserUrl.get<IUser>(`?key=${key}&value=${value}`)
    },

    async create(user: Omit<IUser, 'id' | 'friends'>, password: string): Promise<AxiosResponse<IUser, any>> {
        return await baseUserUrl.post<IUser>('/', {
            data: {...user, password}
        })
    },

    async delete(userId: MongooseIDType): Promise<void> {
        await baseUserUrl.delete(`/${userId}`);
    },

    async addFriend(friendId: MongooseIDType, userId: MongooseIDType): Promise<AxiosResponse<IUser, any>> {
        return await baseUserUrl.patch<IUser>(`/friend/add`, {
            data: {
                friendId,
                userId
            }
        })
    },

    async removeFriend(exFriendId: MongooseIDType, userId: MongooseIDType): Promise<AxiosResponse<IUser, any>> {
        return await baseUserUrl.patch<IUser>(`/friend/remove`, {
            data: {
                exFriendId,
                userId
            }
        })
    },

    async edit(userId: MongooseIDType, key: string, value: 'string'): Promise<AxiosResponse<IUser, any>> {
        return await baseUserUrl.patch<IUser>(`/edit/${userId}`, {
            data: {
                key,
                value
            }
        })
    }
}
