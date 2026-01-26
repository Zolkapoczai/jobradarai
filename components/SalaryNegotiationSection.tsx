import React from 'react';
import { SalaryNegotiation } from '../types';

interface SalaryNegotiationSectionProps {
  data: SalaryNegotiation;
  t: any;
  darkMode: boolean;
}

const SalaryNegotiationSection: React.FC<SalaryNegotiationSectionProps> = ({ data, t, darkMode }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className={`p-10 rounded-[48px] border-2 shadow-2xl transition-all flex flex-col md:flex-row items-center gap-10 ${
        darkMode ? 'bg-slate-950/40 border-emerald-900/20' : 'bg-emerald-50/30 border-emerald-100'
      }`}>
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600`}>
          💰
        </div>
        <div className="text-center md:text-left flex-grow">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-400 mb-2">{t.salaryBandLabel}</h4>
          <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
            {data.grossSalaryBand}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-10 rounded-[40px] border-2 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">♟️</span>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.batnaLabel}</h4>
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed text-justify italic">
            {data.batnaPlan}
          </p>
        </div>

        <div className={`p-10 rounded-[40px] border-2 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🎁</span>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.tradeOffsLabel}</h4>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.nonMonetaryTradeOffs.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center text-[11px] font-black flex-shrink-0">✓</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4 px-4">
          <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">{t.scriptsLabel}</h4>
          <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {data.counterOfferScripts.map((item, idx) => (
            <div key={idx} className={`group p-8 rounded-[36px] border-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${
              darkMode ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/30' : 'bg-white border-slate-100 hover:border-emerald-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${
                  darkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {t.scenarioLabel || 'Scenario'} 0{idx + 1}
                </div>
                <h5 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-tight">{item.scenario}</h5>
              </div>
              <div className={`p-6 rounded-2xl border-2 font-medium text-base leading-relaxed whitespace-pre-wrap italic relative ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-100 text-slate-800'
              }`}>
                <span className="absolute -top-4 -left-2 text-4xl text-emerald-600 opacity-20 font-serif">"</span>
                {item.script}
                <span className="absolute -bottom-8 -right-2 text-4xl text-emerald-600 opacity-20 font-serif">"</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryNegotiationSection;