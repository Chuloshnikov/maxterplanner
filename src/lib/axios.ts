import axios from "axios";

const BASE_URL = process.env.BACKEND_URL as string;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // put cockie in every single request
});