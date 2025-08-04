import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/auth/server";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerAuthUser();
  
  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}