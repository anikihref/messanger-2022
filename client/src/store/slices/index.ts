import { chatMessageSlice } from './chatMessageSlice';
import { chatSlice } from './chatSlice';
import { userSlice } from './userSlice';
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    chatMessage: chatMessageSlice.reducer,
    user: userSlice.reducer,
    chat: chatSlice.reducer
});
