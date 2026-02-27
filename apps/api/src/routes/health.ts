import { Router } from 'express'
import { sql } from 'drizzle-orm'
import { db } from '../db/connection'
import { redis } from '../config/redis'

export const healthRouter = Router()

healthRouter.get('/', async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`)
    await redis.ping()

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        redis: 'healthy',
      },
    })
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
    })
  }
})
