
import React, { useState, useRef } from 'react';

// Icon components
const IconWrapper: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props} />
);

export const LightningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></IconWrapper>;
export const MicroscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></IconWrapper>;
export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></IconWrapper>;
export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></IconWrapper>;
export const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></IconWrapper>;
export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></IconWrapper>;
export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.5 13.5h.008v.008h-.008v-.008z" /></IconWrapper>;
export const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>;
export const CashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125h.375m18 3.75v.75c0 .414-.336.75-.75.75h-.75a.75.75 0 01-.75-.75v-.75m3 3.75H3.75m15-3.75v.75c0 .414-.336.75-.75.75h-.75a.75.75 0 01-.75-.75v-.75M3 12h18M15 9.75v.008v.008H15v-.016zm-3 0v.008v.008H12v-.016zm-3 0v.008v.008H9v-.016z" /></IconWrapper>;
export const RadarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-6m0 6a3 3 0 100-6 3 3 0 000 6z" /></IconWrapper>;
export const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></IconWrapper>;
export const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></IconWrapper>;
export const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h21" /></IconWrapper>;
export const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.976 5.198M21 3L12 12" /></IconWrapper>;
export const LocationMarkerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></IconWrapper>;
export const DnaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11.023 5.926c-1.353-.33-2.75-.48-4.173-.48C3.498 5.446 2.25 6.694 2.25 8.088c0 .598.226 1.148.601 1.574c.266.302.585.55.942.744c1.192.632 2.652.923 4.173.923c.962 0 1.89-.133 2.75-.38" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.977 18.074c1.353.33 2.75.48 4.173.48c3.354 0 4.602-1.248 4.602-2.642c0-.598-.226-1.148-.601-1.574c-.266-.302-.585-.55-.942-.744c-1.192-.632-2.652-.923-4.173-.923c-.962 0-1.89.133-2.75.38" /><path strokeLinecap="round" strokeLinejoin="round" d="M11.023 5.926A10.455 10.455 0 0012 5.625c1.131 0 2.212.174 3.203.499m-4.38 12.448A10.455 10.455 0 0112 18.375c-1.131 0-2.212-.174-3.203-.499m4.38-1.502A10.455 10.455 0 0012 12.375c1.131 0 2.212.174 3.203.499" /></IconWrapper>;
export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75 0h4.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75h6m-6 3h6m-3-6v-3.375c0-1.621-1.328-2.925-2.95-2.925S6 8.004 6 9.625s1.328 2.925 2.95 2.925z" /></IconWrapper>;
export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></IconWrapper>;
export const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></IconWrapper>;
export const RulerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM9 20.25a.75.75 0 110-1.5.75.75 0 010 1.5zM15 20.25a.75.75 0 110-1.5.75.75 0 010 1.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z" /></IconWrapper>;
export const ChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 3h-1.5m1.5 0h16.5m-16.5 0V1.5m16.5 1.5V1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h1.5M19.5 8.25h1.5M3 12h1.5M19.5 12h1.5M3 15.75h1.5M19.5 15.75h1.5M6 18.75h12M9 15.75h6" /></IconWrapper>;
export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18M18.75 3v18M9 6.75h6.75M9 12h6.75M9 17.25h6.75" /></IconWrapper>;
export const CoinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></IconWrapper>;
export const ChessPawnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a2 2 0 01-2-2v-2h4v2a2 2 0 01-2 2zM12 3a2.5 2.5 0 012.5 2.5v.5h-5v-.5A2.5 2.5 0 0112 3zM12 17v-7h3.5a3.5 3.5 0 10-3.5-3.5h-3a3.5 3.5 0 100 7H12z" /></IconWrapper>;
export const GiftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.75v16.5M6.75 3.75v16.5M3.75 5.25h16.5m-16.5 13.5h16.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75a3 3 0 013 3V9a3 3 0 01-3 3m-3-6a3 3 0 003 3V9a3 3 0 00-3 3" /></IconWrapper>;
export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></IconWrapper>;
export const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.75a2.25 2.25 0 012.25-2.25h1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6L21 13.5" /></IconWrapper>;
export const MicrophoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 5.25v2.25" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-1.5" /></IconWrapper>;
export const SearchCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></IconWrapper>;

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
      x="6" 
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
      x="6" 
      y="125"
      textLength="528"
      lengthAdjust="spacing"
      style={{ 
        font: '900 24px Inter, system-ui, -apple-system, sans-serif', 
        fill: '#0f172a', 
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
            <div className={`absolute ${position === 'top' ? 'bottom-full mb-4' : 'top-full mt-4'} left-1/2 -translate-x-1/2 w-72 max-w-[90vw] sm:max-w-sm p-5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] rounded-2xl shadow-xl pointer-events-none transition-all duration-300 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} border border-slate-200 dark:border-slate-700 z-[3000]`}>
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
      <div className={`absolute ${positionClasses[position]} w-64 max-w-[90vw] sm:max-w-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs p-4 rounded-xl shadow-xl z-[2000] pointer-events-none transition-all duration-300 transform ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
    className={`w-full py-4 rounded-full bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#3b82f6] text-white font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);
