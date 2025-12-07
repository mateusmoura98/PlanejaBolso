import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- NAVBAR --- */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-green-700">
            <div className="bg-green-600 text-white px-2 py-0.5 rounded">PB</div>
            Planeja Bolso
          </div>
          <div className="flex gap-4">
            {/* Link interno para a tela de Login (SPA) */}
            <Link to="/auth">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-green-600">
                Entrar
              </button>
            </Link>
            <Link to="/auth">
              <button className="px-4 py-2 text-sm font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Começar Grátis
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="pt-32 pb-20 px-4 container mx-auto text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Gestão financeira <br/>
              <span className="text-green-600">Simples e Inteligente</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0">
              Organize suas finanças, controle gastos pelo WhatsApp e use Inteligência Artificial para sobrar dinheiro no final do mês.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link to="/auth" className="w-full sm:w-auto">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-200 transition-all flex items-center justify-center gap-2">
                  Criar conta grátis <ArrowRight className="w-5 h-5"/>
                </button>
              </Link>
            </div>

            <div className="flex gap-6 text-sm text-slate-500 justify-center md:justify-start">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-600"/> Sem cartão de crédito</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-600"/> Plano grátis disponível</span>
            </div>
          </div>

          {/* ILUSTRAÇÃO */}
          <div className="relative bg-gradient-to-tr from-green-50 to-emerald-100 rounded-3xl p-8 border border-slate-100 shadow-2xl">
            <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">💰</div>
              <h3 className="font-bold text-slate-800 text-xl">Seu Dashboard</h3>
              <p className="text-slate-500 mt-2">Seus gráficos aparecerão aqui.</p>
            </div>
          </div>
        </div>
      </main>

      {/* --- RODAPÉ --- */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t mt-12">
        <p>© 2025 Planeja Bolso. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
