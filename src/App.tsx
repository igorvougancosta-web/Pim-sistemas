// /src/App.tsx (CÓDIGO FINAL CORRIGIDO)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Imports dos Componentes da Página (TUDO DEVE ESTAR AQUI) ---
import Login from './pages/Login.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx'; 
import AdminCadastroEntregador from './pages/AdminCadastroEntregador.tsx'; 
import CriarRota from './pages/CriarRota.tsx'; // O ARQUIVO FALTANTE AGORA ESTÁ IMPORTADO

import DeliveryConfirmation from './pages/DeliveryConfirmation.tsx'; 
import DeliveryDashboard from './pages/DeliveryDashboard.tsx';
import NotFound from './pages/NotFound.tsx'; 


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Rota Raiz (Login) */}
                <Route path="/" element={<Login />} />
                
                {/* 2. ROTAS DO ADMINISTRADOR */}
                <Route path="/AdminDashboard" element={<AdminDashboard />} /> 
                <Route path="/Admin/CadastrarEntregador" element={<AdminCadastroEntregador />} /> 
                
                {/* 3. ROTA DE EXPEDIÇÃO (RESOLVE O ERRO 404) */}
                <Route path="/Admin/CriarRota" element={<CriarRota />} />
                
                {/* 4. ROTAS DO ENTREGADOR */}
                <Route path="/DeliveryConfirmation" element={<DeliveryConfirmation />} />
                <Route path="/DeliveryDashboard" element={<DeliveryDashboard />} />
                
                {/* 5. Rota 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;