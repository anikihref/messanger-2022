import { URLs, baseURL } from './index';
import axios from "axios";

export const messageApi = axios.create({
    baseURL: baseURL + URLs.Message
})