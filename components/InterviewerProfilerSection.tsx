import React from 'react';
import { InterviewerProfiler } from '../types';
import { UserIcon } from './UIComponents';

interface InterviewerProfilerSectionProps {
  data: InterviewerProfiler;
  t: any;
  darkMode: boolean;
}

const InterviewerProfilerSection: React.FC<InterviewerProfilerSectionProps> = ({ data, t, darkMode }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {data.stakeholders.map((person, idx) => (
          <div key={idx} className={`p-8 rounded-[32px] border-2 shadow-sm transition-all duration-500 hover:scale-[1.02] flex flex-col h-full ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-xl shadow-inner bg-blue-100 dark:bg-blue-900/30 text-blue-600`}>
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black tracking-tight text-slate-950 dark:text-white leading-none">{person.role}</h4>
                <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest mt-1 block">DISC: {person.discProfile}</span>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.stakeholderFear}</h5>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed italic">
                  "{person.primaryFear}"
                </p>
              </div>
              <div className={`p-5 rounded-2xl border-2 ${darkMode ? 'bg-blue-950/20 border-blue-900/40 text-blue-100' : 'bg-blue-50 border-blue-100 text-blue-900'}`}>
                <h5 className="text-[10px] font-black uppercase tracking-widest mb-2">{t.stakeholderTrigger}</h5>
                <p className="text-sm font-black leading-relaxed">
                  {person.yesTrigger}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-6 sm:p-8 md:p-10 rounded-[40px] border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8 px-2">{t.iceBreakers}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.iceBreakerQuestions.map((q, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border-2 font-bold text-sm leading-relaxed transition-all hover:scale-[1.02] ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
            }`}>
              <span className="block text-blue-600 dark:text-blue-400 mb-2 text-[10px] font-black uppercase">Ice Breaker 0{idx+1}</span>
              "{q}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewerProfilerSection;