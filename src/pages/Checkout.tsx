import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { CreditCard, Lock, Calendar, User, ShieldCheck, Wallet, ArrowLeft, Check } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  
  // Estado para controlar qual plano está selecionado
  const [selectedPlanType, setSelectedPlanType] = useState<'individual' | 'familia'>(
    location.state?.plano?.nome?.toLowerCase().includes('família') ? 'familia' : 'individual'
  )

  const plans = {
    individual: {
      name: 'Plano Individual',
      price: 14.90,
      features: ['IA Pessoal', 'Gestão Completa', '1 Usuário']
    },
    familia: {
      name: 'Plano Família',
      price: 24.90,
      // CORREÇÃO AQUI: Mudado para 2 Pessoas
      features: ['IA Pessoal', 'Gestão Completa', 'Até 2 Pessoas', 'Visão Compartilhada']
    }
  }

  const currentPlan = plans[selectedPlanType]

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
      // Simulação de envio para o n8n
      const response = await fetch('SUA_URL_DO_WEBHOOK_N8N_AQUI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          valor: currentPlan.price,
          plano: currentPlan.name,
          tipo: selectedPlanType
        })
      })

      // Simulando sucesso para o frontend
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(`Assinatura do ${currentPlan.name} realizada!`)
      navigate('/dashboard')

    } catch (error) {
      toast.error('Erro ao processar pagamento. Verifique os dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header com Logo */}
      <header className="bg-white border-b py-4 px-6 mb-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-green-600 p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">Planeja Bolso</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Lock className="h-4 w-4" />
            <span>Ambiente Seguro</span>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Coluna da Esquerda: Resumo do Pedido */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors w-fit">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Resumo do Pedido</h2>
                <p className="text-gray-500 text-sm">Escolha o plano ideal para você</p>
              </div>

              {/* Seletor de Plano Bonito */}
              <div className="grid grid-cols-1 gap-4">
                <div 
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex justify-between items-center ${selectedPlanType === 'individual' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPlanType('individual')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlanType === 'individual' ? 'border-green-600' : 'border-gray-300'}`}>
                      {selectedPlanType === 'individual' && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Plano Individual</p>
                      <p className="text-sm text-gray-500">Para quem quer controle total.</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">R$ 14,90</span>
                </div>

                <div 
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex justify-between items-center ${selectedPlanType === 'familia' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPlanType('familia')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlanType === 'familia' ? 'border-green-600' : 'border-gray-300'}`}>
                      {selectedPlanType === 'familia' && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Plano Família</p>
                      {/* CORREÇÃO AQUI: Mudado para 2 pessoas */}
                      <p className="text-sm text-gray-500">Gestão compartilhada (2 pessoas).</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">R$ 24,90</span>
                </div>
              </div>

              {/* Lista de Benefícios */}
              <div className="pt-4 border-t">
                <ul className="space-y-3">
                  {currentPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-lg font-semibold">Total a pagar:</span>
                <span className="text-2xl font-bold text-green-600">
                  R$ {currentPlan.price.toFixed(2).replace('.', ',')}
                  <span className="text-sm text-gray-500 font-normal">/mês</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>Garantia de 7 dias ou seu dinheiro de volta</span>
            </div>
          </div>

          {/* Coluna da Direita: Formulário de Pagamento */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Dados do Pagamento</h3>
              <p className="text-gray-500 text-sm">Transação criptografada e segura.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="holderName">Nome impresso no cartão</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="holderName" 
                    placeholder="COMO NO CARTÃO" 
                    className="pl-10 uppercase h-11"
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
                    className="pl-10 h-11"
                    maxLength={19}
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Validade</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      id="expiryMonth" 
                      placeholder="MM" 
                      className="h-11 text-center"
                      maxLength={2}
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      id="expiryYear" 
                      placeholder="AAAA" 
                      className="h-11 text-center"
                      maxLength={4}
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ccv">CVV</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="ccv" 
                      placeholder="123" 
                      className="pl-10 h-11"
                      maxLength={4}
                      type="password"
                      value={formData.ccv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 shadow-md transition-all hover:scale-[1.01]" 
                disabled={loading}
              >
                {loading ? 'Processando...' : `Confirmar Assinatura`}
              </Button>

              <div className="flex justify-center gap-4 opacity-50 grayscale">
                <CreditCard className="h-6 w-6" />
                <span className="text-xs">Visa</span>
                <span className="text-xs">Mastercard</span>
                <span className="text-xs">Elo</span>
                <span className="text-xs">Amex</span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
