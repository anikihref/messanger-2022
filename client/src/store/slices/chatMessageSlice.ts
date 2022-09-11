import { IChatMessage } from './../../types/chatMessage';
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
    chats: IChatMessage[] | null,
    selectedChat: IChatMessage | null
}

const initialState: InitialStateProps = {
    chats: null,
    selectedChat: null
}

export const chatMessageSlice = createSlice({
    initialState,
    name: 'chatMessage',
    reducers: {
        // todo: fetch, delete, edit, like
    }
});
