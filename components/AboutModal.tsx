import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-[48px] p-10 md:p-14 border-2 border-slate-300 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white z-[11100]"
        >
          ✕
        </button>
        
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-inner mb-4">💎</div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 dark:text-white">A JobRadar AI Küldetése </h2>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Misszió</h3>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed text-justify">
                A JobRadar AI egy professzionális karrier-stratégiai eszköz, amely a mesterséges intelligencia erejével hidalja át a szakadékot a tehetséges jelöltek és a valódi döntéshozók között. Nem automatizált kiválasztási szoftver, hanem egy "Human-in-the-loop" döntéstámogató platform.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Technológia - Vektoros PDF Elemzés</h3>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed text-justify">
                A legtöbb rendszer csak a szöveget látja. Mi a struktúrát is. Rendszerünk a PDF állományok natív vektoros rétegét dolgozza fel. Ez azt jelenti, hogy nemcsak azt értjük, mit írt le, hanem azt is, hogyan látja ezt egy vállalati ATS. Azonosítjuk a rejtett formázási hibákat, amelyek miatt egy senior pályázat is fennakadhat a szűrőn.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Adatintegritás - Miért a szövegbeillesztés?</h3>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed text-justify">
                Miért nem elég a link? A vállalati karrieroldalak dinamikusak. A hirdetés szövegének közvetlen bemásolása ("Raw Data Input") garantálja a 100%-os pontosságot. Ezzel kizárjuk a hibás webes beolvasásból eredő torzításokat (hallucinációt), biztosítva, hogy a stratégia valós adatokra épüljön.
              </p>
            </section>
          </div>

          <div className="pt-10 border-t-2 border-slate-100 dark:border-slate-800 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-lg">🇪🇺</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                EU AI ACT Compliant: A rendszer megfelel az Európai Unió szigorú szabályozásának.
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="w-full py-5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
            >
              Bezárás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};