import React, { useState } from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hu' | 'en';
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose, lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = lang === 'hu' ? [
    {
      question: 'Mi az a JobRadar AI és miben különbözik a hagyományos önéletrajz-elemzőktől?',
      answer: (
        <div className="space-y-2">
          <p>A JobRadar AI egy "Executive Career Strategy" platform, amelyet Google mérnökök és senior HR vezetők kalibráltak. Nem egy egyszerű kulcsszó-kereső (ATS), hanem célja az információs aszimmetria felszámolása a jelöltek és a döntéshozók között, megkerülve a hagyományos HR szűrőket.</p>
          <p>A rendszer egy "Kettős motorú processzorként" (Dual-Engine Processor) működik:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cinikus ATS Auditor:</strong> Kíméletlenül feltárja az önéletrajzod hibáit, hiányosságait és a "Red Flag"-eket, amik miatt a HR azonnal elutasítana.</li>
            <li><strong>Stratégiai Tanácsadó:</strong> Nemcsak kritizál, hanem azonnali, akcióképes megoldásokat dolgoz ki a hiányosságokra, és a cég aktuális üzleti igényeihez köti a profilodat.</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Hogyan számítja ki a rendszer a Match Score-t (Illeszkedési pontszámot)?',
      answer: (
        <div className="space-y-2">
          <p>A Match Score nem egy statikus hasonlósági mutató, hanem egy dinamikus stratégiai index, amely szemantikai vektorokat és üzleti relevanciát mér. A végső pontszám négy fő pillérből áll össze:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Hard Skills (Technikai tudás):</strong> Technológiai és szakmai kompetenciák bináris és mélységi vizsgálata. Nem elég a kulcsszó, a kontextust is értjük.</li>
            <li><strong>Soft Skills (Személyes kompetenciák):</strong> Személyiségjegyek, kommunikáció és stakeholder menedzsment kontextuális elemzése a CV-ben leírt eredmények alapján.</li>
            <li><strong>Experience (Tapasztalat):</strong> A szakmai tapasztalat mélysége és ideje (lásd a Temporal Analysis szabályt).</li>
            <li><strong>Domain Fit (Iparági illeszkedés):</strong> Iparági és üzleti modell ismerete, szemantikai egyezés az iparági kontextussal (pl. FinTech vs. Telco).</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Számít, hogy mikor szereztem egy adott tapasztalatot?',
      answer: (
        <div className="space-y-2">
          <p>Igen, az algoritmus a legösszetettebb logikáját, a Temporal Analysis-t (Időbeli avulás) alkalmazza a tapasztalatokra. A technológia és az üzleti környezet gyorsan változik, így a tudás értéke is csökken az idővel.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>0-5 év (Aktív tudás):</strong> 100%-os relevancia és súlyozás. Ez a legértékesebb tőkéd.</li>
            <li><strong>5-10 év (Történelmi kontextus):</strong> Csökkenő relevancia. Megmutatja a stabilitást, de a konkrét technikai tudás már elavult lehet.</li>
            <li><strong>10+ év (Alapozó háttér):</strong> Csak háttérinformációként szolgál, minimális súllyal (pl. egy 10 évvel ezelőtti ügyfélkapcsolati háló már nem minősül aktív tőkének).</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Vannak olyan kizáró tényezők, amik drasztikusan rontják a pontszámot?',
      answer: (
        <div className="space-y-2">
          <p>Igen, a rendszer alkalmaz egy <strong>Nyelvi Hard Gate (A 65-ös szabály)</strong> nevű kritikus korlátot.</p>
          <p>Ha az álláshirdetés (JD) explicit módon előír egy nyelvismeretet (pl. "Fluent English"), de az az önéletrajzban (CV) nem szerepel, a Match Score maximum 65% lehet, függetlenül attól, hogy mennyire tökéletes a szakmai tapasztalatod. A nyelvtudás hiánya a legtöbb multinacionális cégnél azonnali kizáró ok.</p>
          <p><em>Kivétel:</em> Létezik egy Licenc kivétel: a rendszer minden esetben automatikusan feltételezi, hogy a jelölt rendelkezik B kategóriás jogosítvánnyal, így ez soha nem von le pontot.</p>
        </div>
      )
    },
    {
      question: 'Honnan szerzi a rendszer az adatokat a cégekről? Kitalálja őket?',
      answer: (
        <div className="space-y-2">
          <p>A rendszer garantálja, hogy nem hallucinál adatokat. Egy szigorú kétlépcsős munkafolyamatot (Execution Pipeline) használ a maximális pontosság érdekében:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stage 1 (Kutatás):</strong> A Google Search segítségével valós idejű, strukturált hírszerzési jelentést készít a cégről. Elemzi a piaci pozíciót, a versenytársakat, a legfrissebb híreket és a vállalati kultúrát (pl. Glassdoor/Reddit vélemények alapján). Ezt nagyon alacsony (0.1) "hőmérsékleten" végzi a maximális faktualitás érdekében.</li>
            <li><strong>Stage 2 (Stratégiai Analízis):</strong> Ezt az összegyűjtött, valós adatot használja fel a komplex stratégiai kimenet (kísérőlevél, interjúkérdések) legyártásához.</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Milyen stratégiákat és dokumentumokat készít nekem a rendszer az interjúra?',
      answer: (
        <div className="space-y-2">
          <p>A JobRadar AI egy teljes "Executive Toolkit"-et generál a felkészüléshez:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Kísérőlevél Stratéga:</strong> Egy modern, "Önöző" hangvételű, döntéshozónak címzett levél, amely a cég üzleti fájdalompontjaira fókuszál, kerülve az AI-kliséket.</li>
            <li><strong>Bértárgyalási Stratéga:</strong> Megbecsüli a reális bruttó bérsávot, meghatároz egy BATNA-t (legjobb alternatíva), és 5 különböző pszichológiai tárgyalási forgatókönyvet ad (pl. "Low-ball" ajánlat vagy "Benefit Pivot" esetére).</li>
            <li><strong>Interviewer X-Ray (Profilozó):</strong> Előrejelzi a felvételi bizottság 3 tagját, meghatározza a DISC profiljukat, a legnagyobb félelmüket és a "Yes-Trigger"-t (ami meggyőzi őket).</li>
            <li><strong>Versenytárs Elemzés:</strong> Akcióképes stratégiai előnyt fogalmaz meg, amellyel a megcélzott cég legyőzheti a versenytársait.</li>
            <li><strong>90 Napos Stratégiai Terv:</strong> Egy 3 fázisból álló (1-30, 31-60, 61-90 nap) konkrét, a pozícióhoz kötött akcióterv, amivel azonnal bizonyíthatod a rátermettségedet.</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Mi az a JobRadar Coach?',
      answer: (
        <div className="space-y-2">
          <p>A JobRadar Coach egy interaktív, természetes nyelven kommunikáló mentor modul, amely felkészít az éles interjúhelyzetre.</p>
          <p>"Tough love" (szigorú szeretet) attitűddel rendelkezik: nem fogad el homályos vagy kitérő válaszokat. 1-től 10-ig terjedő skálán osztályozza az interjúra adott gyakorló válaszaidat, és profi B2B értékesítési módszertanok (pl. SPIN, Challenger Sale) alapján ad "Executive" megfogalmazási javaslatokat, hogy sokkal meggyőzőbb legyél.</p>
        </div>
      )
    },
    {
      question: 'Biztonságban vannak a feltöltött adataim?',
      answer: (
        <div className="space-y-2">
          <p>Igen, maximálisan. A rendszer teljesen "Stateless" (állapotmentes) módon működik.</p>
          <p>Nincs tartós adatmentés; a rendszer minden elemzési kérést függetlenül, a GDPR irányelveinek megfelelően kezel. Amint bezárod az oldalt vagy új elemzést kezdesz, a feltöltött önéletrajzod és a megadott adatok véglegesen törlődnek a memóriából.</p>
        </div>
      )
    }
  ] : [
    {
      question: 'What is JobRadar AI and how is it different from traditional resume scanners?',
      answer: (
        <div className="space-y-2">
          <p>JobRadar AI is an "Executive Career Strategy" platform calibrated by Google engineers and senior HR leaders. It's not a simple keyword scanner (ATS), but aims to eliminate the information asymmetry between candidates and decision-makers, bypassing traditional HR filters.</p>
          <p>The system operates as a "Dual-Engine Processor":</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cynical ATS Auditor:</strong> Ruthlessly exposes the flaws, gaps, and "Red Flags" in your resume that would cause HR to immediately reject you.</li>
            <li><strong>Strategic Advisor:</strong> Doesn't just criticize, but develops immediate, actionable solutions for the gaps, and ties your profile to the company's current business needs.</li>
          </ul>
        </div>
      )
    },
    {
      question: 'How does the system calculate the Match Score?',
      answer: (
        <div className="space-y-2">
          <p>The Match Score is not a static similarity metric, but a dynamic strategic index that measures semantic vectors and business relevance. The final score consists of four main pillars:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Hard Skills:</strong> Binary and in-depth examination of technological and professional competencies. Keywords aren't enough, we understand the context.</li>
            <li><strong>Soft Skills:</strong> Contextual analysis of personality traits, communication, and stakeholder management based on the results described in the CV.</li>
            <li><strong>Experience:</strong> The depth and duration of professional experience (see the Temporal Analysis rule).</li>
            <li><strong>Domain Fit:</strong> Knowledge of the industry and business model, semantic match with the industry context (e.g., FinTech vs. Telco).</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Does it matter when I gained a certain experience?',
      answer: (
        <div className="space-y-2">
          <p>Yes, the algorithm applies its most complex logic, Temporal Analysis, to experiences. Technology and the business environment change rapidly, so the value of knowledge decreases over time.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>0-5 years (Active knowledge):</strong> 100% relevance and weighting. This is your most valuable asset.</li>
            <li><strong>5-10 years (Historical context):</strong> Decreasing relevance. Shows stability, but specific technical knowledge may be outdated.</li>
            <li><strong>10+ years (Foundational background):</strong> Serves only as background information with minimal weight (e.g., a client network from 10 years ago is no longer considered active capital).</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Are there any disqualifying factors that drastically reduce the score?',
      answer: (
        <div className="space-y-2">
          <p>Yes, the system applies a critical constraint called the <strong>Language Hard Gate (The Rule of 65)</strong>.</p>
          <p>If the job description (JD) explicitly requires a language skill (e.g., "Fluent English"), but it is not included in the resume (CV), the Match Score can be a maximum of 65%, regardless of how perfect your professional experience is. Lack of language skills is an immediate disqualifier at most multinational companies.</p>
          <p><em>Exception:</em> There is a License exception: the system automatically assumes in all cases that the candidate has a category B driver's license, so this never deducts points.</p>
        </div>
      )
    },
    {
      question: 'Where does the system get data about companies? Does it make them up?',
      answer: (
        <div className="space-y-2">
          <p>The system guarantees that it does not hallucinate data. It uses a strict two-step Execution Pipeline for maximum accuracy:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stage 1 (Research):</strong> Uses Google Search to create a real-time, structured intelligence report on the company. It analyzes market position, competitors, latest news, and corporate culture (e.g., based on Glassdoor/Reddit reviews). This is done at a very low (0.1) "temperature" for maximum factuality.</li>
            <li><strong>Stage 2 (Strategic Analysis):</strong> Uses this collected, real data to generate the complex strategic output (cover letter, interview questions).</li>
          </ul>
        </div>
      )
    },
    {
      question: 'What strategies and documents does the system prepare for me for the interview?',
      answer: (
        <div className="space-y-2">
          <p>JobRadar AI generates a complete "Executive Toolkit" for preparation:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cover Letter Strategist:</strong> A modern, business-focused document addressed to the decision-maker, focusing on the company's pain points, avoiding AI clichés.</li>
            <li><strong>Salary Negotiation Strategist:</strong> Estimates a realistic gross salary band, defines a BATNA (Best Alternative to a Negotiated Agreement), and provides 5 different psychological negotiation scripts (e.g., for a "Low-ball" offer or "Benefit Pivot").</li>
            <li><strong>Interviewer X-Ray (Profiler):</strong> Predicts 3 members of the hiring committee, determines their DISC profile, their biggest fear, and the "Yes-Trigger" (what convinces them).</li>
            <li><strong>Competitor Analysis:</strong> Formulates an actionable strategic advantage that the target company can use to beat its competitors.</li>
            <li><strong>90-Day Strategic Plan:</strong> A concrete, 3-phase (1-30, 31-60, 61-90 days) action plan tied to the position, so you can immediately prove your aptitude.</li>
          </ul>
        </div>
      )
    },
    {
      question: 'What is the JobRadar Coach?',
      answer: (
        <div className="space-y-2">
          <p>The JobRadar Coach is an interactive mentor module communicating in natural language that prepares you for the live interview situation.</p>
          <p>It has a "Tough love" attitude: it does not accept vague or evasive answers. It grades your practice answers for the interview on a scale of 1 to 10, and provides "Executive" phrasing suggestions based on pro B2B sales methodologies (e.g., SPIN, Challenger Sale) to make you much more persuasive.</p>
        </div>
      )
    },
    {
      question: 'Is my uploaded data safe?',
      answer: (
        <div className="space-y-2">
          <p>Yes, absolutely. The system operates in a completely "Stateless" manner.</p>
          <p>There is no persistent data storage; the system handles each analysis request independently, in accordance with GDPR guidelines. As soon as you close the page or start a new analysis, your uploaded resume and provided data are permanently deleted from memory.</p>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-[40px] p-6 md:p-10 border-2 border-slate-300 dark:border-slate-800 shadow-2xl relative flex flex-col h-[90vh]">
        <div className="flex-shrink-0 flex justify-between items-center pb-6 border-b-2 border-slate-100 dark:border-slate-800">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">
            {lang === 'hu' ? 'JobRadar AI - Gyakran Ismételt Kérdések' : 'JobRadar AI - Frequently Asked Questions'}
          </h2>
          <button 
            onClick={onClose} 
            className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white z-[11100] shrink-0"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-grow my-6 pr-4 overflow-y-auto custom-scrollbar space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-black text-slate-900 dark:text-white pr-4">{faq.question}</h3>
                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[1000px] pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-shrink-0 pt-6 border-t-2 border-slate-100 dark:border-slate-800 flex justify-end">
            <button 
              onClick={onClose} 
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
            >
              {lang === 'hu' ? 'Bezárás' : 'Close'}
            </button>
        </div>
      </div>
    </div>
  );
};
