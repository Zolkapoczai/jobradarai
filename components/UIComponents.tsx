import React, { useState, useRef } from 'react';

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
export const IntelligenceCard: React.FC<{ title: string; content: string; icon: string; darkMode: boolean }> = ({ title, content, icon, darkMode }) => (
  <div className={`group flex flex-col p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${darkMode ? 'bg-slate-950/40 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-300 hover:border-blue-400 shadow-sm'}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-2xl shadow-inner transition-transform group-hover:rotate-6 ${darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-slate-50 border border-slate-300 shadow-sm'}`}>
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