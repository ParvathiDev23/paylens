import { TrendingUp, ArrowUpRight, ArrowDownRight, LineChart, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function TrendsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Compensation Trends</h1>
        <p className="text-muted-foreground mt-2">
          Market analysis, year-over-year growth, and emerging patterns in tech compensation.
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Software Engineer (L4)</p>
              <h3 className="text-2xl font-bold">$215,000</h3>
            </div>
            <div className="bg-success/10 text-success p-2 rounded-lg flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="font-bold text-sm">3.2%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Year over Year median TC</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Engineering Manager</p>
              <h3 className="text-2xl font-bold">$345,000</h3>
            </div>
            <div className="bg-success/10 text-success p-2 rounded-lg flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="font-bold text-sm">5.1%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Year over Year median TC</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Tech Recruiter</p>
              <h3 className="text-2xl font-bold">$125,000</h3>
            </div>
            <div className="bg-destructive/10 text-destructive p-2 rounded-lg flex items-center">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span className="font-bold text-sm">-4.5%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Year over Year median TC</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <LineChart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">2026 Market Outlook</h2>
            </div>
            
            <div className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                <p className="text-base text-foreground mb-4">
                  The compensation landscape has stabilized following the volatility of 2023-2024. Companies are returning to normalized equity refreshers and base salary bumps, heavily favoring senior ICs and specialized AI roles.
                </p>
                
                <h4 className="text-foreground font-semibold">1. AI Premium is Real but Maturing</h4>
                <p>
                  Engineers with demonstrated production experience in LLMs and AI infrastructure are seeing a 15-20% premium on total compensation compared to generic full-stack roles at the same level. However, simply having "AI" on a resume is no longer sufficient; companies demand deep infrastructural knowledge.
                </p>
                
                <h4 className="text-foreground font-semibold mt-6">2. The "Remote Tax" is Normalizing</h4>
                <p>
                  Companies that implemented strict tier-based location pay are starting to flatten their bands. We see the delta between Tier 1 (SF/NYC) and Tier 2 (Austin/Denver) shrinking from 15% down to roughly 8-10%, as companies compete for talent nationally.
                </p>
                
                <h4 className="text-foreground font-semibold mt-6">3. Equity vs. Cash Shift</h4>
                <p>
                  With public markets stabilizing, candidates are increasingly negotiating for higher equity grants rather than maxing out base salary, a reversal of the cash-heavy preference seen during the downturn.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Hot Markets</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">Artificial Intelligence</span>
                  <span className="text-success font-medium">+18%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">Data Engineering</span>
                  <span className="text-success font-medium">+12%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">Cybersecurity</span>
                  <span className="text-success font-medium">+9%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">Web3 / Crypto</span>
                  <span className="text-destructive font-medium">-5%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-sm">
            <TrendingUp className="h-8 w-8 mb-4 opacity-80" />
            <h3 className="text-lg font-bold mb-2">Want personalized insights?</h3>
            <p className="text-sm opacity-90 mb-4">
              Create an account and submit your compensation data to unlock personalized market valuation and trajectory forecasting.
            </p>
            <Link 
              href="/auth/signup" 
              className="inline-block bg-background text-foreground font-medium px-4 py-2 rounded-md hover:bg-background/90 transition-colors text-sm"
            >
              Unlock Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
