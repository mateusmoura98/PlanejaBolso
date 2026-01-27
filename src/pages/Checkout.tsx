import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, ArrowLeft, User, Users, Lock, Mail, MapPin, Phone, QrCode, Tag } from 'lucide-react';
import logo from '@/assets/planeja-bolso-logo.png';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
// ADICIONADO: Import do Supabase para validar o cupom
import { supabase } from '@/lib/supabase';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD"); 
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [copyPaste, setCopyPaste] = useState("");
  
  // --- NOVOS ESTADOS PARA O CUPOM ---
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  // ----------------------------------

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

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // --- NOVA FUNÇÃO: VALIDAR CUPOM ---
  const handleValidateCoupon = async () => {
    if (!couponCode) return;
    setValidatingCoupon(true);
    setAppliedCoupon(null); // Reseta cupom anterior

    try {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', couponCode.toUpperCase())
            .eq('active', true)
            .single();

        if (error || !data) {
            toast.error("Cupom inválido ou expirado.");
        } else {
            setAppliedCoupon(data);
            toast.success(`Cupom de ${data.discount_type === 'PERCENTAGE' ? data.value + '%' : 'R$ ' + data.value} aplicado!`);
        }
    } catch (err) {
        console.error(err);
        toast.error("Erro ao validar cupom.");
    } finally {
        setValidatingCoupon(false);
    }
  };
  // ----------------------------------

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const N8N_WEBHOOK_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook/venda-site";

    try {
      const payload = {
        ...formData,
        plan: selectedPlan,
        billingType: paymentMethod,
        valor: parseFloat(selectedPlan.value.replace(',', '.')),
        // --- ADICIONADO: ENVIA O DESCONTO PRO N8N ---
        discount: appliedCoupon ? {
            value: appliedCoupon.value,
            type: appliedCoupon.discount_type
        } : null
        // --------------------------------------------
      };

      console.log("Enviando para n8n:", payload);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Resposta do n8n:", data);

      if (data.success) {
          if (paymentMethod === "PIX") {
             if(data.qrCodeBase64 && data.copyPaste) {
                 setQrCodeBase64(data.qrCodeBase64);
                 setCopyPaste(data.copyPaste);
                 toast.success("QR Code gerado com sucesso!");
             } else {
                 toast.error("Erro ao gerar QR Code do Pix.");
             }
          } else {
             toast.success("Pagamento Aprovado! Bem-vindo(a)!");
             navigate("/dashboard");
          }
      } else {
          toast.error("Erro no pagamento: " + (data.message || "Verifique os dados e tente novamente."));
      }

    } catch (error) {
      console.error("Erro na comunicação:", error);
      toast.error("Erro ao conectar com o servidor. Verifique se o n8n está ativo.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(copyPaste);
      toast.success("Código PIX copiado!");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 font-sans">
      
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
               
               {/* --- ÁREA DO CUPOM --- */}
               <div className="my-4">
                   <Label className="text-xs text-gray-500">Tem um cupom?</Label>
                   <div className="flex gap-2 mt-1">
                       <Input 
                           placeholder="Digite seu cupom" 
                           value={couponCode}
                           onChange={(e) => setCouponCode(e.target.value)}
                           className="uppercase bg-white h-10"
                           disabled={!!appliedCoupon}
                       />
                       {appliedCoupon ? (
                           <Button type="button" variant="ghost" onClick={() => { setAppliedCoupon(null); setCouponCode(""); }} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                               Remover
                           </Button>
                       ) : (
                           <Button type="button" variant="outline" onClick={handleValidateCoupon} disabled={validatingCoupon || !couponCode}>
                               {validatingCoupon ? '...' : 'Aplicar'}
                           </Button>
                       )}
                   </div>
                   {appliedCoupon && (
                       <p className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1">
                           <Tag className="w-3 h-3" /> 
                           Desconto de {appliedCoupon.discount_type === 'PERCENTAGE' ? appliedCoupon.value + '%' : 'R$ ' + appliedCoupon.value} aplicado!
                       </p>
                   )}
               </div>
               {/* --------------------- */}

               <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
                 <span className="text-base font-bold text-gray-800">Total a pagar hoje:</span>
                 <div className="text-right">
                     {appliedCoupon && (
                         <span className="text-xs text-gray-400 line-through block mr-1">R$ {selectedPlan.value}</span>
                     )}
                     <span className="text-2xl font-bold text-green-600">
                         {/* Lógica visual do preço com desconto */}
                         R$ {appliedCoupon 
                             ? (appliedCoupon.discount_type === 'PERCENTAGE' 
                                 ? (parseFloat(selectedPlan.value.replace(',', '.')) * (1 - appliedCoupon.value / 100)).toFixed(2).replace('.', ',')
                                 : (parseFloat(selectedPlan.value.replace(',', '.')) - appliedCoupon.value).toFixed(2).replace('.', ','))
                             : selectedPlan.value}
                     </span>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit transition-all">
            
            <h2 className="text-xl font-bold text-gray-900 mb-4">Como você prefere pagar?</h2>
            <div className="flex gap-3 mb-6">
                <Button 
                    type="button"
                    onClick={() => setPaymentMethod("CREDIT_CARD")}
                    className={`flex-1 h-12 ${paymentMethod === "CREDIT_CARD" ? "bg-green-600 hover:bg-green-700" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
                >
                    <CreditCard className="w-4 h-4 mr-2" /> Cartão de Crédito
                </Button>
                <Button 
                    type="button"
                    onClick={() => setPaymentMethod("PIX")}
                    className={`flex-1 h-12 ${paymentMethod === "PIX" ? "bg-green-600 hover:bg-green-700" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
                >
                    <QrCode className="w-4 h-4 mr-2" /> PIX
                </Button>
            </div>

            {qrCodeBase64 && paymentMethod === "PIX" ? (
                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300 py-4">
                    <div className="text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900">Pedido Criado!</h2>
                        <p className="text-gray-500">Escaneie o QR Code abaixo para pagar.</p>
                    </div>
                    
                    <div className="border-4 border-green-600 p-2 rounded-xl bg-white w-fit mx-auto">
                        <img 
                            src={`data:image/png;base64,${qrCodeBase64}`} 
                            alt="QR Code Pix"
                            className="w-48 h-48 object-contain"
                        />
                    </div>

                    <div className="w-full">
                        <Label className="text-xs text-gray-500 mb-1 block">Ou copie e cole o código:</Label>
                        <div className="flex gap-2">
                            <Input value={copyPaste} readOnly className="bg-gray-50 text-xs font-mono" />
                            <Button variant="outline" onClick={copyToClipboard}>
                                Copiar
                            </Button>
                        </div>
                    </div>
                    
                    <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-gray-500">
                        Já fiz o pagamento
                    </Button>
                </div>
            ) : (
                <form onSubmit={handlePayment} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cpfCnpj" className="text-gray-700 font-medium text-sm">CPF</Label>
                            <Input 
                                id="cpfCnpj" 
                                placeholder="000.000.000-00" 
                                className="h-12 border-gray-300 bg-gray-50"
                                value={formData.cpfCnpj}
                                onChange={handleInputChange}
                                required
                            />
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
                    </div>

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

                    {paymentMethod === "CREDIT_CARD" && (
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
                                            type="password"
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
                        {loading ? "Processando..." : (paymentMethod === "PIX" ? 'Gerar Código PIX' : 'Confirmar Assinatura')}
                    </Button>

                    {paymentMethod === "CREDIT_CARD" && (
                        <div className="flex justify-center gap-4 opacity-50 grayscale mt-4">
                            <span className="text-xs">Visa</span>
                            <span className="text-xs">Mastercard</span>
                            <span className="text-xs">Elo</span>
                            <span className="text-xs">Amex</span>
                        </div>
                    )}
                </form>
            )}
        </div>

      </main>
    </div>
  );
}
