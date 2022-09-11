import { IChat } from './../../types/chat';
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
    chats: IChat[] | null,
    selectedChat: IChat | null
}

const initialState: InitialStateProps = {
    chats: null,
    selectedChat: null
};

export const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        // todo: fetch, leave, delete, addUser, removeUser, clearHistory
    }
});
