import { IChat } from './../../types/chat';
import { createSlice } from "@reduxjs/toolkit";

const initialState: IChat[] | null = null;

export const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        // todo: fetch, leave, delete, addUser, removeUser, clearHistory
    }
});
