import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export type TaskPayload = {
  userId?: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  project: "other" | "alpha" | "development" | "marketing" | "docs";
  dueDate: string;
};

export const createTask = async (data: TaskPayload) => {
  const res = await axiosInstance.post("/tasks", data);
  return res.data;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskPayload) => {
      const response = await axiosInstance.post("/tasks", data);
      return response.data;
    },
    onSuccess: () => {
      // chache invalidation to refresh the tasks list
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Task creation failed:", error);
    }
  });
};

export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
};


export const deleteTask = async (id: string) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};