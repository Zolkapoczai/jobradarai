import React, { useState, useRef } from 'react';

// Icon components
const IconWrapper: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props} />
);

export const LightningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></IconWrapper>;
export const MicroscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10v.01" /></IconWrapper>;
export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></IconWrapper>;
export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></IconWrapper>;
export const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></IconWrapper>;
export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.2z" /></IconWrapper>;
export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></IconWrapper>;
export const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></IconWrapper>;
export const CashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></IconWrapper>;
export const RadarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M12 12a1 1 0 11-2 0 1 1 0 012 0z" /></IconWrapper>;
export const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1" /></IconWrapper>;
export const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></IconWrapper>;
export const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></IconWrapper>;
export const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></IconWrapper>;
export const LocationMarkerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></IconWrapper>;
export const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 5.414l-4.293 4.293a1 1 0 11-1.414-1.414l6-6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.293 10.293a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-6-6z" /></IconWrapper>;
export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></IconWrapper>;
export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></IconWrapper>;
export const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.743-5.743z" /></IconWrapper>;
export const RulerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v4m0 0h-4m4 0l-5-5" /></IconWrapper>;
export const ChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M10 9h4v6h-4V9z" /></IconWrapper>;
export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></IconWrapper>;
export const CoinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5A6.5 6.5 0 1112 5.5a6.5 6.5 0 110 13z" /></IconWrapper>;
export const ChessPawnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a2 2 0 01-2-2v-2h4v2a2 2 0 01-2 2zM12 3a2.5 2.5 0 012.5 2.5v.5h-5v-.5A2.5 2.5 0 0112 3zM12 17v-7h3.5a3.5 3.5 0 10-3.5-3.5h-3a3.5 3.5 0 100 7H12z" /></IconWrapper>;
export const GiftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" /></IconWrapper>;
export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></IconWrapper>;
export const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></IconWrapper>;
export const MicrophoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></IconWrapper>;
export const SearchCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16l-1.886-1.886a2 2 0 010-2.828L10 8l1.886 1.886a2 2 0 010 2.828L8 16z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></IconWrapper>;

// Modern SVG Logo Component - Replaces image files for stability and sharpness
export const JobRadarLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 540 140" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#0B1121', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text 
      x="0" 
      y="85" 
      style={{ 
        font: '900 92px Inter, system-ui, -apple-system, sans-serif', 
        fill: 'url(#textGradient)',
        letterSpacing: '-3px'
      }}
    >
      JobRadar<tspan style={{ fill: '#2563eb' }}> AI</tspan>
    </text>
    <text 
      x="5" 
      y="125" 
      style={{ 
        font: '900 24px Inter, system-ui, -apple-system, sans-serif', 
        fill: '#0f172a', 
        letterSpacing: '4.2px',
        textTransform: 'uppercase',
        opacity: 0.95
      }}
    >
      APPLY SMARTER, LAND FASTER!
    </text>
  </svg>
);

// Google colors Hello text
export const GoogleHelloText: React.FC = () => (
  <div className="flex gap-1 mb-4">
    <span className="text-blue-500 font-bold text-4xl">H</span>
    <span className="text-red-500 font-bold text-4xl">E</span>
    <span className="text-yellow-500 font-bold text-4xl">L</span>
    <span className="text-blue-500 font-bold text-4xl">L</span>
    <span className="text-green-500 font-bold text-4xl">O</span>
    <span className="text-red-500 font-bold text-4xl">!</span>
  </div>
);

// Reusable Tooltip component for icons - now with dynamic positioning
export const InfoTooltip: React.FC<{ text: string }> = ({ text }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState<'top' | 'bottom'>('top');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Simple logic: prefer bottom if enough space (150px estimate), otherwise top.
        if (rect.bottom + 150 < viewportHeight) {
            setPosition('bottom');
        } else {
            setPosition('top');
        }
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    return (
        <div 
            ref={wrapperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative inline-block ml-2 align-middle z-[150]"
        >
            <div className="cursor-help w-5 h-5 rounded-full border-2 border-slate-900 dark:border-slate-300 flex items-center justify-center text-[11px] text-slate-950 dark:text-white font-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">i</div>
            <div className={`absolute ${position === 'top' ? 'bottom-full mb-4' : 'top-full mt-4'} left-1/2 -translate-x-1/2 w-72 p-5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] rounded-2xl shadow-xl pointer-events-none transition-all duration-300 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} border border-slate-200 dark:border-slate-700 z-[3000]`}>
                <div className={`absolute ${position === 'top' ? 'top-full border-t-white dark:border-t-slate-800' : 'bottom-full border-b-white dark:border-b-slate-800'} left-1/2 -translate-x-1/2 border-8 border-transparent`}></div>
                <p className="font-bold leading-relaxed text-justify">{text}</p>
            </div>
        </div>
    );
};


// Generic Tooltip Wrapper for any component - now with dynamic positioning
export const TooltipWrapper: React.FC<{ text: string; children: React.ReactNode; }> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Simple logic: prefer bottom if enough space (150px estimate), otherwise top.
    if (rect.bottom + 150 < viewportHeight) {
      setPosition('bottom');
    } else {
      setPosition('top');
    }
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full mb-3 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-3 left-1/2 -translate-x-1/2',
    left: 'right-full mr-3 top-1/2 -translate-y-1/2',
    right: 'left-full ml-3 top-1/2 -translate-y-1/2',
  };
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white dark:border-t-slate-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white dark:border-b-slate-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white dark:border-l-slate-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white dark:border-r-slate-800',
  };
  
  return (
    <div 
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {children}
      <div className={`absolute ${positionClasses[position]} w-64 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs p-4 rounded-xl shadow-xl z-[2000] pointer-events-none transition-all duration-300 transform ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className={`absolute border-8 border-transparent ${arrowClasses[position]}`}></div>
        <p className="font-bold leading-relaxed text-justify">{text}</p>
      </div>
    </div>
  );
};


// Match Factor visualization bar
export const FactorBar: React.FC<{ label: string; value: number; color: string; tooltip: string; isHighlighted: boolean }> = ({ label, value, color, tooltip, isHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className={`group relative cursor-help transition-all duration-500 ${isHighlighted ? 'scale-[1.02]' : 'opacity-80'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isHighlighted ? 'text-slate-950 dark:text-white' : 'text-slate-800 dark:text-slate-300'}`}>{label}</span>
        <span className="text-xs font-black text-slate-950 dark:text-white">{value}%</span>
      </div>
      <div className={`h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border transition-all duration-500 ${isHighlighted ? 'border-blue-400 dark:border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'border-slate-300 dark:border-slate-600'}`}>
        <div 
          className="h-full rounded-full transition-all duration-[2000ms] ease-out shadow-[0_0_8px_rgba(0,0,0,0.1)]" 
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
      {isHovered && (
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] p-5 rounded-2xl shadow-xl z-[2000] animate-in fade-in zoom-in-95 duration-200 pointer-events-none border border-slate-200 dark:border-slate-700">
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-slate-800"></div>
          <p className="font-bold leading-relaxed text-justify">{tooltip}</p>
        </div>
      )}
    </div>
  );
};

// Intelligence content card
export const IntelligenceCard: React.FC<{ title: string; content: string; icon: React.ReactNode; darkMode: boolean }> = ({ title, content, icon, darkMode }) => (
  <div className={`group flex flex-col p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${darkMode ? 'bg-slate-950/40 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-300 hover:border-blue-400 shadow-sm'}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-slate-500 dark:text-blue-400 shadow-inner transition-transform group-hover:rotate-6 ${darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-slate-50 border border-slate-300 shadow-sm'}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h4 className="text-[10px] font-black uppercase text-blue-900 dark:text-blue-300 tracking-[0.2em]">{title}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[8px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-widest">Verified Intelligence</span>
        </div>
      </div>
    </div>
    <div className="flex-grow">
      <p className="text-sm font-bold text-slate-950 dark:text-slate-100 leading-relaxed text-justify group-hover:text-black dark:group-hover:text-white transition-colors">
        {content}
      </p>
    </div>
  </div>
);

/**
 * Modern Input Component
 */
export const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="w-full space-y-2">
    {label && <label className="block text-sm font-black text-slate-950 dark:text-slate-100 ml-1">{label}</label>}
    <input
      {...props}
      className={`w-full rounded-[32px] border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-6 py-4 font-bold transition-all duration-300 hover:border-blue-500 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder:font-normal text-slate-900 dark:text-white ${className}`}
    />
  </div>
);

/**
 * Modern Textarea Component
 */
export const FormTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="w-full space-y-2">
    {label && <label className="block text-sm font-black text-slate-950 dark:text-slate-100 ml-1">{label}</label>}
    <textarea
      {...props}
      className={`w-full rounded-[32px] border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-6 py-4 font-bold transition-all duration-300 hover:border-blue-500 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder:font-normal text-slate-900 dark:text-white resize-none ${className}`}
    />
  </div>
);

/**
 * Modern Primary Action Button
 */
export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`w-full py-4 rounded-full bg-gradient-to-r from-[#0f172a] via-[#1e40af] to-[#3b82f6] text-white font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);