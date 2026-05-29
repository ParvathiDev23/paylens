import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white" style={{ boxShadow: '0 2px 10px rgba(179,179,191,0.12)' }}>
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">{APP_NAME}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/salaries" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-all">Salaries</Link>
            <Link href="/levels" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-all">Levels</Link>
            <Link href="/compare" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-all">Compare</Link>
            <Link href="/calculator" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-all">Calculator</Link>
            <Link href="/trends" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-all">Trends</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/submit" className="hidden lg:inline-flex h-10 items-center justify-center rounded-lg border-2 border-primary text-primary px-5 text-sm font-bold transition-all hover:bg-primary hover:text-white">
            Submit Salary
          </Link>
          <Link href="/auth/login" className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-all">
            Log in
          </Link>
          <Link href="/auth/signup" className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white transition-all hover:opacity-90" style={{ boxShadow: '0 4px 12px rgba(87,89,255,0.3)' }}>
            Sign up
          </Link>
          <button className="md:hidden ml-1 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary transition-all">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
