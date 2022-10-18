import { MongooseIDType } from './../types/index';
import { IChat } from './../types/chat';
import axios, { AxiosResponse } from "axios";
import { URLs, baseURL } from './index';

export const baseChatUrl = axios.create({
    baseURL: baseURL + URLs.Chat
});

export const chatApi = {
    async getChat(chatId: MongooseIDType): Promise<AxiosResponse<IChat, any>> {
        return await baseChatUrl.get<IChat>(`/${chatId}`);
    },

    async getLastChats(userId: MongooseIDType, limit?: number): Promise<AxiosResponse<IChat[], any>> {
        return await baseChatUrl.get<IChat[]>(`/last/${userId}?limit=${limit}`)
    },

    async createChat(chat: Omit<IChat, 'id' | 'createdAt' | 'lastMessage'>): Promise<AxiosResponse<IChat, any>> {
        return await baseChatUrl.post('/', chat);
    },

    async getAllChats(userId: MongooseIDType, limit?: number): Promise<AxiosResponse<IChat[], any>> {
        return await baseChatUrl.get(`/all/${userId}?limit=${limit}`);
    },

    async deleteChat(chatId: MongooseIDType): Promise<void> {
        await baseChatUrl.delete(`/${chatId}`);
    },

    async changeTitle(chatId: MongooseIDType, title: string): Promise<AxiosResponse<IChat, any>> {
        return await baseChatUrl.patch(`/title/${chatId}`, {
            data: {
                title
            }
        })
    },

    async addMember(chatId: MongooseIDType, userId: MongooseIDType): Promise<AxiosResponse<IChat, any>> {
        return await baseChatUrl.patch('/member/add', {
            data: {
                chatId,
                userId
            }
        })
    },

    async removeMember(chatId: MongooseIDType, userId: MongooseIDType): Promise<AxiosResponse<IChat, any>> {
        return await baseChatUrl.patch('/member/remove', {
            data: {
                chatId,
                userId
            }
        })
    }
}