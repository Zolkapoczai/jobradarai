import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AppState, AnalysisResult, FileInput, AnalysisErrorInfo, ClarificationQuestion } from './types';
import { analyzeCareerMatch, searchCompanyWebsite, validateJdText, generateClarificationQuestions, regenerateCoverLetter } from './services/jobAgent';
import { translations } from './translations';
import { 
    GoogleHelloText, InfoTooltip, IntelligenceCard, FormInput, FormTextarea, PrimaryButton, JobRadarLogo, TooltipWrapper, ExternalLinkIcon,
    MicroscopeIcon, UserIcon, ChartBarIcon, WarningIcon, PencilIcon, SparklesIcon, TargetIcon, CashIcon, RadarIcon, BuildingIcon,
    DocumentTextIcon, CalendarIcon, TrendingUpIcon, LocationMarkerIcon, DnaIcon, LightBulbIcon
} from './components/UIComponents';
import JobCoachChat from './components/JobCoachChat';
import NeuralScoreRadar from './components/NeuralScoreRadar';
import PricingPage from './components/PricingPage';
import LinkedInAuditSection from './components/LinkedInAuditSection';
import CompetitorSection from './components/CompetitorSection';
import RedFlagSection from './components/RedFlagSection';
import CVSuggestionsSection from './components/CVSuggestionsSection';
import RewriterSection from './components/RewriterSection';
import SectionWrapper from './components/SectionWrapper';
import StrategicQuestionsSection from './components/StrategicQuestionsSection';
import SalaryNegotiationSection from './components/SalaryNegotiationSection';
import InterviewerProfilerSection from './components/InterviewerProfilerSection';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { FAQModal } from './components/FAQModal';
import { exportCoverLetter, exportActionPlan } from './utils/pdfGenerator';
import { processPdfFile, validatePdf } from './utils/fileProcessor';
import { extractTextFromPdf } from './utils/pdfExtractor';
import CookieBanner from './components/CookieBanner';
// FIX: Imported the missing Plan90DaySection component to resolve a compilation error.
import Plan90DaySection from './components/Plan90DaySection';


const App: React.FC = () => {
  const MOBILE_BREAKPOINT = 768; // Tailwind's 'md' breakpoint

  // Global App States
  const [lang, setLang] = useState<'hu' | 'en'>((sessionStorage.getItem('userLang') as 'hu' | 'en') || 'hu');
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [darkMode, setDarkMode] = useState(false); // Added for prop correctness
  
  const [state, setState] = useState<AppState>(AppState.IDLE);
  
  // Navigation & View States
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'preparation' | 'coach'>('overview');
  const [showPricing, setShowPricing] = useState(false);
  const [isTosOpen, setIsTosOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState<'welcome' | 'lang' | 'disclaimer'>('welcome');
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Input States
  const [jdText, setJdText] = useState('');
  const [jdUrl, setJdUrl] = useState('');
  const [companyNameInput, setCompanyNameInput] = useState('');
  const [interviewerLinkedin, setInterviewerLinkedin] = useState('');
  const [linkedinText, setLinkedinText] = useState('');
  const [userNote, setUserNote] = useState('');
  
  // File & Verification States
  const [cvFile, setCvFile] = useState<FileInput | null>(null);
  const [fileUploadStatus, setFileUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationState, setValidationState] = useState<{
    cv: 'loading' | 'success' | 'error' | 'idle';
    linkedin: 'loading' | 'success' | 'error' | 'idle';
    cvError?: string;
    linkedinError?: string;
  }>({ cv: 'idle', linkedin: 'idle' });
  const [isCheckingCv, setIsCheckingCv] = useState(false);
  const [showConfirmCompany, setshowConfirmCompany] = useState(false);
  const [allFoundCompanies, setAllFoundCompanies] = useState<{ url: string; title: string }[]>([]);
  const [foundCompany, setFoundCompany] = useState<{ url: string; title: string } | null>(null);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showInvalidJdModal, setShowInvalidJdModal] = useState(false);

  // Clarification Questions State
  const [clarificationQuestions, setClarificationQuestions] = useState<ClarificationQuestion[] | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Results & Progress
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [errorInfo, setErrorInfo] = useState<AnalysisErrorInfo | null>(null);

  // Regeneration states
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showCoverLetterNoteModal, setShowCoverLetterNoteModal] = useState(false);
  const [regenerateNote, setRegenerateNote] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  // Helpers
  const scoreTheme = useMemo(() => {
    if (!result) return null;
    const score = result.matchScore;
    if (score >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-50', stroke: '#10b981' };
    if (score >= 60) return { text: 'text-blue-600', bg: 'bg-blue-50', stroke: '#2563eb' };
    if (score >= 40) return { text: 'text-amber-600', bg: 'bg-amber-50', stroke: '#f59e0b' };
    return { text: 'text-rose-600', bg: 'bg-rose-50', stroke: '#e11d48' };
  }, [result]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const consent = sessionStorage.getItem('jobradar_cookie_consent');
    if (consent !== 'true') {
        setShowCookieBanner(true);
    }
  }, []);

  // Load Session State on Mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('jobradar_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.result && parsed.jdText) {
          setResult(parsed.result);
          setState(AppState.RESULT);
        }
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.companyNameInput) setCompanyNameInput(parsed.companyNameInput);
        if (parsed.jdText) setJdText(parsed.jdText);
        if (parsed.jdUrl) setJdUrl(parsed.jdUrl);
        if (parsed.userNote) setUserNote(parsed.userNote);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.interviewerLinkedin) setInterviewerLinkedin(parsed.interviewerLinkedin);
        if (parsed.linkedinText) setLinkedinText(parsed.linkedinText);
      } catch (e) {
        console.error("Failed to load session state:", e);
      }
    }
  }, []);

  // Save Session State on Changes
  useEffect(() => {
    const stateToSave = {
      result,
      currentStep,
      companyNameInput,
      jdText,
      jdUrl,
      userNote,
      activeTab,
      interviewerLinkedin,
      linkedinText
    };
    sessionStorage.setItem('jobradar_state', JSON.stringify(stateToSave));
  }, [result, currentStep, companyNameInput, jdText, jdUrl, userNote, activeTab, interviewerLinkedin, linkedinText]);

  // Handlers
  const handleAcceptCookies = () => {
    sessionStorage.setItem('jobradar_cookie_consent', 'true');
    setShowCookieBanner(false);
  };
  
  const handleLangSelect = (selectedLang: 'hu' | 'en') => {
    setLang(selectedLang);
    setIntroStep('disclaimer');
  };

  const handleAcknowledgeDisclaimer = () => {
    setShowIntro(false);
    sessionStorage.setItem('userLang', lang);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validatePdf(file);
    if (!validation.valid) {
      setFileUploadStatus('error');
      return;
    }
    setFileUploadStatus('uploading');
    setFileUploadProgress(0);
    try {
      const fileData = await processPdfFile(file, (p) => setFileUploadProgress(p));
      setCvFile(fileData);
      setFileUploadStatus('success');
    } catch {
      setFileUploadStatus('error');
    }
  };

  const handleContinueToJobDetails = async () => {
    if (!cvFile) return;
    
    setShowValidationModal(true);
    setValidationState({ cv: 'loading', linkedin: 'loading' });

    try {
      const extractedText = await extractTextFromPdf(cvFile.data);
      
      let cvStatus: 'success' | 'error' = 'success';
      let cvErrorMsg = '';

      // Check if text is too short (likely a scanned image or empty)
      if (extractedText.length < 150) {
        cvStatus = 'error';
        cvErrorMsg = lang === 'hu' 
            ? "Hoppá! Úgy tűnik, ez egy beszkennelt kép vagy üres dokumentum. A tokenek drágák, mi pedig vektoros PDF-eket eszünk reggelire. Kérlek, tölts fel egy valódi, szöveges PDF önéletrajzot!"
            : "Oops! Looks like a scanned image or an empty document. Tokens are expensive, and we eat vector PDFs for breakfast. Please upload a real, text-based PDF resume!";
      } else {
        // Basic check for common CV keywords (can be expanded)
        const lowerText = extractedText.toLowerCase();
        const hasCvKeywords = ['experience', 'tapasztalat', 'education', 'tanulmányok', 'skills', 'készségek', 'work', 'munka', 'university', 'egyetem'].some(kw => lowerText.includes(kw));
        
        if (!hasCvKeywords) {
          cvStatus = 'error';
          cvErrorMsg = lang === 'hu'
            ? "Biztos, hogy ez egy önéletrajz? Nem találtunk benne tipikus CV kulcsszavakat. Ne pazaroljuk az értékes AI tokeneket a nagymama receptjére. Kérlek, tölts fel egy igazi önéletrajzot!"
            : "Are you sure this is a resume? We couldn't find typical CV keywords. Let's not waste precious AI tokens on your grandma's recipe. Please upload a real resume!";
        }
      }

      let liStatus: 'success' | 'error' = 'success';
      let liErrorMsg = '';

      if (!linkedinText || linkedinText.trim().length < 50) {
        liStatus = 'error';
        liErrorMsg = lang === 'hu'
          ? "Nem töltöttél fel LinkedIn profilt, vagy túl rövid. Ennek hiányában a rendszer nem tudja elemezni a személyes márkádat és a hálózati tőkédet, ami csökkentheti a kulturális illeszkedés pontosságát és a béralku pozíciódat."
          : "You haven't uploaded a LinkedIn profile, or it's too short. Without it, the system cannot analyze your personal brand and network capital, which may reduce the accuracy of cultural fit and your salary negotiation position.";
      }

      setValidationState({
        cv: cvStatus,
        linkedin: liStatus,
        cvError: cvErrorMsg,
        linkedinError: liErrorMsg
      });

      if (cvStatus === 'success' && liStatus === 'success') {
        setTimeout(() => {
          setShowValidationModal(false);
          setCurrentStep(2);
        }, 1500);
      }

    } catch (error) {
      console.error("Error validating CV:", error);
      setValidationState({
        cv: 'error',
        linkedin: 'error',
        cvError: lang === 'hu'
          ? "Hiba történt a PDF olvasása közben. Lehet, hogy jelszóval védett vagy sérült? Kérlek, próbálj meg egy tiszta, vektoros PDF-et feltölteni."
          : "Error reading the PDF. Is it password protected or corrupted? Please try uploading a clean, vector PDF.",
        linkedinError: ''
      });
    }
  };

  const verifyCompany = async () => {
    if (!companyNameInput || !jdText || !cvFile) return;

    setState(AppState.VALIDATING_JD);

    try {
        const companyCacheKey = `jobradar_company_${companyNameInput.toLowerCase()}`;
        const cachedCompanies = sessionStorage.getItem(companyCacheKey);
        
        const companyPromise = cachedCompanies 
            ? Promise.resolve(JSON.parse(cachedCompanies))
            : searchCompanyWebsite(companyNameInput);

        const [isJdValid, companies] = await Promise.all([
            validateJdText(jdText),
            companyPromise
        ]);

        if (!isJdValid) {
            setShowInvalidJdModal(true);
            setState(AppState.IDLE);
            return;
        }

        if (!cachedCompanies && companies) {
            sessionStorage.setItem(companyCacheKey, JSON.stringify(companies));
        }

        if (companies && companies.length > 0) {
            setAllFoundCompanies(companies);
            setFoundCompany(companies[0]);
            setshowConfirmCompany(true);
        } else {
            setShowChoiceModal(true);
        }
        setState(AppState.IDLE);

    } catch(err: any) {
        setErrorInfo(err);
        setState(AppState.ERROR);
    }
  };
  
  const startAnalysis = async (customNote: string = '') => {
    if (!cvFile || !jdText) return;
    setState(AppState.GENERATING_QUESTIONS);
    setshowConfirmCompany(false);
    setShowChoiceModal(false);
    setShowInputModal(false);
    setUserNote(customNote); // Save user note for later

    try {
      const questions = await generateClarificationQuestions(cvFile, jdText, lang);
      setClarificationQuestions(questions);
      setUserAnswers(new Array(questions.length).fill(''));
      setCurrentQuestionIndex(0);
      setState(AppState.AWAITING_CLARIFICATION);
    } catch (err: any) {
      // If question generation fails, we can proceed to the final analysis.
      // Or show an error. Let's proceed for now.
      console.warn("Failed to generate clarification questions, proceeding with main analysis.", err);
      triggerFinalAnalysis();
    }
  };
  
  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswer(answer);
    
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);

    setTimeout(() => {
        setSelectedAnswer(null); // Reset for next question
        if (questionIndex < clarificationQuestions!.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // It's the last question, build final clarifications with the complete set of answers
            const finalClarifications = clarificationQuestions!.map((q, i) => ({
                question: q.question,
                answer: newAnswers[i], // Use the locally updated array
            }));
            triggerFinalAnalysis(finalClarifications);
        }
    }, 300);
  };

  const handleSkipQuestion = (questionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = ''; // Store empty string for skipped
    setUserAnswers(newAnswers);
  
    setTimeout(() => {
      if (questionIndex < clarificationQuestions!.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const finalClarifications = clarificationQuestions!.map((q, i) => ({
            question: q.question,
            answer: newAnswers[i],
        }));
        triggerFinalAnalysis(finalClarifications);
      }
    }, 150);
  };

  const triggerFinalAnalysis = async (finalClarifications?: { question: string, answer: string }[]) => {
    setState(AppState.LOADING);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + (prev < 50 ? Math.random() * 5 : Math.random() * 2), 98));
    }, 800);

    try {
       const clarifications = finalClarifications || clarificationQuestions?.map((q, i) => ({
        question: q.question,
        answer: userAnswers[i]
      })) || [];

      const analysis = await analyzeCareerMatch(
        '', jdText, companyNameInput, foundCompany?.url || '', cvFile || undefined, 
        userNote, lang, interviewerLinkedin, linkedinText, clarifications
      );
      setResult(analysis);
      setProgress(100);
      setState(AppState.RESULT);
      setCurrentStep(3);
      setActiveTab('overview');
      clearInterval(interval);
    } catch (err: any) {
      setErrorInfo(err);
      setState(AppState.ERROR);
      clearInterval(interval);
    }
  };

  const handleRegenerateCoverLetter = async () => {
    if (!result || !regenerateNote) return;
    setIsRegenerating(true);
    try {
      const newCoverLetter = await regenerateCoverLetter(result, regenerateNote, lang);
      setResult(prevResult => {
        if (!prevResult) return null;
        return { ...prevResult, coverLetter: newCoverLetter };
      });
    } catch (err) {
      alert("Failed to regenerate cover letter.");
      console.error(err);
    } finally {
      setIsRegenerating(false);
      setShowCoverLetterNoteModal(false);
      setRegenerateNote('');
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setResult(null);
    setErrorInfo(null);
    setActiveTab('overview');

    setJdText('');
    setJdUrl('');
    setCompanyNameInput('');
    setInterviewerLinkedin('');
    setUserNote('');

    setshowConfirmCompany(false);
    setAllFoundCompanies([]);
    setFoundCompany(null);
    setShowChoiceModal(false);
    setShowInputModal(false);
    
    setClarificationQuestions(null);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);

    if (cvFile) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  };

  useEffect(() => {
    if (state === AppState.LOADING) {
      const stepCount = t.loadingSteps.length;
      const idx = Math.min(Math.floor((progress / 100) * stepCount), stepCount - 1);
      setLoadingStepIdx(idx);
    }
  }, [progress, state, t.loadingSteps]);

  // Main UI Parts
  const Header = () => (
    <header className="px-4 sm:px-6 lg:px-10 py-6 border-b border-slate-300 bg-white sticky top-0 z-[1000] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="flex flex-col cursor-pointer group" onClick={reset}>
          <JobRadarLogo className="h-12 md:h-16 w-auto transition-all hover:scale-105" />
          <span className="sr-only">JobRadar AI</span>
        </h1>
        
        {/* CENTRALT DEMO LABEL */}
        <div className="hidden md:flex flex-grow justify-center">
            <TooltipWrapper text={t.demoVersionTooltip}>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-slate-200 shadow-sm">
                <span className="text-sm font-black uppercase tracking-widest text-red-800">
                  {t.demoVersionLabel}
                </span>
              </div>
            </TooltipWrapper>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 justify-end">
          <button 
            onClick={() => setIsFaqOpen(true)} 
            className="hidden lg:block px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-colors border-slate-400 text-slate-700 hover:border-blue-600 hover:text-blue-700"
          >
            {lang === 'hu' ? 'GY.I.K.' : 'FAQ'}
          </button>
          <button 
            onClick={() => setIsHowItWorksOpen(true)} 
            className="hidden lg:block px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-colors border-slate-400 text-slate-700 hover:border-blue-600 hover:text-blue-700"
          >
            {t.howItWorks}
          </button>
          <button 
            onClick={() => setShowPricing(true)} 
            className="hidden lg:block px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-colors border-slate-600 bg-slate-600 text-white hover:bg-slate-700 hover:border-slate-700"
          >
            {t.pricing}
          </button>
          <div className="flex items-center gap-2">
            <TooltipWrapper text={t.tooltips.tooltipLang}>
              <button 
                onClick={() => {
                  const nextLang = lang === 'hu' ? 'en' : 'hu';
                  setLang(nextLang);
                  sessionStorage.setItem('userLang', nextLang);
                }} 
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all border-slate-400 text-slate-900 hover:border-slate-600 font-black text-[10px]"
              >
                {lang === 'hu' ? 'EN' : 'HU'}
              </button>
            </TooltipWrapper>
            <TooltipWrapper text={t.tooltips.resetAll}>
              <button 
                onClick={reset} 
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all border-slate-400 text-slate-900 hover:border-rose-600 hover:text-rose-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </TooltipWrapper>
          </div>
        </div>
      </div>
    </header>
  );

  const Stepper = () => {
    const steps = [
      { id: 1, label: t.profileAssets },
      { id: 2, label: t.missionParams },
      { id: 3, label: t.summary }
    ];
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-16 w-full max-w-3xl mx-auto px-4">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex flex-col items-center gap-2 transition-opacity ${currentStep > step.id ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
              onClick={() => {
                if (currentStep > step.id) {
                  setCurrentStep(step.id as 1 | 2 | 3);
                }
              }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${currentStep >= step.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'bg-slate-300 text-slate-500'}`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest text-center ${currentStep >= step.id ? 'text-slate-950' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && <div className={`h-[2px] flex-grow mx-2 rounded-full ${currentStep > step.id ? 'bg-blue-600' : 'bg-slate-200'}`}></div>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-100 transition-colors duration-500">
        <div
          className="max-w-xl w-full bg-white rounded-[32px] p-6 md:p-8 border-2 border-slate-300 shadow-2xl text-center relative overflow-hidden transition-all duration-500"
        >
          <button
            onClick={() => {
                const newLang = lang === 'hu' ? 'en' : 'hu';
                setLang(newLang);
                sessionStorage.setItem('userLang', newLang);
            }}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all border-slate-300 text-slate-700 hover:border-slate-500 font-black text-[10px]"
          >
            {lang === 'hu' ? 'EN' : 'HU'}
          </button>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          {introStep === 'welcome' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 py-6">
                <div className="flex justify-center mb-8">
                    <JobRadarLogo className="h-[67px] w-auto" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-950">
                    {t.welcome}
                </h2>
                <p className="text-sm font-bold text-slate-700 leading-relaxed px-4 text-justify whitespace-pre-wrap">
                    {t.welcomeBody}
                </p>
                <div className="px-8 pt-4">
                    <PrimaryButton 
                      onClick={() => setIntroStep('disclaimer')}
                      className="py-3 text-xs rounded-xl shadow-2xl shadow-blue-500/30"
                    >
                      {t.welcomeContinue}
                    </PrimaryButton>
                </div>
            </div>
          )}
          
          {introStep === 'disclaimer' && (
            <div className="space-y-4 animate-in slide-in-from-right-6 duration-500 py-2">
              <div className="space-y-3">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-950">
                  {t.aiActTitle}
                </h2>
                <p className="text-sm font-bold text-slate-800 leading-relaxed italic text-justify px-2">
                  {t.aiActBody}
                </p>
              </div>

              <div className="px-4 py-4 rounded-[20px] bg-[#f8fbff] text-xs font-bold text-slate-600 leading-relaxed text-justify border border-blue-100">
                {t.globalDisclaimer}
              </div>

              <div className="px-8 pt-2">
                <PrimaryButton 
                  onClick={handleAcknowledgeDisclaimer} 
                  className="py-3 text-xs rounded-xl shadow-2xl shadow-blue-500/30"
                >
                  {t.aiActConfirm}
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[#f1f5f9] text-slate-950 font-sans">
      {showPricing && (
        <div className="fixed inset-0 z-[10500] bg-white overflow-y-auto pt-24 pb-12">
          <button onClick={() => setShowPricing(false)} className="fixed top-8 right-8 w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center text-2xl hover:bg-slate-50 transition-colors z-[10600] text-slate-900">✕</button>
          <PricingPage t={t} lang={lang} />
        </div>
      )}

      <FAQModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} lang={lang} />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Stepper />

        {showValidationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 space-y-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 text-center">
                  {lang === 'en' ? 'Asset Validation' : 'Adatok Ellenőrzése'}
                </h3>
                
                <div className="space-y-6">
                  {/* CV Validation */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {validationState.cv === 'loading' && (
                        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
                      )}
                      {validationState.cv === 'success' && (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-in zoom-in">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                      {validationState.cv === 'error' && (
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 animate-in zoom-in">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">
                        {lang === 'en' ? 'CV Analysis' : 'Önéletrajz Elemzés'}
                      </h4>
                      {validationState.cv === 'error' && (
                        <p className="text-xs font-bold text-rose-600 mt-1 leading-relaxed">{validationState.cvError}</p>
                      )}
                      {validationState.cv === 'success' && (
                        <p className="text-xs font-bold text-emerald-600 mt-1 leading-relaxed">
                          {lang === 'en' ? 'Vector PDF successfully parsed.' : 'Vektoros PDF sikeresen értelmezve.'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* LinkedIn Validation */}
                  {validationState.cv !== 'loading' && (
                    <div className="flex items-start gap-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
                      <div className="mt-1">
                        {validationState.linkedin === 'loading' && (
                          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
                        )}
                        {validationState.linkedin === 'success' && (
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-in zoom-in">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        )}
                        {validationState.linkedin === 'error' && (
                          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 animate-in zoom-in">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">
                          {lang === 'en' ? 'LinkedIn Profile' : 'LinkedIn Profil'}
                        </h4>
                        {validationState.linkedin === 'error' && (
                          <p className="text-xs font-bold text-rose-600 mt-1 leading-relaxed">{validationState.linkedinError}</p>
                        )}
                        {validationState.linkedin === 'success' && (
                          <p className="text-xs font-bold text-emerald-600 mt-1 leading-relaxed">
                            {lang === 'en' ? 'Profile data detected.' : 'Profil adatok érzékelve.'}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t-2 border-slate-100">
                  <button 
                    onClick={() => setShowValidationModal(false)}
                    className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all"
                  >
                    {lang === 'en' ? 'Cancel' : 'Mégse'}
                  </button>
                  <PrimaryButton 
                    onClick={() => {
                      setShowValidationModal(false);
                      setCurrentStep(2);
                    }}
                    disabled={validationState.cv === 'loading' || validationState.cv === 'error'}
                    className="px-8 py-3 text-xs"
                  >
                    {lang === 'en' ? 'Proceed Anyway' : (validationState.linkedin === 'error' ? 'Tovább Így Is' : 'Tovább')}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-slate-300 shadow-sm space-y-8">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-100 pb-6 gap-4">
                 <div className="space-y-1">
                   <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">1. {t.profileAssets}</h2>
                   <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">{lang === 'en' ? 'Upload your assets for neural analysis.' : 'Töltsd fel az anyagaidat a neurális elemzéshez.'}</p>
                 </div>
                 <PrimaryButton 
                    className="w-full md:w-auto px-8 py-2 text-[10px] shadow-xl relative" 
                    onClick={handleContinueToJobDetails} 
                    disabled={!cvFile}
                 >
                    {t.continueToJobDetails}
                 </PrimaryButton>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-900 ml-1">{lang === 'en' ? 'Professional CV (PDF)' : 'Szakmai Önéletrajz (PDF)'}</label>
                    <TooltipWrapper text={t.tooltips.cvUpload}>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 rounded-[24px] text-center transition-all flex flex-col items-center justify-center min-h-[200px] sm:min-h-[240px] cursor-pointer group relative overflow-hidden ${
                          fileUploadStatus === 'success' ? 'bg-blue-50 border-blue-500/50' : 'bg-slate-50 border-slate-300 hover:border-blue-500'
                        }`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                          <span className="text-[100px] font-black tracking-tighter">PDF</span>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
                        {fileUploadStatus === 'success' ? (
                          <div className="flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 duration-500 relative z-10 w-full h-full">
                              <div className="relative w-20 h-20 mb-4 text-blue-600">
                                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-10 blur-lg"></div>
                                  <div className="relative w-full h-full flex items-center justify-center bg-blue-100 rounded-full border-4 border-white shadow-lg">
                                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                  </div>
                              </div>
                              
                              <div className="max-w-full px-4">
                                  <p className="text-base font-black text-slate-900 break-all truncate" title={cvFile?.name}>
                                      {cvFile?.name}
                                  </p>
                                  {cvFile?.size && (
                                      <p className="text-xs font-bold text-slate-500 mt-1">
                                          {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                                      </p>
                                  )}
                              </div>
                              
                              <button 
                                  onClick={(e) => { 
                                      e.stopPropagation(); 
                                      setCvFile(null); 
                                      setFileUploadStatus('idle'); 
                                      if (fileInputRef.current) {
                                          fileInputRef.current.value = '';
                                      }
                                  }} 
                                  className="mt-6 px-5 py-2.5 bg-white text-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all group flex items-center gap-2 active:scale-95 shadow-sm"
                              >
                                  <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9a9 9 0 0114.28-4.94M20 15a9 9 0 01-14.28 4.94" />
                                  </svg>
                                  <span>{t.changeFile}</span>
                              </button>
                          </div>
                        ) : (
                          <div className="space-y-4 group-hover:opacity-100 transition-opacity relative z-10 p-6">
                             <div className="w-20 h-20 mx-auto mb-2 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-blue-500/10 rounded-[1.5rem] blur-xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                                <svg className="w-12 h-12 text-slate-400 group-hover:text-blue-500 transition-all duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                  <line x1="12" y1="18" x2="12" y2="12"></line>
                                  <polyline points="9 15 12 12 15 15"></polyline>
                                  <path d="M4 16v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" opacity="0.3"></path>
                                </svg>
                             </div>
                             <p className="text-xs font-black uppercase tracking-widest text-slate-700 px-4">{t.dragDropText}</p>
                             <span className="inline-block px-5 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 group-hover:bg-blue-700 transition-all">{t.browseText}</span>
                          </div>
                        )}
                      </div>
                    </TooltipWrapper>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-900 ml-1">{t.linkedinLabel}</label>
                    <TooltipWrapper text={t.tooltips.linkedinPaste}>
                      <FormTextarea
                        rows={8}
                        className="min-h-[200px] sm:min-h-[240px]"
                        placeholder={t.linkedinInputPlaceholder}
                        value={linkedinText}
                        onChange={(e) => setLinkedinText(e.target.value)}
                      />
                    </TooltipWrapper>
                    <p className="text-[10px] font-bold text-slate-700 px-1 leading-relaxed italic">
                      {t.linkedinHelperNote}
                    </p>
                    <div className="flex justify-end">
                       <div className="group relative">
                          <button className="text-[9px] font-black text-blue-600 uppercase border-b border-blue-600 pb-0.5">{t.linkedinPdfHelp}</button>
                          <div className="absolute right-0 bottom-full mb-4 w-72 p-6 bg-white text-slate-800 text-[10px] rounded-[24px] shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-[2000] border border-slate-200">
                             <p className="font-black mb-3 uppercase text-blue-600 tracking-[0.2em]">{lang === 'en' ? 'PDF Export Guide:' : 'PDF Mentési Útmutató:'}</p>
                             <ul className="space-y-2 font-bold mb-4">
                                {t.linkedinPdfInstructions.split('\n').map((s: string, i: number) => <li key={i} className="flex gap-2"><span>{i+1}.</span>{s.replace(/^\d+\.\s*/, '')}</li>)}
                             </ul>
                             <div className="absolute top-full right-8 border-8 border-transparent border-t-white"></div>
                          </div>
                       </div>
                    </div>
                 </div>

               </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
             <div className="bg-white rounded-[40px] p-6 sm:p-8 md:p-12 border-2 border-slate-300 shadow-sm space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-100 pb-8 gap-6">
                   <div className="space-y-2">
                      <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950">2. {t.missionParams}</h2>
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">{lang === 'en' ? 'Enter position details for precise domain alignment.' : 'Add meg a pozíció részleteit a pontos domén-illeszkedéshez.'}</p>
                   </div>
                   <PrimaryButton className="w-full md:w-auto px-10 shadow-2xl" onClick={verifyCompany} disabled={!companyNameInput || !jdText}>{lang === 'en' ? 'Start Analysis' : 'Elemzés indítása'}</PrimaryButton>
                </div>
                <div className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TooltipWrapper text={t.tooltips.companyName}>
                        <FormInput label={t.companyName} placeholder={lang === 'en' ? 'e.g. Google, EPAM...' : 'Pl. Google, EPAM, OTP...'} value={companyNameInput} onChange={(e) => setCompanyNameInput(e.target.value)} />
                    </TooltipWrapper>
                    <TooltipWrapper text={t.tooltips.jdUrl}>
                      <FormInput label={t.pasteUrl} placeholder="https://..." value={jdUrl} onChange={(e) => setJdUrl(e.target.value)} />
                    </TooltipWrapper>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">{lang === 'en' ? 'Job Description Text' : 'Álláshirdetés Szövege'}</label>
                         <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{lang === 'en' ? 'Critical field' : 'Kritikus mező'}</span>
                      </div>
                      <TooltipWrapper text={t.tooltips.jdText}>
                        <FormTextarea rows={12} className="min-h-[300px] leading-relaxed shadow-inner" placeholder={lang === 'en' ? 'Paste the full job description here...' : 'Ide másold be a teljes hirdetés szövegét (feladatok, elvárások, juttatások)...'} value={jdText} onChange={(e) => setJdText(e.target.value)} />
                      </TooltipWrapper>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-end gap-4">
                         <div className="flex-grow">
                          <TooltipWrapper text={t.tooltips.interviewerLinkedin}>
                            <FormInput label={lang === 'en' ? "Interviewer's LinkedIn Profile (Optional)" : "Interjúztató LinkedIn Profilja (Opcionális)"} placeholder="https://www.linkedin.com/in/..." value={interviewerLinkedin} onChange={(e) => setInterviewerLinkedin(e.target.value)} />
                          </TooltipWrapper>
                         </div>
                         <button onClick={() => setCurrentStep(1)} className="px-6 py-4 rounded-2xl border-2 border-slate-300 font-black text-[10px] uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all mb-1 shrink-0">{lang === 'en' ? 'Back' : 'Vissza'}</button>
                      </div>
                      <p className="text-[10px] font-bold text-slate-700 px-1 italic">{lang === 'en' ? 'Helps predict interview style and focus points.' : 'Segít megjósolni az interjúztató stílusát és a fókuszpontokat.'}</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {currentStep === 3 && result && scoreTheme && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
               <TooltipWrapper text={t.tooltips.dashboardTab}>
                 <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 sm:px-6 md:px-8 py-4 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === 'overview' 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 scale-105' 
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400'
                  }`}
                 >
                   DASHBOARD
                 </button>
               </TooltipWrapper>
               <TooltipWrapper text={t.tooltips.strategyTab}>
                 <button 
                  onClick={() => setActiveTab('preparation')}
                  className={`px-3 sm:px-6 md:px-8 py-4 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === 'preparation' 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 scale-105' 
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400'
                  }`}
                 >
                   {lang === 'en' ? 'STRATEGY' : 'STRATÉGIA'}
                 </button>
               </TooltipWrapper>
               <TooltipWrapper text={t.tooltips.coachTab}>
                 <button 
                  onClick={() => setActiveTab('coach')}
                  className={`px-3 sm:px-6 md:px-8 py-4 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === 'coach' 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 scale-105' 
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400'
                  }`}
                 >
                   {lang === 'en' ? 'INTERVIEW COACH' : 'INTERJÚ COACH'}
                 </button>
               </TooltipWrapper>
            </div>

            {activeTab === 'overview' && (
              <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-500">
                <div className="bg-white rounded-[48px] p-6 sm:p-8 md:p-12 lg:p-16 border-2 border-slate-300 shadow-xl">
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                      <div className="lg:col-span-5">
                         <NeuralScoreRadar result={result} scoreTheme={scoreTheme} t={t} />
                      </div>
                      <div className="lg:col-span-7 space-y-8">
                         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <h2 className={`text-2xl font-black uppercase tracking-[0.2em] ${scoreTheme.text}`}>{t.summary}</h2>
                            <div className="flex gap-4">
                               {result.companyWebsite && <a href={result.companyWebsite} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl text-[9px] font-black uppercase border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2">{t.visitWebsite} 🔗</a>}
                            </div>
                         </div>
                         <p className="text-xl font-semibold leading-relaxed text-justify whitespace-pre-wrap text-slate-950">{result.executiveSummary}</p>
                      </div>
                   </div>
                </div>

                <SectionWrapper title={lang === 'en' ? "Professional Alignment & Gaps" : "Szakmai Illeszkedés & Hiányosságok"} icon={<MicroscopeIcon />} tooltipText={t.tooltips.professionalAlignment} darkMode={darkMode}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="bg-white rounded-[32px] border-2 border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-8 py-4 bg-emerald-50 border-b-2 border-slate-100 flex items-center gap-3">
                           <span className="text-lg">✅</span>
                           <h4 className="text-[10px] font-black uppercase text-emerald-800 tracking-[0.2em]">{t.fits}</h4>
                        </div>
                        <div className="p-8 space-y-6">
                           {result.pros.map((p, i) => (
                              <div key={i} className="flex gap-4 group">
                                 <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold transition-transform group-hover:scale-110">✓</div>
                                 <p className="text-sm font-bold text-slate-900 leading-relaxed text-justify">{p}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="bg-white rounded-[32px] border-2 border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-8 py-4 bg-rose-50 border-b-2 border-slate-100 flex items-center gap-3">
                           <span className="text-lg">⚠️</span>
                           <h4 className="text-[10px] font-black uppercase text-rose-800 tracking-[0.2em]">{t.gaps}</h4>
                        </div>
                        <div className="p-8 space-y-6">
                           {result.cons.map((c, i) => (
                              <div key={i} className="flex gap-4 group">
                                 <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 text-xs font-bold transition-transform group-hover:scale-110">!</div>
                                 <p className="text-sm font-bold text-slate-900 leading-relaxed text-justify">{c}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                </SectionWrapper>

                <SectionWrapper title={t.auditTitle} icon={<UserIcon />} tooltipText={t.tooltips.linkedinAudit} darkMode={darkMode}>
                  {linkedinText && result.linkedinAudit ? (
                    <LinkedInAuditSection audit={result.linkedinAudit} t={t} />
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-slate-200">
                      <p className="font-bold text-slate-600 italic">{t.auditNotAvailable}</p>
                    </div>
                  )}
                </SectionWrapper>

                <SectionWrapper title={lang === 'hu' ? "VERSENYTÁRS ELEMZÉS & PIACI HELYZETKÉP" : "COMPETITOR ANALYSIS & MARKET LANDSCAPE"} icon={<ChartBarIcon />} tooltipText={t.tooltips.competitorAnalysis} darkMode={darkMode}>
                  <div className="space-y-4 mb-6 px-1">
                    <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                      {lang === 'hu' ? "A valószínűsíthető jelölti kör elemzése és az Ön megkülönböztető előnyeinek (USP) meghatározása a kiemelkedés érdekében." : "Analysis of the likely candidate pool and identifying your Unique Selling Points (USP) to stand out."}
                    </p>
                  </div>
                  <CompetitorSection analysis={result.competitorAnalysis!} t={t} />
                </SectionWrapper>

                <SectionWrapper title={t.preMortemTitle} icon={<WarningIcon />} tooltipText={t.tooltips.preMortem} darkMode={darkMode}>
                  <RedFlagSection analysis={result.preMortemAnalysis!} t={t} />
                </SectionWrapper>
                <SectionWrapper title={t.cvSuggestionsTitle} icon={<PencilIcon />} tooltipText={t.tooltips.cvSuggestions} darkMode={darkMode}>
                  <CVSuggestionsSection suggestions={result.cvSuggestions!} t={t} />
                </SectionWrapper>
                <SectionWrapper title={t.rewriteTitle} icon={<SparklesIcon />} tooltipText={t.tooltips.cvRewrite} darkMode={darkMode}>
                  <RewriterSection rewrite={result.cvRewrite!} t={t} darkMode={darkMode} />
                </SectionWrapper>
              </div>
            )}

            {activeTab === 'preparation' && (
              <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-500">
                <SectionWrapper title={lang === 'en' ? "Interview Prep" : "Interjú Felkészítő"} icon={<TargetIcon />} tooltipText={t.tooltips.interviewPrep} darkMode={darkMode}>
                  <StrategicQuestionsSection questions={result.interviewQuestions} answers={result.interviewAnswers} t={t} darkMode={darkMode} />
                </SectionWrapper>

                <SectionWrapper title={t.salaryTitle} icon={<CashIcon />} tooltipText={t.tooltips.salaryNegotiation} darkMode={darkMode}>
                  <SalaryNegotiationSection data={result.salaryNegotiation!} t={t} darkMode={darkMode} />
                </SectionWrapper>

                <SectionWrapper title={t.interviewerTitle} icon={<RadarIcon />} tooltipText={t.tooltips.interviewerProfile} darkMode={darkMode}>
                  <InterviewerProfilerSection data={result.interviewerProfiler!} t={t} darkMode={darkMode} />
                </SectionWrapper>

                <SectionWrapper title={lang === 'en' ? "Corporate Ecosystem & Advantage" : "Vállalati Ökoszisztéma & Versenyelőny"} icon={<BuildingIcon />} tooltipText={t.tooltips.corporateEcosystem} darkMode={darkMode}>
                   <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <IntelligenceCard title={lang === 'en' ? "Market Position" : "Piaci Helyzet"} content={result.companyMarketPosition} icon={<TrendingUpIcon />} />
                         <IntelligenceCard title={lang === 'en' ? "Presence in HU" : "HU Jelenlét"} content={result.hungarianPresence} icon={<LocationMarkerIcon />} />
                         <IntelligenceCard title={lang === 'en' ? "Culture & SWOT" : "Kultúra & SWOT"} content={result.companyDeepDive} icon={<DnaIcon />} />
                         <IntelligenceCard title={lang === 'en' ? "Value Proposition" : "Értékajánlat"} content={result.whyWorkHere} icon={<LightBulbIcon />} />
                      </div>
                      <div className="pt-8 border-t border-slate-300">
                        <CompetitorSection analysis={result.competitorAnalysis!} t={t} />
                      </div>
                   </div>
                </SectionWrapper>

                <SectionWrapper title={lang === 'en' ? "Cover Letter Draft" : "Kísérőlevél Tervezet"} icon={<DocumentTextIcon />} tooltipText={t.tooltips.coverLetter} darkMode={darkMode}>
                  <div className="bg-white p-8 rounded-[32px] border-2 border-slate-300 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="text-sm font-black uppercase tracking-tight text-slate-700">{lang === 'en' ? 'Addressed to Predicted Decision Maker' : 'Címzett a becsült döntéshozó'}</h3>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setShowCoverLetterNoteModal(true)} 
                                disabled={isRegenerating}
                                className="text-[10px] font-black uppercase text-slate-600 border-b-2 border-slate-600 pb-0.5 hover:text-blue-600 hover:border-blue-600 disabled:opacity-50"
                            >
                                {isRegenerating ? t.regenerating : t.regenerate}
                            </button>
                            <button onClick={() => exportCoverLetter(companyNameInput, result.coverLetter, t.coverLetterTitle)} className="text-[10px] font-black uppercase text-blue-600 border-b-2 border-blue-600 pb-0.5">{lang === 'en' ? 'Download PDF' : 'Letöltés PDF'}</button>
                       </div>
                    </div>
                    <div className="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-wrap">{result.coverLetter}</div>
                  </div>
                </SectionWrapper>

                <SectionWrapper title={lang === 'en' ? "90-Day Plan" : "90 Napos Terv"} icon={<CalendarIcon />} tooltipText={t.tooltips.plan90Day} darkMode={darkMode}>
                  <div className="flex justify-between items-center mb-8 px-2">
                      <h3 className="text-sm font-black uppercase tracking-tight text-slate-700">{lang === 'en' ? 'Tactical implementation phases' : 'Taktikai megvalósítás fázisai'}</h3>
                      <button onClick={() => exportActionPlan(companyNameInput, result.plan90Day, t.attackPlanTitle)} className="text-[10px] font-black uppercase text-blue-600 border-b-2 border-blue-600 pb-0.5">{lang === 'en' ? 'Download PDF' : 'Letöltés PDF'}</button>
                  </div>
                  <Plan90DaySection plan={result.plan90Day} t={t} darkMode={darkMode} />
                </SectionWrapper>
              </div>
            )}

            {activeTab === 'coach' && (
              <div className="max-w-4xl mx-auto h-[80vh] min-h-[600px] animate-in slide-in-from-bottom-6 duration-500">
                 <JobCoachChat result={result} t={t} lang={lang} />
              </div>
            )}

            <div className="flex justify-center pt-12">
               <TooltipWrapper text={t.tooltips.scrollToTop}>
                 <button onClick={handleScrollToTop} className="px-12 py-5 rounded-full border-2 border-slate-300 text-slate-700 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition-all active:scale-95">{t.scrollToTop}</button>
               </TooltipWrapper>
            </div>
          </div>
        )}
      </main>

      {(state === AppState.LOADING || state === AppState.SEARCHING_COMPANY || state === AppState.VALIDATING_JD || state === AppState.GENERATING_QUESTIONS) && (
        <div className="fixed inset-0 z-[12000] flex items-center justify-center p-6 bg-slate-50/95 backdrop-blur-xl text-center">
           <div className="space-y-12 max-w-2xl">
              <div className="w-64 h-64 mx-auto relative group">
                 <div className="absolute inset-2 rounded-full border border-blue-500/10"></div>
                 <div className="absolute inset-6 rounded-full border border-blue-500/5"></div>
                 <div className="absolute inset-12 rounded-full border border-blue-500/5"></div>
                 <div className="absolute inset-20 rounded-full border border-blue-500/5"></div>
                 <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-tr from-blue-600/0 via-blue-500/10 to-blue-400/60 origin-top-left animate-[spin_2.5s_linear_infinite] -ml-[1px] -mt-[1px] shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
                    <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-tr from-blue-600/0 to-blue-500/10 origin-top-left animate-[spin_2.5s_linear_infinite] -ml-[1px] -mt-[1px] opacity-50 [animation-delay:-0.2s]"></div>
                 </div>
                 <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className={`absolute top-1/2 left-1/2 w-full h-[2px] bg-blue-400 origin-left animate-[spin_2.5s_linear_infinite] shadow-[0_0_10px_rgba(96,165,250,0.8)]`}></div>
                 </div>
                 <div className="absolute inset-0 rounded-full pointer-events-none opacity-40">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/40"></div>
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-blue-500/40"></div>
                 </div>
                 <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-slate-200" strokeWidth="1.5" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="4" 
                      strokeDasharray="283" 
                      strokeDashoffset={state !== AppState.LOADING ? 70 : 283 - (283 * progress) / 100} 
                      strokeLinecap="round" 
                      className={`transition-all duration-700 shadow-[0_0_10px_rgba(59,130,246,0.5)] ${state !== AppState.LOADING ? 'animate-spin origin-center' : ''}`} 
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {state === AppState.LOADING ? (
                      <>
                        <span className="font-black text-5xl text-slate-950 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] tracking-tighter">{Math.round(progress)}%</span>
                        <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] mt-2 drop-shadow-[0_0_4px_rgba(96,165,250,0.5)]">SCANNING</span>
                      </>
                    ) : (
                      <span className="text-center font-black text-blue-600 tracking-widest mt-2 drop-shadow-[0_0_4px_rgba(96,165,250,0.5)] uppercase text-base px-4">
                        {state === AppState.GENERATING_QUESTIONS ? t.generatingQuestions : t.preAnalysisStatus}
                      </span>
                    )}
                 </div>
              </div>
              <div className="space-y-4">
                 <h3 className="text-xl font-black uppercase tracking-[0.4em] text-blue-600 animate-pulse">
                   {state === AppState.LOADING ? t.synthesizing : (state === AppState.GENERATING_QUESTIONS ? t.generatingQuestions : (t.preAnalysisStatus || (lang === 'hu' ? 'Azonosítás és Validálás...' : 'Identification & Validation...')))}
                 </h3>
                 <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">
                   {state === AppState.LOADING ? t.loadingSteps[loadingStepIdx] : (state === AppState.GENERATING_QUESTIONS ? t.generatingQuestionsSub : (t.preAnalysisSubStatus || (lang === 'hu' ? 'Vállalati adatok és álláshirdetés ellenőrzése...' : 'Verifying company data and job description...')))}
                 </p>
                 <div className="mt-12">
                   <button 
                     onClick={reset}
                     className="px-8 py-4 bg-white/50 backdrop-blur-sm rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 border-2 border-slate-200 hover:border-slate-400 transition-all shadow-lg"
                   >
                     {t.cancel}
                   </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {state === AppState.AWAITING_CLARIFICATION && clarificationQuestions && (
        <div className="fixed inset-0 z-[12500] flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 max-w-2xl w-full border-2 border-slate-300 shadow-2xl text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-950">{t.clarificationTitle}</h2>
                <InfoTooltip text={t.tooltipClarification} />
            </div>
            <p className="text-sm font-bold text-slate-700 mb-6 leading-relaxed">{t.clarificationBody}</p>
            
            <div className="mb-6 px-1">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {lang === 'hu' ? 'Haladás' : 'Progress'}
                    </span>
                    <span className="text-xs font-black text-blue-600">
                        {currentQuestionIndex + 1} / {clarificationQuestions.length}
                    </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${((currentQuestionIndex + 1) / clarificationQuestions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="space-y-6">
                {(() => {
                    const q = clarificationQuestions[currentQuestionIndex];
                    if (!q) return null;
                    return (
                        <div key={currentQuestionIndex} className="p-6 rounded-2xl border-2 border-slate-200 text-left animate-in fade-in duration-500">
                            <p className="font-black text-slate-900 mb-4">{q.question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {q.options.map((option, oIndex) => (
                                <button
                                    key={oIndex}
                                    onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                                    className={`w-full p-4 rounded-xl border-2 text-sm font-bold transition-all duration-300 ${
                                        selectedAnswer === option
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                        : 'bg-slate-50 hover:bg-white hover:border-blue-400 border-slate-200'
                                    }`}
                                >
                                    {option}
                                </button>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => handleSkipQuestion(currentQuestionIndex)}
                                    className="text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors underline decoration-dotted"
                                >
                                    {t.clarificationSkip}
                                </button>
                            </div>
                        </div>
                    );
                })()}
            </div>
          </div>
        </div>
      )}

      {state === AppState.ERROR && (
        <div className="fixed inset-0 z-[13000] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
           <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[48px] max-w-lg w-full text-center border-2 border-rose-500/30">
              <div className="w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-8 shadow-2xl">!</div>
              <h2 className="text-2xl font-black uppercase mb-4 text-slate-950">{t.errorTitle}</h2>
              <p className="text-slate-800 font-bold mb-10 leading-relaxed">{errorInfo?.message || t.errorBody}</p>
              <div className="flex flex-col gap-4">
                 <PrimaryButton onClick={() => startAnalysis(userNote)}>{t.errorRetry}</PrimaryButton>
                 <button onClick={reset} className="text-xs font-black uppercase text-slate-500">{t.reset}</button>
              </div>
           </div>
        </div>
      )}

      {showInvalidJdModal && (
        <div className="fixed inset-0 z-[13000] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
           <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[48px] max-w-lg w-full text-center border-2 border-amber-500/30">
              <div className="w-20 h-20 bg-amber-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl">🤔</div>
              <h2 className="text-2xl font-black uppercase mb-4 text-slate-950">{t.invalidJdTitle}</h2>
              <p className="text-slate-800 font-bold mb-10 leading-relaxed text-justify">{t.invalidJdBody}</p>
              <PrimaryButton onClick={() => setShowInvalidJdModal(false)}>{t.invalidJdButton}</PrimaryButton>
           </div>
        </div>
      )}

      {showConfirmCompany && (
        <div className="fixed inset-0 z-[12500] flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 max-w-lg w-full text-center shadow-2xl border-2 border-slate-300">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-950">{t.companyConfirmTitle}</h2>
            <p className="text-sm font-bold text-slate-800 mb-8">{t.companyConfirmBody}</p>
            <div className="mb-8 space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {allFoundCompanies.map((comp, idx) => (
                <div key={idx} onClick={() => setFoundCompany(comp)} className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left flex items-center justify-between gap-4 ${foundCompany?.url === comp.url ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                  <div className="overflow-hidden">
                    <div className={`text-sm font-black truncate ${foundCompany?.url === comp.url ? 'text-blue-600' : 'text-slate-950'}`}>{comp.title}</div>
                    <div className="text-[10px] font-bold text-slate-600 truncate">{comp.url}</div>
                  </div>
                  <div className="flex items-center shrink-0 gap-2">
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full hover:bg-slate-200 transition-colors group"
                      aria-label={`Visit ${comp.title} website`}
                    >
                      <ExternalLinkIcon className="w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                    </a>
                    {foundCompany?.url === comp.url && <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <PrimaryButton onClick={() => { setshowConfirmCompany(false); setShowInputModal(true); }}>{t.companyConfirmYes}</PrimaryButton>
              <button onClick={() => setshowConfirmCompany(false)} className="w-full bg-slate-100 py-5 rounded-full font-black uppercase text-xs tracking-widest text-slate-700">{lang === 'en' ? 'Back' : 'Vissza'}</button>
            </div>
          </div>
        </div>
      )}

      {showChoiceModal && (
        <div className="fixed inset-0 z-[12500] flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 max-w-lg w-full text-center border-2 border-slate-300 shadow-2xl">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tight text-slate-950">{t.strategyTitle}</h2>
            <p className="text-sm font-bold text-slate-800 mb-10 leading-relaxed">{t.strategyBody}</p>
            <div className="flex flex-col gap-4">
              <button onClick={() => { setShowChoiceModal(false); setShowInputModal(true); }} className="w-full py-5 rounded-full font-black uppercase tracking-widest border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-xs">{t.strategyOwn}</button>
              <PrimaryButton onClick={() => startAnalysis('')} className="shadow-2xl shadow-blue-500/40">{t.strategyAi}</PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {showInputModal && (
        <div className="fixed inset-0 z-[12500] flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 max-w-lg w-full border-2 border-slate-300 shadow-2xl text-center">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-950">{t.noteTitle}</h2>
            <p className="text-sm font-bold text-slate-700 mb-8 leading-relaxed">{t.noteBody}</p>
            <textarea 
              maxLength={200} 
              placeholder={t.notePlaceholder} 
              className="w-full rounded-2xl border-2 border-slate-300 bg-slate-50 px-6 py-4 font-bold transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder:font-normal text-slate-900 h-40 resize-none shadow-inner" 
              value={userNote} 
              onChange={(e) => setUserNote(e.target.value)} 
            />
            <div className="flex flex-col gap-4 mt-8">
              <PrimaryButton className="shadow-2xl shadow-blue-500/40" onClick={() => startAnalysis(userNote)}>{t.noteStart}</PrimaryButton>
              <button onClick={() => { setShowInputModal(false); setshowConfirmCompany(true); }} className="text-xs font-black uppercase text-slate-600">{lang === 'en' ? 'Back' : 'Vissza'}</button>
            </div>
          </div>
        </div>
      )}
      
      {showCoverLetterNoteModal && (
        <div className="fixed inset-0 z-[12500] flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 max-w-lg w-full border-2 border-slate-300 shadow-2xl text-center">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-slate-950">{t.regenerateCoverLetterTitle}</h2>
            <p className="text-sm font-bold text-slate-700 mb-8 leading-relaxed">{t.regenerateCoverLetterBody}</p>
            <textarea 
              maxLength={200} 
              placeholder={t.notePlaceholder} 
              className="w-full rounded-2xl border-2 border-slate-300 bg-slate-50 px-6 py-4 font-bold transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder:font-normal text-slate-900 h-40 resize-none shadow-inner" 
              value={regenerateNote} 
              onChange={(e) => setRegenerateNote(e.target.value)} 
            />
            <div className="flex flex-col gap-4 mt-8">
              <PrimaryButton 
                className="shadow-2xl shadow-blue-500/40" 
                onClick={handleRegenerateCoverLetter}
                disabled={isRegenerating || !regenerateNote.trim()}
              >
                {isRegenerating ? t.regenerating : t.regenerate}
              </PrimaryButton>
              <button onClick={() => setShowCoverLetterNoteModal(false)} className="text-xs font-black uppercase text-slate-600">{t.noteBack}</button>
            </div>
          </div>
        </div>
      )}


      {/* BOTTOM DEMO LABEL */}
      <div className="fixed bottom-4 right-4 z-[1000]">
        <TooltipWrapper text={t.demoVersionTooltip}>
          <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-slate-200 shadow-md">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {t.demoVersionLabel}
            </span>
          </div>
        </TooltipWrapper>
      </div>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-xs text-slate-500">
        <p className="mb-2 font-semibold">JobRadar AI © {new Date().getFullYear()}</p>
        <button onClick={() => setIsTosOpen(true)} className="font-bold text-blue-600 hover:underline">
          {t.terms.linkText}
        </button>
      </footer>
      
      {showCookieBanner && (
          <CookieBanner 
              onAccept={handleAcceptCookies}
              onOpenPrivacy={() => setIsTosOpen(true)}
              t={t}
          />
      )}

      <TermsOfServiceModal 
        isOpen={isTosOpen} 
        onClose={() => setIsTosOpen(false)} 
        onAccept={showCookieBanner ? handleAcceptCookies : undefined}
        t={t} 
      />
      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} t={t} />
    </div>
  );
};

export default App;
