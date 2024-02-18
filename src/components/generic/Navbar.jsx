import { ThemeProvider } from "../ui/theme-provider"
import { ModeToggle } from "../ui/mode-toggle"

const NavBar = () => {
  return (
    <div className="w-dvw h-16 border-b-2 border-sky-400 flex flex-row justify-evenly items-center sticky top-0">
      <ThemeProvider>
        <ModeToggle></ModeToggle>
      </ThemeProvider>
    </div>
  )
}

export default NavBar