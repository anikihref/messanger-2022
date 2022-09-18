import { baseURL, URLs } from './index';
import axios from "axios";

export const userApi = axios.create({
    baseURL: baseURL + URLs.User
});


