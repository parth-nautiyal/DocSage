import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { pinoHttp } from 'pino-http'
import { env } from './config/env'
import { logger } from './config/logger'
import { healthRouter } from './routes/health'

const app = express()

// ── Security ─────────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}))

// ── Request Parsing ───────────────────────────────────────
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Logging ───────────────────────────────────────────────
app.use(pinoHttp({ logger }))

// ── Routes ────────────────────────────────────────────────
app.use('/api/health', healthRouter)

// ── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global Error Handler ──────────────────────────────────
app.use((
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.error({ err, url: req.url, method: req.method }, 'Unhandled error')
  res.status(500).json({ error: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────
app.listen(env.PORT, () => {
  logger.info(`🚀 API server running on port ${env.PORT}`)
})

export { app }
