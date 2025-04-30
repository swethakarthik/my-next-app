"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, Shield, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

export function UserNav() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Link href="/auth/signin">
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 px-1">
          <User className="h-5 w-5" />
          <span className="text-xs">Sign In</span>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 px-1">
          <Avatar className="h-6 w-6">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
            <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs flex items-center">Me <span className="text-[8px] ml-1">▼</span></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">View Profile</p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-semibold text-xs px-4 py-2">Account</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings & Privacy</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help" className="flex items-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/language" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Language</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-semibold text-xs px-4 py-2">Business</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/business" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Try Premium for free</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/auth/signout" className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 