interface ResumeData {
  basics: any
  work?: any[]
  education?: any[]
  skills?: any[]
  languages?: any[]
}

export function buildPersonSchema(resume: ResumeData, locale: 'en' | 'it') {
  const { basics, work = [], education = [], skills = [], languages = [] } = resume
  const site = 'https://resume.francescozorzi.me'
  const url = locale === 'it' ? `${site}/it/` : `${site}/`

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: basics.name,
    url,
    image: `${site}/og-image.jpg`,
    jobTitle: basics.label?.split('|')[0]?.trim(),
    ...(basics.email ? { email: `mailto:${basics.email}` } : {}),
    ...(basics.location?.city
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: basics.location.city,
            addressRegion: basics.location.region,
          },
        }
      : {}),
    ...(basics.profiles?.length ? { sameAs: basics.profiles.map((p: any) => p.url) } : {}),
    ...(skills.length
      ? { knowsAbout: [...new Set(skills.flatMap((s: any) => s.keywords ?? []))].slice(0, 40) }
      : {}),
    ...(languages.length ? { knowsLanguage: languages.map((l: any) => l.language) } : {}),
    ...(education.length
      ? { alumniOf: education.map((e: any) => ({ '@type': 'EducationalOrganization', name: e.institution })) }
      : {}),
    ...(work.length
      ? { worksFor: work.filter((w: any) => !w.endDate || w.endDate === 'Present').map((w: any) => ({ '@type': 'Organization', name: w.name })) }
      : {}),
  }
}
