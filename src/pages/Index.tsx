import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* --- CABEÇALHO (NAVBAR) --- */}
      <nav className="border-b bg-white/50 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Simples */}
            <div className="bg-green-600 text-white p-1 rounded font-bold text-lg">PB</div>
            <span className="font-bold text-xl text-gray-800">Planeja Bolso</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#funcionalidades" className="hover:text-green-600 transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-green-600 transition-colors">Como funciona</a>
            <a href="#planos" className="hover:text-green-600 transition-colors">Planos</a>
            <a href="#faq" className="hover:text-green-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            {/* BOTÃO DE ENTRAR (Link para o Auth) */}
            <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              Acessar conta
            </Link>
          </div>
        </div>
      </nav>

      {/* --- CONTEÚDO PRINCIPAL (HERO) --- */}
      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Lado Esquerdo: Texto */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Gestão financeira simplificada com <span className="text-green-600">WhatsApp</span> e <span className="text-green-600">Inteligência Artificial</span>
            </h1>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border inline-flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">👤</div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">👤</div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs">👤</div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-green-600">+28 mil pessoas</span> confiam no Planeja Bolso para organizar suas finanças.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* BOTÃO PRINCIPAL (Link para Cadastro/Auth) */}
              <Link to="/auth">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-green-200 w-full sm:w-auto justify-center">
                  Experimente Planeja Bolso — 3 dias grátis!
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="flex gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                3 dias grátis
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Cancele quando quiser
              </div>
            </div>
          </div>

          {/* Lado Direito: Imagem Ilustrativa (Placeholder) */}
          <div className="relative">
            <div className="bg-gradient-to-tr from-green-50 to-emerald-100 rounded-3xl p-8 shadow-xl border border-white">
              <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-gray-800">Dashboard do Planeja Bolso</h3>
                <p className="text-gray-500 mt-2 text-sm">Seus gráficos aparecerão aqui</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* --- RODAPÉ SIMPLES --- */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t mt-12">
        <p>© 2025 Planeja Bolso. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
