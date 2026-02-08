

export enum AnalysisErrorType {
  API_KEY = 'API_KEY',
  TRANSIENT = 'TRANSIENT',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN',
  PARSING = 'PARSING'
}

export interface AnalysisErrorInfo {
  type: AnalysisErrorType;
  message: string;
}

export interface FileInput {
  data: string;
  mimeType: string;
  name: string;
  size: number;
}

export enum AppState {
  IDLE = 'IDLE',
  VALIDATING_JD = 'VALIDATING_JD',
  SEARCHING_COMPANY = 'SEARCHING_COMPANY',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export enum AppView {
  ANALYZER = 'ANALYZER',
  PRICING = 'PRICING',
  CHAT_COACH = 'CHAT_COACH'
}

export interface ScoreBreakdown {
  hardSkills: number;
  softSkills: number;
  experience: number;
  domainFit: number;
}

export interface ScoreExplanations {
  hardSkills: string;
  softSkills: string;
  experience: string;
  domainFit: string;
}

// FIX: Added the missing NetworkingStrategy interface to resolve a compilation error.
export interface NetworkingStrategy {
  connectionRequest: string;
  valueMessage: string;
  followUp: string;
}

export interface CVSuggestion {
  category: 'keywords' | 'focus' | 'structure' | 'ats' | string;
  title: string;
  advice: string;
  impact: 'high' | 'medium';
  implementationExample?: {
    before: string;
    after: string;
    explanation: string;
  };
}

export interface LinkedInAudit {
  consistencyScore: number;
  headlineSuggestions: string[];
  summarySuggestions: string;
  missingKeywords: string[];
  visualChecklist: string[];
}

export interface Competitor {
  name: string;
  productFocus: string;
  differentiation: string;
}

export interface CompetitorAnalysis {
  topCompetitors: Competitor[];
  marketTrend: string;
}

export interface RiskFactor {
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  defenseScript: string;
}

export interface PreMortemAnalysis {
  risks: RiskFactor[];
  overallEmployabilityScore: number;
}

export interface CVRewrite {
  originalSummaryExcerpt: string;
  optimizedSummary: string;
  keywordImprovements: string[];
}

export interface NegotiationScript {
  scenario: string;
  script: string;
}

export interface SalaryNegotiation {
  grossSalaryBand: string;
  batnaPlan: string;
  nonMonetaryTradeOffs: string[];
  counterOfferScripts: NegotiationScript[];
}

export interface Stakeholder {
  role: string;
  discProfile: string;
  primaryFear: string;
  yesTrigger: string;
}

export interface InterviewerProfiler {
  stakeholders: Stakeholder[];
  iceBreakerQuestions: string[];
}

export interface PlanPhase {
  phaseTitle: string;
  actions: string[];
}

export interface AnalysisResult {
  matchScore: number;
  scoreBreakdown: ScoreBreakdown;
  scoreExplanations: ScoreExplanations;
  executiveSummary: string;
  hiringManagerProfile: string;
  pros: string[];
  cons: string[];
  companyDeepDive: string;
  companyMarketPosition: string;
  hungarianPresence: string;
  whyWorkHere: string;
  cvSummaryRewrite: string;
  coverLetter: string;
  keywords: string[];
  plan90Day: PlanPhase[];
  interviewQuestions: string[];
  interviewAnswers: string[];
  detectedLanguage: string;
  originalCvText: string;
  originalJdText: string;
  companyName: string;
  companyWebsite: string;
  cvSuggestions?: CVSuggestion[];
  linkedinAudit?: LinkedInAudit;
  competitorAnalysis?: CompetitorAnalysis;
  preMortemAnalysis?: PreMortemAnalysis;
  cvRewrite?: CVRewrite;
  salaryNegotiation?: SalaryNegotiation;
  interviewerProfiler?: InterviewerProfiler;
}