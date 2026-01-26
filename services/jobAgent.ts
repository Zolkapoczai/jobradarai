
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FileInput, AnalysisErrorType, AnalysisErrorInfo } from "../types";
import { JOBRADAR_CONFIG } from '../config';

const SYSTEM_INSTRUCTION = `You are JobRadar AI, an elite Executive Career Strategist designed by Google Engineers.
Your goal is to bridge the gap between high-potential candidates and decision-makers by bypassing traditional HR filters.

CORE ROLE & MINDSET:
1. DUAL-ENGINE PROCESSOR: Act as both a cynical "ATS Auditor" (finding gaps) and a "Strategic Advisor" (fixing them).
2. INVESTIGATIVE JOURNALIST (DEEP DIVE): Analyze the company deeply. While you do not have direct live search access in this specific module, use your extensive pre-trained knowledge about corporate structures, market trends, and industry sentiment. We need leverage, not PR fluff.
3. CONSULTATIVE APPROACH: Analyze the "Business Need" behind the JD. Why is this role open *now*?

STRATEGIC MODULES LOGIC:

- SALARY NEGOTIATION ARCHITECT (BÉRTÁRGYALÁSI STRATÉGA): 
  Analyze the seniority level, industry standards, and geographic location (Hungarian/EU focus). 
  (i) Estimate a realistic Gross Salary Band.
  (ii) Define a BATNA (Best Alternative to a Negotiated Agreement) plan specific to this candidate's leverage.
  (iii) Identify non-monetary trade-offs (e.g., performance bonuses, remote flexibility, health-premium).
  (iv) Generate 5 highly nuanced psychological negotiation scripts for:
      - The Low-ball: Handling an offer below market.
      - The Benefit Pivot: Trading cash for high-value benefits (remote, extra vacation, stock).
      - The Unexpected Counter: Responding when the company says "This is our final offer."
      - The Merit Hook: Tying future increases to specific KPIs.
      - The Silence/Pause: Using psychological distance to gain leverage.

- INTERVIEWER X-RAY (PROFILOZÓ): 
  Predict the internal hiring committee based on the role's seniority and department.
  (i) Profile 3 key stakeholders (e.g., The Skeptical Finance Director, The Visionary CEO, The Process-Oriented HR Lead).
  (ii) Assign a DISC behavioral profile to each.
  (iii) Identify their 'Primary Fear' (the reason they wouldn't hire) and their 'Yes-Trigger' (the specific value proof that wins them over).
  (iv) Create 3 strategic 'Ice-breaker' questions to build immediate rapport.

- COMPETITOR ANALYSIS ARCHITECT (VERSENYTÁRS ELEMZÉS):
  Compare the user's profile against the typical candidate pool for this role.
  1. Identify the 'Invisible Threshold' for this seniority.
  2. Define 3 'Unique Selling Points' (USPs) to outperform 100+ applicants.
  3. Position the user as the 'Low-risk, High-reward' choice for the Hiring Manager.

CRITICAL OPERATIONAL RULES (MUST FOLLOW):
1. OUTPUT FORMAT: You must output PURE JSON matching the provided schema exactly. Do NOT use Markdown formatting outside the JSON strings.
2. HARD GATE LOGIC: If the JD explicitly requires a language (e.g., Fluent English) and it is missing, Match Score MUST NOT exceed 65%.
3. LICENSE EXCEPTION: Always assume the candidate possesses a valid driver's license (B category).
4. HUNGARIAN RULES: If the language is set to Hungarian, use formal "Önöző" tone. Never use "Tisztelt Felvételi Bizottság".
`;

export const COACH_INSTRUCTION = `You are the "JobRadar Coach", a senior executive career mentor.
You are chatting with a high-level candidate (B2B Sales / IT background).

ROLE & TONE:
- Your goal is to prepare the candidate for the interview described in the Job Description.
- TONE: Professional, supportive, but "tough love". Do not accept weak answers. Challenge the candidate if they are vague.
- FORMAT: DO NOT use JSON here. Speak naturally, using bullet points and clear paragraphs.

INTERACTION RULES:
- If the user asks for advice, give specific, actionable strategic tips based on B2B sales methodologies (Spin Selling, Challenger Sale).
- If the user practices an interview answer, grade it (1-10) and suggest a stronger "Executive phrasing".
- Keep responses concise (max 3-4 paragraphs) to maintain a dynamic chat flow.
- Always remain in character as a strategic partner, not just an AI assistant.
`;

const categorizeError = (error: any): AnalysisErrorInfo => {
  const status = error?.status;
  const message = error?.message || "";

  // Handle Resource Exhausted / Quota errors
  if (status === "RESOURCE_EXHAUSTED" || status === 429 || message.includes("quota") || message.includes("rate limit")) {
    return { type: AnalysisErrorType.TRANSIENT, message: "Kimerült az API kvóta (Rate Limit Exceeded). Kérjük várjon néhány percet, vagy váltson másik API kulcsra!" };
  }

  if (message.includes("Requested entity was not found")) {
    return { type: AnalysisErrorType.API_KEY, message: "Az API kulcs nem található vagy érvénytelen. Kérjük válassza ki újra!" };
  }

  if (status === 401 || status === 403) {
    return { type: AnalysisErrorType.API_KEY, message: "Hiba az API kulccsal. Ellenőrizze a jogosültaságokat!" };
  }

  if (status === 500 || status === 503) {
    return { type: AnalysisErrorType.TRANSIENT, message: "Átmeneti szerverhiba az AI szolgáltatónál. Kérjük próbálja meg újra!" };
  }

  if (!window.navigator.onLine) {
    return { type: AnalysisErrorType.NETWORK, message: "Nincs internetkapcsolat. Ellenőrizze a hálózatot!" };
  }

  return { type: AnalysisErrorType.UNKNOWN, message: "Ismeretlen hiba történt a szintézis során." };
};

const withRetry = async <T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    // Retry on 500s or temporary network issues, but not on quota errors or 400s
    if (retries > 0 && (error?.status === 500 || error?.status === 503)) {
      await new Promise(res => setTimeout(res, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw categorizeError(error);
  }
};

export const searchCompanyWebsite = async (companyName: string): Promise<{ url: string; title: string }[] | null> => {
  const trimmedInput = companyName.trim();
  const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/i;
  
  if (urlPattern.test(trimmedInput)) {
    const fullUrl = trimmedInput.startsWith('http') ? trimmedInput : `https://${trimmedInput}`;
    const domainOnly = trimmedInput.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    return [{ url: fullUrl, title: domainOnly }];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  return withRetry(async () => {
    try {
      const response = await ai.models.generateContent({
        model: JOBRADAR_CONFIG.AI_MODEL,
        contents: `Find the official main corporate domain (website) for: "${companyName}". Return only verified, high-quality professional links.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && chunks.length > 0) {
        const results: { url: string; title: string }[] = [];
        const seenUrls = new Set<string>();

        chunks.forEach((c: any) => {
          if (c.web && c.web.uri) {
            const uri = c.web.uri;
            if (!seenUrls.has(uri)) {
              results.push({ url: uri, title: c.web.title || companyName });
              seenUrls.add(uri);
            }
          }
        });
        
        return results.length > 0 ? results : null;
      }
      return null;
    } catch (error) {
      console.error("Search Error Detail:", error);
      throw error;
    }
  });
};

export const analyzeCareerMatch = async (
  cvText: string, 
  jdText: string, 
  companyName: string,
  companyWebsite: string,
  cvFile?: FileInput,
  userNote?: string,
  lang: string = 'en',
  interviewerLinkedin?: string,
  linkedinProfileText?: string
): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const targetLang = lang === 'hu' ? 'HUNGARIAN (Magyar)' : 'ENGLISH';
  
  const languageInstruction = lang === 'hu' 
    ? "IMPORTANT: A teljes választ és a JSON tartalmát MAGYAR nyelven generáld (Hungarian)." 
    : "IMPORTANT: You MUST generate the entire JSON response and all text content in ENGLISH.";

  let prompt = `DEEP ANALYSIS INITIATED: [Company: ${companyName}] [URL: ${companyWebsite}]
  TARGET LANGUAGE: ${targetLang}
  ${languageInstruction}

  Candidate Data: ${cvFile ? 'Binary PDF Attached' : cvText}
  Job Scope: ${jdText}
  Special Hook: ${userNote ? userNote : 'None'}
  Interviewer Profile: ${interviewerLinkedin ? interviewerLinkedin : 'Generic Predicted Decision Maker'}
  LinkedIn Profile Data: ${linkedinProfileText ? linkedinProfileText : 'Not provided'}
  
  CRITICAL PROTOCOLS:
  - CV SUGGESTIONS DEEP-DIVE: For each CV suggestion, provide an implementationExample with a 'before' and an 'after'.
  - NEGOTIATION SCENARIOS: Provide 5 distinct, nuanced scripts as objects with 'scenario' and 'script' keys.
  - APPLY ALL STRATEGIC MODULES (Salary Architecture, Interviewer X-Ray, Competitor Analysis).
  - ALL text must be in ${targetLang}. 
  - Generate exactly 5 interview questions and strategic answers.`;

  const contents: any[] = [{ text: prompt }];
  if (cvFile) {
    contents.push({ inlineData: { data: cvFile.data, mimeType: cvFile.mimeType } });
  }

  return withRetry(async () => {
    try {
      const response = await ai.models.generateContent({
        model: JOBRADAR_CONFIG.AI_MODEL,
        contents: { parts: contents },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 16000 },
          // Note: googleSearch tool is REMOVED from this call to allow responseMimeType: "application/json"
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.NUMBER },
              scoreBreakdown: {
                type: Type.OBJECT,
                properties: {
                  hardSkills: { type: Type.NUMBER },
                  softSkills: { type: Type.NUMBER },
                  experience: { type: Type.NUMBER },
                  domainFit: { type: Type.NUMBER }
                },
                required: ["hardSkills", "softSkills", "experience", "domainFit"]
              },
              scoreExplanations: {
                type: Type.OBJECT,
                properties: {
                  hardSkills: { type: Type.STRING },
                  softSkills: { type: Type.STRING },
                  experience: { type: Type.STRING },
                  domainFit: { type: Type.STRING }
                },
                required: ["hardSkills", "softSkills", "experience", "domainFit"]
              },
              executiveSummary: { type: Type.STRING },
              hiringManagerProfile: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              companyDeepDive: { type: Type.STRING },
              companyMarketPosition: { type: Type.STRING },
              hungarianPresence: { type: Type.STRING },
              whyWorkHere: { type: Type.STRING },
              cvSummaryRewrite: { type: Type.STRING },
              coverLetter: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              plan30Day: { type: Type.ARRAY, items: { type: Type.STRING } },
              interviewQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              interviewAnswers: { type: Type.ARRAY, items: { type: Type.STRING } },
              salaryNegotiation: {
                type: Type.OBJECT,
                properties: {
                  grossSalaryBand: { type: Type.STRING },
                  batnaPlan: { type: Type.STRING },
                  nonMonetaryTradeOffs: { type: Type.ARRAY, items: { type: Type.STRING } },
                  counterOfferScripts: { 
                    type: Type.ARRAY, 
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        scenario: { type: Type.STRING },
                        script: { type: Type.STRING }
                      },
                      required: ["scenario", "script"]
                    }
                  }
                },
                required: ["grossSalaryBand", "batnaPlan", "nonMonetaryTradeOffs", "counterOfferScripts"]
              },
              interviewerProfiler: {
                type: Type.OBJECT,
                properties: {
                  stakeholders: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        role: { type: Type.STRING },
                        discProfile: { type: Type.STRING },
                        primaryFear: { type: Type.STRING },
                        yesTrigger: { type: Type.STRING }
                      },
                      required: ["role", "discProfile", "primaryFear", "yesTrigger"]
                    }
                  },
                  iceBreakerQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["stakeholders", "iceBreakerQuestions"]
              },
              cvSuggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    title: { type: Type.STRING },
                    advice: { type: Type.STRING },
                    impact: { type: Type.STRING, enum: ["high", "medium"] },
                    implementationExample: {
                      type: Type.OBJECT,
                      properties: {
                        before: { type: Type.STRING },
                        after: { type: Type.STRING },
                        explanation: { type: Type.STRING }
                      },
                      required: ["before", "after", "explanation"]
                    }
                  },
                  required: ["category", "title", "advice", "impact", "implementationExample"]
                }
              },
              cvRewrite: {
                type: Type.OBJECT,
                properties: {
                  originalSummaryExcerpt: { type: Type.STRING },
                  optimizedSummary: { type: Type.STRING },
                  keywordImprovements: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["originalSummaryExcerpt", "optimizedSummary", "keywordImprovements"]
              },
              networkingStrategy: {
                type: Type.OBJECT,
                properties: {
                  connectionRequest: { type: Type.STRING },
                  valueMessage: { type: Type.STRING },
                  followUp: { type: Type.STRING }
                },
                required: ["connectionRequest", "valueMessage", "followUp"]
              },
              linkedinAudit: {
                type: Type.OBJECT,
                properties: {
                  consistencyScore: { type: Type.NUMBER },
                  headlineSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  summarySuggestions: { type: Type.STRING },
                  missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  visualChecklist: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["consistencyScore", "headlineSuggestions", "summarySuggestions", "missingKeywords", "visualChecklist"]
              },
              competitorAnalysis: {
                type: Type.OBJECT,
                properties: {
                  topCompetitors: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        productFocus: { type: Type.STRING },
                        differentiation: { type: Type.STRING }
                      },
                      required: ["name", "productFocus", "differentiation"]
                    }
                  },
                  marketTrend: { type: Type.STRING }
                },
                required: ["topCompetitors", "marketTrend"]
              },
              preMortemAnalysis: {
                type: Type.OBJECT,
                properties: {
                  risks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        risk: { type: Type.STRING },
                        severity: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                        defenseScript: { type: Type.STRING }
                      },
                      required: ["risk", "severity", "defenseScript"]
                    }
                  },
                  overallEmployabilityScore: { type: Type.NUMBER }
                },
                required: ["risks", "overallEmployabilityScore"]
              },
              detectedLanguage: { type: Type.STRING },
              originalCvText: { type: Type.STRING },
              originalJdText: { type: Type.STRING }
            },
            required: [
              "matchScore", "scoreBreakdown", "scoreExplanations", 
              "executiveSummary", "hiringManagerProfile", "pros", "cons", 
              "cvSummaryRewrite", "coverLetter", "keywords", "plan30Day", 
              "companyDeepDive", "companyMarketPosition", "hungarianPresence", "whyWorkHere",
              "interviewQuestions", "interviewAnswers", "networkingStrategy", "linkedinAudit",
              "competitorAnalysis", "preMortemAnalysis", "cvSuggestions", "cvRewrite",
              "salaryNegotiation", "interviewerProfiler"
            ]
          }
        }
      });

      try {
        const result = JSON.parse(response.text || "{}");
        return { ...result, companyWebsite, companyName };
      } catch (parseError) {
        throw { type: AnalysisErrorType.PARSING, message: "Hiba az AI válasz feldolgozása során. Kérjük próbálja újra!" };
      }
    } catch (error: any) {
      console.error("Analysis Error Detail:", error);
      throw error;
    }
  });
};
