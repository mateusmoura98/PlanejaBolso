import { useState } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTheme } from '@/hooks/useTheme'
import logo from '@/assets/planeja-bolso-logo.png'

type AuthMode = 'login' | 'forgot'

// Mantendo o nome do arquivo conforme você subiu
const authImages = {
  login: '/familia-login.jpg.png', 
  forgot: '/familia-login.jpg.png'
}

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login')
  const { theme } = useTheme()

  return (
    <div className="h-screen flex bg-background p-6">
      {/* Lado Esquerdo - Foto da Família */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-3xl">
        <img
          src={authImages[mode]}
          alt="Família feliz usando o Planeja Bolso"
          className="w-full h-full object-cover object-center"
        />
        
        <div className="absolute inset-0 bg-black/20" /> 
        
        <div className="absolute bottom-8 left-8 text-white z-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-bold text-white">Agora ficou fácil!</h2>
          </div>
          <p className="text-lg opacity-90 font-medium">
            Gerencie suas finanças de forma simples e inteligente
          </p>
        </div>
      </div>

      {/* Lado Direito - Formulários */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute top-4 left-4 right-4 flex justify-end items-center">
          <ThemeToggle />
        </div>

        <div className="grid w-full min-w-[320px] max-w-[480px] mt-8 justify-center gap-4">
          <div className="flex justify-center">
            
            {/* --- MUDANÇA AQUI --- */}
            {/* Tirei o h-32 e coloquei w-72 (largura fixa grande) */}
            <img 
              src={logo} 
              alt="Planeja Bolso" 
              className="w-72 h-auto mb-6 object-contain"
            />
            {/* ------------------- */}

          </div>
          
          {mode === 'login' && (
            <LoginForm
              onForgotPassword={() => setMode('forgot')}
            />
          )}
          {mode === 'forgot' && (
            <ForgotPasswordForm onBack={() => setMode('login')} />
          )}
        </div>
      </div>
    </div>
  )
}
