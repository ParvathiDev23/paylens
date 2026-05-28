const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create a test user
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      passwordHash,
    },
  });
  console.log(`User created: ${user.email}`);

  // 2. Create Companies
  const companiesData = [
    {
      name: 'Google',
      slug: 'google',
      industry: 'Technology',
      headquarters: 'Mountain View, CA',
      size: 'ENTERPRISE',
      website: 'https://google.com',
    },
    {
      name: 'Meta',
      slug: 'meta',
      industry: 'Technology',
      headquarters: 'Menlo Park, CA',
      size: 'ENTERPRISE',
      website: 'https://meta.com',
    },
    {
      name: 'Amazon',
      slug: 'amazon',
      industry: 'Technology',
      headquarters: 'Seattle, WA',
      size: 'ENTERPRISE',
      website: 'https://amazon.com',
    },
    {
      name: 'TCS',
      slug: 'tcs',
      industry: 'IT Services',
      headquarters: 'Mumbai, India',
      size: 'ENTERPRISE',
      website: 'https://tcs.com',
    },
    {
      name: 'Stripe',
      slug: 'stripe',
      industry: 'Fintech',
      headquarters: 'San Francisco, CA',
      size: 'LARGE',
      website: 'https://stripe.com',
    }
  ];

  const companies = [];
  for (const c of companiesData) {
    const company = await prisma.company.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    companies.push(company);
  }
  console.log('Companies created.');

  // 3. Create Levels
  const google = companies.find(c => c.slug === 'google');
  const meta = companies.find(c => c.slug === 'meta');
  const amazon = companies.find(c => c.slug === 'amazon');
  const tcs = companies.find(c => c.slug === 'tcs');

  const levelsData = [
    // Google Levels
    { companyId: google.id, title: 'Software Engineer II', internalCode: 'L3', track: 'IC', seniorityRank: 2 },
    { companyId: google.id, title: 'Software Engineer III', internalCode: 'L4', track: 'IC', seniorityRank: 3 },
    { companyId: google.id, title: 'Senior Software Engineer', internalCode: 'L5', track: 'IC', seniorityRank: 4 },
    { companyId: google.id, title: 'Staff Software Engineer', internalCode: 'L6', track: 'IC', seniorityRank: 5 },
    // Meta Levels
    { companyId: meta.id, title: 'Software Engineer', internalCode: 'E3', track: 'IC', seniorityRank: 2 },
    { companyId: meta.id, title: 'Software Engineer', internalCode: 'E4', track: 'IC', seniorityRank: 3 },
    { companyId: meta.id, title: 'Senior Software Engineer', internalCode: 'E5', track: 'IC', seniorityRank: 4 },
    { companyId: meta.id, title: 'Staff Software Engineer', internalCode: 'E6', track: 'IC', seniorityRank: 5 },
    // Amazon Levels
    { companyId: amazon.id, title: 'SDE I', internalCode: 'L4', track: 'IC', seniorityRank: 2 },
    { companyId: amazon.id, title: 'SDE II', internalCode: 'L5', track: 'IC', seniorityRank: 3 },
    { companyId: amazon.id, title: 'SDE III', internalCode: 'L6', track: 'IC', seniorityRank: 4 },
    { companyId: amazon.id, title: 'Principal SDE', internalCode: 'L7', track: 'IC', seniorityRank: 6 },
    // TCS Levels
    { companyId: tcs.id, title: 'Systems Engineer', internalCode: 'C1', track: 'IC', seniorityRank: 2 },
    { companyId: tcs.id, title: 'IT Analyst', internalCode: 'C2', track: 'IC', seniorityRank: 3 },
    { companyId: tcs.id, title: 'Assistant Consultant', internalCode: 'C3', track: 'IC', seniorityRank: 4 },
  ];

  const levels = [];
  for (const l of levelsData) {
    const level = await prisma.level.upsert({
      where: { companyId_internalCode: { companyId: l.companyId, internalCode: l.internalCode } },
      update: {},
      create: l,
    });
    levels.push(level);
  }
  console.log('Levels created.');

  // 4. Create Salary Entries
  const gL4 = levels.find(l => l.companyId === google.id && l.internalCode === 'L4');
  const mE4 = levels.find(l => l.companyId === meta.id && l.internalCode === 'E4');
  const aL5 = levels.find(l => l.companyId === amazon.id && l.internalCode === 'L5');

  const salariesData = [
    {
      companyId: google.id,
      levelId: gL4.id,
      role: 'Software Engineer',
      location: 'Mountain View, CA',
      country: 'USA',
      yearsOfExperience: 3,
      yearsAtCompany: 1,
      baseSalary: 180000,
      equity: 80000,
      bonus: 27000,
      totalCompensation: 287000,
      currency: 'USD',
      verified: true,
      userId: user.id
    },
    {
      companyId: google.id,
      levelId: gL4.id,
      role: 'Software Engineer',
      location: 'New York, NY',
      country: 'USA',
      yearsOfExperience: 4,
      yearsAtCompany: 2,
      baseSalary: 185000,
      equity: 90000,
      bonus: 28000,
      totalCompensation: 303000,
      currency: 'USD',
      verified: true,
    },
    {
      companyId: meta.id,
      levelId: mE4.id,
      role: 'Software Engineer',
      location: 'Menlo Park, CA',
      country: 'USA',
      yearsOfExperience: 3,
      yearsAtCompany: 0,
      baseSalary: 185000,
      equity: 95000,
      bonus: 18500,
      totalCompensation: 298500,
      currency: 'USD',
      verified: true,
    },
    {
      companyId: amazon.id,
      levelId: aL5.id,
      role: 'Software Engineer',
      location: 'Seattle, WA',
      country: 'USA',
      yearsOfExperience: 4,
      yearsAtCompany: 2,
      baseSalary: 170000,
      equity: 60000,
      bonus: 0,
      totalCompensation: 230000,
      currency: 'USD',
      verified: false,
    }
  ];

  // We delete existing salary entries before seeding to avoid duplicates (optional but good for testing)
  await prisma.salaryEntry.deleteMany({});
  
  for (const s of salariesData) {
    await prisma.salaryEntry.create({
      data: s
    });
  }
  
  console.log('Salary entries created.');
  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
