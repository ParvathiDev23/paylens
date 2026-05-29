import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { PlusCircle, Building2, TrendingUp, Calendar, MapPin } from 'lucide-react';

export const metadata = {
  title: 'My Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  // Fetch user's submissions
  const submissions = await prisma.salaryEntry.findMany({
    where: { userId: session.user.id },
    include: {
      company: { select: { name: true, slug: true } },
      level: { select: { internalCode: true, title: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch user's saved companies
  const savedCompanies = await prisma.savedCompany.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session.user.name || 'there'}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your PayLens activity at a glance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Submissions</span>
          </div>
          <p className="text-3xl font-bold">{submissions.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <Building2 className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Saved Companies</span>
          </div>
          <p className="text-3xl font-bold">{savedCompanies.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-500/10 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Member Since</span>
          </div>
          <p className="text-lg font-bold">
            {new Date(session.user.id ? Date.now() : Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Your Submissions</h2>
            <p className="text-sm text-muted-foreground mt-1">Salary data you've contributed anonymously.</p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            Add New
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="bg-muted/50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Help improve salary transparency by sharing your compensation data anonymously.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
            >
              <PlusCircle className="h-5 w-5" />
              Submit Your First Salary
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/30 text-sm text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Level</th>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium text-right">Total Comp</th>
                  <th className="px-6 py-3 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((entry) => (
                  <tr key={entry.id} className="border-t border-border/50 hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-semibold">{entry.company.name}</td>
                    <td className="px-6 py-4 text-sm">{entry.role}</td>
                    <td className="px-6 py-4">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md">
                        {entry.level.internalCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {entry.location}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-primary">
                      {formatCurrency(entry.totalCompensation, entry.currency)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
