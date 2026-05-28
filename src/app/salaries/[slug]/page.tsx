import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import CompensationChart from '@/components/ui/CompensationChart';
import { Building2, MapPin, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      levels: {
        orderBy: { seniorityRank: 'asc' }
      },
      salaryEntries: {
        include: { level: true },
        orderBy: { totalCompensation: 'desc' }
      }
    }
  });

  if (!company) {
    notFound();
  }

  // Aggregate data for chart
  const levelDataMap = new Map();
  
  company.salaryEntries.forEach(entry => {
    const levelCode = entry.level.internalCode;
    if (!levelDataMap.has(levelCode)) {
      levelDataMap.set(levelCode, {
        name: levelCode,
        count: 0,
        baseSalary: 0,
        equity: 0,
        bonus: 0,
        totalCompensation: 0,
        currency: entry.currency,
        rank: entry.level.seniorityRank
      });
    }
    
    const data = levelDataMap.get(levelCode);
    data.count += 1;
    data.baseSalary += entry.baseSalary;
    data.equity += entry.equity;
    data.bonus += entry.bonus;
    data.totalCompensation += entry.totalCompensation;
  });

  // Calculate averages
  const chartData = Array.from(levelDataMap.values())
    .sort((a, b) => a.rank - b.rank)
    .map(data => ({
      name: data.name,
      baseSalary: Math.round(data.baseSalary / data.count),
      equity: Math.round(data.equity / data.count),
      bonus: Math.round(data.bonus / data.count),
      totalCompensation: Math.round(data.totalCompensation / data.count),
      currency: data.currency
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Company Header */}
      <div className="bg-card border border-border rounded-xl p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{company.name}</h1>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {company.industry}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {company.headquarters}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {company.size.charAt(0) + company.size.slice(1).toLowerCase()} Size
              </div>
              {company.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4" /> 
                  <a href={company.website} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end bg-muted/30 p-4 rounded-lg border border-border">
            <span className="text-sm text-muted-foreground mb-1">Data Points</span>
            <span className="text-2xl font-bold">{company.salaryEntries.length}</span>
          </div>
        </div>
      </div>

      {/* Compensation Chart */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Average Compensation by Level</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {chartData.length > 0 ? (
            <CompensationChart data={chartData} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">Not enough data to display chart</div>
          )}
        </div>
      </div>

      {/* Level Structure */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Level Mapping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {company.levels.map(level => (
            <div key={level.id} className="bg-card border border-border rounded-lg p-5 flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">{level.internalCode}</div>
                <div className="text-sm text-muted-foreground">{level.title}</div>
              </div>
              <div className="text-xs font-medium bg-muted px-2 py-1 rounded-md text-foreground/80">
                {level.track}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Submissions Table */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Salaries</h2>
          <Link href={`/salaries?company=${company.slug}`} className="text-primary hover:underline text-sm font-medium">
            View all →
          </Link>
        </div>
        
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Role & Level</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">Experience</th>
                  <th className="px-6 py-4 font-medium text-right">Total Comp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {company.salaryEntries.slice(0, 10).map(entry => (
                  <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{entry.role}</div>
                      <div className="text-xs text-muted-foreground">{entry.level.internalCode}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{entry.location}</td>
                    <td className="px-6 py-4 text-muted-foreground">{entry.yearsOfExperience} yrs</td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-bold">{formatCurrency(entry.totalCompensation, entry.currency)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
