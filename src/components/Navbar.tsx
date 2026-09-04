"use client"

import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown } from "lucide-react";

export function Navbar() {
  const {user, logout} = useAuth()
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-sw-border backdrop-blur-md bg-sw-bg/80"
    >
      {/* Inner container */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: App Name */}
        <h2 className="text-xl font-heading font-bold tracking-wider text-amber-400">
          STAR WARS EXPLORER
        </h2>

        {/* Right: User Menu */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-2 px-3 py-2 rounded-lg
                         text-sm text-sw-text hover:bg-sw-surface
                         transition-colors outline-none"
            >
              <span>{user.username}</span>
              <ChevronDown className="h-4 w-4 text-sw-text-muted" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-sw-surface border-sw-border"
            >
              <DropdownMenuItem
                onClick={() => logout()}
                className="text-red-400 focus:text-red-400 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  )
}
