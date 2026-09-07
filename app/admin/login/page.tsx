'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/actions'

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div className="text-center mb-4">
          <img src="/images/logo-listo.png" alt="Logo" style={{ maxWidth: '150px' }} />
          <h4 className="mt-3">Panel de Administración</h4>
        </div>
        
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input type="text" name="username" className="form-control" required autoFocus />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
