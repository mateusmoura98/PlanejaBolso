import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { CreditCard, Lock, Calendar, User } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  
  // Pegar dados do plano escolhido (vindo da tela anterior)
  const plano = location.state?.plano || { nome: 'Plano Individual', valor: 14.90 }

  const [formData, setFormData] = useState({
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Enviar dados para o seu N8N (Webhook)
      // Você vai criar um Webhook no n8n para receber isso e mandar pro Asaas
      const response = await fetch('SUA_URL_DO_WEBHOOK_N8N_AQUI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          valor: plano.valor,
          plano: plano.nome,
          // Aqui você pode mandar o ID do usuário logado também
        })
      })

      if (response.ok) {
        toast.success('Assinatura realizada com sucesso!')
        navigate('/dashboard')
      } else {
        throw new Error('Falha no pagamento')
      }
    } catch (error) {
      toast.error('Erro ao processar pagamento. Verifique os dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center border-b bg-primary/5">
          <CardTitle className="text-2xl text-primary">Checkout Seguro</CardTitle>
          <CardDescription>
            Você está assinando o <strong>{plano.nome}</strong> por <span className="text-green-600 font-bold">R$ {plano.valor.toFixed(2).replace('.', ',')}</span>/mês
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="holderName">Nome no Cartão</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="holderName" 
                  placeholder="COMO ESTA NO CARTAO" 
                  className="pl-10 uppercase"
                  value={formData.holderName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Número do Cartão</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="number" 
                  placeholder="0000 0000 0000 0000" 
                  className="pl-10"
                  maxLength={19}
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryMonth">Mês</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="expiryMonth" 
                    placeholder="MM" 
                    className="pl-10"
                    maxLength={2}
                    value={formData.expiryMonth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryYear">Ano</Label>
                <Input 
                  id="expiryYear" 
                  placeholder="AAAA" 
                  maxLength={4}
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ccv">CVV</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="ccv" 
                    placeholder="123" 
                    className="pl-10"
                    maxLength={4}
                    type="password"
                    value={formData.ccv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Processando...' : `Pagar R$ ${plano.valor.toFixed(2).replace('.', ',')}`}
            </Button>

            <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground mt-4">
              <Lock className="h-3 w-3" />
              <span>Pagamento 100% seguro via Asaas</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
