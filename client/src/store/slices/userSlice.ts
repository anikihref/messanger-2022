import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './../../types/user';

interface InitialStateProps {
    user: IUser | null;
    selectedUser: IUser | null;
}

const initialState: InitialStateProps = {
    user: null,
    selectedUser: null
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        // todo: fetch, changeAvatar, changeName, addFriend, removeFriend, createChat
    }
});