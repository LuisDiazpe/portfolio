// Domain Entity — pure, no framework dependencies
export interface ContactMessage {
  readonly name: string
  readonly email: string
  readonly subject: string
  readonly message: string
}

export interface EmailService {
  send(message: ContactMessage): Promise<{ messageId: string }>
}

export class ContactMessageFactory {
  static create(data: unknown): ContactMessage {
    if (
      typeof data !== 'object' ||
      data === null ||
      typeof (data as Record<string, unknown>).name    !== 'string' ||
      typeof (data as Record<string, unknown>).email   !== 'string' ||
      typeof (data as Record<string, unknown>).subject !== 'string' ||
      typeof (data as Record<string, unknown>).message !== 'string'
    ) {
      throw new Error('Invalid contact message data')
    }

    const d = data as Record<string, string>

    return {
      name:    d.name.trim(),
      email:   d.email.trim().toLowerCase(),
      subject: d.subject.trim(),
      message: d.message.trim(),
    }
  }
}
