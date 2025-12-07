import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { AppLayout } from "@/components/layout/AppLayout";

// --- AQUI ESTÃO SUAS PÁGINAS ---
import Index from "./pages/Index"; // Essa é a sua Landing Page
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Transacoes from "./pages/Transacoes";
import Lembretes from "./pages/Lembretes";
import Categorias from "./pages/Categorias";
import Relatorios from "./pages/Relatorios";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Plano from "./pages/Plano";

const queryClient = new QueryClient();

// --- O GUARDA-COSTA (Protege as páginas internas) ---
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // Enquanto verifica se tem usuário, mostra "Carregando..."
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se NÃO tiver usuário logado, manda para a tela de Login/Cadastro
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Se tiver usuário, deixa entrar e mostra o Menu Lateral (AppLayout)
  return <AppLayout>{children}</AppLayout>;
}

// --- O MAPA DO SEU SITE ---
function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null; // Pequena espera para não piscar a tela

  return (
    <Routes>
      {/* 1. PORTA DE ENTRADA (Pública) */}
      {/* Aqui diz: Quando acessar o site puro (/), mostre o Index (Landing Page) */}
      <Route path="/" element={<Index />} />

      {/* 2. TELA DE LOGIN (Pública, mas esperta) */}
      {/* Se já estiver logado, joga pro Dashboard. Se não, mostra o Login. */}
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/dashboard" replace /> : <Auth />} 
      />
      
      {/* 3. PÁGINA DE PLANOS (Pública) */}
      <Route path="/plano" element={<Plano />} />

      {/* 4. ÁREA RESTRITA (Só entra com login) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/transacoes" element={<ProtectedRoute><Transacoes /></ProtectedRoute>} />
      <Route path="/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
      <Route path="/relatorios" element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
      <Route path="/lembretes" element={<ProtectedRoute><Lembretes /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />

      {/* 5. PÁGINA DE ERRO (Se digitar endereço errado) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// --- CONFIGURAÇÕES GERAIS ---
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="financeflow-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
