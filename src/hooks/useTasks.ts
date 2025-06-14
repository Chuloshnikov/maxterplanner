import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as taskApi from "@/lib/tasks/client";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};