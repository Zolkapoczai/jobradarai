
import React from 'react';
import { PreMortemAnalysis, RiskFactor } from '../types';

interface RedFlagSectionProps {
  analysis: PreMortemAnalysis;
  t: any;
  darkMode: boolean;
}

const RiskCard: React.FC<{
  risk: string;
  severity: RiskFactor['severity'];
  defense: string;
  darkMode: boolean;
  t: any;
}> = ({ risk, severity, defense, darkMode, t }) => {
  const severityColors = {
    High: darkMode ? 'bg-rose-950/30 border-rose-900/50 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900',
    Medium: darkMode ? 'bg-orange-950/30 border-orange-900/50 text-orange-200' : 'bg-orange-50 border-orange-200 text-orange-900',
    Low: darkMode ? 'bg-amber-950/30 border-amber-900/50 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900',
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
    <div className={`p-8 rounded-[32px] border-2 shadow-lg transition-all duration-500 hover:scale-[1.02] flex flex-col h-full ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${badgeStyles[severity]}`}>
          {labels[severity]}
        </div>
        <span className="text-xl">⚠️</span>
      </div>

      <div className="mb-6">
        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t.riskLabel}</h5>
        <p className="text-base font-black text-slate-950 dark:text-white leading-tight">
          {risk}
        </p>
      </div>

      <div className={`mt-auto p-6 rounded-2xl border-2 transition-all ${severityColors[severity]}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🛡️</span>
          <h5 className="text-[10px] font-black uppercase tracking-widest">{t.defenseLabel}</h5>
        </div>
        <p className="text-sm font-bold leading-relaxed italic">
          "{defense}"
        </p>
      </div>
    </div>
  );
};

const RedFlagSection: React.FC<RedFlagSectionProps> = ({ analysis, t, darkMode }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Employability Score</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${analysis.overallEmployabilityScore}%` }}></div>
          </div>
          <span className="text-xs font-black text-slate-900 dark:text-white">{analysis.overallEmployabilityScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {analysis.risks.map((item, idx) => (
          <RiskCard 
            key={idx}
            risk={item.risk}
            severity={item.severity}
            defense={item.defenseScript}
            darkMode={darkMode}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default RedFlagSection;
