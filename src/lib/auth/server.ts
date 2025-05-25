import { cookies } from "next/headers";

export async function getServerAuthUser() {
  const cookieStore = await cookies(); // ✅ обязательно await

  const cookieHeader = cookieStore.toString();

  console.log("🍪 cookieHeader:", cookieHeader); // ✅ токен ты уже видишь 👍

  const res = await fetch(`${process.env.BACKEND_URL}/auth/check`, {
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  console.log("🔁 auth check response", res.status);

  if (!res.ok) return null;

  return res.json();
}