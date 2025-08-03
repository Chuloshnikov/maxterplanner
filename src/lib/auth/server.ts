import { cookies } from "next/headers";



export async function getServerAuthUser() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");
  
  // Если токена нет, сразу возвращаем null
  if (!jwt) return null;

  // Проверяем аутентификацию с кэшированием
  const res = await fetch(`${process.env.BACKEND_URL}/auth/check`, {
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
    credentials: "include",
    next: { revalidate: 300 } // Кэшируем на 5 минут (300 секунд)
  });

  if (!res.ok) return null;
  return res.json();
}



export async function serverSignUp(data: { username: string; email: string; password: string }) {
  const res = await fetch(`${process.env.BACKEND_URL}/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Registration failed");

  return res.json();
}


export async function serverSignIn(data: { email: string; password: string }) {
  const res = await fetch(`${process.env.BACKEND_URL}/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}


export async function serverSignOut() {
  const cookieHeader = cookies().toString();

  const res = await fetch(`${process.env.BACKEND_URL}/auth/sign-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");

  return res.json();
}