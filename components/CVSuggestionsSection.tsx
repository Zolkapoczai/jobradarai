
import React, { useState } from 'react';
import { CVSuggestion } from '../types';
import { KeyIcon, TargetIcon, RulerIcon, ChipIcon, LightBulbIcon, PencilIcon } from './UIComponents';

interface CVSuggestionsSectionProps {
  suggestions: CVSuggestion[];
  t: any;
}

const SuggestionCard: React.FC<{
  suggestion: CVSuggestion;
  onClick: () => void;
  isActive: boolean;
}> = ({ suggestion, onClick, isActive }) => {
  const impactColors = {
    high: 'bg-rose-50 text-rose-700 border-rose-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    keywords: <KeyIcon />,
    focus: <TargetIcon />,
    structure: <RulerIcon />,
    ats: <ChipIcon />,
  };

  const icon = categoryIcons[suggestion.category] ?? <PencilIcon />;

  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col h-full ${
      isActive 
        ? 'bg-white border-blue-500 shadow-xl scale-[1.02]' 
        : 'bg-slate-50 border-slate-200 hover:border-blue-300'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
            {icon}
        </div>
        <div className="flex-grow">
          <h4 className={`text-base font-black transition-colors ${isActive ? 'text-blue-600' : 'text-slate-950'}`}>{suggestion.title}</h4>
        </div>
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${impactColors[suggestion.impact]}`}>
          {suggestion.impact}
        </div>
      </div>
      <p className="mt-4 text-xs font-bold text-slate-700 leading-relaxed flex-grow">
        {suggestion.advice}
      </p>
      <div className={`mt-4 text-center text-xs font-black uppercase tracking-widest transition-opacity ${isActive ? 'opacity-0' : 'opacity-100 group-hover:text-blue-600'}`}>
        {isActive ? 'Selected' : 'Click to see example'}
      </div>
    </div>
  );
};

const CVSuggestionsSection: React.FC<CVSuggestionsSectionProps> = ({ suggestions, t }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-slate-200">
        <p className="font-bold text-slate-600 italic">No CV suggestions available for analysis.</p>
      </div>
    );
  }
  
  const activeSuggestion = suggestions[activeIdx];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-4">
        {suggestions.map((s, idx) => (
          <SuggestionCard 
            key={idx} 
            suggestion={s} 
            onClick={() => setActiveIdx(idx)}
            isActive={activeIdx === idx}
          />
        ))}
      </div>
      <div className="lg:col-span-7">
        {activeSuggestion && activeSuggestion.implementationExample && (
          <div className="p-8 rounded-[32px] border-2 bg-white border-slate-200 sticky top-28 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <LightBulbIcon className="w-6 h-6 text-blue-500" />
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-800">{t.implExampleLabel}</h4>
            </div>
            <div className="space-y-6">
                <div>
                    <h5 className="text-[10px] font-black uppercase text-rose-600 mb-2">{t.beforeLabel}</h5>
                    <p className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-sm font-medium text-rose-800 italic">
                        "{activeSuggestion.implementationExample.before}"
                    </p>
                </div>
                <div>
                    <h5 className="text-[10px] font-black uppercase text-emerald-600 mb-2">{t.afterLabel}</h5>
                    <p className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-sm font-bold text-emerald-900">
                        "{activeSuggestion.implementationExample.after}"
                    </p>
                </div>
                 <div>
                    <h5 className="text-[10px] font-black uppercase text-slate-500 mb-2">{t.whyLabel}</h5>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                        {activeSuggestion.implementationExample.explanation}
                    </p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVSuggestionsSection;
