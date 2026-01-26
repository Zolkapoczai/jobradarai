/**
 * A minimal representation of a job posting, primarily for heuristic analysis.
 */
export type Job = {
  description: string;
};

export type HeuristicResult = {
  seniorityOk: boolean;
  stackSpread: number;
  hasSalaryInfo: boolean;
  descriptionClarityScore: number;
};

/**
 * Analyzes a job description to extract high-level heuristic signals.
 * This provides a quick, non-AI assessment of job posting quality.
 *
 * @param job The job object containing the description.
 * @returns A HeuristicResult object with boolean and numeric (0-1) signals.
 */
export function analyzeJobHeuristics(job: Job): HeuristicResult {
  const description = (job?.description || '').toLowerCase();
  const wordCount = description.split(/\s+/).filter(Boolean).length;

  // 1. seniorityOk: boolean
  // Flags junior/entry-level roles. Assumes senior roles are the target.
  const juniorKeywords = ['junior', 'entry-level', 'intern', 'gyakornok', 'pályakezdő'];
  const seniorityOk = !juniorKeywords.some(kw => description.includes(kw));

  // 2. hasSalaryInfo: boolean
  // Checks for explicit mentions of salary or compensation.
  const salaryKeywords = [
    'salary', 'bér', 'fizetés', 'compensation', 'wynagrodzenie', 'gehalt', 'range', 'sáv',
    '$', '€', 'ft', 'huf', 'eur', 'usd', 'forint'
  ];
  const hasSalaryInfo = salaryKeywords.some(kw => description.includes(kw));

  // 3. descriptionClarityScore: number (0-1)
  // Scores clarity based on structure (bullets, sections) and length.
  let clarityScore = 0;
  if (wordCount > 20) { // Avoid scoring empty/trivial descriptions
    // Bullet points are a good sign of structure.
    const bulletPoints = (description.match(/[*•-]\s/g) || []).length;
    // A ratio of 1 bullet per 40 words is considered very good (score of 1.0).
    const bulletRatio = bulletPoints / (wordCount / 40);
    clarityScore += Math.min(0.6, bulletRatio * 0.6); // Bullets contribute up to 0.6

    // Presence of standard sections is another good sign.
    const sectionKeywords = ['responsibilities', 'requirements', 'what we offer', 'qualifications', 'nice to have', 'feladatok', 'elvárások', 'amit kínálunk'];
    const sectionsFound = sectionKeywords.filter(kw => description.includes(kw)).length;
    // Each section adds a bonus, maxing out at 0.4.
    clarityScore += Math.min(0.4, sectionsFound * 0.1);

    // Penalize extremely long descriptions, as they are often poorly written.
    if (wordCount > 1000) {
      clarityScore *= 0.8;
    }
    // Penalize very short descriptions.
    if (wordCount < 100) {
      clarityScore *= 0.7;
    }
  }
  const descriptionClarityScore = Math.max(0, Math.min(1, clarityScore));

  // 4. stackSpread: number (0-1)
  // Estimates how specialized the tech stack is. Higher score = wider/less focused stack.
  const techKeywords = [
      'javascript', 'typescript', 'react', 'angular', 'vue', 'node.js', 'python', 'django', 'flask', 'java', 'spring',
      'c#', '.net', 'php', 'laravel', 'ruby', 'rails', 'go', 'rust', 'swift', 'kotlin', 'sql', 'mysql', 'postgresql',
      'mongodb', 'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'ansible', 'jenkins', 'git',
      'graphql', 'rest', 'kafka', 'html', 'css', 'sass', 'webpack', 'vite', 'next.js', 'nestjs', 'c++', 'scala'
  ];
  
  const foundTechCount = techKeywords.filter(kw => {
    // Use word boundaries to avoid partial matches (e.g., 'go' in 'government').
    const regex = new RegExp(`\\b${kw.replace(/[.+*?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(description);
  }).length;

  // Normalize the score. We assume a job listing more than 12 distinct technologies
  // has a very wide stack (spread = 1.0).
  const maxTechForFocus = 12;
  const stackSpread = Math.min(1, foundTechCount / maxTechForFocus);

  return {
    seniorityOk,
    stackSpread,
    hasSalaryInfo,
    descriptionClarityScore,
  };
}
