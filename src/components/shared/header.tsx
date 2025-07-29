'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogIn, Menu } from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

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

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        
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

        <div className="flex items-center justify-center md:hidden flex-1">
          <Logo />
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
           <Button asChild>
              <Link href="/login">
                Login
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
           </Button>
        </div>
      </div>
    </header>
  );
}
