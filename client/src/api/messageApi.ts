import { MongooseIDType } from './../types/index';
import { URLs, baseURL } from './index';
import axios, {AxiosResponse} from "axios";
import { IChatMessage } from '../types/chatMessage';

export const baseMessageUrl = axios.create({
    baseURL: baseURL + URLs.Message
})

export const messageApi = {
    async getMessage(messageId: MongooseIDType): Promise<AxiosResponse<IChatMessage, any>> {
        return await baseMessageUrl.get<IChatMessage>(`/${messageId}`)
    },

    async getAllChatMessages(chatId: MongooseIDType, limit?: number, from?: number): Promise<AxiosResponse<IChatMessage[], any>> {
        return await baseMessageUrl.get<IChatMessage[]>(`/all/${chatId}?limit=${limit}&from=${from}`)
    },

    async deleteAllMessages(chatId: MongooseIDType): Promise<void> {
        await baseMessageUrl.delete(`/all/${chatId}`);
    },

    async deleteMessage(messageId: MongooseIDType): Promise<void>  {
        await baseMessageUrl.delete(`/${messageId}`);
    },

    async createMessage(message: Omit<IChatMessage, 'createdAt' | 'updatedAt' | 'id' | 'creator'> & {creator: string}): Promise<AxiosResponse<IChatMessage, any>> {
        return await baseMessageUrl.post<IChatMessage>('/', {
            data: message
        })
    },

    async editMessage(messageId: MongooseIDType, value: string): Promise<AxiosResponse<IChatMessage, any>> {
        return await baseMessageUrl.patch<IChatMessage>(`/${messageId}`, {
            data: {
                message: value,
            }
        })
    }
}