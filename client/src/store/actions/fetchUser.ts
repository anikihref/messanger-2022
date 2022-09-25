import { userSlice } from './../slices/userSlice';
import { userApi } from './../../api/userApi';
import { AppDispatch } from './../../types/store';


export const fetchUser = (email: string) => async (dispatch: AppDispatch) => {
    try {
        const {data: user} = await userApi.getUser('email', email);
        if (!user) return;
        dispatch(userSlice.actions.auth(user));
    } catch (error: any) {
        dispatch(userSlice.actions.setError(error.message))
        console.log(error)
    }
} 