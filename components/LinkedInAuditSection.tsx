import React, { useState } from 'react';
import { LinkedInAudit } from '../types';
import { InfoTooltip } from './UIComponents';

interface LinkedInAuditSectionProps {
  audit: LinkedInAudit;
  t: any;
}

const HeadlineCard: React.FC<{
  text: string;
  copyText: string;
  copiedText: string;
}> = ({ text, copyText, copiedText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 rounded-2xl border-2 transition-all flex flex-col gap-4 group hover:shadow-md bg-white border-slate-200 hover:border-blue-400">
      <div className="text-sm font-bold text-slate-900 leading-relaxed italic">
        "{text}"
      </div>
      <button 
        onClick={handleCopy}
        className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border ${
          copied 
          ? 'bg-emerald-600 border-emerald-500 text-white' 
          : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-white'
        }`}
      >
        {copied ? copiedText : copyText}
      </button>
    </div>
  );
};

const LinkedInAuditSection: React.FC<LinkedInAuditSectionProps> = ({ audit, t }) => {
  const [copiedAbout, setCopiedAbout] = useState(false);

  const handleCopyAbout = () => {
    navigator.clipboard.writeText(audit.summarySuggestions);
    setCopiedAbout(true);
    setTimeout(() => setCopiedAbout(false), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Consistency & Checklist */}
        <div className="lg:col-span-4 space-y-10">
          <div className="flex flex-col items-center p-8 rounded-[32px] border-2 border-slate-200 bg-white shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">{t.consistencyLevel}</span>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" className="text-slate-100" strokeWidth="6" />
                <circle 
                  cx="50" cy="50" r="44" fill="none" stroke="#0077B5" 
                  strokeWidth="8" strokeDasharray="276" 
                  strokeDashoffset={276 - (276 * audit.consistencyScore) / 100} 
                  strokeLinecap="round" 
                  className="transition-all duration-[2000ms] ease-out drop-shadow-[0_0_8px_rgba(0,119,181,0.4)]"
                />
              </svg>
              <span className="text-3xl font-black text-slate-950">{audit.consistencyScore}%</span>
            </div>
          </div>

          <div className="p-8 rounded-[32px] border-2 border-slate-200 bg-white shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Visual Checklist</h4>
            <ul className="space-y-4">
              {audit.visualChecklist.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Keywords, Headlines, About */}
        <div className="lg:col-span-8 space-y-10">
          {/* Keywords */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800">{t.missingKeys}</h4>
              <InfoTooltip text="Essential professional keywords found in your CV but missing from your LinkedIn skills or about section." />
            </div>
            <div className="flex flex-wrap gap-2">
              {audit.missingKeywords.map((kw, idx) => (
                <span key={idx} className="px-4 py-2 bg-rose-50 border-2 border-rose-200 text-rose-700 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Headlines */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-4">{t.headlineRec}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {audit.headlineSuggestions.map((hl, idx) => (
                <HeadlineCard key={idx} text={hl} copyText={t.copyText} copiedText={t.copiedText} />
              ))}
            </div>
          </div>

          {/* Suggested About */}
          <div className="p-8 rounded-[32px] border-2 transition-all bg-white border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800">{t.suggestedAbout}</h4>
              <button 
                onClick={handleCopyAbout}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border-2 ${
                  copiedAbout 
                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-blue-700'
                }`}
              >
                {copiedAbout ? t.copiedText : t.copyToClipboard}
              </button>
            </div>
            <div className="p-6 rounded-2xl border-2 font-medium text-sm leading-relaxed whitespace-pre-wrap transition-colors italic bg-slate-50 border-slate-100 text-slate-700">
              {audit.summarySuggestions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInAuditSection;
