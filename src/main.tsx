// /src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Mantenha seu CSS aqui

// O ReactDOM cria o ponto de entrada da aplicação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* O componente App será renderizado aqui */}
    <App /> 
  </React.StrictMode>,
);