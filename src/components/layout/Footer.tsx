import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import { BarChart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BarChart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {APP_DESCRIPTION}
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/salaries" className="text-muted-foreground hover:text-primary transition-colors">Salaries by Company</Link></li>
              <li><Link href="/levels" className="text-muted-foreground hover:text-primary transition-colors">Cross-Company Levels</Link></li>
              <li><Link href="/compare" className="text-muted-foreground hover:text-primary transition-colors">Offer Comparison Tool</Link></li>
              <li><Link href="/calculator" className="text-muted-foreground hover:text-primary transition-colors">Take-Home Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Top Companies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/salaries/google" className="text-muted-foreground hover:text-primary transition-colors">Google Salaries</Link></li>
              <li><Link href="/salaries/meta" className="text-muted-foreground hover:text-primary transition-colors">Meta Salaries</Link></li>
              <li><Link href="/salaries/amazon" className="text-muted-foreground hover:text-primary transition-colors">Amazon Salaries</Link></li>
              <li><Link href="/salaries/tcs" className="text-muted-foreground hover:text-primary transition-colors">TCS Salaries</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/methodology" className="text-muted-foreground hover:text-primary transition-colors">Data Methodology</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
