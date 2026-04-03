import type { ContactRepository } from '@/domain/contact/ContactRepository';
import type { ContactMessage } from '@/domain/contact/ContactMessage';
import { validateContactMessage } from '@/domain/contact/ContactMessage';

export interface SendContactResult {
  success: boolean;
  error?: string;
}

export class SendContactMessageUseCase {
  constructor(private readonly repository: ContactRepository) {}

  async execute(data: ContactMessage): Promise<SendContactResult> {
    const errors = validateContactMessage(data);
    if (errors.length > 0) {
      return { success: false, error: errors[0].message };
    }

    try {
      const result = await this.repository.send(data);
      return { success: result.success };
    } catch {
      return {
        success: false,
        error: 'No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directo.',
      };
    }
  }
}
