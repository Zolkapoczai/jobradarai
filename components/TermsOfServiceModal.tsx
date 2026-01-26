import React from 'react';
import { exportTermsAsPdf } from '../utils/pdfGenerator';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: any;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    exportTermsAsPdf(t);
  };

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-[40px] p-6 md:p-10 border-2 border-slate-300 dark:border-slate-800 shadow-2xl relative flex flex-col h-[90vh]">
        <div className="flex-shrink-0 flex justify-between items-center pb-6 border-b-2 border-slate-100 dark:border-slate-800">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">{t.terms.title}</h2>
            <button 
              onClick={onClose} 
              className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white z-[11100] shrink-0"
            >
              ✕
            </button>
        </div>
        
        <div className="flex-grow my-6 pr-4 overflow-y-auto custom-scrollbar space-y-8 text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed text-justify">
            <h3 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-wide">{t.terms.title}</h3>
            <div className="space-y-4" dangerouslySetInnerHTML={{ __html: t.terms.contentHtml }} />
            
            <div className="pt-8 mt-8 border-t-2 border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-wide">{t.privacy.title}</h3>
                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: t.privacy.contentHtml }} />
            </div>
        </div>

        <div className="flex-shrink-0 pt-6 border-t-2 border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={handleDownload} 
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
            >
              {t.terms.downloadPdf}
            </button>
            <button 
              onClick={onClose} 
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black uppercase tracking-widest text-xs shadow-sm active:scale-95 transition-all"
            >
              {t.close}
            </button>
        </div>
      </div>
    </div>
  );
};
