import { MongooseIDType } from './../../types/index';
import { messageApi } from './../../api/messageApi';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchMessages = createAsyncThunk(
    'message/fetchAll', 
    async (payload: {
        chatId: MongooseIDType,
        limit: number,
        from?: number
    }) => {
        const response = await messageApi.getAllChatMessages(payload.chatId, payload.limit, payload.from);
        return response.data;
    }
);