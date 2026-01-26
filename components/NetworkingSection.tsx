
import React, { useState } from 'react';
import { NetworkingStrategy } from '../types';

interface NetworkingSectionProps {
  strategy: NetworkingStrategy;
  t: any;
  darkMode: boolean;
}

const NetworkingCard: React.FC<{
  title: string;
  description: string;
  content: string;
  darkMode: boolean;
  copyText: string;
  copiedText: string;
}> = ({ title, description, content, darkMode, copyText, copiedText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative flex flex-col p-8 rounded-[32px] border-2 shadow-lg transition-all duration-300 hover:shadow-xl ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h4 className="text-xs font-black uppercase text-blue-700 dark:text-blue-400 tracking-widest">{title}</h4>
          <div className="flex items-center gap-1.5 mt-1">
             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
             <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Strategic Script</span>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border-2 ${
            copied 
            ? 'bg-emerald-600 border-emerald-500 text-white' 
            : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500' : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-blue-700')
          }`}
        >
          {copied ? copiedText : copyText}
        </button>
      </div>

      <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-6 leading-relaxed italic">
        {description}
      </p>

      <div className={`flex-grow p-6 rounded-2xl border-2 font-mono text-sm leading-relaxed whitespace-pre-wrap select-all transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-900'
      }`}>
        {content}
      </div>
    </div>
  );
};

const NetworkingSection: React.FC<NetworkingSectionProps> = ({ strategy, t, darkMode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <NetworkingCard 
        title={t.netConnReq} 
        description={t.netConnReqDesc} 
        content={strategy.connectionRequest} 
        darkMode={darkMode} 
        copyText={t.copyText} 
        copiedText={t.copiedText} 
      />
      <NetworkingCard 
        title={t.netValueMsg} 
        description={t.netValueMsgDesc} 
        content={strategy.valueMessage} 
        darkMode={darkMode} 
        copyText={t.copyText} 
        copiedText={t.copiedText} 
      />
      <NetworkingCard 
        title={t.netFollowUp} 
        description={t.netFollowUpDesc} 
        content={strategy.followUp} 
        darkMode={darkMode} 
        copyText={t.copyText} 
        copiedText={t.copiedText} 
      />
    </div>
  );
};

export default NetworkingSection;
