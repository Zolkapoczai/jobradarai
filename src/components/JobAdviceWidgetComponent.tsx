import React, { useState, useEffect } from 'react';
import { PrimaryButton } from './UIComponents';

interface JobAdviceWidgetProps {
  t: any; // Translations object
  lang: 'hu' | 'en';
}

const JobAdviceWidget: React.FC<JobAdviceWidgetProps> = ({ t, lang }) => {
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const adviceList = t.sarcasticAdvice || [];

  const handleNextAdvice = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCurrentAdviceIndex((prevIndex) => (prevIndex + 1) % adviceList.length);
      setIsGenerating(false);
    }, 500); // Simulate generation time
  };

  useEffect(() => {
    // Reset index if language changes to ensure fresh advice
    setCurrentAdviceIndex(0);
  }, [lang]);

  const displayAdvice = adviceList[currentAdviceIndex];
  const showTokenWarning = currentAdviceIndex >= 4; // After 5th advice (index 4)

  return (
    <div className="bg-white rounded-[40px] p-6 sm:p-8 md:p-10 border-2 border-slate-300 shadow-sm space-y-8 animate-in fade-in duration-500">
      <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 text-center">
        {t.adviceWidgetTitle}
      </h3>
      <div className="min-h-[150px] flex items-center justify-center">
        {isGenerating ? (
          <div className="animate-pulse text-slate-500 italic">{lang === 'hu' ? 'Új tipp generálása...' : 'Generating new tip...'}</div>
        ) : (
          <p className="text-sm font-bold text-slate-700 leading-relaxed text-justify whitespace-pre-wrap">
            {showTokenWarning ? t.adviceTokenWarning : displayAdvice}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <PrimaryButton 
          onClick={handleNextAdvice} 
          disabled={isGenerating}
          className="w-full md:w-auto px-10 shadow-xl"
        >
          {t.adviceNext}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default JobAdviceWidget;
