import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";

export default async function NotesLayout({ children }: { children: React.ReactNode }) {
  const user = await checkAuth();

  if (!user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}