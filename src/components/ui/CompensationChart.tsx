"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatCompactNumber, formatCurrency } from '@/lib/utils';
import { CURRENCIES } from '@/lib/constants';

interface CompensationChartProps {
  data: Array<{
    name: string;
    baseSalary: number;
    equity: number;
    bonus: number;
    totalCompensation: number;
    currency?: string;
  }>;
  currency?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const curr = data.currency || 'USD';
    
    return (
      <div className="bg-card text-card-foreground border border-border p-3 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">{label}</p>
        <div className="space-y-1 text-sm">
          <p className="text-[#3b82f6]">
            Base: {formatCurrency(data.baseSalary, curr)}
          </p>
          {data.equity > 0 && (
            <p className="text-[#a78bfa]">
              Equity: {formatCurrency(data.equity, curr)}
            </p>
          )}
          {data.bonus > 0 && (
            <p className="text-[#34d399]">
              Bonus: {formatCurrency(data.bonus, curr)}
            </p>
          )}
          <div className="border-t border-border pt-1 mt-1 font-bold">
            Total: {formatCurrency(data.totalCompensation, curr)}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CompensationChart({ data, currency = 'USD', height = 400 }: CompensationChartProps) {
  if (!data || data.length === 0) return <div className="flex items-center justify-center h-full text-muted-foreground">No data available</div>;

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'var(--muted-foreground)' }} 
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatCompactNumber(value)}
            tick={{ fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.4 }} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="baseSalary" name="Base" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
          <Bar dataKey="equity" name="Equity" stackId="a" fill="#a78bfa" />
          <Bar dataKey="bonus" name="Bonus" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
