import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createContactRouter } from './interfaces/http/ContactRouter'
import { ContactController } from './interfaces/http/ContactController'
import { SendContactUseCase } from './application/SendContactUseCase'
import { ResendEmailService } from './infrastructure/email/ResendEmailService'

export function createApp() {
  const app = express()


  //Security middleware
  app.use(helmet())

  // CORS
  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
      .split(',')
      .map(o => o.trim())

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`))
      }
    },
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }))

  app.use(express.json({ limit: '10kb' })) // Limit body size

  //Rate limiting
  const contactLimiter = rateLimit({
    windowMs: 18 * 60 * 1000, // 18 minutes
    max: 7,                    // max 7 requests per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Demasiados intentos. Espera 15 minutos.' },
  })

  //Dependency injection
  const emailService = new ResendEmailService()
  const useCase      = new SendContactUseCase(emailService)
  const controller   = new ContactController(useCase)

  //Routes
  app.use('/api/contact', contactLimiter, createContactRouter(controller))

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  // Global error handler
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[Error]', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  })

  return app
}