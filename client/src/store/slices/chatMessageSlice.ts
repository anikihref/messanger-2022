import { IChatMessage } from './../../types/chatMessage';
import { createSlice } from "@reduxjs/toolkit";

const initialState: IChatMessage[] | null = null

export const chatMessageSlice = createSlice({
    initialState,
    name: 'chatMessage',
    reducers: {
        // todo: fetch, delete, edit, like
    }
});
