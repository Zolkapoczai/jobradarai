import React from 'react';
import { AnalysisConclusion as AnalysisConclusionType } from '../types';

type Props = {
  conclusion: AnalysisConclusionType;
};

const AnalysisConclusion: React.FC<Props> = ({ conclusion }) => {
  // Do not render the component if there's no data to display.
  if (!conclusion || (conclusion.positives.length === 0 && !conclusion.risk)) {
    return null;
  }

  return (
    <div className="p-8 rounded-[32px] border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      {conclusion.positives.length > 0 && (
        <div className={conclusion.risk ? 'mb-8' : ''}>
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">
            Érdemes lehet megpályázni, mert:
          </h4>
          <ul className="space-y-3 list-disc list-inside">
            {conclusion.positives.map((positive, index) => (
              <li key={index} className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed marker:text-emerald-500">
                <span>{positive}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {conclusion.risk && (
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">
            Amit érdemes mérlegelni:
          </h4>
           <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
             {conclusion.risk}
           </p>
        </div>
      )}
    </div>
  );
};

export default AnalysisConclusion;
