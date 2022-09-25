import { MongooseIDType } from './../../types/index';
import { chatApi } from './../../api/chatApi';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchChats = createAsyncThunk(
    'chat/fetchAll', 
    async (payload: {userId: MongooseIDType, limit: number}) => {
        const response = await chatApi.getAllChats(payload.userId, payload.limit)
        return response.data;
    }
);