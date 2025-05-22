import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/auth/client";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: api.checkAuth,
    retry: false,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.signOut,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    }
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  });
};