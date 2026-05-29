import Link from "next/link";
import prisma from "@/lib/db";
import { ArrowRight, Search, Layers, DollarSign, TrendingUp, Scale, Calculator, BarChart3 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default async function Home() {
  const companies = await prisma.company.findMany({
    take: 6,
    orderBy: { salaryEntries: { _count: 'desc' } },
    include: {
      _count: {
        select: { salaryEntries: true }
      }
    }
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Know your worth.
              <br />
              <span style={{ color: '#5759FF' }}>Compare intelligently.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Levels matter more than job titles. See true total compensation mapped across companies to make better career decisions.
            </p>
            
            <div className="w-full max-w-xl">
              <div className="flex items-center bg-card rounded-xl p-2" style={{ boxShadow: '0 5px 20px rgba(179,179,191,0.25)' }}>
                <div className="pl-4 pr-2 text-muted-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for a company..." 
                  className="flex-1 h-12 bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground/60"
                />
                <button className="h-12 rounded-xl text-white px-8 font-bold text-sm transition-all hover:opacity-90" style={{ backgroundColor: '#5759FF', boxShadow: '0 4px 12px rgba(87,89,255,0.3)' }}>
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['Google', 'TCS', 'Amazon', 'Meta', 'Stripe'].map(company => (
                <Link key={company} href={`/salaries/${company.toLowerCase()}`} className="px-4 py-1.5 bg-card rounded-full text-sm font-medium text-foreground/70 hover:text-primary transition-all" style={{ boxShadow: '0 2px 8px rgba(179,179,191,0.15)' }}>
                  {company}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Everything you need to negotiate smarter</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Stop guessing. Start comparing real data across companies, levels, and locations.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(87,89,255,0.08)' }}>
                <Layers className="h-7 w-7" style={{ color: '#5759FF' }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Cross-Company Leveling</h3>
              <p className="text-muted-foreground leading-relaxed">See how Google's L5 maps to Meta's E5 and Amazon's L6. Apples-to-apples comparison.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(87,89,255,0.08)' }}>
                <DollarSign className="h-7 w-7" style={{ color: '#5759FF' }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Total Compensation</h3>
              <p className="text-muted-foreground leading-relaxed">Base salary is just the start. We break down equity, bonuses, and real purchasing power.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(87,89,255,0.08)' }}>
                <Scale className="h-7 w-7" style={{ color: '#5759FF' }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Multi-Offer Compare</h3>
              <p className="text-muted-foreground leading-relaxed">Got multiple offers? Compare them side by side to find the best overall package.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(87,89,255,0.08)' }}>
                <Calculator className="h-7 w-7" style={{ color: '#5759FF' }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Take-Home Calculator</h3>
              <p className="text-muted-foreground leading-relaxed">$200k in California is not the same as Texas. See what actually hits your bank account.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(87,89,255,0.08)' }}>
                <TrendingUp className="h-7 w-7" style={{ color: '#5759FF' }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Market Trends</h3>
              <p className="text-muted-foreground leading-relaxed">Track compensation trends, hot markets, and year-over-year growth across roles.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(87,89,255,0.08)' }}>
                <BarChart3 className="h-7 w-7" style={{ color: '#5759FF' }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Visual Breakdowns</h3>
              <p className="text-muted-foreground leading-relaxed">Interactive charts showing exactly how companies structure their compensation packages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Ticker */}
      <section className="w-full py-14 overflow-hidden">
        <div className="container mx-auto px-6 mb-8">
          <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Salary data from professionals at
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />
          <div className="flex animate-marquee">
            {[
              { name: 'Google', domain: 'google.com' },
              { name: 'Microsoft', domain: 'microsoft.com' },
              { name: 'Meta', domain: 'meta.com' },
              { name: 'Netflix', domain: 'netflix.com' },
              { name: 'Flipkart', domain: 'flipkart.com' },
              { name: 'Swiggy', domain: 'swiggy.com' },
              { name: 'Zomato', domain: 'zomato.com' },
              { name: 'Infosys', domain: 'infosys.com' },
              { name: 'Deloitte', domain: 'deloitte.com' },
              { name: 'Canva', domain: 'canva.com' },
              { name: 'TCS', domain: 'tcs.com' },
              { name: 'Cognizant', domain: 'cognizant.com' },
              { name: 'Accenture', domain: 'accenture.com' },
              { name: 'EY', domain: 'ey.com' },
              { name: 'Amazon', domain: 'amazon.com' },
              { name: 'Apple', domain: 'apple.com' },
            ].map((company, i) => (
              <div key={`first-${i}`} className="flex items-center gap-3 mx-8 shrink-0">
                <img 
                  src={`https://logo.clearbit.com/${company.domain}`} 
                  alt={company.name}
                  className="h-8 w-8 rounded-md object-contain"
                  loading="lazy"
                />
                <span className="text-sm font-bold text-foreground/50 whitespace-nowrap">{company.name}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { name: 'Google', domain: 'google.com' },
              { name: 'Microsoft', domain: 'microsoft.com' },
              { name: 'Meta', domain: 'meta.com' },
              { name: 'Netflix', domain: 'netflix.com' },
              { name: 'Flipkart', domain: 'flipkart.com' },
              { name: 'Swiggy', domain: 'swiggy.com' },
              { name: 'Zomato', domain: 'zomato.com' },
              { name: 'Infosys', domain: 'infosys.com' },
              { name: 'Deloitte', domain: 'deloitte.com' },
              { name: 'Canva', domain: 'canva.com' },
              { name: 'TCS', domain: 'tcs.com' },
              { name: 'Cognizant', domain: 'cognizant.com' },
              { name: 'Accenture', domain: 'accenture.com' },
              { name: 'EY', domain: 'ey.com' },
              { name: 'Amazon', domain: 'amazon.com' },
              { name: 'Apple', domain: 'apple.com' },
            ].map((company, i) => (
              <div key={`second-${i}`} className="flex items-center gap-3 mx-8 shrink-0">
                <img 
                  src={`https://logo.clearbit.com/${company.domain}`} 
                  alt={company.name}
                  className="h-8 w-8 rounded-md object-contain"
                  loading="lazy"
                />
                <span className="text-sm font-bold text-foreground/50 whitespace-nowrap">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="w-full py-16 md:py-24" style={{ backgroundColor: '#f0f1f7' }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-bold">Top Companies</h2>
            <Link href="/salaries" className="flex items-center font-bold text-sm transition-all hover:opacity-70" style={{ color: '#5759FF' }}>
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link 
                key={company.id} 
                href={`/salaries/${company.slug}`}
                className="group bg-card rounded-2xl p-7 transition-all hover:-translate-y-1"
                style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.15)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-xl">{company.name}</h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(87,89,255,0.08)', color: '#5759FF' }}>
                    {company.industry}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {company.headquarters} -- {company.size.charAt(0) + company.size.slice(1).toLowerCase()}
                </p>
                <div className="flex justify-between items-center text-sm pt-5" style={{ borderTop: '1px solid rgba(179,179,191,0.2)' }}>
                  <span className="font-bold text-foreground">{company._count.salaryEntries} salaries</span>
                  <span className="font-bold group-hover:translate-x-1 transition-transform inline-block" style={{ color: '#5759FF' }}>
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl p-12 md:p-16 text-center text-white" style={{ backgroundColor: '#5759FF', backgroundImage: 'linear-gradient(135deg, #5759FF 0%, #4345d6 100%)' }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Help build salary transparency</h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">Share your compensation anonymously and help others make better career decisions.</p>
            <Link 
              href="/submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-card px-8 font-bold transition-all hover:opacity-90"
              style={{ color: '#5759FF', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
            >
              Submit Your Salary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
