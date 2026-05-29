import { Suspense } from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import { Building2, MapPin, Briefcase, Filter } from 'lucide-react';
import SalaryCharts from '@/components/dashboard/SalaryCharts';

export default async function SalariesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const company = params.company as string | undefined;
  const role = params.role as string | undefined;
  const location = params.location as string | undefined;
  
  const whereClause: any = {};
  if (company) whereClause.company = { name: { contains: company, mode: 'insensitive' } };
  if (role) whereClause.role = { contains: role, mode: 'insensitive' };
  if (location) whereClause.location = { contains: location, mode: 'insensitive' };

  const salaries = await prisma.salaryEntry.findMany({
    where: whereClause,
    take: 50,
    orderBy: { totalCompensation: 'desc' },
    include: {
      company: true,
      level: true,
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Salary Explorer</h1>
          <p className="text-muted-foreground mt-1">Browse and filter verified compensation data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border-none rounded-xl p-6" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.1)' }}>
            <div className="flex items-center gap-2 font-semibold mb-4 pb-2 border-b border-border">
              <Filter className="h-4 w-4" /> Filters
            </div>
            
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input 
                    name="company" 
                    defaultValue={company || ''} 
                    placeholder="E.g. Google" 
                    className="w-full h-9 rounded-md border border-border bg-background px-8 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input 
                    name="role" 
                    defaultValue={role || ''} 
                    placeholder="E.g. Software Engineer" 
                    className="w-full h-9 rounded-md border border-border bg-background px-8 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input 
                    name="location" 
                    defaultValue={location || ''} 
                    placeholder="E.g. Seattle" 
                    className="w-full h-9 rounded-md border border-border bg-background px-8 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-primary-foreground h-9 rounded-md font-medium hover:bg-primary/90 transition-colors mt-2">
                Apply Filters
              </button>
              
              {(company || role || location) && (
                <Link href="/salaries" className="block text-center text-sm text-muted-foreground hover:text-foreground mt-2">
                  Clear all
                </Link>
              )}
            </form>
          </div>
        </div>

        {/* Charts & Data Table */}
        <div className="lg:col-span-3">
          
          <SalaryCharts salaries={salaries} />

          <div className="bg-card border-none rounded-xl overflow-hidden" style={{ boxShadow: '0 5px 15px rgba(179,179,191,0.1)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 font-medium">Company & Title</th>
                    <th className="px-6 py-4 font-medium">Level</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium">YoE</th>
                    <th className="px-6 py-4 font-medium text-right">Total Comp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {salaries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        No salaries found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    salaries.map((salary) => (
                      <tr key={salary.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <Link href={`/salaries/${salary.company.slug}`} className="font-semibold text-primary hover:underline block">
                            {salary.company.name}
                          </Link>
                          <span className="text-muted-foreground">{salary.role}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{salary.level.internalCode}</div>
                          <div className="text-xs text-muted-foreground">{salary.level.title}</div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {salary.location}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {salary.yearsOfExperience} yrs
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-bold text-base">{formatCurrency(salary.totalCompensation, salary.currency)}</div>
                          <div className="text-xs text-muted-foreground">
                            Base: {formatCompactNumber(salary.baseSalary)} | Stock: {formatCompactNumber(salary.equity)}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
