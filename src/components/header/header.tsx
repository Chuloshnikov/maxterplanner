import ThemeToggle from "../theme/theme-toogle";


const Header = () => {
  return (
    <div className="w-full sticky">
      <div className="py-4 px-2 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Maxter Planner</h1>
        <ThemeToggle/>
      </div>
      
    </div>
  )
}

export default Header;