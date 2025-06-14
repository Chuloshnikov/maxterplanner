import { axiosInstance } from "../axios";

export type TaskPayload = {
  title: string;
  description?: string;
};

export const createTask = async (data: TaskPayload) => {
  const res = await axiosInstance.post("/tasks", data);
  return res.data;
};

export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};