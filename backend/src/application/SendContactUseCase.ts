import { z } from 'zod'
import type { ContactMessage, EmailService } from '../domain/contact/ContactMessage'

// Zod schema — application layer validation (more thorough than domain)
export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre demasiado largo')
    .regex(/^[\p{L}\s'-]+$/u, 'El nombre solo puede contener letras'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .max(255, 'Email demasiado largo'),
  subject: z
    .string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(200, 'Asunto demasiado largo'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(5000, 'Mensaje demasiado largo (máx. 5000 caracteres)'),
})

export type ContactInput = z.infer<typeof ContactSchema>

export interface SendContactResult {
  success: boolean
  messageId?: string
  error?: string
  fieldErrors?: Record<string, string>
}

export class SendContactUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(rawInput: unknown): Promise<SendContactResult> {
    // 1. Validate input
    const parsed = ContactSchema.safeParse(rawInput)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.errors.forEach(err => {
        const field = err.path[0]?.toString() ?? 'unknown'
        fieldErrors[field] = err.message
      })
      return { success: false, fieldErrors }
    }

    const input: ContactMessage = parsed.data

    // 2. Honeypot field check (set in HTTP layer)
    // 3. Send
    try {
      const result = await this.emailService.send(input)
      return { success: true, messageId: result.messageId }
    } catch (err) {
      console.error('[SendContactUseCase] Email send failed:', err)
      return {
        success: false,
        error: 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.',
      }
    }
  }
}
