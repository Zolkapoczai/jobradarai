
import React, { useState } from 'react';
import { CVRewrite } from '../types';
import { InfoTooltip } from './UIComponents';

interface RewriterSectionProps {
  rewrite: CVRewrite;
  t: any;
  darkMode: boolean;
}

const RewriterSection: React.FC<RewriterSectionProps> = ({ rewrite, t, darkMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrite.optimizedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-2 px-2">
        {/* FIX: Removed unsupported 'position' prop. The component dynamically calculates its position. */}
        <InfoTooltip text={t.rewriteTooltip} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Section Intelligence Overview</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Before / Original */}
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4 opacity-50 px-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">{t.originalVersion}</span>
          </div>
          <div className={`flex-grow p-8 rounded-[32px] border-2 border-dashed transition-all opacity-60 ${
            darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}>
            <p className="text-sm font-medium leading-relaxed italic">
              "{rewrite.originalSummaryExcerpt}..."
            </p>
          </div>
        </div>

        {/* After / Optimized */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">{t.optimizedVersion}</span>
            </div>
            <button 
              onClick={handleCopy}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                copied 
                ? 'bg-emerald-600 border-2 border-emerald-500 text-white' 
                : 'bg-blue-600 border-2 border-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 shadow-blue-500/20'
              }`}
            >
              {copied ? t.copiedText : t.copyToClipboard}
            </button>
          </div>
          <div className={`flex-grow p-10 rounded-[40px] border-2 shadow-2xl relative transition-all group ${
            darkMode ? 'bg-blue-900/10 border-blue-800 text-slate-100' : 'bg-blue-50/30 border-blue-100 text-slate-950'
          }`}>
            <p className="text-base md:text-lg font-bold leading-[1.8] text-justify relative z-10 tracking-tight">
              {rewrite.optimizedSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Integrated Keywords / Badges */}
      <div className="pt-8 border-t-2 border-slate-200 dark:border-slate-800">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-3">
          {t.whyBetter} <span className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></span>
        </h4>
        <div className="flex flex-wrap gap-3">
          {rewrite.keywordImprovements.map((kw, idx) => (
            <div key={idx} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border transition-transform hover:scale-105 ${
              darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {kw}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewriterSection;