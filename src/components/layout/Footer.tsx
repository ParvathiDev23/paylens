import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: '#222232' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-white">{APP_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {APP_DESCRIPTION}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/salaries" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Salaries by Company</Link></li>
              <li><Link href="/levels" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Cross-Company Levels</Link></li>
              <li><Link href="/compare" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Offer Comparison</Link></li>
              <li><Link href="/calculator" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Take-Home Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Companies</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/salaries/google" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Google</Link></li>
              <li><Link href="/salaries/meta" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Meta</Link></li>
              <li><Link href="/salaries/amazon" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Amazon</Link></li>
              <li><Link href="/salaries/tcs" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>TCS</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-5 text-white text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>About Us</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
