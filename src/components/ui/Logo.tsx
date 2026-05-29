import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  animated?: boolean;
}

export default function Logo({ className = "w-8 h-8", animated = false, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g className="logo-lens">
        {/* The Lens (Circle) */}
        <circle 
          cx="45" 
          cy="45" 
          r="32" 
          strokeWidth="6" 
          className={`origin-[45px_45px] transition-all duration-700 ease-in-out ${animated ? 'scale-105 stroke-primary' : ''}`} 
        />
        
        {/* The Lens Handle */}
        <line 
          x1="68" 
          y1="68" 
          x2="90" 
          y2="90" 
          strokeWidth="10" 
          className={`transition-all duration-700 delay-100 ${animated ? 'stroke-primary' : ''}`}
        />
      </g>

      <g className="logo-bars">
        {/* Bar 1 (Left, Medium) */}
        <line 
          x1="30" 
          y1="55" 
          x2="30" 
          y2="42" 
          strokeWidth="6" 
          className={`origin-bottom transition-all duration-500 delay-75 ${animated ? 'scale-y-110 stroke-emerald-500' : ''}`}
        />
        
        {/* Bar 2 (Center, High) */}
        <line 
          x1="45" 
          y1="55" 
          x2="45" 
          y2="28" 
          strokeWidth="6" 
          className={`origin-bottom transition-all duration-500 delay-150 ${animated ? 'scale-y-[1.15] stroke-emerald-500' : ''}`}
        />
        
        {/* Bar 3 (Right, Low) */}
        <line 
          x1="60" 
          y1="55" 
          x2="60" 
          y2="48" 
          strokeWidth="6" 
          className={`origin-bottom transition-all duration-500 delay-200 ${animated ? 'scale-y-125 stroke-emerald-500' : ''}`}
        />
      </g>
    </svg>
  );
}
