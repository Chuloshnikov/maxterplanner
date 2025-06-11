import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/auth/server";
import PlatformNavigation from "@/components/dashboard/platform-navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerAuthUser();
  
  if (!user) {
    redirect("/login");
  }

  return (
    <>
        <PlatformNavigation/>
        {children}
    </>
  );
}