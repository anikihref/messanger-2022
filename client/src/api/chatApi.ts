import axios from "axios";

export const chatApi = axios.create({
    baseURL: 'http://localhost:5000/chat'
});
