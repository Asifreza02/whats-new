'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, User as UserIcon } from 'lucide-react';

const Header = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <header className="sticky top-0 z-50 bg-slate-200 shadow-md backdrop-blur-sm flex justify-between p-4 md:px-12 border-b border-gray-300">
      {/* Left Side */}
      <div className="flex gap-4 md:gap-12 items-center">
        <Link href="/" className="font-semibold text-lg hover:text-blue-600 transition">
          Home
        </Link>

        <Link href="/explore" className="hover:text-blue-600 transition">
          Explore
        </Link>

        <Link href="/trending" className="flex items-center gap-1 hover:text-blue-600 transition">
          Trending <TrendingUp className="h-4 w-4" />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex ml-10 p-2 gap-2 items-center border border-gray-400 rounded-full bg-white px-4">
          <Search className="h-5 w-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-transparent text-sm w-40"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-6">
        {!isAuthenticated ? (
          <Button onClick={() => signIn()} variant="default">
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <UserIcon className="size-7 text-gray-700 hover:text-blue-600" />
                <span className="hidden md:block font-medium text-gray-700">
                  {session?.user?.name || "Account"}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>
                {session?.user?.name || "My Account"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/saved">Saved</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/liked">Liked</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-500 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
