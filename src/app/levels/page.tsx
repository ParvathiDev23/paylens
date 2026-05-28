import prisma from '@/lib/db';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function LevelsPage() {
  const companies = await prisma.company.findMany({
    where: {
      levels: { some: {} }
    },
    include: {
      levels: {
        orderBy: { seniorityRank: 'asc' }
      }
    },
    orderBy: { salaryEntries: { _count: 'desc' } },
    take: 4 // Compare top 4 companies for the MVP
  });

  // Group levels by seniority rank (1-10)
  const maxRank = 6; // Standard IC progression for MVP
  const rankRows = [];
  
  for (let i = 2; i <= maxRank; i++) {
    const rowLevels = companies.map(company => {
      const levelAtRank = company.levels.find(l => l.seniorityRank === i && l.track === 'IC');
      return { company, level: levelAtRank };
    });
    
    rankRows.push({
      rank: i,
      levels: rowLevels
    });
  }

  const getRankTitle = (rank: number) => {
    switch(rank) {
      case 2: return "Entry Level";
      case 3: return "Mid-Level";
      case 4: return "Senior";
      case 5: return "Staff";
      case 6: return "Principal";
      default: return `Level ${rank}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Cross-Company Leveling</h1>
        <p className="text-muted-foreground mt-1">Apples-to-apples comparison of engineering levels across top tech companies.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-5 font-semibold text-muted-foreground w-48">Standard Level</th>
                {companies.map(company => (
                  <th key={company.id} className="px-6 py-5 font-bold text-lg">
                    <Link href={`/salaries/${company.slug}`} className="hover:text-primary transition-colors">
                      {company.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rankRows.map(row => (
                <tr key={row.rank} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-8 align-top">
                    <div className="font-bold text-base mb-1">{getRankTitle(row.rank)}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">IC Rank {row.rank}</div>
                  </td>
                  
                  {row.levels.map((item, idx) => (
                    <td key={`${item.company.id}-${row.rank}`} className="px-6 py-8 align-top relative">
                      {idx > 0 && item.level && row.levels[idx-1].level && (
                        <div className="hidden lg:block absolute top-10 -left-6 text-muted-foreground/30">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      )}
                      
                      {item.level ? (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 h-full">
                          <div className="font-bold text-lg text-primary">{item.level.internalCode}</div>
                          <div className="text-sm font-medium mt-1">{item.level.title}</div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center p-4 border border-dashed border-border rounded-lg text-muted-foreground text-sm">
                          No data
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="bg-blue-500/20 p-3 rounded-full text-blue-500 shrink-0">
          <ArrowRight className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">Why Level Mapping Matters</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Job titles are highly inconsistent across companies. A "Senior Software Engineer" at a startup might map to an entry-level position (L3) at Google. Our standardized leveling system ensures you are comparing equivalent roles when negotiating compensation.
          </p>
        </div>
      </div>
    </div>
  );
}
