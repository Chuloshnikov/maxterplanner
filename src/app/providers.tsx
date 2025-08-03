"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState, type ReactNode } from "react";

import type { AuthUser } from "../../types";

export function Providers({ 
  children,
  initialAuthUser 
}: { 
  children: ReactNode;
  initialAuthUser: AuthUser | null;
}) {
  const [queryClient] = useState(() => new QueryClient());
  

  // Initialize the cache with data from the server
 useEffect(() => {
    queryClient.setQueryData(['authUser'], initialAuthUser);
  }, [initialAuthUser, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}