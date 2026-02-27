import React from 'react';
import { CompetitorAnalysis } from '../types';
import { BuildingIcon, RadarIcon } from './UIComponents';

interface CompetitorSectionProps {
  analysis: CompetitorAnalysis;
  t: any;
}

const CompetitorCard: React.FC<{
  name: string;
  focus: string;
  diff: string;
  t: any;
}> = ({ name, focus, diff, t }) => {
  return (
    <div className="p-8 rounded-[32px] border-2 shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl flex flex-col h-full bg-white border-slate-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl text-xl shadow-inner bg-indigo-50 border border-indigo-100 text-indigo-700">
          <BuildingIcon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-black tracking-tight text-slate-950 leading-none">{name}</h4>
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1 block">Competitor</span>
        </div>
      </div>

      <div className="mb-8">
        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.competitorFocus}</h5>
        <p className="text-sm font-bold text-slate-800 leading-relaxed italic">
          "{focus}"
        </p>
      </div>

      <div className="mt-auto p-6 rounded-2xl border-2 transition-all bg-indigo-50 border-indigo-100 text-indigo-950">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">⚔️</span>
          <h5 className="text-[10px] font-black uppercase tracking-widest">{t.diffStrategy}</h5>
        </div>
        <p className="text-sm font-black leading-relaxed">
          {diff}
        </p>
      </div>
    </div>
  );
};

const CompetitorSection: React.FC<CompetitorSectionProps> = ({ analysis, t }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Market Trend Banner - More Integrated */}
      <div className="p-6 sm:p-8 md:p-10 rounded-[40px] border-2 shadow-sm transition-all flex flex-col md:flex-row items-center gap-8 bg-white border-indigo-100">
        <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl flex-shrink-0 animate-pulse-slow shadow-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
          <RadarIcon className="w-8 h-8" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">{t.marketTrendLabel}</h4>
          <p className="text-xl md:text-2xl font-black text-slate-950 leading-tight">
            {analysis.marketTrend}
          </p>
        </div>
      </div>

      {/* Section Subtitle */}
      <div className="flex items-center gap-4 px-4">
        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">{t.competitorTitle}</h3>
        <div className="h-[1px] flex-grow bg-slate-200"></div>
      </div>

      {/* Competitor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {analysis.topCompetitors.map((comp, idx) => (
          <CompetitorCard 
            key={idx}
            name={comp.name}
            focus={comp.productFocus}
            diff={comp.differentiation}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default CompetitorSection;
