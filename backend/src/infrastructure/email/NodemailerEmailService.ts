import nodemailer from 'nodemailer'
import type { ContactMessage, EmailService } from '../../domain/contact/ContactMessage'

export class NodemailerEmailService implements EmailService {
  // Lazy: created on first send() call, after dotenv has fully loaded
  private transporter: nodemailer.Transporter | null = null

  private getTransporter(): nodemailer.Transporter {
    if (this.transporter) return this.transporter

    // Trim to be safe against Windows .env whitespace/BOM issues
    const user = (process.env.GMAIL_USER ?? '').trim()
    const pass = (process.env.GMAIL_APP_PASSWORD ?? '').trim().replace(/\s/g, '')

    if (!user || !pass) {
      throw new Error(
          `Gmail credentials missing. Check your .env file:\n` +
          `  GMAIL_USER="${user || '(empty)'}"\n` +
          `  GMAIL_APP_PASSWORD="${pass ? '(set, ' + pass.length + ' chars)' : '(empty)'}"`,
      )
    }

    console.log(`[Email] Initializing transporter for ${user} (pass length: ${pass.length})`)

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL — more reliable than service:'gmail' on Windows
      auth: { user, pass },
    })

    return this.transporter
  }

  async send(msg: ContactMessage): Promise<{ messageId: string }> {
    const transporter = this.getTransporter()
    const toEmail     = (process.env.CONTACT_RECEIVER ?? process.env.GMAIL_USER ?? '').trim()
    const fromEmail   = (process.env.GMAIL_USER ?? '').trim()

    // Email to Jorge (notification)
    const notificationResult = await transporter.sendMail({
      from:    `"Portfolio Contact" <${fromEmail}>`,
      to:      toEmail,
      replyTo: msg.email,
      subject: `[Portfolio] ${msg.subject}`,
      html: this.buildNotificationHtml(msg),
      text: this.buildNotificationText(msg),
    })

    // Auto-reply to sender
    await transporter.sendMail({
      from:    `"Jorge Luis Díaz" <${fromEmail}>`,
      to:      msg.email,
      subject: `Re: ${msg.subject} — Recibí tu mensaje`,
      html: this.buildAutoReplyHtml(msg),
      text: this.buildAutoReplyText(msg),
    })

    return { messageId: notificationResult.messageId as string }
  }

  private buildNotificationHtml(msg: ContactMessage): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050a14;font-family:'Segoe UI',Arial,sans-serif">
  <div style="max-width:580px;margin:40px auto;background:#0a1628;border:1px solid #1a3a5c;border-radius:16px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#00ffcc22,#00b4ff11);border-bottom:1px solid #1a3a5c;padding:28px 32px">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#00ffcc;text-transform:uppercase;font-family:monospace">// portfolio contact</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#e2f4ff">Nuevo mensaje de contacto</h1>
    </div>
    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1a3a5c20;width:90px">
            <span style="font-size:11px;color:#7ba8c8;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace">Nombre</span>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #1a3a5c20">
            <span style="color:#e2f4ff;font-weight:600">${this.escapeHtml(msg.name)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1a3a5c20">
            <span style="font-size:11px;color:#7ba8c8;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace">Email</span>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #1a3a5c20">
            <a href="mailto:${this.escapeHtml(msg.email)}" style="color:#00b4ff;text-decoration:none">${this.escapeHtml(msg.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1a3a5c20">
            <span style="font-size:11px;color:#7ba8c8;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace">Asunto</span>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #1a3a5c20">
            <span style="color:#e2f4ff">${this.escapeHtml(msg.subject)}</span>
          </td>
        </tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#0d1f3c;border-radius:10px;border-left:3px solid #00ffcc">
        <p style="margin:0 0 8px;font-size:11px;color:#7ba8c8;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace">Mensaje</p>
        <p style="margin:0;color:#e2f4ff;line-height:1.7;white-space:pre-wrap">${this.escapeHtml(msg.message)}</p>
      </div>
      <div style="margin-top:24px">
        <a href="mailto:${this.escapeHtml(msg.email)}?subject=Re: ${this.escapeHtml(msg.subject)}"
          style="display:inline-block;padding:12px 24px;background:#00ffcc;color:#050a14;font-weight:700;font-size:14px;border-radius:10px;text-decoration:none">
          Responder →
        </a>
      </div>
    </div>
    <div style="padding:16px 32px;border-top:1px solid #1a3a5c;background:#050a14">
      <p style="margin:0;font-size:11px;color:#4a7a9b;font-family:monospace">Enviado desde tu portafolio — jorge-portfolio</p>
    </div>
  </div>
</body>
</html>`
  }

  private buildNotificationText(msg: ContactMessage): string {
    return `Nuevo mensaje desde tu portafolio\n\nNombre: ${msg.name}\nEmail: ${msg.email}\nAsunto: ${msg.subject}\n\nMensaje:\n${msg.message}`
  }

  private buildAutoReplyHtml(msg: ContactMessage): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050a14;font-family:'Segoe UI',Arial,sans-serif">
  <div style="max-width:580px;margin:40px auto;background:#0a1628;border:1px solid #1a3a5c;border-radius:16px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#00ffcc22,#7c3aed11);border-bottom:1px solid #1a3a5c;padding:28px 32px">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#00ffcc;text-transform:uppercase;font-family:monospace">// jorge luis díaz fiestas</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#e2f4ff">¡Recibí tu mensaje!</h1>
    </div>
    <div style="padding:28px 32px">
      <p style="color:#e2f4ff;line-height:1.7;margin:0 0 16px">Hola <strong>${this.escapeHtml(msg.name)}</strong>,</p>
      <p style="color:#7ba8c8;line-height:1.7;margin:0 0 16px">
        Gracias por contactarme. Recibí tu mensaje sobre <strong style="color:#e2f4ff">"${this.escapeHtml(msg.subject)}"</strong> y
        te responderé a la brevedad — normalmente en menos de 24 horas.
      </p>
      <p style="color:#7ba8c8;line-height:1.7;margin:0 0 24px">
        Si es urgente, puedes escribirme directamente por WhatsApp.
      </p>
      <div style="padding:16px;background:#0d1f3c;border-radius:10px;border-left:3px solid #7c3aed;margin-bottom:24px">
        <p style="margin:0;font-size:12px;color:#7ba8c8;font-family:monospace">// tu mensaje</p>
        <p style="margin:8px 0 0;color:#e2f4ff;font-size:14px;line-height:1.6;white-space:pre-wrap">${this.escapeHtml(msg.message)}</p>
      </div>
      <p style="color:#7ba8c8;line-height:1.7;margin:0">
        Saludos,<br>
        <strong style="color:#e2f4ff">Jorge Luis Díaz Fiestas</strong><br>
        <span style="font-size:13px;color:#4a7a9b">Fullstack Developer · Cajamarca, Perú 🏔️</span>
      </p>
    </div>
    <div style="padding:16px 32px;border-top:1px solid #1a3a5c;background:#050a14">
      <p style="margin:0;font-size:11px;color:#4a7a9b;font-family:monospace">Este es un mensaje automático. No respondas directamente a este correo.</p>
    </div>
  </div>
</body>
</html>`
  }

  private buildAutoReplyText(msg: ContactMessage): string {
    return `Hola ${msg.name},\n\nRecibí tu mensaje sobre "${msg.subject}" y te responderé pronto.\n\nTu mensaje:\n${msg.message}\n\nSaludos,\nJorge Luis Díaz Fiestas\nFullstack Developer`
  }

  private escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
  }
}