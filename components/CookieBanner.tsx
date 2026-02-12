import React from 'react';

interface CookieBannerProps {
  onAccept: () => void;
  onOpenPrivacy: () => void;
  t: any;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onOpenPrivacy, t }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[15000] p-4 sm:p-6 bg-white text-slate-800 border-t-2 border-slate-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-bold text-slate-700 text-center sm:text-left flex-grow">
          {t.cookieBannerText}{' '}
          <button onClick={onOpenPrivacy} className="font-black underline hover:text-blue-600 transition-colors">
            {t.privacy.title}
          </button>
          .
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <button 
            onClick={onAccept}
            className="px-8 py-3 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {t.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
