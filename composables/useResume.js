export default function useResume() {
  const resume = useState('resume')

  async function fetch() {
    const data = await import('~/assets/resume.json')
    resume.value = data
  }

  return { resume, fetch }
}
