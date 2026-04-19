import md from 'markdown-it'

const renderer = md()

export const renderMarkdown = content => renderer.render(content)
