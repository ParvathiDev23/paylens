'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitSalary(
  prevState: any,
  formData: FormData
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const companySlug = formData.get('company') as string;
    const internalCode = formData.get('level') as string;
    const role = formData.get('role') as string;
    const location = formData.get('location') as string;
    const yearsOfExperience = parseInt(formData.get('yearsOfExperience') as string);
    const baseSalary = parseInt(formData.get('baseSalary') as string);
    const equity = parseInt(formData.get('equity') as string) || 0;
    const bonus = parseInt(formData.get('bonus') as string) || 0;
    
    if (!companySlug || !internalCode || !role || !location || isNaN(yearsOfExperience) || isNaN(baseSalary)) {
      return { error: 'Please fill in all required fields.' };
    }

    // Find the company
    const company = await prisma.company.findUnique({
      where: { slug: companySlug }
    });

    if (!company) {
      return { error: 'Company not found in our system.' };
    }

    // Find or create the level (for simplicity, we assume they exist or we create a generic one if missing)
    let level = await prisma.level.findUnique({
      where: {
        companyId_internalCode: {
          companyId: company.id,
          internalCode: internalCode
        }
      }
    });

    if (!level) {
      // If the level doesn't exist yet, we create a basic placeholder
      level = await prisma.level.create({
        data: {
          companyId: company.id,
          internalCode: internalCode,
          title: internalCode, // Just use the code as title if unknown
          track: 'IC',
          seniorityRank: 3 // Default average rank
        }
      });
    }

    const totalCompensation = baseSalary + equity + bonus;

    // Create the salary entry
    await prisma.salaryEntry.create({
      data: {
        companyId: company.id,
        levelId: level.id,
        role,
        location,
        country: location.includes(',') ? location.split(',')[1].trim() : 'Unknown',
        yearsOfExperience,
        yearsAtCompany: Math.max(0, yearsOfExperience - 2), // Default guess
        baseSalary,
        equity,
        bonus,
        totalCompensation,
        verified: true, // Auto-verifying for demo purposes
        userId: userId || null, // Associate with logged in user if available
      }
    });

  } catch (error) {
    console.error('Submission error:', error);
    return { error: 'Failed to submit salary data. Please try again.' };
  }

  // Revalidate the dashboard and redirect
  revalidatePath('/salaries');
  redirect('/salaries?success=true');
}
