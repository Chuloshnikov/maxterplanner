import { cookies } from "next/headers";

export async function getServerAuthUser() {
  const cookieHeader = cookies().toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json"
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}