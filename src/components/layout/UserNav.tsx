'use client';

import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { handleSignOut } from '@/app/auth/signout-action';

type UserNavProps = {
  user: {
    name?: string | null;
    email?: string | null;
  };
};

export default function UserNav({ user }: UserNavProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-secondary transition-all"
      >
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
          {initials}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-foreground truncate max-w-[120px]">
          {user.name || user.email}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="p-4 border-b border-border">
            <p className="font-semibold text-sm text-foreground truncate">{user.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="p-2">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-all w-full"
            >
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              My Dashboard
            </Link>
            <form action={handleSignOut}>
              <button
                type="submit"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all w-full"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
