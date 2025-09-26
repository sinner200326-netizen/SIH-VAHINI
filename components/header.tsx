"use client"

import { Search, Bell, Download, RefreshCw, Sun, Moon, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
  selectedRegion: string
  onRegionChange: (region: string) => void
}

export function Header({ selectedRegion, onRegionChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Vahini</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">LT Monitoring</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search lines, stations, alerts..." className="pl-10 w-80" />
        </div>

        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="w-40 text-gray-900 dark:text-gray-100">
            <SelectValue className="text-gray-900 dark:text-gray-100" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-gray-900 dark:text-gray-100">
              All Regions
            </SelectItem>
            <SelectItem value="north" className="text-gray-900 dark:text-gray-100">
              North Region
            </SelectItem>
            <SelectItem value="east" className="text-gray-900 dark:text-gray-100">
              East Region
            </SelectItem>
            <SelectItem value="south" className="text-gray-900 dark:text-gray-100">
              South Region
            </SelectItem>
            <SelectItem value="west" className="text-gray-900 dark:text-gray-100">
              West Region
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Last updated: 2 min ago</span>
          <RefreshCw className="w-4 h-4" />
        </div>

        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>

        <Button variant="ghost" size="icon">
          <Download className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          )}
          <span className="sr-only text-gray-900 dark:text-gray-100">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-white bg-blue-600">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-left hidden md:block">
                <div className="font-medium text-gray-900 dark:text-white">{user?.name || 'Admin User'}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs capitalize">{user?.role || 'Administrator'}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
