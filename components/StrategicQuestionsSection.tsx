
import React, { useState } from 'react';

interface StrategicQuestionsSectionProps {
  questions: string[];
  answers: string[];
  t: any;
  darkMode: boolean;
}

const StrategicQuestionsSection: React.FC<StrategicQuestionsSectionProps> = ({ questions, answers, t, darkMode }) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const getAnswer = (idx: number) => {
    if (answers && answers[idx]) return answers[idx];
    return "A stratégiai válasz szimulációja generálás alatt áll. Kérjük, használja a STAR (Szituáció, Feladat, Akció, Eredmény) módszert a válasz felépítéséhez, kiemelve a releváns ROI mutatókat.";
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {questions.map((q, idx) => (
        <div 
          key={idx}
          className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
            expandedIdx === idx 
            ? (darkMode ? 'bg-slate-800 border-violet-500/50 shadow-lg' : 'bg-white border-violet-500 shadow-xl scale-[1.01]')
            : (darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300')
          }`}
        >
          <button 
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            className="w-full flex items-center gap-6 p-6 text-left"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors shrink-0 ${
              expandedIdx === idx ? 'bg-violet-600 text-white' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400'
            }`}>
              0{idx + 1}
            </div>
            <div className="flex-grow">
              <p className={`text-sm md:text-base font-black leading-snug ${darkMode ? 'text-white' : 'text-slate-950'}`}>{q}</p>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-500 shrink-0 ${
              expandedIdx === idx ? 'rotate-180 border-violet-500 text-violet-500' : 'rotate-0 border-slate-300 dark:border-slate-700 text-slate-400'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </button>

          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedIdx === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className={`p-8 pt-0 border-t-2 ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
              <div className={`p-6 rounded-2xl border-2 mt-4 ${darkMode ? 'bg-slate-950/40 border-slate-700 text-slate-300' : 'bg-violet-50 border-violet-100 text-slate-900'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💡</span>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-700 dark:text-violet-400">Javasolt Válasz Stratégia</h4>
                </div>
                <p className="text-sm font-bold leading-relaxed text-justify whitespace-pre-wrap">
                  {getAnswer(idx)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StrategicQuestionsSection;
