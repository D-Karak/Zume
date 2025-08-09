"use client"

import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Monitor, Bell, User, Settings, LogOut, Palette } from 'lucide-react'
import { UserButton } from "@clerk/nextjs"
// import { useTheme } from "next-themes"

export function Navbar() {
  // const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-end">
      <div className="flex items-center gap-4">
        {/* Theme Switcher
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4">
              <h4 className="font-medium mb-2">Notifications</h4>
              <div className="space-y-2">
                <div className="text-sm p-2 bg-muted rounded">
                  New job match found for Frontend Developer
                </div>
                <div className="text-sm p-2 bg-muted rounded">
                  Application status updated for Tech Corp
                </div>
                <div className="text-sm p-2 bg-muted rounded">
                  Resume viewed 5 times this week
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Details */}
        <UserButton/>
      </div>
    </header>
  )
}
