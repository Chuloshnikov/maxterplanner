import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toogle";
import LogoLink from "@/components/logo/logo-link";


const Header = () => {
  return (
    <div className="w-full sticky">
      <div className="py-4 px-2 flex items-center justify-between">
       <LogoLink link={"/"}/>
        <div className="flex gap-2 items-center">
          <button>
              <Link href={"/login"}
                className="maxter-bg text-white px-4 py-[11px] rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
                Login
              </Link>
          </button>
        <ThemeToggle/>
        </div>
       
      </div>
      
    </div>
  )
}

export default Header;