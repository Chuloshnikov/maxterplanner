import { cookies } from "next/headers";

export async function checkAuth() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    }
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}