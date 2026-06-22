import ThemeToggle from "./ThemeToggle"
import Logo from "./Logo"
function SideBarMenu() {
  return (
    <div className="w-75 h-screen border-r border-black/10 dark:border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
        <Logo size="lg"/>
        <ThemeToggle/>
        </div>
    </div>
  )
}

export default SideBarMenu