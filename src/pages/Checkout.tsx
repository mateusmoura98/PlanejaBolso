import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import logo from '@/assets/planeja-bolso-logo.png'; // IMPORT DA LOGO

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // O estado que guarda o plano selecionado
  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plan?.name || "Individual",
    value: location.state?.plan?.value || "14,90"
  });

  const plan = {
    name: selectedPlan.name,
    price: selectedPlan.value,
    features: ['7 dias grátis', 'Acesso completo', 'Cancele a qualquer momento']
  };

  const currentPlan = plan; // alias para manter compatibilidade

  const [formData, setFormData] = useState({
    holderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulação de envio para o ASAAS
      // const response = await fetch('https://SUA_API_DO_ASAAS/payment', { ... });
      
      // Aqui entraria a integração real
      
      console.log('Dados do Pagamento:', formData);
      console.log('Plano:', selectedPlan);
      
      // Sucesso simulado:
      setTimeout(() => {
        setLoading(false);
        alert("Pagamento processado com sucesso!");
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 font-sans">
      
      {/* HEADER COM LOGO - AQUI ESTÁ A MUDANÇA */}
      <div className="max-w-4xl mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-gray-100">
                <ArrowLeft className="h-6 w-6 text-gray-700"/>
            </Button>
            {/* LOGO INSERIDA E ALINHADA - Tamanho h-16 igual da Landing Page */}
            <img 
              src={logo} 
              alt="Planeja Bolso" 
              className="h-16 w-auto object-contain"
            />
        </div>
        <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
            <CheckCircle2 className="w-4 h-4"/> Ambiente Seguro
        </div>
      </div>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

        {/* Coluna da Esquerda: Resumo do Pedido */}
        <div className="space-y-6">
          <div className="space-y-2">
             <h1 className="text-3xl font-bold text-gray-900">Resumo do Pedido</h1>
             <p className="text-gray-500">Escolha o plano ideal para você</p>
          </div>

          <Card className="border-2 border-green-600 shadow-md">
            <CardContent className="p-6">
               <div className="flex justify-between items-start mb-4">
                 <div>
                    {/* Botão de Seleção (Se quiser trocar aqui mesmo) */}
                    <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
                        <button 
                            onClick={() => setSelectedPlan({ name: "Individual", value: "14,90" })}
                            className={`px-3 py-1 text-sm rounded-md transition-all ${selectedPlan.name === "Individual" ? "bg-white shadow text-green-700 font-bold" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            Individual
                        </button>
                        <button 
                            onClick={() => setSelectedPlan({ name: "Família", value: "24,90" })}
                            className={`px-3 py-1 text-sm rounded-md transition-all ${selectedPlan.name === "Família" ? "bg-white shadow text-green-700 font-bold" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            Família
                        </button>
                    </div>

                    <h3 className="font-bold text-xl">{currentPlan.name}</h3>
                    <p className="text-sm text-gray-500">Para quem quer controle total.</p>
                 </div>
                 <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">R$ {currentPlan.price}</span>
                 </div>
               </div>

               <ul className="space-y-2">
                 {currentPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> {feature}
                    </li>
                 ))}
               </ul>
            </CardContent>
            <div className="bg-green-50 p-4 border-t border-green-100 flex justify-between items-center rounded-b-lg">
                <span className="font-medium text-gray-700">Total a pagar:</span>
                <span className="font-bold text-xl text-green-700">R$ {currentPlan.price}<span className="text-sm font-normal text-gray-500">/mês</span></span>
            </div>
          </Card>

          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-lg border border-gray-200">
             <ShieldCheckIcon className="w-5 h-5 text-gray-600"/>
             <span>Garantia de 7 dias ou seu dinheiro de volta</span>
          </div>
        </div>

        {/* Coluna da Direita: Formulário de Pagamento */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Dados do Pagamento</h2>
                <p className="text-sm text-gray-500">Transação criptografada e segura.</p>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
                
                <div className="space-y-2">
                    <Label htmlFor="holderName">Nome impresso no cartão</Label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                            id="holderName" 
                            placeholder="COMO NO CARTÃO" 
                            className="pl-9 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            value={formData.holderName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                            id="cardNumber" 
                            placeholder="0000 0000 0000 0000" 
                            className="pl-9 h-12 border-gray-300"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Validade</Label>
                        <div className="flex gap-2">
                            <Input 
                                id="expiryMonth" 
                                placeholder="MM" 
                                className="h-12 border-gray-300 text-center"
                                maxLength={2}
                                value={formData.expiryMonth}
                                onChange={handleInputChange}
                                required
                            />
                             <Input 
                                id="expiryYear" 
                                placeholder="AAAA" 
                                className="h-12 border-gray-300 text-center"
                                maxLength={4}
                                value={formData.expiryYear}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                                id="cvv" 
                                placeholder="123" 
                                className="pl-9 h-12 border-gray-300"
                                maxLength={3}
                                value={formData.cvv}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 mt-6 shadow-lg shadow-green-200"
                    disabled={loading}
                >
                    {loading ? "Processando..." : "Confirmar Assinatura"}
                </Button>

                <div className="flex justify-center gap-4 mt-4 text-gray-400 text-xs">
                     <span className="flex items-center gap-1"><CreditCard className="w-3 h-3"/> Visa</span>
                     <span className="flex items-center gap-1"><CreditCard className="w-3 h-3"/> Mastercard</span>
                     <span className="flex items-center gap-1"><CreditCard className="w-3 h-3"/> Elo</span>
                     <span className="flex items-center gap-1"><CreditCard className="w-3 h-3"/> Amex</span>
                </div>

            </form>
        </div>

      </main>
    </div>
  );
}

// Ícones Auxiliares (Para não quebrar se não tiver instalado)
function ShieldCheckIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
}

function UserIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )
}

function LockIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    )
}
