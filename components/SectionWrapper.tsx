import React, { useState } from 'react';
import { InfoTooltip } from './UIComponents';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  darkMode: boolean;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  tooltipText?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  title, 
  children, 
  darkMode, 
  defaultOpen = false,
  icon,
  tooltipText
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-[40px] border-2 shadow-xl overflow-hidden transition-all duration-300 ${
      darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
    }`}>
      {/* Header - Always visible */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-8 py-6 text-left transition-colors ${
          darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center">
          <h3 className={`text-lg font-black uppercase tracking-tight transition-all duration-300 group-hover:text-blue-600 ${
            darkMode ? 'text-white' : 'text-slate-950'
          }`}>
            {title}
          </h3>
          {tooltipText && <InfoTooltip text={tooltipText} />}
        </div>

        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-500 ${
          isOpen ? 'rotate-180 border-blue-500 text-blue-500' : 'rotate-0 border-slate-300 dark:border-slate-700 text-slate-400'
        }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Content - Collapsible */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`p-8 md:p-10 border-t-2 ${
          darkMode ? 'border-slate-800 bg-slate-950/20' : 'border-slate-100 bg-slate-50/30'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper;