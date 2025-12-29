import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, ArrowLeft, User, Users } from 'lucide-react'; // Adicionei User e Users
import logo from '@/assets/planeja-bolso-logo.png';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Estado do plano
  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plan?.name || "Individual",
    value: location.state?.plan?.value || "14,90"
  });

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
      console.log('Pagando:', selectedPlan, formData);
      setTimeout(() => {
        setLoading(false);
        alert("Pagamento processado!");
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 font-sans">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-gray-100">
                <ArrowLeft className="h-6 w-6 text-gray-700"/>
            </Button>
            <img src={logo} alt="Planeja Bolso" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
            <CheckCircle2 className="w-4 h-4"/> Ambiente Seguro
        </div>
      </div>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

        {/* --- LADO ESQUERDO: SELEÇÃO DE PLANO (SEPARADO) --- */}
        <div className="space-y-6">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Finalizar Assinatura</h1>
             <p className="text-gray-500">Selecione o plano desejado:</p>
          </div>

          {/* OPÇÃO 1: INDIVIDUAL */}
          <div 
            onClick={() => setSelectedPlan({ name: "Individual", value: "14,90" })}
            className={`cursor-pointer border-2 rounded-xl p-4 transition-all flex items-center justify-between group ${
                selectedPlan.name === "Individual" 
                ? "border-green-600 bg-green-50/50 shadow-md" 
                : "border-gray-200 bg-white hover:border-green-300"
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
            onClick={() => setSelectedPlan({ name: "Família", value: "24,90" })}
            className={`cursor-pointer border-2 rounded-xl p-4 transition-all flex items-center justify-between group ${
                selectedPlan.name === "Família" 
                ? "border-green-600 bg-green-50/50 shadow-md" 
                : "border-gray-200 bg-white hover:border-green-300"
            }`}
          >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${selectedPlan.name === "Família" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={`font-bold text-lg ${selectedPlan.name === "Família" ? "text-green-800" : "text-gray-700"}`}>Família (Dupla)</h3>
                    <p className="text-sm text-gray-500">Para você e seu amor</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`text-xl font-bold ${selectedPlan.name === "Família" ? "text-green-700" : "text-gray-900"}`}>R$ 24,90</span>
                <span className="text-xs text-gray-500 block">/mês</span>
            </div>
          </div>

          {/* RESUMO DO QUE FOI ESCOLHIDO */}
          <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
            <CardContent className="p-4">
               <div className="flex justify-between items-center text-sm mb-2">
                 <span className="text-gray-600">Plano Selecionado:</span>
                 <span className="font-bold text-gray-900">{selectedPlan.name}</span>
               </div>
               <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                 <span className="text-base font-bold text-gray-800">Total a pagar:</span>
                 <span className="text-xl font-bold text-green-600">R$ {selectedPlan.value}</span>
               </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
             <ShieldCheckIcon className="w-4 h-4"/>
             <span>Garantia de 7 dias incondicional</span>
          </div>
        </div>

        {/* --- LADO DIREITO: PAGAMENTO (MANTIDO IGUAL) --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Dados do Pagamento</h2>
                <p className="text-sm text-gray-500">Transação criptografada e segura.</p>
            </div>

            <form onSubmit={handleNext} className="space-y-5">
                
                <div className="space-y-2">
                    <Label htmlFor="holderName" className="text-gray-700 font-medium">Nome no cartão</Label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input 
                            id="holderName" 
                            placeholder="COMO NO CARTÃO" 
                            className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 bg-gray-50"
                            value={formData.holderName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-gray-700 font-medium">Número do Cartão</Label>
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
                        <Label className="text-gray-700 font-medium">Validade</Label>
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
                                placeholder="AAAA" 
                                className="h-12 border-gray-300 text-center bg-gray-50"
                                maxLength={4}
                                value={formData.expiryYear}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-gray-700 font-medium">CVV</Label>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="cvv" 
                                placeholder="123" 
                                className="pl-10 h-12 border-gray-300 bg-gray-50"
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
                    className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 mt-4 shadow-lg shadow-green-200 transition-all hover:scale-[1.01]"
                    disabled={loading}
                >
                    {loading ? "Processando..." : "Confirmar Assinatura"}
                </Button>

                <div className="flex justify-center gap-4 mt-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                     <span className="flex items-center gap-1 text-[10px]"><CreditCard className="w-3 h-3"/> Visa</span>
                     <span className="flex items-center gap-1 text-[10px]"><CreditCard className="w-3 h-3"/> Master</span>
                     <span className="flex items-center gap-1 text-[10px]"><CreditCard className="w-3 h-3"/> Elo</span>
                     <span className="flex items-center gap-1 text-[10px]"><CreditCard className="w-3 h-3"/> Amex</span>
                </div>

            </form>
        </div>

      </main>
    </div>
  );
}

// Ícones Auxiliares
function ShieldCheckIcon(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
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
