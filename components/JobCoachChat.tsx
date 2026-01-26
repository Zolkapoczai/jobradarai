import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult } from '../types';
import { GoogleGenAI } from "@google/genai";
import { JobRadarLogo } from './UIComponents';
import { JOBRADAR_CONFIG } from '../config';

interface JobCoachChatProps {
  result: AnalysisResult;
  t: any;
  darkMode: boolean;
  lang: 'hu' | 'en';
}

const JobCoachChat: React.FC<JobCoachChatProps> = ({ result, t, darkMode, lang }) => {
  const welcomeText = t.coachWelcome.replace('{{company}}', result.companyName || (lang === 'hu' ? 'választott' : 'chosen'));
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string, type?: 'feedback' | 'question'}[]>([
    { role: 'ai', text: welcomeText }
  ]);
  const [input, setInput] = useState('');
  
  // Credits initialization from localStorage
  const [credits, setCredits] = useState<number>(() => {
    const saved = localStorage.getItem('jobradar_credits');
    return saved ? parseInt(saved, 10) : 25;
  });

  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(t.proTips[0]);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  const chatRef = useRef<any>(null);

  // Persistence effect for credits
  useEffect(() => {
    localStorage.setItem('jobradar_credits', credits.toString());
  }, [credits]);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const pros = result.pros?.length > 0 ? result.pros.join(', ') : 'No specific pros listed';
    const risks = result.cons?.length > 0 ? result.cons.join(', ') : 'No specific risks listed';
    
    const contextStr = `
      COMPANY: ${result.companyName}
      HIRING MANAGER: ${result.hiringManagerProfile}
      CANDIDATE STRENGTHS: ${pros}
      CANDIDATE RISK FACTORS: ${risks}
    `;
    
    const languageInstruction = lang === 'hu' 
      ? "IMPORTANT: A válaszaidat MAGYAR nyelven generáld. Use formal 'Önöző' (magázódó) address." 
      : "IMPORTANT: You MUST generate the entire chat response in ENGLISH.";

    const systemInstruction = `You are the "JobRadar Coach", a senior executive career mentor.
      Your mission is to train the candidate for ${result.companyName}.

      ROLE & TONE:
      - PROFESSIONAL YET TOUGH: You are supportive but strict. Do not accept weak answers.
      - LANGUAGE: ${lang === 'en' ? 'ENGLISH' : 'HUNGARIAN'}.
      - ${languageInstruction}
      - NO JSON: Speak naturally in paragraphs and bullet points. Do NOT output raw JSON structures.

      INTERACTION RULES:
      1. FEEDBACK FIRST: Start every response by grading the user's previous answer (if applicable) on a 1-10 scale.
      2. THE "WHY": Explain *why* an answer was weak (e.g., "Too generic," "Lacked metrics").
      3. NEXT QUESTION: Always end with a new, tough interview question derived from these risks: ${risks}.

      CONTEXT:
      ${contextStr}`;

      chatRef.current = ai.chats.create({
        model: JOBRADAR_CONFIG.AI_MODEL,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        }
      });
  
  }, [result, lang]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput(prev => (prev ? prev + ' ' + transcript : transcript));
          }
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech Recognition Error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
      recognitionRef.current.lang = lang === 'hu' ? 'hu-HU' : 'en-US';
    }
  }, [lang]);

  useEffect(() => {
    const scrollTask = () => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    const timer = setTimeout(scrollTask, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading, currentTip, hasError]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(t.sttNotSupported);
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
      }
    }
  };

  const sendMessage = async (retryText?: string) => {
    const textToUse = retryText || input;
    if (!textToUse.trim() || credits <= 0 || isLoading) return;
    
    if (!retryText) {
      setMessages(prev => [...prev, { role: 'user', text: textToUse }]);
      setInput('');
    }
    
    setLastUserMessage(textToUse);
    setHasError(false);
    setIsLoading(true);

    // Dynamic tip update
    if (Math.random() > 0.4) {
      const nextTipIndex = Math.floor(Math.random() * t.proTips.length);
      setCurrentTip(t.proTips[nextTipIndex]);
    }

    try {
      const response = await chatRef.current.sendMessage({ message: textToUse });
      const aiText = response.text;
      
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setCredits(prev => Math.max(0, prev - 1));
      setQuestionCount(prev => Math.min(5, prev + 1));
    } catch (error) {
      console.error("Coach API Error:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addTokens = (amount: number) => {
    setCredits(prev => prev + amount);
    setIsStoreOpen(false);
  };

  return (
    <div className={`flex flex-col h-[750px] rounded-[40px] border-2 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 relative ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}>
      
      {/* Token Store Modal */}
      {isStoreOpen && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-in zoom-in-95 duration-300">
          <div className={`max-w-4xl w-full p-8 md:p-12 rounded-[48px] border-2 shadow-2xl relative ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
            <button onClick={() => setIsStoreOpen(false)} className="absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition-all text-slate-900 dark:text-white font-black">✕</button>

            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-3 text-slate-950 dark:text-white">{t.buyTokensTitle}</h2>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.buyTokensSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Starter */}
              <div className={`group relative p-8 rounded-[32px] border-2 flex flex-col items-center text-center transition-all hover:border-blue-400 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">{t.tokenPack1}</span>
                <span className="text-4xl font-black mb-8 text-slate-950 dark:text-white">220</span>
                <button onClick={() => addTokens(220)} className="mt-auto w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">{lang === 'en' ? 'Buy now' : 'Vásárlás'}</button>
              </div>

              {/* Pro */}
              <div className={`group relative p-8 rounded-[32px] border-2 border-blue-500 flex flex-col items-center text-center transition-all scale-105 shadow-xl ${darkMode ? 'bg-blue-900/10' : 'bg-white'}`}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg">{t.bestValue}</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 mt-2">{t.tokenPack2}</span>
                <span className="text-5xl font-black mb-8 text-slate-950 dark:text-white">500</span>
                <button onClick={() => addTokens(500)} className="mt-auto w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">{lang === 'en' ? 'Best Price' : 'Legjobb ár'}</button>
              </div>

              {/* Elite */}
              <div className={`group relative p-8 rounded-[32px] border-2 flex flex-col items-center text-center transition-all hover:border-emerald-400 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">{t.tokenPack3}</span>
                <span className="text-4xl font-black mb-8 text-slate-950 dark:text-white">1200</span>
                <button onClick={() => addTokens(1200)} className="mt-auto w-full bg-slate-900 dark:bg-emerald-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">{lang === 'en' ? 'Get Elite' : 'Elite csomag'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-8 border-b-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 dark:bg-blue-600 flex items-center justify-center text-white text-xl shadow-xl">👔</div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-950 dark:text-white leading-none">{t.coachTitle}</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t.coachSubtitle}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsStoreOpen(true)}
            className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-amber-400 group"
          >
            <span className="text-amber-600 dark:text-amber-400 text-xs font-black tracking-widest">🪙 {credits}</span>
            <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">+</div>
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">{t.interviewProgress}</span>
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">{questionCount}/5</span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-1000 shadow-[0_0_12px_rgba(37,99,235,0.4)]" 
              style={{ width: `${(questionCount / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-grow overflow-y-auto p-8 space-y-10 bg-slate-50/30 dark:bg-slate-950/30 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {m.role === 'ai' ? (
              <div className="max-w-[90%] space-y-4">
                 <div className={`p-7 rounded-[32px] rounded-bl-none font-bold text-sm leading-relaxed shadow-sm border-2 ${
                    darkMode ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-950 border-slate-200'
                 }`}>
                   <div className="whitespace-pre-wrap">
                      {m.text.split('\n').map((line, idx) => {
                        const lowLine = line.toLowerCase();
                        const isFeedback = lowLine.includes('visszajelzés:') || lowLine.includes('feedback:');
                        const isQuestion = lowLine.includes('kérdés:') || lowLine.includes('question:');
                        
                        if (isFeedback) return <div key={idx} className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 mt-4 first:mt-0">{t.feedbackLabel}</div>;
                        if (isQuestion) return <div key={idx} className="text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 mt-8">{t.nextQuestionLabel}</div>;
                        
                        return <p key={idx} className={line.startsWith('-') ? 'ml-4 list-item mb-2' : 'mb-3 last:mb-0'}>{line}</p>;
                      })}
                   </div>
                 </div>
              </div>
            ) : (
              <div className="max-w-[80%] p-6 rounded-[28px] rounded-br-none font-bold text-sm bg-slate-900 text-white dark:bg-blue-600 shadow-xl shadow-blue-500/10">
                {m.text}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className={`p-6 rounded-[28px] rounded-bl-none border-2 flex items-center gap-4 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.coachThinking}</span>
            </div>
          </div>
        )}
        {hasError && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className={`p-6 rounded-[32px] rounded-bl-none border-2 flex flex-col gap-4 ${darkMode ? 'bg-rose-900/20 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <p className={`text-sm font-bold ${darkMode ? 'text-rose-200' : 'text-rose-800'}`}>{t.coachError}</p>
              </div>
              <button 
                onClick={() => sendMessage(lastUserMessage || undefined)}
                className="self-start px-8 py-3 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-700 transition-all active:scale-95"
              >
                {t.errorRetry}
              </button>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Pro-Tip Bar */}
      <div className="px-8 py-4 bg-blue-50 dark:bg-slate-800/80 border-t-2 border-slate-100 dark:border-slate-800 animate-in fade-in duration-500">
        <div className="flex items-center gap-4">
          <span className="text-lg">💡</span>
          <p className="text-[10px] font-bold text-slate-900 dark:text-slate-200 leading-relaxed uppercase tracking-widest">
            <span className="font-black text-blue-600 dark:text-blue-400 mr-2">PRO-TIP:</span>
            {currentTip}
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-8 border-t-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4 items-center">
        <button 
          onClick={toggleListening}
          disabled={isLoading || credits <= 0}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-2 relative disabled:opacity-30 ${
            isListening 
            ? 'bg-rose-100 border-rose-500 text-rose-600 dark:bg-rose-900/30 shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
            : 'bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 hover:border-blue-500 hover:text-blue-500'
          }`}
        >
          {isListening && <span className="absolute inset-0 rounded-2xl border-2 border-rose-500 animate-ping opacity-25"></span>}
          <svg className={`w-6 h-6 ${isListening ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
          </svg>
        </button>

        <input 
          disabled={isLoading || credits <= 0}
          className={`flex-grow rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-6 py-4 font-bold transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder:font-normal text-slate-900 dark:text-white disabled:opacity-50`}
          placeholder={isListening ? t.recording : (lang === 'en' ? 'Type your answer here...' : t.inputPlaceholder)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          onClick={() => sendMessage()} 
          disabled={isLoading || credits <= 0 || !input.trim()}
          className="bg-slate-950 dark:bg-blue-600 text-white w-14 h-14 rounded-2xl hover:opacity-90 disabled:bg-slate-300 transition-all shadow-xl active:scale-95 flex items-center justify-center group"
        >
          <svg className={`w-6 h-6 rotate-90 transition-transform ${isLoading ? 'animate-spin' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default JobCoachChat;