import type { Resume } from './resume'

export function buildPersonSchema(resume: Resume, locale: 'en' | 'it') {
  const { basics, work = [], education = [], skills = [], languages = [] } = resume
  const site = 'https://resume.francescozorzi.me'
  const url = locale === 'it'
    ? `${site}/it/`
    : `${site}/`

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': basics.name,
    url,
    'image': `${site}/og-image.jpg`,
    'jobTitle': basics.label?.split('|')[0]?.trim(),
    ...(basics.email
      ? { email: `mailto:${basics.email}` }
      : {}),
    ...(basics.location?.city
      ? {
          address: {
            '@type': 'PostalAddress',
            'addressLocality': basics.location.city,
            'addressRegion': basics.location.region,
          },
        }
      : {}),
    ...(basics.profiles.length
      ? {
          sameAs: basics.profiles.map(p => p.url),
        }
      : {}),
    ...(skills.length
      ? {
          knowsAbout: [
            ...new Set(skills.flatMap(s => s.keywords)),
          ].slice(0, 40),
        }
      : {}),
    ...(languages.length
      ? {
          knowsLanguage: languages.map(l => l.language),
        }
      : {}),
    ...(education.length
      ? {
          alumniOf: education.map(e => ({ '@type': 'EducationalOrganization', 'name': e.institution })),
        }
      : {}),
    ...(work.length
      ? {
          worksFor: work.filter(w => !w.endDate || w.endDate === 'Present').map(w => ({ '@type': 'Organization', 'name': w.name })),
        }
      : {}),
  }
}
