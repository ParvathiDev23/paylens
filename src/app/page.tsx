import Link from "next/link";
import prisma from "@/lib/db";
import { ArrowRight, Search, Building2, TrendingUp, DollarSign } from "lucide-react";
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
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-[800px]">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Compare compensation <span className="text-primary">intelligently</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Levels matter more than job titles. See true total compensation mapped across companies to make better career decisions.
              </p>
            </div>
            
            <div className="w-full max-w-2xl mt-4">
              <div className="relative flex items-center bg-background rounded-full shadow-sm border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all overflow-hidden p-1.5">
                <div className="pl-4 pr-2 text-muted-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for a company (e.g., Google, TCS, Meta)..." 
                  className="flex-1 h-12 bg-transparent px-2 text-base md:text-lg outline-none placeholder:text-muted-foreground/70"
                />
                <button className="h-12 rounded-full bg-primary text-primary-foreground px-8 font-medium hover:bg-primary/90 transition-colors ml-2">
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm mt-8">
              <span className="text-muted-foreground">Trending:</span>
              {['Google', 'TCS', 'Amazon', 'Meta', 'Stripe'].map(company => (
                <Link key={company} href={`/salaries/${company.toLowerCase()}`} className="px-3 py-1 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer border border-border">
                  {company}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cross-Company Leveling</h3>
              <p className="text-muted-foreground">Apples-to-apples comparison. See how Google's L5 compares to Meta's E5 and Amazon's L6.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Total Compensation</h3>
              <p className="text-muted-foreground">Don't just look at base salary. We break down equity, bonuses, and real purchasing power.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Career Trajectories</h3>
              <p className="text-muted-foreground">See how compensation grows as you advance from entry-level to staff and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="w-full py-12 md:py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Top Companies</h2>
            <Link href="/salaries" className="text-primary hover:underline flex items-center font-medium">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link 
                key={company.id} 
                href={`/salaries/${company.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl">{company.name}</h3>
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {company.industry}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {company.headquarters} • {company.size.charAt(0) + company.size.slice(1).toLowerCase()}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center text-sm">
                  <span className="font-medium">{company._count.salaryEntries} salaries</span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform inline-block">
                    View data →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
