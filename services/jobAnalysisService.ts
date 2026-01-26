
import { JobAnalysis, AnalysisConclusion } from '../types';
import { Job, analyzeJobHeuristics } from '../utils/jobHeuristics';

/**
 * Performs a high-level analysis of a job posting by converting heuristic signals
 * into structured scores and a qualitative conclusion.
 *
 * @param job The job object containing the description to analyze.
 * @returns A JobAnalysis object with scores and a conclusion.
 */
export function analyzeJob(job: Job): JobAnalysis {
  const heuristics = analyzeJobHeuristics(job);

  const positives: string[] = [];
  const warnings: string[] = [];
  const opportunities: string[] = [];

  // --- Seniority Analysis ---
  if (heuristics.isSeniorRole) {
    positives.push("A pozíció nem junior szintű, ami illeszkedik a senior fókuszhoz.");
  } else {
    warnings.push("A hirdetés 'junior' vagy 'pályakezdő' kulcsszavakat tartalmaz, ami alacsonyabb tapasztalati szintet jelezhet.");
  }

  // --- Clarity and Transparency Analysis ---
  if (heuristics.hasSalaryInfo) {
    positives.push("A bérsáv vagy kompenzáció említése transzparenciára és magabiztos vállalati háttérre utal.");
  } else {
    warnings.push("A bérsáv nincs megadva. Ez a tárgyalási folyamat során proaktív stratégiát igényel tőled.");
  }

  if (heuristics.hasBenefitsInfo) {
    positives.push("A hirdetés konkrét juttatásokat is említ (pl. home office, bónusz), ami a gondoskodó vállalati kultúrára utalhat.");
  }

  if (heuristics.clarityScore > 0.7) {
    positives.push("A hirdetés jól strukturált és egyértelmű, ami professzionális HR folyamatot sejtet.");
  } else if (heuristics.clarityScore < 0.4) {
    warnings.push("A leírás homályos vagy rosszul strukturált. A valós feladatkör jelentősen eltérhet a leírttól.");
  }
  
  // --- Tech Stack Analysis ---
  const techCount = heuristics.foundTech.length;
  if (techCount > 0 && techCount <= 5) {
    positives.push(`A technológiai stack fókuszált (${techCount} kulcstechnológia), ami mély szakértelmet igényelhet.`);
  } else if (techCount > 5 && techCount <= 10) {
    opportunities.push(`A közepesen széles stack (${techCount} technológia) lehetőséget adhat a meglévő tudásod diverzifikálására.`);
  } else if (techCount > 10) {
    warnings.push(`A technológiai elvárások (${techCount} technológia) szokatlanul széleskörűek. Ez jelezhet egy 'mindenes' pozíciót vagy irreális elvárásokat.`);
  }

  // --- Content Quality Analysis (Jargon & Soft Skills) ---
  if (heuristics.jargonScore > 0.6) {
    warnings.push("A hirdetésben sok a HR-es közhely ('dinamikus', 'versenyképes'), ami elfedheti a lényegi, technikai információkat.");
  }

  if (heuristics.softSkillScore > 0.7) {
    warnings.push("A leírás túlzottan a soft skillekre fókuszál a konkrét technikai elvárások helyett.");
    opportunities.push("Mivel a soft skillek hangsúlyosak, a kommunikációs és vezetői képességek bemutatása kulcsfontosságú lesz az interjún.");
  }
  
  const conclusion: AnalysisConclusion = {
    positives,
    warnings,
    opportunities,
  };

  // --- Score Calculation ---
  const seniorityScore = heuristics.isSeniorRole ? 0.9 : 0.2;
  const stackFocusScore = 1 - heuristics.stackSpread;
  const transparencyScore = 
    (heuristics.hasSalaryInfo ? 0.35 : 0) + 
    (heuristics.hasBenefitsInfo ? 0.1 : 0) +
    (heuristics.clarityScore * 0.55) - 
    (heuristics.jargonScore * 0.1) - 
    (heuristics.softSkillScore * 0.1);

  const jobAnalysis: JobAnalysis = {
    seniorityScore: parseFloat(Math.max(0, seniorityScore).toFixed(2)),
    stackFocusScore: parseFloat(Math.max(0, stackFocusScore).toFixed(2)),
    transparencyScore: parseFloat(Math.max(0, transparencyScore).toFixed(2)),
    conclusion: conclusion,
  };

  return jobAnalysis;
}