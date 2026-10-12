#!/usr/bin/env node
/**
 * Build SecurityDashboard → public/srmd-monitoring
 * On Vercel (no sibling SecurityDashboard), keeps committed public/srmd-monitoring.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const smarttrackRoot = resolve(__dirname, '..')
const securityDashboard = resolve(smarttrackRoot, '../SecurityDashboard')
const outDir = join(smarttrackRoot, 'public/srmd-monitoring')
const distDir = join(securityDashboard, 'dist')

if (existsSync(join(securityDashboard, 'package.json'))) {
  console.log('[sync:srmd] Building SecurityDashboard…')
  execSync('npm run build', { cwd: securityDashboard, stdio: 'inherit' })
  rmSync(outDir, { recursive: true, force: true })
  cpSync(distDir, outDir, { recursive: true })
  console.log('[sync:srmd] Copied dist → public/srmd-monitoring')
} else if (existsSync(join(outDir, 'index.html'))) {
  console.log('[sync:srmd] SecurityDashboard not found — using committed public/srmd-monitoring')
} else {
  console.error('[sync:srmd] No SecurityDashboard build and no public/srmd-monitoring/index.html')
  process.exit(1)
}
