import type { ContactRepository } from '@/domain/contact/ContactRepository';
import type { ContactMessage } from '@/domain/contact/ContactMessage';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export class ApiContactRepository implements ContactRepository {
  async send(message: ContactMessage): Promise<{ success: boolean; messageId?: string }> {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json() as Promise<{ success: boolean; messageId?: string }>;
  }
}
