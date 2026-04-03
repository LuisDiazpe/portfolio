import * as dotenv from 'dotenv'
import path from 'path'

// Tries multiple locations to find .env regardless of working directory
const envPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'backend', '.env'),
  path.resolve(__dirname, '..', '.env'),
  path.resolve(__dirname, '..', '..', '.env'),
]

let loaded = false
for (const p of envPaths) {
  const result = dotenv.config({ path: p })
  if (!result.error) {
    console.log(`[dotenv] Loaded from: ${p}`)
    loaded = true
    break
  }
}
if (!loaded) console.warn('[dotenv] WARNING: No .env file found in any expected location')

import { createApp } from './app'

const PORT = parseInt(process.env.PORT ?? '3001', 10)
const app  = createApp()

app.listen(PORT, () => {
  const gmailUser = (process.env.GMAIL_USER ?? '').trim()
  const appPass   = (process.env.GMAIL_APP_PASSWORD ?? '').trim().replace(/\s/g, '')
  const credOk    = gmailUser.length > 0 && appPass.length === 16

  console.log(`
  ┌──────────────────────────────────────────┐
  │   Jorge Portfolio Backend                │
  │   http://localhost:${PORT}                   │
  │   Gmail: ${gmailUser || '(not set)'}
  │   Pass:  ${credOk ? appPass.length + ' chars OK ✓' : 'WARNING: not set or wrong length'}
  └──────────────────────────────────────────┘
  `)

  if (!credOk) {
    console.warn('\n  WARNING: Gmail credentials missing in backend/.env\n')
  }
})