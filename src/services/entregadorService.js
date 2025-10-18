// /src/services/entregadorService.js
import axios from 'axios';

// ATENÇÃO: USE SUA PORTA CORRETA (ex: 7143)
const API_URL = 'https://localhost:7143/api/EntregadorPessoa';

// Função para configurar o cabeçalho de Autorização com o Token Admin
const getConfig = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Redirecionamento forçado pode ser adicionado aqui, mas vamos tratar o erro no componente.
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
    }
    return {
        headers: {
            // Formato esperado pelo ASP.NET Core: Bearer [TOKEN]
            'Authorization': `Bearer ${token}`
        }
    };
};

// =================================================================
// 1. POST (Criar)
// =================================================================
export const registrarEntregador = async (dadosCadastro) => {
    try {
        const response = await axios.post(API_URL, dadosCadastro, getConfig());
        return response.data;
    } catch (error) {
        // O erro será tratado no AdminDashboard.tsx
        throw error; 
    }
};

// =================================================================
// 2. GET (Listar Todos)
// =================================================================
export const obterTodosEntregadores = async () => {
    try {
        const response = await axios.get(API_URL, getConfig());
        return response.data;
    } catch (error) {
        throw error;
    }
};