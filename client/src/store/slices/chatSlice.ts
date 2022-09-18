import { fetchChats } from './../actions/fetchChats';
import { MongooseIDType } from './../../types/index';
import { IChat } from './../../types/chat';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
    chats: IChat[],
    error: string,
    isLoading: boolean,
    selectedChat: IChat | null
}

const initialState: InitialStateProps = {
    chats: [],
    isLoading: false,
    error: '',
    selectedChat: null
};

export const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        delete(state, action: PayloadAction<MongooseIDType>) {
            state.chats = state.chats.filter(chat => chat.id !== action.payload)
        },

        addUser(state, action: PayloadAction<{chatId: MongooseIDType; userId: MongooseIDType}>) {
            const chat = state.chats.find(chat => chat.id === action.payload.chatId);

            chat?.members.push(action.payload.userId);
        },

        removeUser(state, action: PayloadAction<{chatId: MongooseIDType; userId: MongooseIDType}>) {
            const chat = state.chats.find(chat => chat.id === action.payload.chatId);
            if (!chat) return;
            chat.members = chat.members.filter(userId => userId !== action.payload.userId)
        },

        changeTitle(state, action: PayloadAction<{chatId: MongooseIDType; title: string}>) {
            const chat = state.chats.find(chat => chat.id === action.payload.chatId);
            if (!chat) return;
            chat.title = action.payload.title;
        },
        select(state, action: PayloadAction<IChat>) {
            state.selectedChat = action.payload;
        }
    },
    extraReducers: {
        [fetchChats.fulfilled.type]: (state, action: PayloadAction<IChat[]>) => {
            state.isLoading = false;
            state.error = '';
            state.chats = action.payload;
        },
        [fetchChats.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [fetchChats.pending.type]: (state) => {
            state.isLoading = true;
        }
    }
});
