import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright-core'

const DIST = resolve('dist')
const URL_PATH = '/pdf/'
const OUTPUT = 'resume.pdf'
const HOST = '127.0.0.1'
// Where a distro Chromium usually lives. CI resolves Playwright's own browser
// first, so these only matter for a local run.
const SYSTEM_CHROMIUM = [
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
]

async function launchBrowser() {
  const candidates = [
    { label: 'CHROME_PATH', executablePath: process.env.CHROME_PATH },
    { label: 'Playwright browser registry', executablePath: undefined },
    ...SYSTEM_CHROMIUM.map(binary => ({ label: binary, executablePath: binary })),
  ]
  const errors = []
  for (const { label, executablePath } of candidates) {
    try {
      return await chromium.launch({
        executablePath,
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      })
    }
    catch (error) {
      errors.push(`  ${label}: ${error.message.split('\n')[0]}`)
    }
  }
  throw new Error(`no Chromium could be launched; set CHROME_PATH\n${errors.join('\n')}`)
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

async function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0])
  const rel = clean.replace(/^\/+/, '')
  const safe = join(DIST, rel)
  if (safe !== DIST && !safe.startsWith(`${DIST}/`))
    return null

  const direct = safe === DIST || safe.endsWith('/')
    ? join(safe, 'index.html')
    : safe

  const candidates = [direct]
  if (!extname(direct))
    candidates.push(`${direct}.html`)

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate)
      if (info.isFile())
        return candidate
    }
    catch {
      // try next candidate
    }
  }
  return null
}

function startServer() {
  const server = createServer(async (req, res) => {
    const filePath = await resolvePath(req.url || '/')
    if (!filePath) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      res.end(`404 Not Found: ${req.url} (document root: ${DIST})`)
      return
    }
    try {
      const body = await readFile(filePath)
      res.writeHead(200, {
        'content-type': MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
        'content-length': body.length,
      })
      res.end(body)
    }
    catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
      res.end(`500 read error: ${err?.message ?? err}`)
    }
  })
  return new Promise((resolvePromise, rejectPromise) => {
    server.once('error', rejectPromise)
    server.listen(0, HOST, () => resolvePromise(server))
  })
}

try {
  await stat(join(DIST, 'pdf', 'index.html'))

  const server = await startServer()
  const port = server.address().port
  console.log(`serving ${DIST} at http://${HOST}:${port}`)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage({
      viewport: { width: 1240, height: 1754 },
    })
    // Hermetic render: only the throwaway local server may be fetched, so an
    // analytics script or a remote font cannot stall the build or phone home.
    await page.route('**/*', (route) => {
      if (route.request().url().startsWith(`http://${HOST}:${port}/`))
        return route.continue()
      return route.abort()
    })
    await page.goto(`http://${HOST}:${port}${URL_PATH}`, { waitUntil: 'networkidle' })

    await page.evaluate(() => document.documentElement.classList.add('pdf'))
    await page.evaluate(() => document.fonts.ready.then(() => true))

    // Every `html.pdf` rule in main.css is a layout dependency. If a component's
    // utility classes are renamed, the rule stops matching and the PDF silently
    // reflows, so fail here instead of shipping a wrong-looking document.
    const deadSelectors = await page.evaluate(() => {
      const selectors = new Set()
      const walk = (rules) => {
        for (const rule of rules) {
          // Grouping rules (@media, @layer, @supports) have no selectorText but
          // do have children. Ordinary style rules also expose an (empty)
          // cssRules for CSS nesting, so branch on selectorText, not cssRules.
          if (rule.selectorText === undefined && rule.cssRules) {
            walk(rule.cssRules)
            continue
          }
          const text = rule.selectorText
          if (!text || !text.includes('html.pdf'))
            continue
          for (const part of text.split(',')) {
            const selector = part.trim()
            if (selector && selector !== 'html.pdf')
              selectors.add(selector)
          }
        }
      }
      for (const sheet of document.styleSheets) {
        try {
          walk(sheet.cssRules)
        }
        catch {
          // cross-origin sheet, nothing we own
        }
      }
      const dead = []
      for (const selector of selectors) {
        try {
          if (document.querySelectorAll(selector).length === 0)
            dead.push(selector)
        }
        catch {
          dead.push(`${selector} (invalid selector)`)
        }
      }
      return dead
    })
    if (deadSelectors.length > 0)
      throw new Error(`print CSS selectors match no element: ${deadSelectors.join(', ')}`)

    const h1Count = await page.evaluate(() => document.querySelectorAll('h1').length)
    if (h1Count === 0)
      throw new Error('render sanity check failed: page has no <h1> element')
    const title = await page.title()
    if (!title.trim())
      throw new Error('render sanity check failed: page has an empty <title>')

    await page.pdf({
      path: OUTPUT,
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    })

    const { size } = await stat(OUTPUT)
    console.log(`wrote ${OUTPUT} (${size.toLocaleString('en-US')} bytes)`)
  }
  finally {
    await browser.close()
    server.close()
  }
}
catch (err) {
  process.exitCode = 1
  console.error(`render-pdf failed: ${err?.message ?? err}`)
}
