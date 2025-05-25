import { axiosInstance } from "../axios";

export const signIn = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/sign-in", data);
  return res.data;
};

export const signOut = async () => {
  const res = await axiosInstance.post("/auth/sign-out");
  return res.data;
};

export const signUp = async (data: { username: string; email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/sign-up", data);
  return res.data;
};

export const checkAuth = async () => {
  const res = await axiosInstance.get("/auth/check");
  return res.data;
};