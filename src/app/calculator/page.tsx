"use client";

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Calculator, DollarSign, MapPin, Receipt, PieChart, ShieldAlert } from 'lucide-react';

export default function CalculatorPage() {
  const [income, setIncome] = useState<number>(180000);
  const [location, setLocation] = useState<string>('california');
  const [filingStatus, setFilingStatus] = useState<string>('single');

  // Extremely simplified mock tax calculation for demonstration purposes
  // In a real app, this would use a robust tax API or comprehensive tables
  const calculateTaxes = () => {
    let federalRate = 0;
    let stateRate = 0;
    
    // Rough federal tax brackets (simplified)
    if (income > 200000) federalRate = 0.24;
    else if (income > 100000) federalRate = 0.20;
    else if (income > 50000) federalRate = 0.15;
    else federalRate = 0.10;
    
    if (filingStatus === 'married') federalRate -= 0.03; // Marriage benefit simplified

    // Rough state tax rates
    switch (location) {
      case 'california': stateRate = 0.08; break;
      case 'new-york': stateRate = 0.06; break;
      case 'texas': stateRate = 0.0; break;
      case 'florida': stateRate = 0.0; break;
      case 'washington': stateRate = 0.0; break;
      case 'india': // Special case for India CTC roughly
        federalRate = 0.30;
        stateRate = 0;
        break;
      default: stateRate = 0.04;
    }

    const federalTax = income * federalRate;
    const stateTax = income * stateRate;
    const ficaTax = income * 0.0765; // Social Security + Medicare
    
    let totalTax = federalTax + stateTax;
    if (location !== 'india') totalTax += ficaTax;
    
    const takeHome = income - totalTax;
    
    return {
      federalTax,
      stateTax,
      ficaTax: location !== 'india' ? ficaTax : 0,
      totalTax,
      takeHome,
      effectiveRate: (totalTax / income) * 100
    };
  };

  const results = calculateTaxes();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Take-Home Pay Calculator</h1>
        <p className="text-muted-foreground mt-2">
          $200k in California is not the same as $200k in Texas. Estimate your true take-home pay after taxes to make accurate comparisons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" /> Input Details
            </h2>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Annual Gross Income (Base + Bonus)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="number" 
                    value={income || ''}
                    onChange={(e) => setIncome(Number(e.target.value) || 0)}
                    className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 text-base outline-none focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 text-base outline-none focus:border-primary appearance-none"
                  >
                    <option value="california">California, USA</option>
                    <option value="new-york">New York, USA</option>
                    <option value="texas">Texas, USA (No state tax)</option>
                    <option value="washington">Washington, USA (No state tax)</option>
                    <option value="florida">Florida, USA (No state tax)</option>
                    <option value="other-us">Other US State</option>
                    <option value="india">India</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Filing Status</label>
                <select 
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value)}
                  className="w-full h-10 rounded-md border border-border bg-background px-4 text-base outline-none focus:border-primary"
                >
                  <option value="single">Single</option>
                  <option value="married">Married / Joint</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-lg flex gap-3 text-warning-foreground text-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 text-warning" />
              <p>
                <strong>Estimates Only:</strong> This calculator provides rough estimates for comparison purposes. It does not account for local city taxes, complex deductions, or equity vesting tax implications. Consult a tax professional for actual tax advice.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
            <div className="bg-primary p-6 text-primary-foreground text-center">
              <h2 className="text-lg font-medium opacity-90">Estimated Net Take-Home Pay</h2>
              <div className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">
                {formatCurrency(results.takeHome, location === 'india' ? 'INR' : 'USD')}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium">
                <div className="bg-primary-foreground/20 px-3 py-1.5 rounded-full">
                  Monthly: {formatCurrency(results.takeHome / 12, location === 'india' ? 'INR' : 'USD')}
                </div>
                <div className="bg-primary-foreground/20 px-3 py-1.5 rounded-full">
                  Bi-Weekly: {formatCurrency(results.takeHome / 26, location === 'india' ? 'INR' : 'USD')}
                </div>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-muted-foreground" /> Tax Breakdown
              </h3>
              
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Gross Income</span>
                  <span className="font-semibold">{formatCurrency(income, location === 'india' ? 'INR' : 'USD')}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 text-destructive/80">
                  <span>Federal Income Tax</span>
                  <span>- {formatCurrency(results.federalTax, location === 'india' ? 'INR' : 'USD')}</span>
                </div>
                
                {results.stateTax > 0 && (
                  <div className="flex justify-between items-center py-2 text-destructive/80">
                    <span>State Income Tax</span>
                    <span>- {formatCurrency(results.stateTax, location === 'india' ? 'INR' : 'USD')}</span>
                  </div>
                )}
                
                {results.ficaTax > 0 && (
                  <div className="flex justify-between items-center py-2 text-destructive/80">
                    <span>FICA (Social Security & Medicare)</span>
                    <span>- {formatCurrency(results.ficaTax, location === 'india' ? 'INR' : 'USD')}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-4 border-t border-border mt-4 font-bold text-lg">
                  <span>Net Take-Home Pay</span>
                  <span className="text-primary">{formatCurrency(results.takeHome, location === 'india' ? 'INR' : 'USD')}</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 bg-muted rounded-full flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Effective Tax Rate</div>
                  <div className="text-2xl font-bold">{results.effectiveRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    You keep {((results.takeHome / income) * 100).toFixed(1)}% of your gross income.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
