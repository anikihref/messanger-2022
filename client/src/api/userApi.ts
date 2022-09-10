import axios from "axios";

export const chatApiBase = axios.create({
    baseURL: 'http://localhost:5000/user'
});
