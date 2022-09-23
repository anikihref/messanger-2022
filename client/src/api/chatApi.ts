import axios from "axios";
import { URLs, baseURL } from './index';

export const chatApi = axios.create({
    baseURL: baseURL + URLs.Chat
});
