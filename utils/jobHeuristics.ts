
/**
 * A minimal representation of a job posting, primarily for heuristic analysis.
 */
export type Job = {
  description: string;
};

export type HeuristicResult = {
  isSeniorRole: boolean;
  foundTech: string[];
  stackSpread: number;
  hasSalaryInfo: boolean;
  hasBenefitsInfo: boolean;
  clarityScore: number;
  jargonScore: number; // 0-1, higher is more jargon
  softSkillScore: number; // 0-1, higher is more soft skill focus
};


/**
 * Analyzes a job description to extract high-level heuristic signals.
 * This provides a quick, non-AI assessment of job posting quality.
 *
 * @param job The job object containing the description.
 * @returns A HeuristicResult object with nuanced metrics.
 */
export function analyzeJobHeuristics(job: Job): HeuristicResult {
  const description = (job?.description || '').toLowerCase();
  const wordCount = description.split(/\s+/).filter(Boolean).length;

  // 1. isSeniorRole: boolean
  // Flags junior/entry-level roles. Assumes senior roles are the target.
  const juniorKeywords = ['junior', 'entry-level', 'intern', 'gyakornok', 'pályakezdő'];
  const isSeniorRole = !juniorKeywords.some(kw => description.includes(kw));

  // 2. hasSalaryInfo: boolean
  // Checks for explicit mentions of salary or compensation.
  const salaryKeywords = [
    'salary', 'bér', 'fizetés', 'compensation', 'wynagrodzenie', 'gehalt', 'range', 'sáv',
    '$', '€', 'ft', 'huf', 'eur', 'usd', 'forint'
  ];
  const hasSalaryInfo = salaryKeywords.some(kw => description.includes(kw));

  // 3. clarityScore: number (0-1)
  // Scores clarity based on structure (bullets, sections) and length.
  let clarityScore = 0;
  if (wordCount > 20) {
    const bulletPoints = (description.match(/[*•-]\s/g) || []).length;
    const bulletRatio = bulletPoints / (wordCount / 40);
    clarityScore += Math.min(0.6, bulletRatio * 0.6);

    const sectionKeywords = ['responsibilities', 'requirements', 'what we offer', 'qualifications', 'nice to have', 'feladatok', 'elvárások', 'amit kínálunk'];
    const sectionsFound = sectionKeywords.filter(kw => description.includes(kw)).length;
    clarityScore += Math.min(0.4, sectionsFound * 0.1);

    if (wordCount > 1000) clarityScore *= 0.8;
    if (wordCount < 100) clarityScore *= 0.7;
  }
  clarityScore = Math.max(0, Math.min(1, clarityScore));

  // 4. Tech Stack analysis
  const techKeywords = [
      'javascript', 'typescript', 'react', 'angular', 'vue', 'node.js', 'python', 'django', 'flask', 'java', 'spring',
      'c#', '.net', 'php', 'laravel', 'ruby', 'rails', 'go', 'rust', 'swift', 'kotlin', 'sql', 'mysql', 'postgresql',
      'mongodb', 'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'ansible', 'jenkins', 'git',
      'graphql', 'rest', 'kafka', 'html', 'css', 'sass', 'webpack', 'vite', 'next.js', 'nestjs', 'c++', 'scala'
  ];
  
  const foundTech = techKeywords.filter(kw => {
    const regex = new RegExp(`\\b${kw.replace(/[.+*?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(job.description); // Use original description for case-sensitive names if needed, but regex is case-insensitive
  });
  
  const foundTechCount = new Set(foundTech).size;
  const maxTechForFocus = 12;
  const stackSpread = Math.min(1, foundTechCount / maxTechForFocus);

  // 5. Jargon Score (0-1)
  const jargonKeywords = ['synergy', 'disrupt', 'paradigm shift', 'leverage', 'rockstar', 'ninja', 'guru', 'agilis', 'dinamikus csapat', 'proaktív', 'kihívást jelentő feladatok', 'versenyképes'];
  const jargonCount = jargonKeywords.filter(kw => description.includes(kw)).length;
  const jargonScore = Math.min(1, jargonCount / 5); // 5+ jargon words is max score

  // 6. Soft Skill Score (0-1)
  const softSkillKeywords = ['communication', 'team player', 'problem-solving', 'leadership', 'adaptability', 'work ethic', 'time management', 'kommunikációs', 'csapatjátékos', 'problémamegoldó', 'együttműködés', 'motivált', 'önálló'];
  const softSkillCount = softSkillKeywords.filter(kw => description.includes(kw)).length;
  const softSkillScore = wordCount > 0 ? Math.min(1, softSkillCount / (wordCount / 50)) : 0; // 1 soft skill per 50 words is high

  // 7. Benefits Check
  const benefitKeywords = ['home office', 'remote', 'rugalmas', 'flexible', 'cafeteria', 'bónusz', 'bonus', 'juttatás', 'aycm', 'medicover', 'private health', 'magán egészségbiztosítás', 'stock option', 'részvényopció', 'esop'];
  const hasBenefitsInfo = benefitKeywords.some(kw => description.includes(kw));

  return {
    isSeniorRole,
    foundTech,
    stackSpread,
    hasSalaryInfo,
    hasBenefitsInfo,
    clarityScore,
    jargonScore,
    softSkillScore,
  };
}