import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

export const api = axios.create({
    baseURL: HTTP_BACKEND_URL,
    withCredentials: true
});