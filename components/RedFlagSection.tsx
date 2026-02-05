import React, { useState } from 'react';
import { PreMortemAnalysis, RiskFactor } from '../types';

interface RedFlagSectionProps {
  analysis: PreMortemAnalysis;
  t: any;
}

const RiskCard: React.FC<{
  risk: string;
  severity: RiskFactor['severity'];
  defense: string;
  t: any;
}> = ({ risk, severity, defense, t }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const severityColors = {
    High: 'bg-rose-50 border-rose-200 text-rose-900',
    Medium: 'bg-orange-50 border-orange-200 text-orange-900',
    Low: 'bg-amber-50 border-amber-200 text-amber-900',
  };

  const badgeStyles = {
    High: 'bg-rose-600 text-white',
    Medium: 'bg-orange-500 text-white',
    Low: 'bg-amber-500 text-white',
  };

  const labels = {
    High: t.severityHigh,
    Medium: t.severityMedium,
    Low: t.severityLow,
  };

  return (
    <div 
      onClick={() => setIsRevealed(!isRevealed)}
      className="p-6 sm:p-8 rounded-[32px] border-2 shadow-lg transition-all duration-500 hover:scale-[1.02] flex flex-col h-full group cursor-pointer bg-white border-slate-200">
      {/* Header: Severity Badge */}
      <div className="flex justify-between items-start mb-6">
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${badgeStyles[severity]}`}>
          {labels[severity]}
        </div>
      </div>

      {/* Content: Vertical layout for Risk and Defense */}
      <div className="flex-grow flex flex-col">
        {/* Top: Risk Factor */}
        <div>
          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t.riskLabel}</h5>
          <p className="text-base font-black text-slate-950 leading-tight">
            {risk}
          </p>
        </div>

        {/* Bottom: Defense Strategy or Prompt */}
        <div className="mt-auto pt-6">
          {isRevealed ? (
            <div className={`p-6 rounded-2xl border-2 transition-all flex flex-col ${severityColors[severity]} animate-in fade-in duration-300`}>
              <div className="flex items-center gap-2 mb-3">
                <h5 className="text-[10px] font-black uppercase tracking-widest">{t.defenseLabel}</h5>
              </div>
              <p className="text-sm font-bold leading-relaxed italic">
                "{defense}"
              </p>
            </div>
          ) : (
            <div className="text-center py-2">
              <span className="px-5 py-3 rounded-full border-2 border-dashed border-slate-300 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:border-solid group-hover:border-blue-500 group-hover:text-blue-600 transition-all">
                Stratégia Felfedése
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const RedFlagSection: React.FC<RedFlagSectionProps> = ({ analysis, t }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Employability Score</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${analysis.overallEmployabilityScore}%` }}></div>
          </div>
          <span className="text-xs font-black text-slate-900">{analysis.overallEmployabilityScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {analysis.risks.map((item, idx) => (
          <RiskCard 
            key={idx}
            risk={item.risk}
            severity={item.severity}
            defense={item.defenseScript}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default RedFlagSection;
