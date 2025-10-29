// /src/services/rotaService.js (Código Completo)
import axios from 'axios';

// URL DO SEU CONTROLADOR ROTA C# (VERIFIQUE SUA PORTA!)
const API_URL = 'https://localhost:7143/api/Rota';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

// POST (Create)
export const criarNovaRota = async (dadosRota) => {
    try {
        const response = await axios.post(
            API_URL, 
            dadosRota, 
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// GET (Read All)
export const obterTodasRotas = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error;
    }
};