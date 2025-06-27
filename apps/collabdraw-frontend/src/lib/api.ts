import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

export const api = axios.create({
    baseURL: HTTP_BACKEND_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);