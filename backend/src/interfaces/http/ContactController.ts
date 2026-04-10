import type { Request, Response } from 'express'
import type { SendContactUseCase } from '../../application/SendContactUseCase'

export class ContactController {
  constructor(private readonly useCase: SendContactUseCase) {}

  handle = async (req: Request, res: Response): Promise<void> => {
    // Honeypot anti-bot check
    if (req.body.website) {
      res.status(200).json({ success: true, messageId: 'honeypot' })
      return
    }

    const result = await this.useCase.execute(req.body)

    if (result.fieldErrors) {
      res.status(422).json({ success: false, fieldErrors: result.fieldErrors })
      return
    }

    if (!result.success) {
      res.status(500).json({ success: false, error: result.error })
      return
    }

    res.status(200).json({ success: true, messageId: result.messageId })
  }
}
