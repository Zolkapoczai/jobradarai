import React from 'react';

const CustomIcons = {
  FileText: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  ClipboardText: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 14h6" />
      <path d="M9 18h6" />
      <path d="M9 10h6" />
    </svg>
  ),
  SearchGlobe: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 3a8 8 0 0 0 0 16" />
      <path d="M3 11h16" />
    </svg>
  ),
  Target: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  AlertTriangle: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Edit3: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Mail: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  DollarSign: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Calendar: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  UserCheck: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  Building: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  MessageSquare: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: any; // Translation object
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen || !t.howItWorksModal) return null;
  const { title, close, slides } = t.howItWorksModal;

  const iconMap: Record<string, React.ReactNode> = {
    "📄": <CustomIcons.FileText className="w-8 h-8 text-blue-500" />,
    "🔗": <CustomIcons.ClipboardText className="w-8 h-8 text-blue-500" />,
    "🕵️": <CustomIcons.SearchGlobe className="w-8 h-8 text-blue-500" />,
    "🎯": <CustomIcons.Target className="w-8 h-8 text-blue-500" />,
    "⚠️": <CustomIcons.AlertTriangle className="w-8 h-8 text-blue-500" />,
    "✨": <CustomIcons.Edit3 className="w-8 h-8 text-blue-500" />,
    "✉️": <CustomIcons.Mail className="w-8 h-8 text-blue-500" />,
    "💰": <CustomIcons.DollarSign className="w-8 h-8 text-blue-500" />,
    "📅": <CustomIcons.Calendar className="w-8 h-8 text-blue-500" />,
    "🧠": <CustomIcons.UserCheck className="w-8 h-8 text-blue-500" />,
    "🏢": <CustomIcons.Building className="w-8 h-8 text-blue-500" />,
    "🎙️": <CustomIcons.MessageSquare className="w-8 h-8 text-blue-500" />,
    "📈": <CustomIcons.Target className="w-8 h-8 text-blue-500" />, // Fallback if still used
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