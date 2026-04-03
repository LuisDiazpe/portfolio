import { Router } from 'express'
import type { ContactController } from './ContactController'

export function createContactRouter(controller: ContactController): Router {
  const router = Router()

  // POST /api/contact
  router.post('/', controller.handle)

  return router
}
