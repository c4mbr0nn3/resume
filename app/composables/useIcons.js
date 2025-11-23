export default function useIcons() {
  const skill = ref({
    'javascript': 'simple-icons:javascript',
    'vue.js': 'simple-icons:vuedotjs',
    'vuetify': 'simple-icons:vuetify',
    'html': 'simple-icons:html5',
    'css': 'simple-icons:css3',
    'java': 'nonicons:java-16',
    'c#': 'nonicons:c-sharp-16',
    '.net': 'simple-icons:dotnet',
    'postgresql': 'simple-icons:postgresql',
    'docker': 'simple-icons:docker',
    'kubernetes': 'simple-icons:kubernetes',
    'aws': 'simple-icons:amazonaws',
    'git': 'simple-icons:git',
    'github': 'simple-icons:github',
    'gitlab': 'simple-icons:gitlab',
    'sqlite': 'simple-icons:sqlite',
    'golang': 'simple-icons:go',
    'bash': 'simple-icons:gnubash',
    'linux': 'simple-icons:linux',
  })

  const social = ref({
    github: 'simple-icons:github',
    linkedin: 'simple-icons:linkedin',
    x: 'simple-icons:x',
    gitlab: 'simple-icons:gitlab',
  })

  return { skill, social }
}
