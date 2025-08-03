"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/auth/client";

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ["authUser"],
    queryFn: api.checkAuth,
    retry: false,
    // Use the initial data from the query client to avoid unnecessary requests
    initialData: () => queryClient.getQueryData(['authUser']),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 60 * 1000, // 1 hour
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