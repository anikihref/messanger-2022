import { MongooseIDType } from './../../types/index';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './../../types/user';

interface InitialStateProps {
    user: IUser | null;
    error: string;
    selectedUser: IUser | null;
}

const initialState: InitialStateProps = {
    user: null,
    error: '',
    selectedUser: null
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        toggleFriend(state, action: PayloadAction<IUser>) {
            const friend = state.user?.friends.find(userFriend => (
                userFriend.id === action.payload.id
            ));

            if (friend && state.user?.friends) {
                state.user.friends = state.user?.friends.filter(userFriend => userFriend.id !== friend.id)
            } else {
                state.user?.friends.push(action.payload)
            }
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        auth(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        select(state, action: PayloadAction<IUser>) {
            state.selectedUser = action.payload;
        },
        resetSelected(state) {
            state.selectedUser = null;
        }
    }
});