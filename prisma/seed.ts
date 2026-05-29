import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with mock salary data...');

  // 1. Create Companies
  const google = await prisma.company.upsert({
    where: { slug: 'google' },
    update: {},
    create: {
      name: 'Google',
      slug: 'google',
      industry: 'Technology',
      headquarters: 'Mountain View, CA',
      size: 'ENTERPRISE',
    },
  });

  const microsoft = await prisma.company.upsert({
    where: { slug: 'microsoft' },
    update: {},
    create: {
      name: 'Microsoft',
      slug: 'microsoft',
      industry: 'Technology',
      headquarters: 'Redmond, WA',
      size: 'ENTERPRISE',
    },
  });

  const meta = await prisma.company.upsert({
    where: { slug: 'meta' },
    update: {},
    create: {
      name: 'Meta',
      slug: 'meta',
      industry: 'Technology',
      headquarters: 'Menlo Park, CA',
      size: 'ENTERPRISE',
    },
  });

  const tcs = await prisma.company.upsert({
    where: { slug: 'tcs' },
    update: {},
    create: {
      name: 'TCS',
      slug: 'tcs',
      industry: 'IT Services',
      headquarters: 'Mumbai, India',
      size: 'ENTERPRISE',
    },
  });

  // 2. Create Levels
  const googleL3 = await prisma.level.upsert({
    where: { companyId_internalCode: { companyId: google.id, internalCode: 'L3' } },
    update: {},
    create: {
      companyId: google.id,
      title: 'Software Engineer II',
      internalCode: 'L3',
      track: 'IC',
      seniorityRank: 2,
    },
  });

  const googleL4 = await prisma.level.upsert({
    where: { companyId_internalCode: { companyId: google.id, internalCode: 'L4' } },
    update: {},
    create: {
      companyId: google.id,
      title: 'Software Engineer III',
      internalCode: 'L4',
      track: 'IC',
      seniorityRank: 3,
    },
  });

  const googleL5 = await prisma.level.upsert({
    where: { companyId_internalCode: { companyId: google.id, internalCode: 'L5' } },
    update: {},
    create: {
      companyId: google.id,
      title: 'Senior Software Engineer',
      internalCode: 'L5',
      track: 'IC',
      seniorityRank: 4,
    },
  });

  const ms59 = await prisma.level.upsert({
    where: { companyId_internalCode: { companyId: microsoft.id, internalCode: '59' } },
    update: {},
    create: {
      companyId: microsoft.id,
      title: 'Software Engineer',
      internalCode: '59',
      track: 'IC',
      seniorityRank: 2,
    },
  });

  const ms63 = await prisma.level.upsert({
    where: { companyId_internalCode: { companyId: microsoft.id, internalCode: '63' } },
    update: {},
    create: {
      companyId: microsoft.id,
      title: 'Senior Software Engineer',
      internalCode: '63',
      track: 'IC',
      seniorityRank: 4,
    },
  });

  const metaE5 = await prisma.level.upsert({
    where: { companyId_internalCode: { companyId: meta.id, internalCode: 'E5' } },
    update: {},
    create: {
      companyId: meta.id,
      title: 'Senior Software Engineer',
      internalCode: 'E5',
      track: 'IC',
      seniorityRank: 4,
    },
  });

  const tcsITA = await prisma.level.upsert({
    where: { companyId_internalCode: { companyId: tcs.id, internalCode: 'ITA' } },
    update: {},
    create: {
      companyId: tcs.id,
      title: 'IT Analyst',
      internalCode: 'ITA',
      track: 'IC',
      seniorityRank: 3,
    },
  });

  // 3. Delete existing salaries to avoid duplicates on re-seed
  await prisma.salaryEntry.deleteMany({});

  // 4. Create Salary Entries
  const mockSalaries = [
    { companyId: google.id, levelId: googleL5.id, role: 'Software Engineer', location: 'Mountain View, CA', country: 'USA', yoe: 7, base: 200000, equity: 150000, bonus: 35000 },
    { companyId: google.id, levelId: googleL5.id, role: 'Software Engineer', location: 'Seattle, WA', country: 'USA', yoe: 6, base: 195000, equity: 140000, bonus: 30000 },
    { companyId: google.id, levelId: googleL4.id, role: 'Software Engineer', location: 'New York, NY', country: 'USA', yoe: 3, base: 170000, equity: 90000, bonus: 25000 },
    { companyId: google.id, levelId: googleL3.id, role: 'Software Engineer', location: 'Austin, TX', country: 'USA', yoe: 1, base: 140000, equity: 50000, bonus: 15000 },
    
    { companyId: microsoft.id, levelId: ms63.id, role: 'Software Engineer', location: 'Redmond, WA', country: 'USA', yoe: 8, base: 185000, equity: 80000, bonus: 35000 },
    { companyId: microsoft.id, levelId: ms63.id, role: 'Software Engineer', location: 'San Francisco, CA', country: 'USA', yoe: 7, base: 195000, equity: 85000, bonus: 40000 },
    { companyId: microsoft.id, levelId: ms59.id, role: 'Software Engineer', location: 'Redmond, WA', country: 'USA', yoe: 2, base: 130000, equity: 25000, bonus: 15000 },
    
    { companyId: meta.id, levelId: metaE5.id, role: 'Software Engineer', location: 'Menlo Park, CA', country: 'USA', yoe: 6, base: 210000, equity: 180000, bonus: 40000 },
    { companyId: meta.id, levelId: metaE5.id, role: 'Software Engineer', location: 'New York, NY', country: 'USA', yoe: 5, base: 205000, equity: 175000, bonus: 38000 },
    
    { companyId: tcs.id, levelId: tcsITA.id, role: 'Software Engineer', location: 'Mumbai, India', country: 'India', yoe: 5, base: 15000, equity: 0, bonus: 1000, currency: 'USD' }, // Approximate USD conversion for comparison
    { companyId: tcs.id, levelId: tcsITA.id, role: 'Software Engineer', location: 'Bangalore, India', country: 'India', yoe: 4, base: 14000, equity: 0, bonus: 1000, currency: 'USD' },
  ];

  for (const s of mockSalaries) {
    await prisma.salaryEntry.create({
      data: {
        companyId: s.companyId,
        levelId: s.levelId,
        role: s.role,
        location: s.location,
        country: s.country,
        yearsOfExperience: s.yoe,
        yearsAtCompany: Math.max(0, s.yoe - 2),
        baseSalary: s.base,
        equity: s.equity,
        bonus: s.bonus,
        totalCompensation: s.base + s.equity + s.bonus,
        currency: (s.currency as any) || 'USD',
        verified: true,
      }
    });
  }

  console.log('Seeding complete! Database is populated with realistic salary data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
