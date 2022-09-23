import { IChat } from './../../types/chat';
import { chatApi } from './../../api/chatApi';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchChats = createAsyncThunk(
    'chat/fetchAll', 
    async (userId) => {
        const response = await chatApi.get<IChat[]>(`/${userId}`);
        return response.data;
    }
);