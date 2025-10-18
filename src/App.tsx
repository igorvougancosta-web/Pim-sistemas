import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================================================
// IMPORTS DOS COMPONENTES (GARANTIR QUE TODOS EXISTAM!)
// =========================================================
import Login from "./pages/Login";
import DeliveryDashboard from "./pages/DeliveryDashboard"; // Rota /delivery
import DeliveryConfirmation from "./pages/DeliveryConfirmation"; // Rota /delivery/confirm/:clientId
import AdminDashboard from "./pages/AdminDashboard"; // Rota /admin
import AdminCadastroEntregador from "./pages/AdminCadastroEntregador"; // ROTA NOVA!
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 1. ROTA DE AUTENTICAÇÃO */}
          <Route path="/" element={<Login />} />

          {/* 2. ROTAS DO ENTREGADOR (Corrigidas para /delivery) */}
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/delivery/confirm/:clientId" element={<DeliveryConfirmation />} />

          {/* 3. ROTAS DO ADMINISTRADOR */}
          <Route path="/admin" element={<AdminDashboard />} /> 
          
          {/* ROTA DE CADASTRO UNIFICADA (Para o botão no Dashboard) */}
          <Route path="/admin/cadastrar-entregador" element={<AdminCadastroEntregador />} /> 

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* Rota 404 - Captura qualquer caminho não definido */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;