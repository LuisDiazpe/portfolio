import type { ContactMessage } from './ContactMessage';

export interface ContactRepository {
  send(message: ContactMessage): Promise<{ success: boolean; messageId?: string }>;
}
