import { useState } from 'react'
import type { ContactMessage } from '@/domain/contact/ContactMessage'
import { sendContactMessage } from '@/App'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useContact() {
  const [status, setStatus]   = useState<Status>('idle')
  const [errorMsg, setError]  = useState<string | null>(null)

  const send = async (data: ContactMessage) => {
    setStatus('loading')
    setError(null)
    const result = await sendContactMessage.execute(data)
    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setError(result.error ?? 'Error desconocido')
    }
  }

  const reset = () => { setStatus('idle'); setError(null) }

  return { status, errorMsg, send, reset }
}
