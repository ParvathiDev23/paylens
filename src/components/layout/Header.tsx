import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { Search, User, Menu, BarChart } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/salaries" className="transition-colors hover:text-primary text-foreground/80">Salaries</Link>
            <Link href="/levels" className="transition-colors hover:text-primary text-foreground/80">Levels Map</Link>
            <Link href="/compare" className="transition-colors hover:text-primary text-foreground/80">Compare</Link>
            <Link href="/calculator" className="transition-colors hover:text-primary text-foreground/80">Calculator</Link>
            <Link href="/trends" className="transition-colors hover:text-primary text-foreground/80">Trends</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search companies, roles..."
              className="h-9 w-64 rounded-md border border-border bg-muted/50 px-8 text-sm outline-none transition-colors focus:border-primary focus:bg-background"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/submit" className="hidden lg:inline-flex h-9 items-center justify-center rounded-md border border-primary text-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 mr-2">
              Submit Salary
            </Link>
            <Link href="/auth/login" className="hidden sm:inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
              Log in
            </Link>
            <Link href="/auth/signup" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Sign up
            </Link>
            <button className="md:hidden ml-2 flex h-9 w-9 items-center justify-center rounded-md border border-border">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
