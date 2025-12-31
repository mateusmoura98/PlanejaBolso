import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, ArrowLeft, User, Users, Lock, QrCode, Copy, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'pix_success'>('form');

  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plano?.name || "Individual",
    value: location.state?.plano?.value || "14,90",
    type: "individual"
  });

  const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'PIX'>('CREDIT_CARD');

  const [formData, setFormData] = useState({
    holderName: '',
    cpfCnpj: '',
    email: '',
    phone: '',       // Novo
    postalCode: '',  // Novo
    addressNumber: '', // Novo
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [pixData, setPixData] = useState({ qrCodeBase64: "", copyPaste: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ⚠️ COLOQUE SUA URL DO N8N AQUI
    const N8N_WEBHOOK_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook-test/pagamento-unificado";

    try {
      const payload = {
        ...formData,
        plan: selectedPlan,
        billingType: paymentMethod,
        // Garante que o valor vai como número (ex: 14.90)
        valor: parseFloat(selectedPlan.value.replace(',', '.'))
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        if (paymentMethod === 'PIX') {
          setPixData({
            qrCodeBase64: data.qrCodeBase64,
            copyPaste: data.copyPaste
          });
          setStep('pix_success');
        } else {
          toast.success("Pagamento Aprovado! Bem-vindo(a)!");
          navigate("/dashboard");
        }
      } else {
        toast.error("Erro no pagamento: " + (data.message || "Verifique os dados."));
      }

    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro de conexão. Tente novamente.");
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
            <span className="text-xl font-bold text-gray-800">Planeja Bolso</span>
        </div>
        <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
            <Lock className="w-4 h-4"/> Ambiente Seguro
        </div>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">

        {/* LADO ESQUERDO: PLANOS (Igual ao anterior) */}
        <div className="space-y-6">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Finalizar Assinatura</h1>
             <p className="text-gray-500">Selecione o plano ideal para você:</p>
          </div>

          <div 
            onClick={() => setSelectedPlan({ name: "Individual", value: "14,90", type: "individual" })}
            className={`cursor-pointer border-2 rounded-xl p-5 transition-all flex items-center justify-between group ${
                selectedPlan.name === "Individual" ? "border-green-600 bg-green-50/30" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${selectedPlan.name === "Individual" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Individual</h3>
                    <p className="text-sm text-gray-500">Para controle pessoal</p>
                </div>
            </div>
            <span className="text-xl font-bold text-gray-900">R$ 14,90</span>
          </div>

          <div 
            onClick={() => setSelectedPlan({ name: "Família (Dupla)", value: "24,90", type: "familia" })}
            className={`cursor-pointer border-2 rounded-xl p-5 transition-all flex items-center justify-between group ${
                selectedPlan.name.includes("Família") ? "border-green-600 bg-green-50/30" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${selectedPlan.name.includes("Família") ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Família (Dupla)</h3>
                    <p className="text-sm text-gray-500">Para você e seu amor</p>
                </div>
            </div>
            <span className="text-xl font-bold text-gray-900">R$ 24,90</span>
          </div>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit">
            
            <div className="mb-6 grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setPaymentMethod('CREDIT_CARD')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center ${paymentMethod === 'CREDIT_CARD' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200'}`}
                >
                    <CreditCard className="mb-2"/> Cartão
                </button>
                <button
                    type="button"
                    onClick={() => setPaymentMethod('PIX')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center ${paymentMethod === 'PIX' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200'}`}
                >
                    <QrCode className="mb-2"/> PIX
                </button>
            </div>

            {step === 'form' ? (
                <form onSubmit={handlePayment} className="space-y-4">
                    
                    {/* DADOS PESSOAIS */}
                    <div className="space-y-2">
                        <Label>Nome Completo</Label>
                        <Input id="holderName" value={formData.holderName} onChange={handleInputChange} required placeholder="Seu nome" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="seu@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>CPF</Label>
                            <Input id="cpfCnpj" value={formData.cpfCnpj} onChange={handleInputChange} required placeholder="000.000.000-00" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Telefone (WhatsApp)</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input id="phone" value={formData.phone} onChange={handleInputChange} required placeholder="(11) 99999-9999" className="pl-9" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label>CEP</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input id="postalCode" value={formData.postalCode} onChange={handleInputChange} required placeholder="00000-000" className="pl-9" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                         <Label>Número da Casa</Label>
                         <Input id="addressNumber" value={formData.addressNumber} onChange={handleInputChange} required placeholder="123" />
                    </div>

                    {/* DADOS DO CARTÃO (SÓ APARECE SE FOR CARTÃO) */}
                    {paymentMethod === 'CREDIT_CARD' && (
                        <div className="pt-4 border-t space-y-4 animate-in fade-in">
                            <div className="space-y-2">
                                <Label>Número do Cartão</Label>
                                <Input id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <Input id="expiryMonth" value={formData.expiryMonth} onChange={handleInputChange} required placeholder="MM" maxLength={2} />
                                <Input id="expiryYear" value={formData.expiryYear} onChange={handleInputChange} required placeholder="AAAA" maxLength={4} />
                                <Input id="cvv" type="password" value={formData.cvv} onChange={handleInputChange} required placeholder="CVV" maxLength={4} />
                            </div>
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-bold mt-6" disabled={loading}>
                        {loading ? 'Processando...' : (paymentMethod === 'PIX' ? 'Gerar PIX' : 'Pagar Agora')}
                    </Button>

                </form>
            ) : (
                /* TELA DE SUCESSO DO PIX */
                <div className="text-center space-y-6 py-6">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-bold">Quase lá!</h2>
                    <p className="text-gray-500">Escaneie para pagar e liberar seu acesso.</p>
                    
                    <div className="border-4 border-green-500 p-2 rounded-xl inline-block">
                         {pixData.qrCodeBase64 && <img src={`data:image/png;base64,${pixData.qrCodeBase64}`} className="w-48 h-48" />}
                    </div>
                    
                    <div className="flex gap-2">
                        <Input value={pixData.copyPaste} readOnly className="text-xs" />
                        <Button size="icon" variant="outline" onClick={copyToClipboard}><Copy className="w-4 h-4"/></Button>
                    </div>

                    <Button variant="ghost" onClick={() => navigate("/dashboard")}>Já paguei</Button>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
