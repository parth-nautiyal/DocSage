import pino from 'pino'

const logger = pino({
  transport: { target: 'pino-pretty', options: { colorize: true } }
})

logger.info('🔧 Worker service started — waiting for jobs')
