import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');
    const role = searchParams.get('role');
    const level = searchParams.get('level');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const skip = (page - 1) * limit;
    
    const whereClause: any = {};
    
    if (company) whereClause.company = { slug: company };
    if (role) whereClause.role = { equals: role, mode: 'insensitive' };
    if (level) whereClause.level = { internalCode: level };
    if (location) whereClause.location = { contains: location, mode: 'insensitive' };
    
    const salaries = await prisma.salaryEntry.findMany({
      where: whereClause,
      take: limit,
      skip,
      orderBy: {
        totalCompensation: 'desc'
      },
      include: {
        company: {
          select: { name: true, slug: true, logoUrl: true }
        },
        level: {
          select: { title: true, internalCode: true, track: true }
        }
      }
    });
    
    const totalCount = await prisma.salaryEntry.count({ where: whereClause });
    
    return NextResponse.json({ 
      data: salaries,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch salaries:', error);
    return NextResponse.json({ error: 'Failed to fetch salaries' }, { status: 500 });
  }
}
