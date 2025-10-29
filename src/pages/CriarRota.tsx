// /src/pages/CriarRota.tsx (CÓDIGO COMPLETO)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CORREÇÃO APLICADA AQUI: Caminho para o services
import { obterTodosEntregadores } from '../services/entregadorService.js';
import { criarNovaRota } from '../services/rotaService.js'; // Adicione .js para o compilador do TSX

// Estrutura simplificada de Entregador para o dropdown
interface Entregador {
    id: number;
    nome: string;
    username: string;
}

const CriarRota: React.FC = () => {
    const navigate = useNavigate();
    
    const [entregadores, setEntregadores] = useState<Entregador[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        nomeRota: '',
        entregadorId: 0,
        pontosDeEntregaIds: '1,2,3,4' 
    });

    // 1. Carregar Entregadores para o Dropdown
    useEffect(() => {
        const loadRecursos = async () => {
            try {
                const data = await obterTodosEntregadores();
                setEntregadores(data);
            } catch (err: any) {
                 setError('Erro ao carregar entregadores disponíveis.');
            } finally {
                setLoading(false);
            }
        };
        loadRecursos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ 
            ...prevData, 
            [name]: name === 'entregadorId' ? parseInt(value) : value 
        }));
    };

    // 2. Submeter o Formulário (Ação de Expedição)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        
        const pontosIds = formData.pontosDeEntregaIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

        try {
            const rotaData = {
                nomeRota: formData.nomeRota,
                entregadorId: formData.entregadorId,
                pontosDeEntregaIds: pontosIds
            };
            await criarNovaRota(rotaData);

            setSuccessMessage(`Rota '${formData.nomeRota}' criada e pronta para otimização!`);
            setTimeout(() => navigate('/AdminDashboard'), 2000); 

        } catch (err: any) {
            setError(err.response?.data?.message || 'Falha na criação da rota. Verifique os dados.');
        }
    };
    
    if (loading) return <div>Carregando recursos...</div>;

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Módulo de Expedição: Planejar e Atribuir Rota</h2>
            <hr />

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>ERRO: {error}</p>}
            {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>SUCESSO: {successMessage}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', padding: '20px', border: '1px solid #007bff', borderRadius: '8px' }}>
                
                <input type="text" name="nomeRota" placeholder="Nome da Rota (Ex: ZS Manhã)" value={formData.nomeRota} onChange={handleChange} required style={{ padding: '10px' }} />

                <select name="entregadorId" onChange={handleChange} value={formData.entregadorId || ''} required style={{ padding: '10px' }}>
                    <option value={0} disabled>Selecione o Entregador</option>
                    {entregadores.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.nome} (ID: {e.id})
                        </option>
                    ))}
                </select>

                <input type="text" name="pontosDeEntregaIds" placeholder="IDs dos Pontos de Entrega (Simulação: 1, 2, 3)" value={formData.pontosDeEntregaIds} onChange={handleChange} required style={{ padding: '10px' }} />
                
                <button type="submit" style={{ padding: '15px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    Criar & Atribuir Rota (Expedição)
                </button>
            </form>
        </div>
    );
};

export default CriarRota;