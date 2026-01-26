
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
  const heuristicResult = analyzeJobHeuristics(job);

  const positives: string[] = [];
  let risk: string | undefined = undefined;

  // --- Positive Statement Rules ---
  if (heuristicResult.seniorityOk) {
    positives.push("Az elvárások illeszkednek a megjelölt tapasztalati szinthez.");
  }
  if (heuristicResult.stackSpread < 0.4) {
    positives.push("A technológiai stack fókuszált, nem szétszórt.");
  }
  // This rule checks for either explicit salary info OR a clear description.
  if (heuristicResult.hasSalaryInfo || heuristicResult.descriptionClarityScore > 0.6) {
    positives.push("A hirdetés viszonylag konkrét, nem csak általánosságokat tartalmaz.");
  }

  // --- Risk Statement Priority Rules ---
  // A very wide stack is the highest priority risk.
  if (heuristicResult.stackSpread > 0.7) {
    risk = "A szerep több területet fedhet le, mint amit a cím sugall.";
  // A vague description is the second priority risk.
  } else if (heuristicResult.descriptionClarityScore < 0.4) {
    risk = "A hirdetés kevés konkrétumot tartalmaz, ami félreértésekhez vezethet.";
  }

  const conclusion: AnalysisConclusion = {
    positives,
    risk,
  };

  // --- Convert Heuristic Signals to Scores (0-1 range) ---
  // A binary check is converted to a score (0.9 for good, 0.2 for bad).
  const seniorityScore = heuristicResult.seniorityOk ? 0.9 : 0.2;
  
  // Stack spread is inverted to represent focus (high spread = low focus).
  const stackFocusScore = 1 - heuristicResult.stackSpread;

  // Transparency is a weighted average of clarity and the presence of salary info.
  const transparencyScore = (heuristicResult.hasSalaryInfo ? 0.4 : 0) + (heuristicResult.descriptionClarityScore * 0.6);

  const jobAnalysis: JobAnalysis = {
    // Round scores to two decimal places for consistency.
    seniorityScore: parseFloat(seniorityScore.toFixed(2)),
    stackFocusScore: parseFloat(stackFocusScore.toFixed(2)),
    transparencyScore: parseFloat(transparencyScore.toFixed(2)),
    conclusion: conclusion,
  };

  return jobAnalysis;
}
