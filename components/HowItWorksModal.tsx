import React from 'react';
import { DocumentTextIcon, LinkIcon, TargetIcon, SearchCircleIcon, MicrophoneIcon, TrendingUpIcon } from './UIComponents';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: any; // Translation object
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen || !t.howItWorksModal) return null;
  const { title, close, slides } = t.howItWorksModal;

  const iconMap: Record<string, React.ReactNode> = {
    "📄": <DocumentTextIcon className="w-8 h-8 text-blue-500" />,
    "🔗": <LinkIcon className="w-8 h-8 text-blue-500" />,
    "🎯": <TargetIcon className="w-8 h-8 text-blue-500" />,
    "🕵️": <SearchCircleIcon className="w-8 h-8 text-blue-500" />,
    "🎙️": <MicrophoneIcon className="w-8 h-8 text-blue-500" />,
    "📈": <TrendingUpIcon className="w-8 h-8 text-blue-500" />,
  };

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-[40px] p-6 md:p-10 border-2 border-slate-300 dark:border-slate-800 shadow-2xl relative flex flex-col h-[90vh]">
        <div className="flex-shrink-0 flex justify-between items-center pb-6 border-b-2 border-slate-100 dark:border-slate-800">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white z-[11100] shrink-0"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-grow my-6 pr-4 overflow-y-auto custom-scrollbar space-y-12">
          {slides.map((slide: any, slideIdx: number) => (
            <div key={slideIdx} className="p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-center text-2xl font-black uppercase tracking-tight text-blue-600 dark:text-blue-400 mb-8">{slide.title}</h3>
              
              {slide.points && (
                <div className={`grid grid-cols-1 ${slide.columns ? `md:grid-cols-${slide.columns}`: 'md:grid-cols-2'} gap-8`}>
                  {slide.points.map((point: any, pointIdx: number) => (
                    <div key={pointIdx} className="flex items-start gap-4">
                      <div className="mt-1">{iconMap[point.icon] || point.icon}</div>
                      <div>
                        <h4 className="font-black text-slate-950 dark:text-white">{point.title}</h4>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">{point.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {slide.steps && (
                 <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {slide.steps.map((step: any, stepIdx: number) => (
                            <div key={stepIdx} className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700">
                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">{step.title}</h4>
                                <div className="text-6xl font-black text-blue-200 dark:text-blue-900/50 mb-4">{stepIdx + 1}</div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{step.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm font-bold text-blue-800 dark:text-blue-200">
                        {slide.note}
                    </div>
                 </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex-shrink-0 pt-6 border-t-2 border-slate-100 dark:border-slate-800 flex justify-end">
            <button 
              onClick={onClose} 
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
            >
              {close}
            </button>
        </div>
      </div>
    </div>
  );
};