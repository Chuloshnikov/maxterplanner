import axios from "axios";

//const BASE_URL = process.env.BACKEND_URL as string;

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true // put cockie in every single request
});