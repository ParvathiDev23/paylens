"use client";

import { useState } from 'react';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import { Plus, X, ArrowRight, DollarSign, Briefcase, Building } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

type Offer = {
  id: string;
  company: string;
  role: string;
  base: number;
  equity: number;
  bonus: number;
};

export default function ComparePage() {
  const [offers, setOffers] = useState<Offer[]>([
    { id: '1', company: 'Company A', role: 'Software Engineer', base: 150000, equity: 50000, bonus: 15000 },
    { id: '2', company: 'Company B', role: 'Senior Engineer', base: 165000, equity: 30000, bonus: 20000 },
  ]);

  const handleUpdate = (id: string, field: keyof Offer, value: string | number) => {
    setOffers(offers.map(offer => {
      if (offer.id === id) {
        return { ...offer, [field]: typeof value === 'string' && field !== 'company' && field !== 'role' ? Number(value) || 0 : value };
      }
      return offer;
    }));
  };

  const addOffer = () => {
    if (offers.length >= 4) return;
    setOffers([...offers, { 
      id: Date.now().toString(), 
      company: `Company ${String.fromCharCode(65 + offers.length)}`, 
      role: 'Role', 
      base: 0, equity: 0, bonus: 0 
    }]);
  };

  const removeOffer = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  const chartData = offers.map(offer => ({
    name: offer.company || 'Unknown',
    Base: offer.base,
    Equity: offer.equity,
    Bonus: offer.bonus,
    Total: offer.base + offer.equity + offer.bonus
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card text-card-foreground border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            {payload.map((entry: any) => (
              <p key={entry.name} style={{ color: entry.color }}>
                {entry.name}: {formatCurrency(entry.value, 'USD')}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Multi-Offer Comparison</h1>
        <p className="text-muted-foreground mt-2">
          Compare total compensation structures across multiple job offers. Evaluate the mix of base, bonus, and equity to find the best overall package.
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {offers.map((offer, index) => (
          <div key={offer.id} className="bg-card border border-border rounded-xl shadow-sm relative overflow-hidden">
            <div className="bg-muted/50 p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold">Offer {index + 1}</h3>
              {offers.length > 1 && (
                <button onClick={() => removeOffer(offer.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground/80 flex items-center gap-1">
                  <Building className="h-3 w-3" /> Company
                </label>
                <input 
                  type="text" 
                  value={offer.company}
                  onChange={(e) => handleUpdate(offer.id, 'company', e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground/80 flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> Role
                </label>
                <input 
                  type="text" 
                  value={offer.role}
                  onChange={(e) => handleUpdate(offer.id, 'role', e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 border-t border-border">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-foreground/80 flex justify-between mb-1">
                      <span>Base Salary</span>
                      <span className="text-muted-foreground">{formatCompactNumber(offer.base)}</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="number" 
                        value={offer.base || ''}
                        onChange={(e) => handleUpdate(offer.id, 'base', e.target.value)}
                        className="w-full h-8 rounded-md border border-border bg-background pl-8 pr-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-foreground/80 flex justify-between mb-1">
                      <span>Annual Equity</span>
                      <span className="text-muted-foreground">{formatCompactNumber(offer.equity)}</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="number" 
                        value={offer.equity || ''}
                        onChange={(e) => handleUpdate(offer.id, 'equity', e.target.value)}
                        className="w-full h-8 rounded-md border border-border bg-background pl-8 pr-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-foreground/80 flex justify-between mb-1">
                      <span>Target Bonus</span>
                      <span className="text-muted-foreground">{formatCompactNumber(offer.bonus)}</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="number" 
                        value={offer.bonus || ''}
                        onChange={(e) => handleUpdate(offer.id, 'bonus', e.target.value)}
                        className="w-full h-8 rounded-md border border-border bg-background pl-8 pr-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold">Total Comp</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(offer.base + offer.equity + offer.bonus, 'USD')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {offers.length < 4 && (
          <button 
            onClick={addOffer}
            className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-primary/50 transition-all min-h-[400px]"
          >
            <div className="bg-background rounded-full p-3 shadow-sm mb-4">
              <Plus className="h-6 w-6" />
            </div>
            <span className="font-medium">Add Another Offer</span>
            <span className="text-xs mt-2 text-center">Compare up to 4 offers side by side</span>
          </button>
        )}
      </div>

      {/* Analysis Section */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-8">Offer Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--muted-foreground)' }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                <YAxis tickFormatter={(value) => formatCompactNumber(value)} tick={{ fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.4 }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Base" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Equity" stackId="a" fill="#a78bfa" />
                <Bar dataKey="Bonus" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            <div className="space-y-4">
              {(() => {
                const sortedByTotal = [...offers].sort((a, b) => (b.base + b.equity + b.bonus) - (a.base + a.equity + a.bonus));
                const sortedByBase = [...offers].sort((a, b) => b.base - a.base);
                const highestTotal = sortedByTotal[0];
                const lowestTotal = sortedByTotal[sortedByTotal.length - 1];
                const highestBase = sortedByBase[0];
                
                const totalDiff = (highestTotal.base + highestTotal.equity + highestTotal.bonus) - (lowestTotal.base + lowestTotal.equity + lowestTotal.bonus);
                const baseDiff = highestBase.base - sortedByBase[sortedByBase.length - 1].base;
                
                return (
                  <>
                    <div className="flex gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="bg-primary/20 p-2 rounded-full h-fit text-primary shrink-0">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Highest Total Compensation</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong className="text-foreground">{highestTotal.company}</strong> offers the best overall package at <strong>{formatCurrency(highestTotal.base + highestTotal.equity + highestTotal.bonus, 'USD')}</strong>, which is {formatCurrency(totalDiff, 'USD')} more than your lowest offer.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      <div className="bg-emerald-500/20 p-2 rounded-full h-fit text-emerald-600 dark:text-emerald-400 shrink-0">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Highest Base Salary (Cash)</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong className="text-foreground">{highestBase.company}</strong> offers the most guaranteed liquid cash at <strong>{formatCurrency(highestBase.base, 'USD')}</strong>. If immediate cash flow is your priority, this offer gives you {formatCurrency(baseDiff, 'USD')} more base pay than the lowest alternative.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 rounded-lg bg-muted border border-border">
                      <div className="bg-background border border-border p-2 rounded-full h-fit text-muted-foreground shrink-0">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Negotiation Leverage</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You can use the <strong>{formatCurrency(highestTotal.base + highestTotal.equity + highestTotal.bonus, 'USD')}</strong> offer from {highestTotal.company} as leverage to negotiate better terms with other companies you might prefer culturally.
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
