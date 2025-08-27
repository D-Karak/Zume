"use client"
import { Menu, X } from "lucide-react"
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
import clsx from "clsx"

interface NavbarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export function Navbar({ isCollapsed, setIsCollapsed }: NavbarProps) {
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
        
        {/* Desktop sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-80">
            <div className="p-3 sm:p-4">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Notifications</h4>
              <div className="space-y-2">
                <div className="text-xs sm:text-sm p-2 bg-muted rounded">
                  New job match found for Frontend Developer
                </div>
                <div className="text-xs sm:text-sm p-2 bg-muted rounded">
                  Application status updated for Tech Corp
                </div>
                <div className="text-xs sm:text-sm p-2 bg-muted rounded">
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