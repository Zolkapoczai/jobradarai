
import React from 'react';
import { PlanPhase } from '../types';

interface Plan90DaySectionProps {
  plan: PlanPhase[];
  darkMode: boolean;
  t: any;
}

const Plan90DaySection: React.FC<Plan90DaySectionProps> = ({ plan, darkMode, t }) => {
  const phaseColors = [
    'border-blue-500', // Phase 1
    'border-indigo-500', // Phase 2
    'border-violet-500', // Phase 3
  ];
  const phaseTextColors = [
    'text-blue-600 dark:text-blue-400',
    'text-indigo-600 dark:text-indigo-400',
    'text-violet-600 dark:text-violet-400',
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {plan.map((phase, idx) => (
        <div key={idx} className={`relative pl-12 border-l-4 ${phaseColors[idx % phaseColors.length]}`}>
          <div className={`absolute -left-5 top-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg border-4 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
            <span className={phaseTextColors[idx % phaseTextColors.length]}>{idx + 1}</span>
          </div>
          <div className="ml-4">
            <h4 className={`text-lg font-black uppercase tracking-tight ${phaseTextColors[idx % phaseTextColors.length]} mb-6`}>{phase.phaseTitle}</h4>
            <ul className="space-y-4">
              {phase.actions.map((action, actionIdx) => (
                <li key={actionIdx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <svg className="w-6 h-6 mt-0.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">{action}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Plan90DaySection;
