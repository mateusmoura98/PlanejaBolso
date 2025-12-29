import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, ArrowLeft, User, Users, Lock, QrCode, Copy } from 'lucide-react';
import logo from '@/assets/planeja-bolso-logo.png';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  // Estado para controlar a etapa: 'form' (preenchendo) ou 'pix_success' (mostrando QR Code)
  const [step, setStep] = useState<'form' | 'pix_success'>('form');

  // Estado do plano selecionado
  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plan?.name || "Individual",
    value: location.state?.plan?.value || "14,90",
    type: "individual"
  });

  // Estado do Método de Pagamento ('CREDIT_CARD' ou 'PIX')
  const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'PIX'>('CREDIT_CARD');

  // Estado dos dados do formulário
  const [formData, setFormData] = useState({
    holderName: '',
    cpfCnpj: '',
    // Campos exclusivos do cartão
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  // Simulação de dados do PIX (Isso virá do seu n8n na vida real)
  const [pixData, setPixData] = useState({
    qrCodeBase64: "", 
    copyPaste: "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Planeja Bolso6008Salvador62070503***6304E2CA"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // URL do seu Webhook no n8n
    const N8N_WEBHOOK_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook-test/pagamento-unificado";

    try {
      // Prepara os dados para enviar pro n8n
      const payload = {
        ...formData,
        plan: selectedPlan,
        billingType: paymentMethod // Envia se é PIX ou Cartão
      };

      console.log('Enviando para n8n:', payload);

      // --- SIMULAÇÃO DA RESPOSTA DO N8N ---
      // Na vida real, você fará o fetch aqui.
      // const response = await fetch(...)
      
      setTimeout(() => {
        setLoading(false);

        if (paymentMethod === 'PIX') {
          // Se for PIX, mudamos a tela para mostrar o QR Code
          setStep('pix_success');
        } else {
          // Se for Cartão, vai direto para o Dashboard
          alert("Pagamento no Cartão Aprovado!");
          navigate("/dashboard");
        }
      }, 2000);

    } catch (error) {
      console.error("Erro:", error);
      setLoading(false);
      alert("Erro ao processar. Tente novamente.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixData.copyPaste);
    alert("Código PIX copiado!");
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
            <Lock className="w-4 h-4"/> Ambiente Seguro
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
        </div>

        {/* --- LADO DIREITO: PAGAMENTO (CARTÃO OU PIX) --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit transition-all">
            
            {/* SELETOR DE MÉTODO DE PAGAMENTO */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Como você prefere pagar?</h2>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setPaymentMethod('CREDIT_CARD')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === 'CREDIT_CARD' 
                            ? 'border-green-600 bg-green-50 text-green-700' 
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                    >
                        <CreditCard className="w-6 h-6 mb-2" />
                        <span className="font-bold text-sm">Cartão de Crédito</span>
                    </button>

                    <button
                        onClick={() => setPaymentMethod('PIX')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === 'PIX' 
                            ? 'border-green-600 bg-green-50 text-green-700' 
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                    >
                        <QrCode className="w-6 h-6 mb-2" />
                        <span className="font-bold text-sm">PIX</span>
                    </button>
                </div>
            </div>

            {/* --- CONTEÚDO DINÂMICO --- */}
            {step === 'form' ? (
                <form onSubmit={handlePayment} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* CAMPOS COMUNS (NOME E CPF) */}
                    <div className="space-y-2">
                        <Label htmlFor="holderName" className="text-gray-700 font-medium text-sm">Nome Completo</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="holderName" 
                                placeholder="Seu nome completo" 
                                className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 bg-gray-50"
                                value={formData.holderName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cpfCnpj" className="text-gray-700 font-medium text-sm">CPF</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="cpfCnpj" 
                                placeholder="000.000.000-00" 
                                className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 bg-gray-50"
                                value={formData.cpfCnpj}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* CAMPOS ESPECÍFICOS DO CARTÃO */}
                    {paymentMethod === 'CREDIT_CARD' && (
                        <div className="space-y-5 animate-in fade-in duration-300">
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
                        </div>
                    )}

                    {/* BOTÃO DE CONFIRMAÇÃO */}
                    <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 mt-4 shadow-lg shadow-green-200 transition-all hover:scale-[1.01]"
                        disabled={loading}
                    >
                        {loading ? "Processando..." : (paymentMethod === 'PIX' ? 'Gerar Código PIX' : 'Confirmar Assinatura')}
                    </Button>

                </form>
            ) : (
                /* --- TELA DE SUCESSO PIX (QR CODE) --- */
                <div className="flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-300 py-4">
                    <div className="text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">Pedido Criado!</h2>
                        <p className="text-gray-500">Escaneie o QR Code abaixo para pagar.</p>
                    </div>

                    <div className="border-4 border-green-600 p-2 rounded-xl">
                        {/* Aqui você vai colocar a imagem do QR Code que vier do n8n */}
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                             <QrCode className="w-12 h-12"/>
                        </div>
                    </div>

                    <div className="w-full">
                        <Label className="text-xs text-gray-500 mb-1 block">Ou copie e cole o código:</Label>
                        <div className="flex gap-2">
                            <Input value={pixData.copyPaste} readOnly className="bg-gray-50 text-xs font-mono" />
                            <Button size="icon" variant="outline" onClick={copyToClipboard}>
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <p className="text-center text-xs text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        Após o pagamento, seu acesso será liberado automaticamente em instantes!
                    </p>
                    
                    <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-gray-500">
                        Já fiz o pagamento
                    </Button>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
