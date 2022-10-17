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