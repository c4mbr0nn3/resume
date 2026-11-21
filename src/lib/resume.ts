import type resume from '../assets/resume.en.json'

/**
 * The resume schema (JSON Resume), inferred from the English file so a change
 * to the data shape surfaces as a type error instead of a silent drift. Both
 * locales share the same shape.
 */
export type Resume = typeof resume
export type ResumeBasics = Resume['basics']
export type ResumeProfile = ResumeBasics['profiles'][number]
export type ResumeWork = Resume['work'][number]
export type ResumeEducation = Resume['education'][number]
export type ResumeSkill = Resume['skills'][number]
export type ResumeLanguage = Resume['languages'][number]
export type ResumeProject = Resume['projects'][number]
