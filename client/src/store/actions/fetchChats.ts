import { MongooseIDType } from './../../types/index';
import { IChat } from './../../types/chat';
import { chatApi } from './../../api/chatApi';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchChats = createAsyncThunk(
    'chat/fetchAll', 
    async (userId: MongooseIDType) => {
        const response = await chatApi.get<IChat[]>(`/all/${userId}`);
        return response.data;
    }
);