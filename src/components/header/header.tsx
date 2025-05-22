import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toogle";
import LogoLink from "@/components/logo/logo-link";
import { Button } from "../ui/button";


const Header = () => {
  return (
    <div className="w-full sticky">
      <div className="py-4 px-2 flex items-center justify-between">
       <LogoLink link={"/"}/>
        <div className="flex gap-2 items-center">
          <Button className="maxter-bg">
              <Link href={"/login"}
                className="maxter-bg px-4 py-2 rounded-md transition duration-200 ease-in-out">
                Login
              </Link>
          </Button>
        <ThemeToggle/>
        </div>
       
      </div>
      
    </div>
  )
}

export default Header;