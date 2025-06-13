'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PlatformNavigation = () => {
  const pathname = usePathname();

  // Функция для проверки, активен ли путь
  const isActive = (path: string) => pathname === path;

  return (
    <div className="border-b backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">

            <Button
              variant="ghost"
              className={isActive('/account') ? 'maxter-text bg-blue-50' : 'text-slate-600'}
            >
              <Link href="/account">Notes</Link>
            </Button>

            <Button
              variant="ghost"
              className={isActive('/projects') ? 'maxter-text bg-blue-50' : 'text-slate-600'}
            >
              <Link href="/projects">Projects</Link>
            </Button>

            <Button
              variant="ghost"
              className={isActive('/calendar') ? 'maxter-text bg-blue-50' : 'text-slate-600'}
            >
              <Link href="/calendar">Сalendar</Link>
            </Button>

            <Button
              variant="ghost"
              className={isActive('/team') ? 'maxter-text bg-blue-50' : 'text-slate-600'}
            >
              <Link href="/team">Team</Link>
            </Button>

          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Пользователь" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Max Ch</p>
                  <p className="text-xs leading-none text-muted-foreground">alex@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Exit</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default PlatformNavigation;