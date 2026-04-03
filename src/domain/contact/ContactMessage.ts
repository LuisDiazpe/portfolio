// Domain Entity
export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

// Domain validation — pure logic, no framework
export type ContactValidationError = {
  field: keyof ContactMessage;
  message: string;
};

export function validateContactMessage(
  data: Partial<ContactMessage>
): ContactValidationError[] {
  const errors: ContactValidationError[] = [];

  if (!data.name || data.name.trim().length < 2)
    errors.push({ field: 'name', message: 'El nombre debe tener al menos 2 caracteres' });

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.push({ field: 'email', message: 'Ingresa un correo válido' });

  if (!data.subject || data.subject.trim().length < 3)
    errors.push({ field: 'subject', message: 'El asunto es obligatorio' });

  if (!data.message || data.message.trim().length < 10)
    errors.push({ field: 'message', message: 'El mensaje debe tener al menos 10 caracteres' });

  return errors;
}
