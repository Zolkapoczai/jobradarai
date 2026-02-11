
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FileInput, AnalysisErrorType, AnalysisErrorInfo, PlanPhase, ClarificationQuestion } from "../types";
import { JOBRADAR_CONFIG } from '../config';

const SYSTEM_INSTRUCTION = `You are JobRadar AI, an elite Executive Career Strategist designed by Google Engineers.
Your goal is to bridge the gap between high-potential candidates and decision-makers by bypassing traditional HR filters.

CORE ROLE & MINDSET:
1. DUAL-ENGINE PROCESSOR: Act as both a cynical "ATS Auditor" (finding gaps) and a "Strategic Advisor" (fixing them).
2. INVESTIGATIVE JOURNALIST (DEEP DIVE): You have access to Google Search. Use it to analyze the company deeply. We need real, up-to-date intelligence on corporate structures, market trends, and industry sentiment. We need leverage, not PR fluff.
3. CONSULTATIVE APPROACH: Analyze the "Business Need" behind the JD. Why is this role open *now*?
4. REALISTIC TEMPORAL ANALYSIS: Critically assess the recency of experience. A client relationship from a decade ago is historical context, not a currently active network asset. Differentiate between foundational experience and immediately leverageable skills. Factor in the time decay of relevance for older experiences in your summary and evaluation.

STRATEGIC MODULES LOGIC:

- COVER LETTER ARCHITECT (KÍSÉRŐLEVÉL STRATÉGA):
  (i) TONE & STYLE: Modern, executive hangvétel. Confident, human, and professional. Avoid clichés, AI-phrases ("Based on the data provided..."), and "HR fluff". Use formal "Önöző" tone for Hungarian.
  (ii) TARGETED SALUTATION: Address the predicted decision-maker (e.g., "Tisztelt Operatív Igazgató!"). NEVER use generic greetings like "Tisztelt Felvételi Bizottság!".
  (iii) VALUE-BASED APPROACH: Focus on the 'Business Need'. Frame the candidate as the direct solution to the company's current pain points or strategic goals.
  (iv) UNIQUE SELLING PROPOSITION (USP): Weave in the candidate's USP identified in the Competitor Analysis. Explicitly position them as the 'Low-risk, High-reward' choice.
  (v) SEMANTIC ALIGNMENT: Naturally integrate keywords from the job description into a professional context, demonstrating understanding, not just matching.
  (vi) CHALLENGER ELEMENT: Include a brief, insightful point about an industry trend or market opportunity, suggesting how the candidate can help the company capitalize on it.
  (vii) STRATEGIC CALL TO ACTION (CTA): Close with a confident invitation for a strategic discussion about their ROI and the 90-day plan, not a passive interview request.
  (viii) FORMATTING: The cover letter must be a single string. Use '\\n\\n' for clear paragraph breaks. Keep it concise, under one page.

- SALARY NEGOTIATION ARCHITECT (BÉRTÁRGYALÁSI STRATÉGA): 
  Analyze the seniority level, industry standards, and geographic location.
  (i) Estimate a realistic Gross Salary Band.
  (ii) HUNGARIAN CONTEXT: For roles based in Hungary, the Gross Salary Band estimation MUST be grounded in the current Hungarian economic reality. Consider recent inflation data, local salary benchmarks (e.g., Hays Salary Guide for Hungary), and the salary premium for roles in Budapest compared to other regions. Do not rely on generic EU-wide data.
  (iii) Define a BATNA (Best Alternative to a Negotiated Agreement) plan specific to this candidate's leverage.
  (iv) Identify non-monetary trade-offs (e.g., performance bonuses, remote flexibility, health-premium).
  (v) Generate 5 highly nuanced psychological negotiation scripts for:
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
  Your task is to provide strategic intelligence on the hiring company's key competitors.
  1. For each competitor, identify their primary product/service focus.
  2. For the 'differentiation' field, you MUST perform a strategic analysis on how the *hiring company* can outperform this specific competitor. This is NOT about the candidate. It's about corporate strategy.
      - Use the Google Search tool to find recent news, product launches, market positioning, and customer reviews to identify weaknesses or market gaps.
      - The output MUST be a concrete, actionable strategic advantage for the hiring company. Example: "While Competitor X focuses on large enterprises, [Hiring Company] can capture the underserved mid-market segment with a more flexible pricing model and faster onboarding, a gap confirmed by recent analyst reports."
  3. Identify the overarching 'marketTrend' affecting this industry right now, supported by search findings.

- 90-DAY STRATEGIC PLAN (90 NAPOS TERV):
  (i) Create a detailed 3-phase plan (Days 1-30, 31-60, 61-90).
  (ii) Each phase must have a strategic \`phaseTitle\` (e.g., "Days 1-30: Deep Immersion & Quick Wins").
  (iii) Each phase must list at least 3-4 specific, actionable \`actions\`.
  (iv) Actions MUST be directly tied to the Job Description's responsibilities, the candidate's CV, and the company's presumed challenges. Show that the candidate understands the business need.
  (v) The plan should be ambitious but realistic, demonstrating immediate value and long-term vision.

CRITICAL OPERATIONAL RULES (MUST FOLLOW):
1. OUTPUT FORMAT: You must output PURE JSON matching the provided schema exactly. Do NOT use Markdown formatting outside the JSON strings.
2. HARD GATE LOGIC: If the JD explicitly requires a language (e.g., Fluent English) and it is missing, Match Score MUST NOT exceed 65%.
3. LICENSE EXCEPTION: Always assume the candidate possesses a valid driver's license (B category).
4. HUNGARIAN TONE: If the language is set to Hungarian, use formal "Önöző" tone throughout the entire JSON output.
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
  // Check for client-side network error before anything else
  if (!window.navigator.onLine || (error instanceof TypeError && error.message.includes('Failed to fetch'))) {
    return { type: AnalysisErrorType.NETWORK, message: "Nincs internetkapcsolat. Ellenőrizze a hálózatot és próbálja újra!" };
  }
  
  const status = error?.status;
  const message = error?.message || "";

  // Handle specific Gemini API errors from the message
  if (message.includes("API key not valid")) {
     return { type: AnalysisErrorType.API_KEY, message: "Az API kulcs érvénytelen. Kérjük, ellenőrizze, hogy helyes kulcsot adott-e meg." };
  }

  if (message.includes("Content generation stopped due to SAFETY")) {
    return { type: AnalysisErrorType.UNKNOWN, message: "Az MI biztonsági okokból leállította a generálást. A megadott szöveg (CV vagy álláshirdetés) tartalmazhatott érzékeny vagy nem megfelelő tartalmat. Kérjük, ellenőrizze és próbálja újra." };
  }

  // Handle Resource Exhausted / Quota errors
  if (status === "RESOURCE_EXHAUSTED" || status === 429 || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit")) {
    return { type: AnalysisErrorType.TRANSIENT, message: "Túllépte a használati limitet (Rate Limit Exceeded). Kérjük várjon néhány percet, vagy használjon másik API kulcsot." };
  }

  // This is a common error message format for invalid keys from some Google Cloud services
  if (message.includes("API key not found") || message.toLowerCase().includes("permission denied")) {
    return { type: AnalysisErrorType.API_KEY, message: "Hiba az API kulccsal. Ellenőrizze, hogy a kulcs érvéyes és rendelkezik a szükséges jogosultságokkal." };
  }

  // Handle standard HTTP status codes
  if (status === 400) {
    return { type: AnalysisErrorType.UNKNOWN, message: "Hiba a kérésben (Bad Request). Lehetséges, hogy a bevitt adatok formátuma hibás, vagy a modell elutasította a kérést. Kérjük, próbálja újra később." };
  }

  if (status === 401 || status === 403) {
    return { type: AnalysisErrorType.API_KEY, message: "Hitelesítési hiba. Az API kulcs érvénytelen vagy lejárt." };
  }

  if (status === 500 || status === 503) {
    return { type: AnalysisErrorType.TRANSIENT, message: "Átmeneti szerverhiba az MI szolgáltatónál. Kérjük próbálja meg később újra." };
  }

  // The existing check is good, let's keep it.
  if (message.includes("Requested entity was not found")) {
    return { type: AnalysisErrorType.API_KEY, message: "Az API kulcs nem található vagy érvénytelen. Kérjük válassza ki újra!" };
  }
  
  if (error.type === AnalysisErrorType.PARSING) {
    return { type: AnalysisErrorType.PARSING, message: "Hiba az MI válaszának feldogozása során. Ez egy átmeneti hiba lehet, kérjük próbálja újra." };
  }

  // Default fallback
  return { type: AnalysisErrorType.UNKNOWN, message: "Ismeretlen hiba történt. Kérjük, próbálja meg később újra, vagy vegye fel a kapcsolatot a támogatással." };
};

const withRetry = async <T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    // If the error is already a structured AnalysisErrorInfo, don't categorize it again.
    if (error.type && Object.values(AnalysisErrorType).includes(error.type)) {
        // Only retry on transient errors. For API_KEY or UNKNOWN errors, fail immediately.
        if (retries > 0 && error.type === AnalysisErrorType.TRANSIENT) {
            await new Promise(res => setTimeout(res, delay));
            return withRetry(fn, retries - 1, delay * 2);
        }
        throw error;
    }

    // Categorize the raw error.
    const categorizedError = categorizeError(error);

    // Retry on transient errors. For API_KEY or UNKNOWN errors, fail immediately.
    if (retries > 0 && categorizedError.type === AnalysisErrorType.TRANSIENT) {
      await new Promise(res => setTimeout(res, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    
    throw categorizedError;
  }
};

export const validateJdText = async (jdText: string): Promise<boolean> => {
    if (!jdText || jdText.trim().length < 150) { // Basic length check
        return false;
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: `Is the following text a real, detailed job description for a professional role? The user might be trying to trick you with random text like "asdfasdf" or song lyrics. Be critical. Answer with only the single word "YES" or "NO".

            Text: "${jdText.substring(0, 1500)}"`,
            config: {
                temperature: 0.0,
            }
        });
        const resultText = response.text?.trim().toUpperCase();
        return resultText === 'YES';
    } catch (error) {
        console.error("Error during JD validation:", error);
        return true; // Fail open: If validation fails, assume it's valid to not block the user.
    }
};


export const searchCompanyWebsite = async (companyName: string): Promise<{ url: string; title: string }[] | null> => {
  const trimmedInput = companyName.trim();
  const urlPattern = new RegExp('^(https?://)?(www\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(/.*)?$', 'i');
  
  if (urlPattern.test(trimmedInput)) {
    const fullUrl = trimmedInput.startsWith('http') ? trimmedInput : `https://${trimmedInput}`;
    const domainOnly = trimmedInput.replace(new RegExp('^(https?://)?(www\\.)?'), '').split('/')[0];
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

export const generateClarificationQuestions = async (
  cvFile: FileInput,
  jdText: string,
  lang: string
): Promise<ClarificationQuestion[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  return withRetry(async () => {
    try {
      const targetLang = lang === 'hu' ? 'HUNGARIAN' : 'ENGLISH';
      const prompt = `As a senior career strategist, analyze the provided CV and Job Description. Identify exactly 3 critical ambiguities where the candidate's experience could be interpreted in multiple ways relevant to the job.
      
      For each ambiguity, formulate a single, clear question to the candidate. For each question, provide exactly two mutually exclusive, concise answer options that would significantly alter the strategic positioning.
      
      Your goal is to get the most valuable clarifying information to create a hyper-targeted analysis. The questions should be strategic, not simple yes/no.
      
       Respond in ${targetLang}.`;

      const contents: any[] = [{ text: prompt }];
      contents.push({ inlineData: { data: cvFile.data, mimeType: cvFile.mimeType } });
      contents.push({ text: `\n\nJOB DESCRIPTION:\n${jdText}` });

      const response = await ai.models.generateContent({
        model: JOBRADAR_CONFIG.AI_MODEL,
        contents: { parts: contents },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  minItems: 2,
                  maxItems: 2
                }
              },
              required: ["question", "options"]
            }
          }
        }
      });

      const result = JSON.parse(response.text);
      if (Array.isArray(result) && result.length === 3) {
        return result as ClarificationQuestion[];
      }
      throw new Error("Invalid format for clarification questions.");

    } catch (error) {
      console.error("Clarification Questions Error:", error);
      throw categorizeError(error);
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
  linkedinProfileText?: string,
  clarifications?: { question: string, answer: string }[]
): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  return withRetry(async () => {
    try {
      // ===== STAGE 1: RESEARCH CALL (using Google Search) =====
      const researchPrompt = `Using Google Search, conduct a deep-dive investigation into the company: "${companyName}" with website "${companyWebsite}".
      Synthesize your findings into a comprehensive intelligence report. Focus on these areas:
      1.  **Corporate Identity & Market Position:** What is their core business? Who are their main customers? What is their market share and reputation?
      2.  **Recent News & Strategy:** Any recent product launches, mergers, financial reports, or strategic shifts mentioned in the news?
      3.  **Corporate Culture:** What is the sentiment about working there? (Check sources like Glassdoor, Reddit if possible). What are their stated values?
      4.  **Competitive Landscape:** Who are their top 3-4 direct competitors? What are their key differentiators?
      5.  **Hungarian Presence (if applicable):** What is the scale and focus of their operations in Hungary?
      
      Provide a detailed, objective report based on your search findings.`;
      
      const researchResponse = await ai.models.generateContent({
          model: JOBRADAR_CONFIG.AI_MODEL,
          contents: researchPrompt,
          config: {
              tools: [{ googleSearch: {} }],
              temperature: 0.1,
          }
      });
      const researchReport = researchResponse.text;

      // ===== STAGE 2: ANALYSIS & JSON GENERATION CALL =====
      const targetLang = lang === 'hu' ? 'HUNGARIAN (Magyar)' : 'ENGLISH';
      const languageInstruction = lang === 'hu' 
        ? "IMPORTANT: A teljes választ és a JSON tartalmát MAGYAR nyelven generáld (Hungarian)." 
        : "IMPORTANT: You MUST generate the entire JSON response and all text content in ENGLISH.";
      
      let clarificationsText = '';
      if (clarifications && clarifications.length > 0) {
        clarificationsText = `
        **USER CLARIFICATIONS (CRITICAL CONTEXT):**
        ${clarifications.map(c => `- Q: ${c.question}\n  A: ${c.answer}`).join('\n')}
        Use this information to refine your analysis, especially the executive summary and gap analysis.
        `;
      }
      
      let analysisPrompt = `DEEP ANALYSIS INITIATED: [Company: ${companyName}] [URL: ${companyWebsite}]
      TARGET LANGUAGE: ${targetLang}
      ${languageInstruction}

      **INTERNAL RESEARCH BRIEFING (DO NOT output this in the JSON):**
      ${researchReport}
      **END OF BRIEFING.**
      
      ${clarificationsText}

      Candidate Data: ${cvFile ? 'Binary PDF Attached' : cvText}
      Job Scope: ${jdText}
      Special Hook: ${userNote ? userNote : 'None'}
      Interviewer Profile: ${interviewerLinkedin ? interviewerLinkedin : 'Generic Predicted Decision Maker'}
      LinkedIn Profile Data: ${linkedinProfileText ? linkedinProfileText : 'Not provided'}
      
      CRITICAL PROTOCOLS:
      - Use the provided INTERNAL RESEARCH BRIEFING to inform your analysis for all relevant fields (competitors, market position, etc.).
      - CV SUGGESTIONS DEEP-DIVE: For each CV suggestion, provide an implementationExample with a 'before' and an 'after'.
      - NEGOTIATION SCENARIOS: Provide 5 distinct, nuanced scripts as objects with 'scenario' and 'script' keys.
      - APPLY ALL STRATEGIC MODULES (Salary Architecture, Interviewer X-Ray, Competitor Analysis).
      - ALL text must be in ${targetLang}. 
      - Generate exactly 5 interview questions. For each question, provide a comprehensive, detailed strategic answer. The answer MUST follow the STAR method (Situation, Task, Action, Result), incorporate specific metrics where possible, and align with the predicted stakeholder profiles.`;

      const contents: any[] = [{ text: analysisPrompt }];
      if (cvFile) {
        contents.push({ inlineData: { data: cvFile.data, mimeType: cvFile.mimeType } });
      }

      const analysisResponse = await ai.models.generateContent({
        model: JOBRADAR_CONFIG.AI_MODEL,
        contents: { parts: contents },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          // NO `tools` here to avoid the conflict
          thinkingConfig: { thinkingBudget: 8192 },
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
              plan90Day: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phaseTitle: { type: Type.STRING },
                    actions: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["phaseTitle", "actions"]
                }
              },
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
                    impact: { type: Type.STRING, description: "The impact of the suggestion, must be one of: 'high' or 'medium'." },
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
                        severity: { type: Type.STRING, description: "The severity of the risk, must be one of: 'High', 'Medium', or 'Low'." },
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
              "cvSummaryRewrite", "coverLetter", "keywords", "plan90Day", 
              "companyDeepDive", "companyMarketPosition", "hungarianPresence", "whyWorkHere",
              "interviewQuestions", "interviewAnswers", "linkedinAudit",
              "competitorAnalysis", "preMortemAnalysis", "cvSuggestions", "cvRewrite",
              "salaryNegotiation", "interviewerProfiler"
            ]
          }
        }
      });

      const finishReason = analysisResponse.candidates?.[0]?.finishReason;
      if (finishReason && finishReason !== 'STOP') {
        if (finishReason === 'SAFETY') {
          throw { type: AnalysisErrorType.UNKNOWN, message: "Az MI biztonsági okokból leállította a generálást. A megadott szöveg (CV vagy álláshirdetés) tartalmazhatott érzékeny tartalmat. Kérjük, ellenőrizze és próbálja újra." };
        }
        if (finishReason === 'RECITATION') {
           throw { type: AnalysisErrorType.UNKNOWN, message: "Az MI a forrásanyagok túlzott idézése miatt állította le a generálást. Próbálja meg más megfogalmazással." };
        }
        if (finishReason === 'MAX_TOKENS') {
           throw { type: AnalysisErrorType.UNKNOWN, message: "A generált válasz túl hosszú volt. Ez a hiba általában a modell belső folyamatai miatt történik, próbálja újra." };
        }
        throw { type: AnalysisErrorType.TRANSIENT, message: `A generálás leállt (${finishReason}). Ez egy átmeneti hiba, kérjük próbálja meg újra.` };
      }

      try {
        const resultText = analysisResponse.text;
        if (!resultText || resultText.trim() === '') {
            throw { type: AnalysisErrorType.PARSING, message: "Az MI üres választ adott. Ez előfordulhat szerverhiba vagy a bemeneti adatokkal kapcsolatos probléma miatt. Kérjük, próbálja újra." };
        }
        const result = JSON.parse(resultText);
        return { ...result, companyWebsite, companyName };
      } catch (parseError) {
        console.error("JSON Parsing Error. Raw AI response:", analysisResponse.text);
        throw { type: AnalysisErrorType.PARSING, message: "Hiba az MI válaszának feldogozása során (érvénytelen JSON). Ez egy átmeneti hiba lehet. Kérjük, próbálja újra." };
      }
    } catch (error: any) {
      console.error("Analysis Error Detail:", error);
      throw error;
    }
  });
};
