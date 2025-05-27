import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toogle";
import LogoLink from "@/components/logo/logo-link";
import { Button } from "../ui/button";
import { SquareUser } from "lucide-react";
import LogOutButton from "./log-out-button";

type Props = {
  authUser: { id: string; email?: string } | null;
};

const Header = ({ authUser }: Props) => {
  return (
    <header className="w-full sticky top-0 z-50 border-b">
      <nav className="py-4 px-2 flex items-center justify-between">
        <LogoLink link={"/"} />

        <div className="flex gap-1 lg:gap-3 items-center">
          {authUser ? (
            <>
              <Link href="/notes" className="maxter-bg px-4 py-1.5 rounded-md text-white">
                Notes
              </Link>
              <Link href="/account" className="maxter-bg px-2 py-1.5 rounded-md text-white">
                <SquareUser/>
              </Link>
              <LogOutButton/>
            </>
          ) : (
            <Button className="maxter-bg px-4 py-2 rounded-md">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;