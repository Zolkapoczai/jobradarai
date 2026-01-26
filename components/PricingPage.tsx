import React from 'react';

interface PricingPageProps {
  t: any;
  lang: string;
  darkMode: boolean;
}

const PricingPage: React.FC<PricingPageProps> = ({ t, lang, darkMode }) => {
  const isEn = lang === 'en';
  
  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black uppercase tracking-tight text-slate-950 dark:text-white">{t.pricingTitle}</h2>
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t.pricingSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* 3-Day Plan (Action / Free Trial) */}
        <div className={`relative p-10 rounded-[48px] border-2 border-emerald-500/30 flex flex-col transition-all hover:scale-[1.02] shadow-xl ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
            {t.planFreeBadge}
          </div>
          <div className="flex justify-between items-start mb-8 mt-4">
            <h3 className="text-2xl font-black uppercase tracking-tight">{t.planFreeTitle}</h3>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-8 flex-grow">{t.planFreeDesc}</p>
          <div className="mb-8 flex flex-col">
            <div>
              <span className="text-4xl font-black">{isEn ? '0 EUR' : '0 Ft'}</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold ml-2">/ {t.planFreeTime}</span>
            </div>
            <div className="text-rose-600 font-black text-xs uppercase mt-2 tracking-widest">{isEn ? 'DEMO VERSION' : 'DEMO VERZIÓ'}</div>
          </div>
          <ul className="space-y-4 mb-10">
            {t.pricingFeats.map((feat: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <span className="text-emerald-600 font-black">✓</span> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-500/20">
            {t.planFreeBtn}
          </button>
        </div>

        {/* Weekly Plan (Active Seeker) */}
        <div className={`relative p-10 rounded-[48px] border-2 border-blue-600/40 flex flex-col transition-all hover:scale-[1.05] shadow-2xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
            MOST POPULAR
          </div>
          <div className="mb-8 mt-4">
            <h3 className="text-2xl font-black uppercase tracking-tight">{t.planWeeklyTitle}</h3>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-8 flex-grow">{t.planWeeklyDesc}</p>
          <div className="mb-8">
            <span className="text-4xl font-black">{isEn ? '0 EUR' : '0 Ft'}</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold ml-2">/ {t.planWeeklyTime}</span>
            <div className="text-rose-600 font-black text-xs uppercase mt-2 tracking-widest">{isEn ? 'DEMO VERSION' : 'DEMO VERZIÓ'}</div>
          </div>
          <ul className="space-y-4 mb-10">
            {t.pricingFeats.map((feat: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <span className="text-blue-700 font-black">✓</span> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full bg-blue-700 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-800 active:scale-95 shadow-xl shadow-blue-500/30">
            {t.planWeeklyBtn}
          </button>
        </div>

        {/* Monthly Plan (Career Builder) */}
        <div className={`p-10 rounded-[48px] border flex flex-col transition-all hover:scale-[1.02] shadow-xl ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="mb-8 mt-4">
            <h3 className="text-2xl font-black uppercase tracking-tight">{t.planMonthlyTitle}</h3>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-8 flex-grow">{t.planMonthlyDesc}</p>
          <div className="mb-8">
            <span className="text-4xl font-black">{isEn ? '0 EUR' : '0 Ft'}</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold ml-2">/ {t.planMonthlyTime}</span>
            <div className="text-rose-600 font-black text-xs uppercase mt-2 tracking-widest">{isEn ? 'DEMO VERSION' : 'DEMO VERZIÓ'}</div>
          </div>
          <ul className="space-y-4 mb-10">
            {t.pricingFeats.map((feat: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <span className="text-blue-600 font-black">✓</span> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all hover:opacity-90 active:scale-95">
            {t.planMonthlyBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
