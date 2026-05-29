'use client';

import { useState, useActionState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, Briefcase, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { submitSalary } from './actions';
import { useFormStatus } from 'react-dom';

const initialState: { error?: string } = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-8 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
    >
      {pending ? 'Submitting...' : 'Submit Compensation'}
    </button>
  );
}

export default function SubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, formAction] = useActionState(submitSalary, initialState);

  // Form State
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    level: '',
    location: '',
    yearsOfExperience: '',
    yearsAtCompany: '',
    currency: 'USD',
    baseSalary: '',
    equity: '',
    bonus: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Your Compensation</h1>
          <p className="text-muted-foreground mt-2">Help others by sharing your salary information anonymously.</p>
        </div>
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Cancel
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span className={step >= 1 ? 'text-primary' : ''}>1. Role Details</span>
          <span className={step >= 2 ? 'text-primary' : ''}>2. Compensation</span>
          <span className={step >= 3 ? 'text-primary' : ''}>3. Review</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <form action={formAction}>
          
          {/* Step 1: Role Details */}
          <div className={`space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 ${step !== 1 ? 'hidden' : ''}`}>
            <h2 className="text-xl font-semibold border-b border-border pb-4 mb-6">Where do you work?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company (Slug) *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input required={step === 1} name="company" value={formData.company} onChange={handleChange} type="text" placeholder="e.g. google" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title *</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input required={step === 1} name="role" value={formData.role} onChange={handleChange} type="text" placeholder="e.g. Software Engineer" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Internal Level *</label>
                <input required={step === 1} name="level" value={formData.level} onChange={handleChange} type="text" placeholder="e.g. L4, E5, Senior" className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input required={step === 1} name="location" value={formData.location} onChange={handleChange} type="text" placeholder="e.g. San Francisco, CA" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Years of Experience *</label>
                <input required={step === 1} name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} type="number" min="0" max="50" placeholder="e.g. 5" className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Years at Company *</label>
                <input required={step === 1} name="yearsAtCompany" value={formData.yearsAtCompany} onChange={handleChange} type="number" min="0" max="50" placeholder="e.g. 2" className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          {/* Step 2: Compensation */}
          <div className={`space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 ${step !== 2 ? 'hidden' : ''}`}>
            <h2 className="text-xl font-semibold border-b border-border pb-4 mb-6">What is your compensation?</h2>
            <p className="text-sm text-muted-foreground mb-4">Please enter annualized amounts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency *</label>
                <select name="currency" value={formData.currency} onChange={handleChange} className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary">
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>
              <div className="hidden md:block"></div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Base Salary *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input required={step === 2} name="baseSalary" value={formData.baseSalary} onChange={handleChange} type="number" min="0" placeholder="150000" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Annual Equity (Stock/RSUs)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input name="equity" value={formData.equity} onChange={handleChange} type="number" min="0" placeholder="50000" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Value vesting this year</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Annual Bonus</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input name="bonus" value={formData.bonus} onChange={handleChange} type="number" min="0" placeholder="150000" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Review */}
          <div className={`space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 ${step !== 3 ? 'hidden' : ''}`}>
            <h2 className="text-xl font-semibold border-b border-border pb-4 mb-6">Review & Submit</h2>
            
            {state?.error && (
              <div className="rounded-md bg-destructive/10 p-3 flex items-center gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-destructive font-medium">{state.error}</p>
              </div>
            )}

            <div className="bg-muted/30 rounded-lg p-6 space-y-4 border border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Company</p>
                  <p className="font-semibold capitalize">{formData.company || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Title & Level</p>
                  <p className="font-semibold">{formData.role} ({formData.level})</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold">{formData.location || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Experience</p>
                  <p className="font-semibold">{formData.yearsOfExperience} yrs total</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Base Salary</p>
                    <p className="font-semibold">${parseInt(formData.baseSalary || '0').toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Stock (Yearly)</p>
                    <p className="font-semibold">${parseInt(formData.equity || '0').toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Bonus</p>
                    <p className="font-semibold">${parseInt(formData.bonus || '0').toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-primary font-bold mb-1">Total Compensation</p>
                    <p className="text-xl font-bold text-primary">
                      ${(parseInt(formData.baseSalary || '0') + parseInt(formData.equity || '0') + parseInt(formData.bonus || '0')).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 mt-6">
              <input required={step === 3} type="checkbox" id="verify" className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              <label htmlFor="verify" className="text-sm text-muted-foreground">
                I confirm that this information is accurate to the best of my knowledge and represents my actual compensation package.
              </label>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-border flex justify-between">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handleBack}
                className="px-6 py-2 rounded-md border border-border font-medium hover:bg-muted transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                type="button"
                onClick={handleNext}
                className="px-8 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            ) : (
              <SubmitButton />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
