import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toogle";
import LogoLink from "@/components/logo/logo-link";
import { Button } from "../ui/button";
import LogOutButton from "./log-out-button";

type Props = {
  authUser: { id: string; email?: string } | null;
};

const Header = ({ authUser }: Props) => {
  return (
    <header className="w-full sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="p-4 flex items-center justify-between">
        <LogoLink link={"/"} />

        <div className="flex gap-1 lg:gap-3 items-center">
          {authUser ? (
            <>
              <Link href="/account" className="maxter-bg px-4 py-1.5 rounded-md text-white">
                Dashboard
              </Link>
              <LogOutButton/>
            </>
          ) : (
            <div className="flex gap-2">
                <Button className="maxter-bg px-4 py-2 rounded-md hidden md:inline">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="maxter-bg px-4 py-2 rounded-md">
                  <Link href="/login">Try for free</Link>
                </Button>
            </div>
          )}

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;