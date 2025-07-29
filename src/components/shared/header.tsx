'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, Menu, User } from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/freelancers', label: 'Find Talent' },
  { href: '/jobs', label: 'Find Work' },
  { href: '/skill-suggester', label: 'Improve Profile' },
];

function NavLink({ href, label, onLinkClick }: { href: string; label: string, onLinkClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onLinkClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );
}

function UserNav() {
    const searchParams = useSearchParams();
    const isLoggedIn = searchParams.get('loggedin') === 'true';

    if (!isLoggedIn) {
        return (
            <Button asChild>
                <Link href="/login">
                Login
                <LogIn className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        );
    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
                <AvatarImage src="https://placehold.co/40x40.png" alt="@user" data-ai-hint="person avatar"/>
                <AvatarFallback><User/></AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Guest User</p>
                <p className="text-xs leading-none text-muted-foreground">
                guest@example.com
                </p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
            Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href="/dashboard">Log out</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
}


export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Logo className="mb-8" />
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} onLinkClick={() => setIsSheetOpen(false)} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-1 flex justify-center md:hidden">
          <Logo />
        </div>
        <div className="md:hidden" style={{width: '56px'}}></div> {/* Spacer for mobile right side */}


        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <div className="flex-none">
                <Logo />
            </div>
            
            <nav className="flex-grow flex justify-center items-center gap-6 text-sm">
              {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
              ))}
            </nav>

            <div className="flex-none">
                <UserNav />
            </div>
        </div>
      </div>
    </header>
  );
}
