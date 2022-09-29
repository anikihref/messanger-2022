import { fetchMessages } from './../actions/fetchMessages';
import { IChatMessage } from './../../types/chatMessage';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MongooseIDType } from '../../types';

interface InitialStateProps {
    messages: IChatMessage[],
    isLoading: boolean,
    error: string,
    selectedMessage: IChatMessage | null
}

const initialState: InitialStateProps = {
    messages: [],
    isLoading: false,
    error: '',
    selectedMessage: null
}

export const chatMessageSlice = createSlice({
    initialState,
    name: 'chatMessage',
    reducers: {
        delete(state, action: PayloadAction<MongooseIDType>) {
            state.messages = state.messages.filter(message => message.id !== action.payload)
        },

        edit(state, action: PayloadAction<{messageId: MongooseIDType, content: string}>) {
            const message = state.messages.find(message => message.id === action.payload.messageId);

            if (!message) return;

            message.content = action.payload.content;
        },
        
        select(state, action: PayloadAction<IChatMessage>) {
            state.selectedMessage = action.payload;
        },

        addMessage(state, action: PayloadAction<IChatMessage>) {
            state.messages.push(action.payload)
        },

        reset(state) {
            state.messages = [];
        }
    },
    extraReducers: {
        [fetchMessages.fulfilled.type]: (state, action: PayloadAction<IChatMessage[]>) => {
            state.isLoading = false;
            state.error = '';
            state.messages = [...action.payload, ...state.messages]
        },
        [fetchMessages.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [fetchMessages.pending.type]: (state) => {
            state.isLoading = true;
        }
    }
});
