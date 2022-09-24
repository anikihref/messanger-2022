import { userSlice } from './../slices/userSlice';
import { IUser } from '../../types/user';
import { userApi } from './../../api/userApi';
import { AppDispatch } from './../../types/store';


export const fetchUser = (email: string) => async (dispatch: AppDispatch) => {
    try {
        const {data: user} = await userApi.get<IUser>(`?searchType=email&value=${email}`);
        if (!user) return;
        dispatch(userSlice.actions.auth(user));
    } catch (error: any) {
        dispatch(userSlice.actions.setError(error.message))
        console.log(error)
    }
} 