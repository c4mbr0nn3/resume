export default function useIcons() {
  const skill = ref({
    'javascript': 'simple-icons:javascript',
    'vue.js': 'simple-icons:vuedotjs',
    'vuetify': 'simple-icons:vuetify',
    'nuxt': 'i-simple-icons-nuxt',
    'html': 'simple-icons:html5',
    'css': 'simple-icons:css3',
    'tailwind css': 'simple-icons:tailwindcss',
    'java': 'nonicons:java-16',
    'c#': 'nonicons:c-sharp-16',
    '.net': 'simple-icons:dotnet',
    'ef core': 'i-devicon-plain-entityframeworkcore',
    'restful api': 'i-carbon-api',
    'postgresql': 'simple-icons:postgresql',
    'docker': 'simple-icons:docker',
    'kubernetes': 'simple-icons:kubernetes',
    'aws': 'simple-icons:amazonaws',
    'git': 'simple-icons:git',
    'github': 'simple-icons:github',
    'gitlab': 'simple-icons:gitlab',
    'sqlite': 'simple-icons:sqlite',
    'sql server': 'i-devicon-plain-microsoftsqlserver',
    'golang': 'simple-icons:go',
    'bash': 'simple-icons:gnubash',
    'linux': 'simple-icons:linux',
    'proxmox': 'i-simple-icons-proxmox',
    'opnsense': 'i-simple-icons-opnsense',
    'networking': 'i-carbon-network-4',
    'security': 'i-carbon-security',
    'virtualization': 'i-carbon-virtual-machine',
  })

  const social = ref({
    github: 'simple-icons:github',
    linkedin: 'simple-icons:linkedin',
    x: 'simple-icons:x',
    gitlab: 'simple-icons:gitlab',
  })

  return { skill, social }
}
