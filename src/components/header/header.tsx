import Link from "next/link";
import ThemeToggle from "../theme/theme-toogle";


const Header = () => {
  return (
    <div className="w-full sticky">
      <div className="py-4 px-2 flex items-center justify-between">
        <h1 className="text-4xl font-bold flex flex-col">
            <div className="text-2xl md:text-4xl font-bold">
                Ma<span className="maxter-text">X</span>ter
            </div>
            <div className="-mt-3 text-xl md:text-3xl">
                Planner
            </div>
        </h1>
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