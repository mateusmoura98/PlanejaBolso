import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/planeja-bolso-logo.png"; 

// Imagem lateral (Família/Casal)
const imagemLateral = "/familia-login.jpg.png"; 

export default function Plano() {
  
  // Seus Links do Asaas
  const linkIndividual = "https://sandbox.asaas.com/c/6jhf7jxup28v5a89";
  const linkCasal = "https://sandbox.asaas.com/c/g7auclkwrd421f3q";

  return (
    <div className="min-h-screen flex bg-[#020817] text-white font-sans">
      
      {/* --- LADO ESQUERDO (IMAGEM) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-r-[3rem]">
        <img
          src={imagemLateral}
          alt="Controle Financeiro Casal"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent" />
        
        <div className="absolute bottom-12 left-12 z-10 max-w-md">
           <h2 className="text-4xl font-bold mb-4 text-white leading-tight">O futuro financeiro de vocês começa hoje.</h2>
           <p className="text-lg text-gray-200">Organize as finanças de forma simples e tenha mais tranquilidade.</p>
        </div>
      </div>

      {/* --- LADO DIREITO (PLANOS) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-md w-full space-y-10">
          
          {/* Cabeçalho */}
          <div className="text-center lg:text-left space-y-2">
            <img src={logo} alt="Planeja Bolso" className="h-20 w-auto mb-6 mx-auto lg:mx-0 object-contain" />
            <h1 className="text-3xl font-bold text-white">Escolha o plano ideal</h1>
            <p className="text-gray-400">
              Sem fidelidade. Cancele quando quiser.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* CARD 1: INDIVIDUAL (14,90) */}
            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/50 hover:bg-gray-900 transition-all hover:border-primary/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-white">Individual</h3>
                  <p className="text-sm text-gray-400">Para você</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">R$ 14,90</span>
                  <span className="text-sm text-gray-500 block">/mês</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm gap-3 text-gray-300">
                  <div className="bg-primary/20 p-1 rounded-full"><Check className="h-3 w-3 text-primary"/></div>
                  Controle de gastos automático
                </li>
                <li className="flex items-center text-sm gap-3 text-gray-300">
                  <div className="bg-primary/20 p-1 rounded-full"><Check className="h-3 w-3 text-primary"/></div>
                  Receba lembretes de contas
                </li>
              </ul>

              <a href={linkIndividual} target="_blank" rel="noreferrer">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-full shadow-lg shadow-primary/20">
                  Assinar Individual
                </Button>
              </a>
            </div>

            {/* CARD 2: CASAL (24,90) */}
            <div className="border-2 border-primary rounded-2xl p-6 bg-gray-900 relative shadow-2xl shadow-primary/10">
              <div className="absolute -top-3 right-6 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recomendado
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-primary">Casal</h3>
                  <p className="text-sm text-gray-400">Para vocês dois</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary">R$ 24,90</span>
                  <span className="text-sm text-gray-500 block">/mês</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm gap-3 text-white font-medium">
                  <div className="bg-primary/20 p-1 rounded-full"><Check className="h-3 w-3 text-primary"/></div>
                  Acesso para 2 pessoas
                </li>
                <li className="flex items-center text-sm gap-3 text-white">
                  <div className="bg-primary/20 p-1 rounded-full"><Check className="h-3 w-3 text-primary"/></div>
                  Gestão financeira compartilhada
                </li>
                <li className="flex items-center text-sm gap-3 text-white">
                  <div className="bg-primary/20 p-1 rounded-full"><Check className="h-3 w-3 text-primary"/></div>
                  Tudo do plano individual
                </li>
              </ul>

              <a href={linkCasal} target="_blank" rel="noreferrer">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg rounded-full shadow-lg shadow-primary/40 transition-all transform hover:-translate-y-1">
                  Quero o Plano Casal
                </Button>
              </a>
            </div>

          </div>

          <div className="text-center pt-4">
            <Link to="/auth" className="text-sm text-gray-400 hover:text-white transition-colors">
              Já tem uma conta? <span className="underline decoration-primary underline-offset-4 text-white">Fazer login</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
