'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCompactNumber } from '@/lib/utils';

export default function SalaryCharts({ salaries }: { salaries: any[] }) {
  // Aggregate data by company
  const companyData = useMemo(() => {
    if (!salaries || salaries.length === 0) return [];
    
    const aggregated: Record<string, any> = {};
    
    salaries.forEach((s) => {
      const compName = s.company.name;
      if (!aggregated[compName]) {
        aggregated[compName] = {
          name: compName,
          totalComp: 0,
          base: 0,
          equity: 0,
          bonus: 0,
          count: 0
        };
      }
      
      aggregated[compName].totalComp += s.totalCompensation;
      aggregated[compName].base += s.baseSalary;
      aggregated[compName].equity += s.equity;
      aggregated[compName].bonus += s.bonus;
      aggregated[compName].count += 1;
    });

    return Object.values(aggregated).map(data => ({
      name: data.name,
      'Total Comp': Math.round(data.totalComp / data.count),
      Base: Math.round(data.base / data.count),
      Equity: Math.round(data.equity / data.count),
      Bonus: Math.round(data.bonus / data.count),
    })).sort((a, b) => b['Total Comp'] - a['Total Comp']);
  }, [salaries]);

  if (companyData.length === 0) {
    return null;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg text-sm">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="flex justify-between gap-4">
              <span>{entry.name}:</span>
              <span className="font-semibold">${formatCompactNumber(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Chart 1: Average Total Compensation */}
      <div className="bg-card border border-border rounded-xl p-5" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.1)' }}>
        <h3 className="font-bold text-lg mb-6">Average Total Compensation</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={companyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
              <YAxis 
                tickFormatter={(val) => `$${formatCompactNumber(val)}`}
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.4 }} />
              <Bar dataKey="Total Comp" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Compensation Breakdown */}
      <div className="bg-card border border-border rounded-xl p-5" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.1)' }}>
        <h3 className="font-bold text-lg mb-6">Compensation Breakdown</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={companyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
              <YAxis 
                tickFormatter={(val) => `$${formatCompactNumber(val)}`}
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.4 }} />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
              <Bar dataKey="Base" stackId="a" fill="var(--chart-1)" radius={[0, 0, 0, 0]} maxBarSize={50} />
              <Bar dataKey="Bonus" stackId="a" fill="var(--chart-2)" radius={[0, 0, 0, 0]} maxBarSize={50} />
              <Bar dataKey="Equity" stackId="a" fill="var(--chart-3)" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
