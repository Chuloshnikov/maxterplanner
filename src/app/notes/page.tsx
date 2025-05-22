"use client";

import { useAuthUser } from "@/hooks/useAuth";

export default function Notes() {
  const { user, isLoading } = useAuthUser();

  if (isLoading) return <p>Загрузка...</p>;
  if (!user) return <p>Вы не авторизованы</p>;

  return <h1>Привет, {user.fullName}</h1>;
}