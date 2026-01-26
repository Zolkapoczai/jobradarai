import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { FactorBar, TooltipWrapper } from './UIComponents';

interface NeuralScoreRadarProps {
  result: AnalysisResult;
  scoreTheme: {
    text: string;
    bg: string;
    stroke: string;
  };
  t: any;
}

const NeuralScoreRadar: React.FC<NeuralScoreRadarProps> = ({ result, scoreTheme, t }) => {
  const [activeFactor, setActiveFactor] = useState<number | null>(null);
  const [radarHovered, setRadarHovered] = useState(false);

  const factors = [
    { label: t.hardSkills, value: result.scoreBreakdown.hardSkills, color: "#4285F4", pos: "top-[-15%] left-[-15%]", explanation: result.scoreExplanations.hardSkills },
    { label: t.softSkills, value: result.scoreBreakdown.softSkills, color: "#EA4335", pos: "top-[-15%] right-[-15%]", explanation: result.scoreExplanations.softSkills },
    { label: t.experience, value: result.scoreBreakdown.experience, color: "#FBBC05", pos: "bottom-[-15%] left-[-15%]", explanation: result.scoreExplanations.experience },
    { label: t.domainFit, value: result.scoreBreakdown.domainFit, color: "#34A853", pos: "bottom-[-15%] right-[-15%]", explanation: result.scoreExplanations.domainFit },
  ];

  return (
    <div 
      className="relative group flex flex-col items-center"
      onMouseEnter={() => setRadarHovered(true)}
      onMouseLeave={() => { setRadarHovered(false); setActiveFactor(null); }}
    >
      <div className={`relative w-72 h-72 flex items-center justify-center rounded-full transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] cursor-pointer ${radarHovered ? 'scale-[1.02]' : 'scale-100'}`}>
        <div className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-700 ${radarHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_80%)]"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-[1px] bg-slate-300 dark:bg-slate-600 absolute rotate-45 opacity-50"></div>
            <div className="w-full h-[1px] bg-slate-300 dark:bg-slate-600 absolute -rotate-45 opacity-50"></div>
            <div className="w-48 h-48 rounded-full border border-slate-300 dark:border-slate-600 absolute opacity-30"></div>
            <div className="w-32 h-32 rounded-full border border-slate-300 dark:border-slate-600 absolute opacity-30"></div>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full -rotate-90 p-2" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" className="stroke-slate-200 dark:stroke-slate-800 fill-none" strokeWidth="10" />
          <circle 
            cx="100" cy="100" r="85" fill="none" 
            stroke={scoreTheme.stroke} strokeWidth="12" 
            strokeDasharray={534} 
            strokeDashoffset={534 - (534 * result.matchScore) / 100} 
            strokeLinecap="round" 
            className="transition-all duration-[2500ms] ease-out drop-shadow-[0_0_12px_rgba(0,0,0,0.2)]" 
          />
        </svg>

        {factors.map((f, i) => (
          <div 
            key={i}
            onMouseEnter={() => setActiveFactor(i)}
            onMouseLeave={() => setActiveFactor(null)}
            className={`absolute ${f.pos} w-24 h-24 flex flex-col items-center justify-center transition-all duration-700 z-[100] ${radarHovered ? 'opacity-100 scale-110 translate-y-0' : 'opacity-0 scale-50 translate-y-8 pointer-events-none'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className={`relative w-14 h-14 flex items-center justify-center mb-2 transition-all duration-300 ${activeFactor === i ? 'scale-125 shadow-2xl' : 'scale-100'}`}>
              <div className="absolute inset-0 rounded-full blur-md opacity-20" style={{ backgroundColor: f.color }}></div>
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="3" />
                <circle 
                    cx="20" cy="20" r="18" fill="none" stroke={f.color} 
                    strokeWidth="4" strokeDasharray={113} 
                    strokeDashoffset={113 - (113 * f.value) / 100} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000"
                />
              </svg>
              <span className="text-[11px] font-black" style={{ color: f.color }}>{f.value}%</span>
            </div>
            <span className="text-[9px] font-black uppercase text-slate-800 dark:text-white tracking-tighter text-center leading-none px-2 drop-shadow-sm">{f.label}</span>
            {activeFactor === i && (
              <div className="absolute bottom-full mb-5 w-60 p-5 bg-slate-800/95 backdrop-blur-md text-white text-[11px] rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 z-[2000] border border-slate-700/50 pointer-events-none">
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800/95"></div>
                <p className="font-bold leading-relaxed text-justify opacity-95">{f.explanation}</p>
              </div>
            )}
          </div>
        ))}

        <TooltipWrapper text={t.tooltips.scoreRadar}>
          <div className={`relative flex flex-col items-center transition-all duration-700 ${radarHovered ? 'scale-90 opacity-30 blur-[2px]' : 'scale-100 opacity-100 blur-0'}`}>
            <div className="flex items-center gap-2">
              <span className={`text-8xl font-black ${scoreTheme.text} tracking-tighter tabular-nums drop-shadow-sm`}>{result.matchScore}%</span>
            </div>
            <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-100 tracking-[0.4em] mt-2">{t.matchLevel}</span>
          </div>
        </TooltipWrapper>
      </div>
      
      <div className="mt-14 w-full grid grid-cols-1 gap-6 px-4">
        <FactorBar label={t.hardSkills} value={result.scoreBreakdown.hardSkills} color="#4285F4" tooltip={result.scoreExplanations.hardSkills} isHighlighted={radarHovered || activeFactor === 0} />
        <FactorBar label={t.softSkills} value={result.scoreBreakdown.softSkills} color="#EA4335" tooltip={result.scoreExplanations.softSkills} isHighlighted={radarHovered || activeFactor === 1} />
        <FactorBar label={t.experience} value={result.scoreBreakdown.experience} color="#FBBC05" tooltip={result.scoreExplanations.experience} isHighlighted={radarHovered || activeFactor === 2} />
        <FactorBar label={t.domainFit} value={result.scoreBreakdown.domainFit} color="#34A853" tooltip={result.scoreExplanations.domainFit} isHighlighted={radarHovered || activeFactor === 3} />
      </div>
    </div>
  );
};

export default NeuralScoreRadar;