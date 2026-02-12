import React from 'react';

interface CookieBannerProps {
  onAccept: () => void;
  onOpenPrivacy: () => void;
  t: any;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onOpenPrivacy, t }) => {
  return (
    <div className="fixed inset-0 z-[15000] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-white rounded-[40px] p-8 md:p-10 border-2 border-slate-300 shadow-2xl text-center space-y-6">
        <div className="text-5xl" aria-hidden="true">🍪</div>
        <div className="space-y-2">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">{t.cookieTitle}</h2>
            <p className="text-sm font-bold text-slate-700">
                {t.cookieBannerText}
            </p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <button 
            onClick={onAccept}
            className="w-full px-8 py-4 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {t.cookieAccept}
          </button>
          <button 
            onClick={onOpenPrivacy} 
            className="w-full text-xs font-black uppercase text-slate-500 hover:text-blue-600 transition-colors py-2"
          >
            {t.privacy.title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;