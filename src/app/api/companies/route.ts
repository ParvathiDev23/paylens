import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    let whereClause = {};
    
    if (search) {
      whereClause = {
        name: {
          contains: search,
          mode: 'insensitive',
        }
      };
    }
    
    const companies = await prisma.company.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: { salaryEntries: true }
        }
      }
    });
    
    return NextResponse.json({ data: companies });
  } catch (error) {
    console.error('Failed to fetch companies:', error);
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}
