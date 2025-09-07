"use client"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggleButton from "../ui/themeToggleButton"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
interface NavbarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export function Navbar({ isCollapsed, setIsCollapsed }: NavbarProps) {
  const { user } = useUser();
  return (
    <header className="h-16 border-b bg-card px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm bg-background/80">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
       
      <div className="p-0 m-0 "><span className="text-[20px] font-bold sm:font-semibold text-teal-900 dark:text-foreground">Hi, {user?.firstName}</span></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <ThemeToggleButton/>

        {/* Account Details */}
        <UserButton/>
      </div>
    </header>
  )
}