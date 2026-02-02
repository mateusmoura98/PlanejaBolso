import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, ArrowLeft, User, Users, Lock, QrCode, Copy, Mail, MapPin, Phone } from 'lucide-react';
import logo from '@/assets/planeja-bolso-logo.png';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner'; // Importante para o feedback visual

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'pix_success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'PIX'>('CREDIT_CARD');

  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plano?.name || "Individual",
    value: location.state?.plano?.value || "14,90",
    type: "individual"
  });

  const [formData, setFormData] = useState({
    holderName: '',
    email: '',
    cpfCnpj: '',
    phone: '',        
    postalCode: '',   
    addressNumber: '',
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

    // URL DE PRODUÇÃO
    const N8N_WEBHOOK_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook/venda-site";

    try {
      const payload = {
        ...formData,
        plan: selectedPlan,
        billingType: paymentMethod
      };

      console.log('Enviando...', payload);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Recebido:', data);

      if (data.success) {
        if (paymentMethod === 'PIX') {
          if (data.qrCodeBase64) {
             setPixData({
                qrCodeBase64: data.qrCodeBase64, 
                copyPaste: data.copyPaste
             });
             setStep('pix_success');
             toast.success("QR Code gerado!");
          } else {
             toast.error("Erro: O Asaas não retornou o QR Code.");
          }
        } else {
          toast.success("Pagamento Aprovado!");
          navigate("/dashboard");
        }
      } else {
        toast.error("Erro: " + (data.message || "Tente novamente."));
      }

    } catch (error) {
      console.error("Erro de conexão:", error);
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixData.copyPaste);
    toast.success("Código PIX copiado!");
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

        {/* ESQUERDA (PLANOS) - Mantido Igual */}
        <div className="space-y-6">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Finalizar Assinatura</h1>
             <p className="text-gray-500">Selecione o plano ideal para você:</p>
          </div>

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

        {/* --- DIREITA (FORMULÁRIO) --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit transition-all">
            
            {/* TÍTULO E BOTÕES DE MÉTODO */}
            {step === 'form' && (
                <>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Como você prefere pagar?</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('CREDIT_CARD')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                                paymentMethod === 'CREDIT_CARD' 
                                ? 'border-green-600 bg-green-50 text-green-700 ring-1 ring-green-600' 
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            <CreditCard className="w-6 h-6 mb-2" />
                            <span className="font-bold text-sm">Cartão</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod('PIX')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                                paymentMethod === 'PIX' 
                                ? 'border-green-600 bg-green-50 text-green-700 ring-1 ring-green-600' 
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            <QrCode className="w-6 h-6 mb-2" />
                            <span className="font-bold text-sm">PIX</span>
                        </button>
                    </div>
                </>
            )}

            {/* FORMULÁRIO */}
            {step === 'form' ? (
                <form onSubmit={handlePayment} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Campos Pessoais */}
                    <div className="space-y-2">
                        <Label>Seu E-mail</Label>
                        <div className="relative"><Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><Input id="email" value={formData.email} onChange={handleInputChange} className="pl-10 h-12" required /></div>
                    </div>
                    <div className="space-y-2">
                        <Label>Nome Completo</Label>
                        <div className="relative"><User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><Input id="holderName" value={formData.holderName} onChange={handleInputChange} className="pl-10 h-12" required /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>CPF</Label><Input id="cpfCnpj" value={formData.cpfCnpj} onChange={handleInputChange} className="h-12" required /></div>
                        <div className="space-y-2"><Label>Celular</Label><div className="relative"><Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><Input id="phone" value={formData.phone} onChange={handleInputChange} className="pl-10 h-12" required /></div></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>CEP</Label><div className="relative"><MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><Input id="postalCode" value={formData.postalCode} onChange={handleInputChange} className="pl-10 h-12" required /></div></div>
                        <div className="space-y-2"><Label>Número</Label><Input id="addressNumber" value={formData.addressNumber} onChange={handleInputChange} className="h-12" required /></div>
                    </div>

                    {/* Dados do Cartão (Só se for Cartão) */}
                    {paymentMethod === 'CREDIT_CARD' && (
                        <div className="space-y-5 pt-4 border-t border-gray-100 animate-in fade-in duration-300">
                            <div className="space-y-2">
                                <Label>Número do Cartão</Label>
                                <div className="relative"><CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><Input id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="pl-10 h-12" required /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Validade</Label><div className="flex gap-2"><Input id="expiryMonth" placeholder="MM" maxLength={2} value={formData.expiryMonth} onChange={handleInputChange} className="h-12 text-center" required /><Input id="expiryYear" placeholder="AA" maxLength={2} value={formData.expiryYear} onChange={handleInputChange} className="h-12 text-center" required /></div></div>
                                <div className="space-y-2"><Label>CVV</Label><div className="relative"><Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><Input id="cvv" type="password" maxLength={4} value={formData.cvv} onChange={handleInputChange} className="pl-10 h-12" required /></div></div>
                            </div>
                        </div>
                    )}

                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 mt-4 shadow-lg shadow-green-200 transition-all hover:scale-[1.01]" disabled={loading}>
                        {loading ? "Processando..." : (paymentMethod === 'PIX' ? 'Gerar Código PIX' : 'Confirmar Assinatura')}
                    </Button>
                </form>
            ) : (
                /* TELA DE SUCESSO DO PIX */
                <div className="flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-300 py-6">
                    <div className="text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">QR Code Gerado!</h2>
                        <p className="text-gray-500">Escaneie para finalizar sua assinatura.</p>
                    </div>

                    <div className="border-4 border-green-600 p-4 rounded-xl bg-white shadow-inner">
                        {pixData.qrCodeBase64 ? (
                            <img 
                                src={`data:image/png;base64,${pixData.qrCodeBase64}`} 
                                alt="QR Code Pix" 
                                className="w-48 h-48 object-contain"
                            />
                        ) : (
                            <div className="w-48 h-48 flex items-center justify-center text-gray-400">Carregando imagem...</div>
                        )}
                    </div>

                    <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <Label className="text-xs text-gray-500 mb-2 block font-bold uppercase tracking-wider">Pix Copia e Cola</Label>
                        <div className="flex gap-2">
                            <Input value={pixData.copyPaste} readOnly className="bg-white text-xs font-mono h-10" />
                            <Button size="icon" variant="outline" onClick={copyToClipboard} className="h-10 w-10 shrink-0">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    
                    <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-gray-500 w-full hover:bg-gray-100">
                        Já fiz o pagamento
                    </Button>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
