import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Adicionei MapPin (Endereço) e Phone (Telefone)
import { CreditCard, CheckCircle2, ArrowLeft, User, Users, Lock, QrCode, Copy, Mail, MapPin, Phone } from 'lucide-react';
import logo from '@/assets/planeja-bolso-logo.png';
import { useAuth } from '@/hooks/useAuth';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [step, setStep] = useState<'form' | 'pix_success'>('form');

  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plan?.name || "Individual",
    value: location.state?.plan?.value || "14,90",
    type: "individual"
  });

  const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'PIX'>('CREDIT_CARD');

  // ADICIONEI OS CAMPOS OBRIGATÓRIOS DO ASAAS
  const [formData, setFormData] = useState({
    holderName: '',
    email: '',
    cpfCnpj: '',
    phone: '',        // Novo: Celular
    postalCode: '',   // Novo: CEP
    addressNumber: '',// Novo: Número da casa
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [pixData, setPixData] = useState({
    qrCodeBase64: "", 
    copyPaste: ""
  });

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const N8N_WEBHOOK_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook/venda-site";

    try {
      // O payload agora vai completo com endereço e telefone
      const payload = {
        ...formData,
        plan: selectedPlan,
        billingType: paymentMethod
      };

      console.log('Enviando para n8n:', payload);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Resposta do n8n:', data);

      if (data.success) {
        if (paymentMethod === 'PIX') {
          setPixData({
            qrCodeBase64: data.qrCodeBase64, 
            copyPaste: data.copyPaste
          });
          setStep('pix_success');
        } else {
          alert("Pagamento no Cartão Aprovado!");
          navigate("/dashboard");
        }
      } else {
        alert("Erro no pagamento: " + (data.message || "Verifique os dados e tente novamente."));
      }

    } catch (error) {
      console.error("Erro na comunicação:", error);
      alert("Erro ao conectar com o servidor. Verifique se o n8n está ativo.");
    } finally {
      setLoading(false);
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

        {/* --- LADO DIREITO: PAGAMENTO --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit transition-all">
            
            {/* SELETOR DE MÉTODO DE PAGAMENTO */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Como você prefere pagar?</h2>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
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
                        type="button"
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

            {step === 'form' ? (
                <form onSubmit={handlePayment} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* --- DADOS PESSOAIS --- */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Seu E-mail</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="email" 
                                type="email"
                                placeholder="exemplo@email.com" 
                                className="pl-10 h-12 border-gray-300 bg-gray-50"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="holderName" className="text-gray-700 font-medium text-sm">Nome Completo</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="holderName" 
                                placeholder="Seu nome completo" 
                                className="pl-10 h-12 border-gray-300 bg-gray-50"
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
                                className="pl-10 h-12 border-gray-300 bg-gray-50"
                                value={formData.cpfCnpj}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">Celular (WhatsApp)</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="phone" 
                                placeholder="(00) 90000-0000" 
                                className="pl-10 h-12 border-gray-300 bg-gray-50"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* --- DADOS DE ENDEREÇO (OBRIGATÓRIO PARA ASAAS) --- */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="postalCode" className="text-gray-700 font-medium text-sm">CEP</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <Input 
                                    id="postalCode" 
                                    placeholder="00000-000" 
                                    className="pl-10 h-12 border-gray-300 bg-gray-50"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="addressNumber" className="text-gray-700 font-medium text-sm">Número</Label>
                            <Input 
                                id="addressNumber" 
                                placeholder="123" 
                                className="h-12 border-gray-300 bg-gray-50"
                                value={formData.addressNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* --- DADOS DO CARTÃO (SÓ APARECE SE FOR CARTÃO) --- */}
                    {paymentMethod === 'CREDIT_CARD' && (
                        <div className="space-y-5 pt-4 border-t border-gray-100 animate-in fade-in duration-300">
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

                    <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 mt-4 shadow-lg shadow-green-200 transition-all hover:scale-[1.01]"
                        disabled={loading}
                    >
                        {loading ? "Processando..." : (paymentMethod === 'PIX' ? 'Gerar Código PIX' : 'Confirmar Assinatura')}
                    </Button>

                </form>
            ) : (
                /* TELA DO PIX */
                <div className="flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-300 py-4">
                    <div className="text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">Pedido Criado!</h2>
                        <p className="text-gray-500">Escaneie o QR Code abaixo para pagar.</p>
                    </div>

                    <div className="border-4 border-green-600 p-2 rounded-xl bg-white">
                        {pixData.qrCodeBase64 ? (
                            <img 
                                src={`data:image/png;base64,${pixData.qrCodeBase64}`} 
                                alt="QR Code Pix" 
                                className="w-48 h-48 object-contain"
                            />
                        ) : (
                            <div className="w-48 h-48 flex items-center justify-center">Carregando...</div>
                        )}
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
