
import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: any; // Translation object
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-[32px] md:rounded-[48px] p-6 sm:p-10 md:p-14 border-2 border-slate-300 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white z-[11100]"
        >
          ✕
        </button>
        
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950 dark:text-white">{t.aboutTitle}</h2>
          </div>

          <div className="space-y-10">
            <section className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">{t.aboutMissionTitle}</h3>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed text-justify">
                {t.aboutMissionText}
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">{t.aboutTechTitle}</h3>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed text-justify">
                {t.aboutTechText}
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">{t.aboutDataTitle}</h3>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed text-justify">
                {t.aboutDataText}
              </p>
            </section>
          </div>

          <div className="pt-10 border-t-2 border-slate-100 dark:border-slate-800 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-lg">🇪🇺</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                {t.aboutComplianceText}
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="w-full py-5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
