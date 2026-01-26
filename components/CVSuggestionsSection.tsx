
import React, { useState } from 'react';
import { CVSuggestion } from '../types';

interface CVSuggestionsSectionProps {
  suggestions: CVSuggestion[];
  t: any;
  darkMode: boolean;
}

const SuggestionCard: React.FC<{
  suggestion: CVSuggestion;
  darkMode: boolean;
  onClick: () => void;
  isActive: boolean;
}> = ({ suggestion, darkMode, onClick, isActive }) => {
  const impactColors = {
    high: darkMode ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-200',
    medium: darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const categoryIcons: Record<string, string> = {
    keywords: '🔑',
    focus: '🎯',
    structure: '📐',
    ats: '🤖',
  };

  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col h-full ${
      isActive 
        ? (darkMode ? 'bg-blue-900/20 border-blue-500 shadow-2xl scale-[1.02]' : 'bg-blue-50 border-blue-600 shadow-xl scale-[1.02]')
        : (darkMode ? 'bg-slate-900 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg')
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${impactColors[suggestion.impact as 'high' | 'medium']}`}>
          {suggestion.impact} Impact
        </div>
        <span className="text-xl group-hover:scale-125 transition-transform duration-300">{categoryIcons[suggestion.category] || '💡'}</span>
      </div>

      <div className="mb-4">
        <h4 className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 tracking-[0.2em] mb-1">{suggestion.category}</h4>
        <h3 className="text-base font-black text-slate-950 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">{suggestion.title}</h3>
      </div>

      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed text-justify line-clamp-3 group-hover:line-clamp-none transition-all">
        {suggestion.advice}
      </p>
      
      <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
        <span>See Implementation</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  );
};

const CVSuggestionsSection: React.FC<CVSuggestionsSectionProps> = ({ suggestions, t, darkMode }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const selectedSuggestion = selectedIdx !== null ? suggestions[selectedIdx] : null;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestions.map((item, idx) => (
          <SuggestionCard 
            key={idx}
            suggestion={item}
            darkMode={darkMode}
            isActive={selectedIdx === idx}
            onClick={() => setSelectedIdx(selectedIdx === idx ? null : idx)}
          />
        ))}
      </div>

      {/* Deep-dive Implementation Detail Section */}
      {selectedSuggestion && selectedSuggestion.implementationExample && (
        <div className={`p-10 rounded-[48px] border-2 shadow-2xl animate-in slide-in-from-top-4 duration-500 ${
          darkMode ? 'bg-slate-900 border-blue-900/40' : 'bg-blue-50/30 border-blue-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔧</span>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">Implementation Guide</h4>
              </div>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tight">{selectedSuggestion.title}</h3>
            </div>
            <button 
              onClick={() => setSelectedIdx(null)}
              className="text-[10px] font-black uppercase text-slate-500 border-b border-slate-500 hover:text-rose-600 hover:border-rose-600 transition-all"
            >
              Close Detail
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Before Example */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Common / Current Phrasing</span>
              </div>
              <div className={`p-8 rounded-[32px] border-2 border-dashed h-full ${
                darkMode ? 'bg-slate-950/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-inner'
              }`}>
                <p className="text-sm font-medium leading-relaxed italic">
                  "{selectedSuggestion.implementationExample.before}"
                </p>
              </div>
            </div>

            {/* After Example */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Strategic / Executive Upgrade</span>
              </div>
              <div className={`p-8 rounded-[32px] border-2 h-full relative group transition-all ${
                darkMode ? 'bg-blue-900/10 border-blue-500 text-slate-100' : 'bg-white border-blue-600 text-slate-950 shadow-xl'
              }`}>
                <p className="text-base md:text-lg font-black leading-relaxed text-justify relative z-10">
                  {selectedSuggestion.implementationExample.after}
                </p>
                <div className="absolute top-4 right-4 text-xs font-black opacity-20 uppercase tracking-tighter">Verified ROI</div>
              </div>
            </div>
          </div>

          {/* Strategic Explanation */}
          <div className={`mt-10 p-8 rounded-3xl border-2 transition-all ${
            darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-100/50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">💡</span>
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">The "Why" Behind This Change</h5>
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-300 leading-relaxed text-justify italic">
              {selectedSuggestion.implementationExample.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVSuggestionsSection;