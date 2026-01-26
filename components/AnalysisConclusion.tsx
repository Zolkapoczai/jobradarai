import React from 'react';
import { AnalysisConclusion as AnalysisConclusionType } from '../types';
import { CheckIcon, WarningIcon, LightBulbIcon } from './UIComponents';

type Props = {
  conclusion: AnalysisConclusionType;
};

const ConclusionList: React.FC<{title: string, items: string[], icon: React.ReactNode, colorClass: string}> = ({title, items, icon, colorClass}) => {
  if (items.length === 0) return null;
  return (
    <div className="mb-10 last:mb-0">
      <h4 className={`text-sm font-black uppercase tracking-widest ${colorClass} mb-6 flex items-center gap-3`}>
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        <span>{title}</span>
      </h4>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AnalysisConclusion: React.FC<Props> = ({ conclusion }) => {
  if (!conclusion || (conclusion.positives.length === 0 && conclusion.warnings.length === 0 && conclusion.opportunities.length === 0)) {
    return null;
  }

  return (
    <div className="p-8 rounded-[32px] border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <ConclusionList 
        title="Pozitívumok és Erősségek"
        items={conclusion.positives}
        icon={<CheckIcon />}
        colorClass="text-emerald-600 dark:text-emerald-400"
      />
      <ConclusionList 
        title="Lehetséges Kockázatok és Kérdőjelek"
        items={conclusion.warnings}
        icon={<WarningIcon />}
        colorClass="text-amber-600 dark:text-amber-400"
      />
      <ConclusionList 
        title="Stratégiai Lehetőségek"
        items={conclusion.opportunities}
        icon={<LightBulbIcon />}
        colorClass="text-sky-600 dark:text-sky-400"
      />
    </div>
  );
};

export default AnalysisConclusion;