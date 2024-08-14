import { useState } from '#imports'

export default function useResume() {
  const resume = useState('resume')

  const education = computed(() => resume.value.education)

  const work = computed(() => resume.value.work)

  const skills = computed(() => resume.value.skills)

  async function fetch() {
    const data = await import('~/assets/resume.json')
    resume.value = data
  }

  return { resume, education, work, skills, fetch }
}
