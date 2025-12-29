import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, ArrowLeft, User, Users, ShieldCheck, Lock } from 'lucide-react';
import logo from '@/assets/planeja-bolso-logo.png';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Estado do plano selecionado
  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plan?.name || "Individual",
    value: location.state?.plan?.value || "14,90",
    type: "individual"
  });

  // Estado dos dados do cartão
  const [formData, setFormData] = useState({
    holderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cpfCnpj: '' // Adicionei CPF pois o Asaas exige para processar
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ⚠️ AQUI É ONDE A MÁGICA DO N8N VAI ACONTECER
      // Você vai enviar 'formData' + 'selectedPlan' para o seu Webhook do n8n
      // O n8n vai falar com o Asaas e devolver se aprovou ou não.
      
      console.log('Enviando para n8n:', { ...formData, plan: selectedPlan });

      // Simulação de tempo de processamento
      setTimeout(() => {
        setLoading(false);
        // Se deu certo:
        alert("Pagamento realizado com sucesso!"); // Depois trocamos por uma tela de sucesso bonita
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Erro no pagamento:", error);
      setLoading(false);
      alert("Erro ao processar pagamento. Verifique os dados.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 font-sans">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-gray-100">
                <ArrowLeft className="h-6 w-6 text-gray-700"/>
            </Button>
            <img src={logo} alt="Planeja Bolso" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
            <Lock className="w-4 h-4"/> Pagamento 100% Seguro
        </div>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">

        {/* --- LADO ESQUERDO: SELEÇÃO DE PLANO --- */}
        <div className="space-y-6">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Finalizar Assinatura</h1>
             <p className="text-gray-500">Selecione o plano ideal para você:</p>
          </div>

          {/* OPÇÃO 1: INDIVIDUAL */}
          <div 
            onClick={() => setSelectedPlan({ name: "Individual", value: "14,90", type: "individual" })}
            className={`cursor-pointer border-2 rounded-xl p-5 transition-all flex items-center justify-between group ${
                selectedPlan.name === "Individual" 
                ? "border-green-600 bg-green-50/30 shadow-md ring-1 ring-green-600" 
                : "border-gray-200 bg-white hover:border-green-400"
            }`}
          >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${selectedPlan.name === "Individual" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={`font-bold text-lg ${selectedPlan.name === "Individual" ? "text-green-800" : "text-gray-700"}`}>Individual</h3>
                    <p className="text-sm text-gray-500">Para controle pessoal</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`text-xl font-bold ${selectedPlan.name === "Individual" ? "text-green-700" : "text-gray-900"}`}>R$ 14,90</span>
                <span className="text-xs text-gray-500 block">/mês</span>
            </div>
          </div>

          {/* OPÇÃO 2: FAMÍLIA */}
          <div 
            onClick={() => setSelectedPlan({ name: "Família (Dupla)", value: "24,90", type: "familia" })}
            className={`cursor-pointer border-2 rounded-xl p-5 transition-all flex items-center justify-between group ${
                selectedPlan.name.includes("Família") 
                ? "border-green-600 bg-green-50/30 shadow-md ring-1 ring-green-600" 
                : "border-gray-200 bg-white hover:border-green-400"
            }`}
          >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${selectedPlan.name.includes("Família") ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={`font-bold text-lg ${selectedPlan.name.includes("Família") ? "text-green-800" : "text-gray-700"}`}>Família (Dupla)</h3>
                    <p className="text-sm text-gray-500">Para você e seu amor</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`text-xl font-bold ${selectedPlan.name.includes("Família") ? "text-green-700" : "text-gray-900"}`}>R$ 24,90</span>
                <span className="text-xs text-gray-500 block">/mês</span>
            </div>
          </div>

          {/* Resumo Financeiro */}
          <Card className="bg-gray-50 border-dashed border-2 border-gray-200 shadow-none">
            <CardContent className="p-4">
               <div className="flex justify-between items-center text-sm mb-2">
                 <span className="text-gray-600">Plano Selecionado:</span>
                 <span className="font-bold text-gray-900">{selectedPlan.name}</span>
               </div>
               <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
                 <span className="text-base font-bold text-gray-800">Total a pagar hoje:</span>
                 <span className="text-2xl font-bold text-green-600">R$ {selectedPlan.value}</span>
               </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
             <ShieldCheck className="w-4 h-4"/>
             <span>Garantia de 7 dias incondicional</span>
          </div>
        </div>

        {/* --- LADO DIREITO: FORMULÁRIO DE CARTÃO (Checkout Transparente) --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Dados do Pagamento</h2>
                    <p className="text-sm text-gray-500">Preencha os dados do seu cartão</p>
                </div>
                <div className="flex gap-2 opacity-70">
                     <span className="text-[10px] border px-1 rounded">VISA</span>
                     <span className="text-[10px] border px-1 rounded">MASTER</span>
                </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-5">
                
                <div className="space-y-2">
                    <Label htmlFor="holderName" className="text-gray-700 font-medium text-sm">Nome impresso no cartão</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input 
                            id="holderName" 
                            placeholder="COMO NO CARTÃO" 
                            className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 bg-gray-50 transition-all"
                            value={formData.holderName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cpfCnpj" className="text-gray-700 font-medium text-sm">CPF do Titular</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input 
                            id="cpfCnpj" 
                            placeholder="000.000.000-00" 
                            className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 bg-gray-50 transition-all"
                            value={formData.cpfCnpj}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-gray-700 font-medium text-sm">Número do Cartão</Label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input 
                            id="cardNumber" 
                            placeholder="0000 0000 0000 0000" 
                            className="pl-10 h-12 border-gray-300 bg-gray-50"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium text-sm">Validade</Label>
                        <div className="flex gap-2">
                            <Input 
                                id="expiryMonth" 
                                placeholder="MM" 
                                className="h-12 border-gray-300 text-center bg-gray-50"
                                maxLength={2}
                                value={formData.expiryMonth}
                                onChange={handleInputChange}
                                required
                            />
                             <Input 
                                id="expiryYear" 
                                placeholder="AA" 
                                className="h-12 border-gray-300 text-center bg-gray-50"
                                maxLength={2}
                                value={formData.expiryYear}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-gray-700 font-medium text-sm">CVV</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="cvv" 
                                placeholder="123" 
                                className="pl-10 h-12 border-gray-300 bg-gray-50"
                                maxLength={4}
                                value={formData.cvv}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 mt-4 shadow-lg shadow-green-200 transition-all hover:scale-[1.01]"
                    disabled={loading}
                >
                    {loading ? "Processando..." : `Pagar R$ ${selectedPlan.value}`}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                    <Lock className="w-3 h-3" />
                    Seus dados estão protegidos por criptografia SSL.
                </div>

            </form>
        </div>

      </main>
    </div>
  );
}
