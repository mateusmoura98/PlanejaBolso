import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/planeja-bolso-logo.png"; 

// AQUI: Usando a mesma imagem que configuramos no Login
const imagemLateral = "/familia-login.jpg.png"; 

export default function Plano() {
  
  const linkIndividual = "https://sandbox.asaas.com/c/6jhf7jxup28v5a89";
  const linkFamilia = "https://sandbox.asaas.com/c/g7auclkwrd421f3q";

  return (
    <div className="min-h-screen flex bg-[#020817] text-white font-sans">
      
      {/* --- LADO ESQUERDO (IMAGEM DA FAMÍLIA) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-r-3xl">
        <img
          src={imagemLateral}
          alt="Controle Financeiro em Família"
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent" />
        
        <div className="absolute bottom-12 left-12 z-10 max-w-md">
           <h2 className="text-4xl font-bold mb-2 text-white">O futuro da sua família garantido.</h2>
           <p className="text-lg text-gray-300">Organize as finanças da casa de forma simples, para sobrar mais tempo para quem você ama.</p>
        </div>
      </div>

      {/* --- LADO DIREITO (PLANOS) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-md w-full space-y-8">
          
          {/* Cabeçalho */}
          <div className="text-center lg:text-left space-y-2">
            <img src={logo} alt="Planeja Bolso" className="h-16 w-auto mb-6 mx-auto lg:mx-0 object-contain" />
            <h1 className="text-3xl font-bold text-white">Escolha o plano ideal</h1>
            <p className="text-gray-400">
              Desbloqueie todo o potencial do seu dinheiro hoje.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* CARD 1: INDIVIDUAL (14,90) */}
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50 hover:bg-gray-900 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-white">Individual</h3>
                  <p className="text-sm text-gray-400">O essencial para você</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">R$ 14,90</span>
                  <span className="text-sm text-gray-500 block">/mês</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm gap-3 text-gray-300">
                  <div className="bg-gray-800 p-1 rounded-full"><Check className="h-3 w-3 text-white"/></div>
                  Controle de gastos automático
                </li>
                <li className="flex items-center text-sm gap-3 text-gray-300">
                  <div className="bg-gray-800 p-1 rounded-full"><Check className="h-3 w-3 text-white"/></div>
                  Receba lembretes de contas
                </li>
              </ul>

              <a href={linkIndividual} target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white h-12">
                  Assinar Individual
                </Button>
              </a>
            </div>

            {/* CARD 2: FAMÍLIA (24,90) - DESTAQUE */}
            <div className="border-2 border-green-600 rounded-xl p-6 bg-gray-900 relative shadow-2xl shadow-green-900/20 transform hover:-translate-y-1 transition-all duration-300">
              {/* Etiqueta de Destaque */}
              <div className="absolute -top-3 right-6 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Melhor Escolha
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-green-500">Dupla</h3>
                  <p className="text-sm text-gray-400">Para casais ou parceiros</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-green-500">R$ 24,90</span>
                  <span className="text-sm text-gray-500 block">/mês</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm gap-3 text-white font-medium">
                  <div className="bg-green-600/20 p-1 rounded-full"><Check className="h-3 w-3 text-green-500"/></div>
                  Tudo do plano individual
                </li>
                {/* --- MUDANÇA AQUI --- */}
                <li className="flex items-center text-sm gap-3 text-white">
                  <div className="bg-green-600/20 p-1 rounded-full"><Check className="h-3 w-3 text-green-500"/></div>
                  <strong>Acesso para 2 pessoas</strong>
                </li>
                <li className="flex items-center text-sm gap-3 text-white">
                  <div className="bg-green-600/20 p-1 rounded-full"><Check className="h-3 w-3 text-green-500"/></div>
                  Gestão financeira compartilhada
                </li>
              </ul>

              <a href={linkFamilia} target="_blank" rel="noreferrer">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 text-lg shadow-lg shadow-green-900/50 transition-all">
                  Quero o Plano Dupla
                </Button>
              </a>
            </div>

          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 mb-4">
              Pagamento seguro via Asaas. Cancele quando quiser.
            </p>
            <Link to="/auth" className="text-sm text-gray-400 hover:text-white underline decoration-gray-700 hover:decoration-white underline-offset-4 transition-all">
              Voltar para o login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
