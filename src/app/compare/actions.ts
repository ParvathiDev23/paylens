'use server';

import prisma from '@/lib/db';

export async function getCompanies() {
  return await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function getCompanyLevels(companySlugs: string[]) {
  if (!companySlugs || companySlugs.length === 0) return [];
  
  const companies = await prisma.company.findMany({
    where: {
      slug: { in: companySlugs }
    },
    include: {
      levels: {
        orderBy: {
          seniorityRank: 'asc'
        }
      }
    }
  });

  return companies;
}
