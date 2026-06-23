import ThemeToggle from "./ThemeToggle"
import Logo from "../core/Logo"
import AppList from "./AppList"
import UserData from "./UserData"

function SideBarMenu() {
  return (
    <div className="w-75 h-screen sticky top-0 flex flex-col border-r border-black/10 dark:border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
        <Logo size="lg"/>
        <ThemeToggle/>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto sleek-scrollbar">
        <AppList/>
        </div>
        <UserData/>
    </div>
  )
}

export default SideBarMenu