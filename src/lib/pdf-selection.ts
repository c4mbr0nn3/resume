import type { Resume } from './resume'

export interface PdfLimits {
  projects: number
  workHighlights: number
  skillKeywords: number
}

export const PDF_LIMITS: PdfLimits = {
  projects: 4,
  workHighlights: 4,
  skillKeywords: 9,
}

/**
 * Returns a filtered copy of the resume trimmed for the PDF export: work
 * highlights and skill keywords are capped and only the first
 * `PDF_LIMITS.projects` projects are kept (with their tag lines). Basics,
 * education and languages pass through untouched. The input is never mutated.
 */
export function selectForPdf(data: Resume): Resume {
  return {
    ...data,
    work: data.work.map(job => ({
      ...job,
      highlights: job.highlights.slice(0, PDF_LIMITS.workHighlights),
    })),
    skills: data.skills.map(skill => ({
      ...skill,
      keywords: skill.keywords.slice(0, PDF_LIMITS.skillKeywords),
    })),
    projects: data.projects.slice(0, PDF_LIMITS.projects),
  }
}
