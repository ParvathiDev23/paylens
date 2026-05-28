"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, Briefcase, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';

export default function SubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      // Mock API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-card border border-border rounded-xl p-12 shadow-sm flex flex-col items-center">
          <div className="h-20 w-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Submission Received!</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Thank you for contributing to salary transparency. Your entry is being reviewed and will be added to our database shortly.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => { setStep(1); setIsSuccess(false); }}
              className="bg-muted text-foreground px-6 py-3 rounded-md font-medium hover:bg-muted/80 transition-colors"
            >
              Submit Another
            </button>
            <Link 
              href="/salaries" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Salaries
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <form onSubmit={handleSubmit}>
          
          {/* Step 1: Role Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-semibold border-b border-border pb-4 mb-6">Where do you work?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input required type="text" placeholder="e.g. Google" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input required type="text" placeholder="e.g. Software Engineer" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Internal Level</label>
                  <input type="text" placeholder="e.g. L4, E5, Senior" className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input required type="text" placeholder="e.g. San Francisco, CA" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Years of Experience *</label>
                  <input required type="number" min="0" max="50" placeholder="e.g. 5" className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Years at Company *</label>
                  <input required type="number" min="0" max="50" placeholder="e.g. 2" className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Compensation */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-semibold border-b border-border pb-4 mb-6">What is your compensation?</h2>
              <p className="text-sm text-muted-foreground mb-4">Please enter annualized amounts.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency *</label>
                  <select className="w-full h-10 rounded-md border border-border bg-background px-4 outline-none focus:border-primary">
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
                    <input required type="number" min="0" placeholder="150000" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Annual Equity (Stock/RSUs)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input type="number" min="0" placeholder="50000" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Value vesting this year</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Annual Bonus</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input type="number" min="0" placeholder="150000" className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-semibold border-b border-border pb-4 mb-6">Review & Submit</h2>
              
              <div className="bg-muted/30 rounded-lg p-6 space-y-4 border border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Company</p>
                    <p className="font-semibold">Google</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Title & Level</p>
                    <p className="font-semibold">Software Engineer (L4)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Location</p>
                    <p className="font-semibold">San Francisco, CA</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Experience</p>
                    <p className="font-semibold">5 yrs total (2 at company)</p>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Base Salary</p>
                      <p className="font-semibold">$150,000</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Stock (Yearly)</p>
                      <p className="font-semibold">$50,000</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Bonus</p>
                      <p className="font-semibold">$22,500</p>
                    </div>
                    <div>
                      <p className="text-primary font-bold mb-1">Total Compensation</p>
                      <p className="text-xl font-bold text-primary">$222,500</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-6">
                <input required type="checkbox" id="verify" className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                <label htmlFor="verify" className="text-sm text-muted-foreground">
                  I confirm that this information is accurate to the best of my knowledge and represents my actual compensation package.
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-border flex justify-between">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 rounded-md border border-border font-medium hover:bg-muted transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : step === 3 ? (
                'Submit Compensation'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
