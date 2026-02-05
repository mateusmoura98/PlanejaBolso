import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreditCard, ArrowLeft, User, Users, Lock, Mail, MapPin, Phone, AlertCircle, Loader2 } from 'lucide-react';
import logo from '@/assets/planeja-bolso-logo.png';
import { useAuth } from '@/hooks/useAuth';
import { pixelEvents } from '@/lib/metaPixel'; 

// ============================================
// FUNÇÕES DE VALIDAÇÃO E FORMATAÇÃO
// ============================================

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return numbers
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};

const validateCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length !== 11) return false;
  if (/^(\d)\1+$/.test(numbers)) return false; 
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(numbers[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(numbers[10])) return false;
  return true;
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

const formatCEP = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
};

const formatCardNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateCardNumber = (cardNumber: string): boolean => {
  const numbers = cardNumber.replace(/\D/g, '');
  if (numbers.length < 13 || numbers.length > 16) return false;
  let sum = 0;
  let isEven = false;
  for (let i = numbers.length - 1; i >= 0; i--) {
    let digit = parseInt(numbers[i]);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = useState({
    name: location.state?.plan?.name || "Individual",
    value: location.state?.plan?.value || "14,90",
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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  useEffect(() => {
    const numericValue = parseFloat(selectedPlan.value.replace(',', '.'));
    pixelEvents.initiateCheckout(selectedPlan.name, numericValue);
  }, [selectedPlan]);

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'holderName':
        if (!value || value.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Nome deve conter apenas letras';
        return null;
      case 'email':
        if (!validateEmail(value)) return 'Email inválido';
        return null;
      case 'cpfCnpj':
        const cpfNumbers = value.replace(/\D/g, '');
        if (cpfNumbers.length !== 11 && cpfNumbers.length !== 14) return 'CPF deve ter 11 dígitos ou CNPJ 14 dígitos';
        if (cpfNumbers.length === 11 && !validateCPF(value)) return 'CPF inválido';
        return null;
      case 'phone':
        const phoneNumbers = value.replace(/\D/g, '');
        if (phoneNumbers.length < 10) return 'Telefone inválido (mínimo 10 dígitos)';
        return null;
      case 'postalCode':
        const cepNumbers = value.replace(/\D/g, '');
        if (cepNumbers.length !== 8) return 'CEP deve ter 8 dígitos';
        return null;
      case 'addressNumber':
        if (!value) return 'Número é obrigatório';
        return null;
      case 'cardNumber':
        if (!validateCardNumber(value)) return 'Número de cartão inválido';
        return null;
      case 'expiryMonth':
        const month = parseInt(value);
        if (month < 1 || month > 12) return 'Mês inválido';
        return null;
      case 'expiryYear':
        const year = parseInt(value);
        const currentYear = new Date().getFullYear() % 100;
        if (year < currentYear || year > currentYear + 20) return 'Ano inválido';
        return null;
      case 'cvv':
        if (value.length < 3 || value.length > 4) return 'CVV deve ter 3 ou 4 dígitos';
        return null;
      default:
        return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;
    
    switch (id) {
      case 'cpfCnpj': formattedValue = formatCPF(value); break;
      case 'phone': formattedValue = formatPhone(value); break;
      case 'postalCode': formattedValue = formatCEP(value); break;
      case 'cardNumber': formattedValue = formatCardNumber(value); break;
      case 'expiryMonth':
      case 'expiryYear':
      case 'cvv': formattedValue = value.replace(/\D/g, ''); break;
    }
    
    setFormData(prev => ({ ...prev, [id]: formattedValue }));
    if (formErrors[id]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    if (error) setFormErrors(prev => ({ ...prev, [id]: error }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorDetails(null);

    const N8N_WEBHOOK_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook/venda-site";

    try {
      const errors: Record<string, string> = {};
      const fieldsToValidate = [
        'holderName', 'email', 'cpfCnpj', 'phone', 'postalCode', 
        'addressNumber', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv'
      ];
      
      for (const field of fieldsToValidate) {
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) errors[field] = error;
      }
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setError("Dados inválidos");
        setErrorDetails(Object.values(errors).join(", "));
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        plan: selectedPlan,
        billingType: 'CREDIT_CARD'
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        setError("Erro de comunicação com o servidor");
        setErrorDetails("O servidor retornou uma resposta inválida.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.message || "Erro ao processar pagamento");
        setErrorDetails("Verifique os dados do formulário e tente novamente.");
        setLoading(false);
        return;
      }

      if (data.success) {
        const numericValue = parseFloat(selectedPlan.value.replace(',', '.'));
        pixelEvents.purchase(selectedPlan.name, numericValue, data.transactionId);
        
        pixelEvents.purchaseServerSide(
          formData.email, formData.phone, formData.holderName,
          selectedPlan.name, numericValue, data.transactionId
        );

        navigate("/auth", { 
          state: { 
            message: "Pagamento aprovado! Aguarde alguns instantes e faça login com o email cadastrado. Você receberá suas credenciais por email."
          }
        });
      } else {
        setError(data.error || "Erro ao processar pagamento");
        setErrorDetails(data.message || "Verifique os dados e tente novamente");
      }
    } catch (error) {
      setError("Erro inesperado");
      setErrorDetails("Ocorreu um erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
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
               <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
                 <span className="text-base font-bold text-gray-800">Total a pagar hoje:</span>
                 <span className="text-2xl font-bold text-green-600">R$ {selectedPlan.value}</span>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit transition-all">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pagamento em Cartão</h2>
                <div className="flex items-center gap-2 p-4 rounded-xl border-2 border-green-600 bg-green-50 text-green-700">
                    <CreditCard className="w-6 h-6" />
                    <span className="font-bold text-sm">Cartão de Crédito</span>
                </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-bold">{error}</AlertTitle>
                <AlertDescription className="text-sm">{errorDetails}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handlePayment} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Seu E-mail</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input 
                            id="email" 
                            type="email"
                            placeholder="exemplo@email.com" 
                            className={`pl-10 h-12 border-gray-300 bg-gray-50 ${formErrors.email ? 'border-red-500' : ''}`}
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="holderName" className="text-gray-700 font-medium text-sm">Nome Completo</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input 
                            id="holderName" 
                            placeholder="Seu nome completo" 
                            className={`pl-10 h-12 border-gray-300 bg-gray-50 ${formErrors.holderName ? 'border-red-500' : ''}`}
                            value={formData.holderName}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    {formErrors.holderName && <p className="text-xs text-red-500 mt-1">{formErrors.holderName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="cpfCnpj" className="text-gray-700 font-medium text-sm">CPF</Label>
                        <Input 
                            id="cpfCnpj" 
                            placeholder="000.000.000-00" 
                            className={`h-12 border-gray-300 bg-gray-50 ${formErrors.cpfCnpj ? 'border-red-500' : ''}`}
                            value={formData.cpfCnpj}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            maxLength={14}
                            required
                        />
                        {formErrors.cpfCnpj && <p className="text-xs text-red-500 mt-1">{formErrors.cpfCnpj}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">WhatsApp</Label>
                        <Input 
                            id="phone" 
                            placeholder="(00) 90000-0000" 
                            className={`h-12 border-gray-300 bg-gray-50 ${formErrors.phone ? 'border-red-500' : ''}`}
                            value={formData.phone}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            maxLength={15}
                            required
                        />
                        {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-gray-700 font-medium text-sm">CEP</Label>
                        <Input 
                            id="postalCode" 
                            placeholder="00000-000" 
                            className={`h-12 border-gray-300 bg-gray-50 ${formErrors.postalCode ? 'border-red-500' : ''}`}
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            maxLength={9}
                            required
                        />
                        {formErrors.postalCode && <p className="text-xs text-red-500 mt-1">{formErrors.postalCode}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="addressNumber" className="text-gray-700 font-medium text-sm">Número</Label>
                        <Input 
                            id="addressNumber" 
                            placeholder="123" 
                            className={`h-12 border-gray-300 bg-gray-50 ${formErrors.addressNumber ? 'border-red-500' : ''}`}
                            value={formData.addressNumber}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                        />
                        {formErrors.addressNumber && <p className="text-xs text-red-500 mt-1">{formErrors.addressNumber}</p>}
                    </div>
                </div>

                <div className="space-y-5 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-gray-700 font-medium text-sm">Número do Cartão</Label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <Input 
                                id="cardNumber" 
                                placeholder="0000 0000 0000 0000" 
                                className={`pl-10 h-12 border-gray-300 bg-gray-50 ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                maxLength={19}
                                required
                            />
                        </div>
                        {formErrors.cardNumber && <p className="text-xs text-red-500 mt-1">{formErrors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-medium text-sm">Validade</Label>
                            <div className="flex gap-2">
                                <Input id="expiryMonth" placeholder="MM" className="h-12 border-gray-300 text-center bg-gray-50" maxLength={2} value={formData.expiryMonth} onChange={handleInputChange} onBlur={handleBlur} required />
                                <Input id="expiryYear" placeholder="AA" className="h-12 border-gray-300 text-center bg-gray-50" maxLength={2} value={formData.expiryYear} onChange={handleInputChange} onBlur={handleBlur} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvv" className="text-gray-700 font-medium text-sm">CVV</Label>
                            <Input 
                                id="cvv" 
                                placeholder="123" 
                                className={`h-12 border-gray-300 bg-gray-50 ${formErrors.cvv ? 'border-red-500' : ''}`}
                                maxLength={4}
                                value={formData.cvv}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                            />
                            {formErrors.cvv && <p className="text-xs text-red-500 mt-1">{formErrors.cvv}</p>}
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 mt-4 shadow-lg shadow-green-200 transition-all hover:scale-[1.01]"
                    disabled={loading}
                >
                    {loading ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Processando...</span>
                    ) : "Confirmar Assinatura"}
                </Button>
            </form>
        </div>
      </main>
    </div>
  );
}
