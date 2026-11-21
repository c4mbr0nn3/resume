import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import process from 'node:process'

const PDF_FILE = process.argv[2] || 'resume.pdf'
// Ceiling, not a target. It exists to catch whole-font embedding: unsubsetted
// latin faces put the file in the megabyte range. Chromium's subsetter varies
// by engine version, so a local render is ~35% larger than the CI one; the
// margin below covers that without letting a real regression through.
const MAX_BYTES = 160 * 1024
// Allowlist, not denylist: we know the only faces this document may embed.
// Anything else means a fallback face was used, whatever it is called.
const EXPECTED_FONTS = [
  'Spectral',
  'WorkSans',
]

const failures = []
let pdfSize = null

function run(cmd, args) {
  return execFileSync(cmd, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

// 1. file exists and non-empty
try {
  const { size } = statSync(PDF_FILE)
  if (size === 0)
    failures.push(`${PDF_FILE} exists but is empty (0 bytes)`)
  pdfSize = size
}
catch {
  failures.push(`${PDF_FILE} does not exist at the repository root; run \`pnpm pdf\` first`)
}

// only run poppler checks if the file exists
if (failures.length === 0) {
  // 2. exact page count
  let info
  try {
    info = run('pdfinfo', [PDF_FILE])
  }
  catch (err) {
    failures.push(`\`pdfinfo ${PDF_FILE}\` failed: ${err?.message ?? err}`)
  }
  if (info !== undefined) {
    const pages = /^Pages:\s+(\d+)$/m.exec(info)?.[1] ?? null
    if (pages === null)
      failures.push(`\`pdfinfo ${PDF_FILE}\` output has no "Pages:" line:\n${info}`)
    else if (pages !== '2')
      failures.push(`${PDF_FILE} has ${pages} pages, expected exactly 2 (check the @page rules / overflow)`)
    if (!/Page size:.*\(A4\)/.test(info))
      failures.push(`${PDF_FILE} is not A4; \`pdfinfo\` says: ${/^Page size:.*$/m.exec(info)?.[0] ?? 'unknown'}`)
    if (!/^Tagged:\s+yes$/m.test(info))
      failures.push(`${PDF_FILE} is not a tagged PDF (accessibility structure tree missing)`)
  }

  // 3. size budget
  if (pdfSize > MAX_BYTES)
    failures.push(`${PDF_FILE} is ${pdfSize.toLocaleString('en-US')} bytes; budget is ${MAX_BYTES.toLocaleString('en-US')} bytes (160 KiB), which means fonts are probably not subset`)

  // 4. fonts: all embedded+subset, none forbidden
  let fonts
  try {
    fonts = run('pdffonts', [PDF_FILE])
  }
  catch (err) {
    failures.push(`\`pdffonts ${PDF_FILE}\` failed: ${err?.message ?? err}`)
  }
  if (fonts !== undefined) {
    const lines = fonts.split('\n')
    // header row + dashed separator, both right-aligned like the data rows
    const dataRows = lines.filter(l => l.trim() && !/^\s*-+\s/.test(l) && !/^name\s+type\s+encoding/i.test(l))
    // pdffonts row: "NAME  TYPE  ENCODING  emb sub uni  object gen"
    // The tail is always five fixed columns, so read it from the right instead
    // of tokenising the variable-width middle (TYPE can be "CID TrueType").
    const TAIL = 5
    const badRows = []
    for (const row of dataRows) {
      const cols = row.trim().split(/\s+/)
      if (cols.length < TAIL + 1) {
        badRows.push(row)
        continue
      }
      const name = cols[0]
      const [emb, sub] = cols.slice(-TAIL, -TAIL + 2)
      if (emb !== 'yes' || sub !== 'yes')
        badRows.push(row)
      if (!EXPECTED_FONTS.some(f => name.includes(f)))
        badRows.push(row)
    }
    if (dataRows.length === 0)
      failures.push(`\`pdffonts ${PDF_FILE}\` reported no fonts at all:\n${fonts}`)
    else if (badRows.length > 0)
      failures.push(`${PDF_FILE} embeds an unexpected or unsubsetted font (only ${EXPECTED_FONTS.join(', ')} may appear, every row emb=yes sub=yes)\npdffonts output:\n${fonts}`)
  }
}

if (failures.length > 0) {
  for (const failure of failures)
    console.error(`FAIL: ${failure}`)
  process.exit(1)
}

console.log(`OK ${PDF_FILE}: 2 pages, ${(pdfSize / 1024).toFixed(1)} KiB, all fonts embedded+subset, no fallback fonts`)
