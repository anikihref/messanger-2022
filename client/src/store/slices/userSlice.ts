import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './../../types/user';

const initialState: IUser | null = null;

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        // todo: fetch, changeAvatar, changeName, addFriend, removeFriend, createChat
    }
});