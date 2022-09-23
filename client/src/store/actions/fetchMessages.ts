import { MongooseIDType } from './../../types/index';
import { messageApi } from './../../api/messageApi';
import { IChatMessage } from './../../types/chatMessage';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchMessages = createAsyncThunk(
    'message/fetchAll', 
    async (payload: {
        chatId: MongooseIDType,
        limit: number
    }) => {
        const response = await messageApi.get<IChatMessage[]>(`/all/${payload.chatId}?limit=${payload.limit}`);
        return response.data;
    }
);