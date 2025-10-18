// /src/pages/AdminDashboard.tsx (Dashboard principal com lista e botão)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obterTodosEntregadores } from '../services/entregadorService';

interface Entregador {
    id: number;
    nome: string;
    username: string;
    email: string;
    telefone: string;
}

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [entregadores, setEntregadores] = useState<Entregador[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Efeito para carregar a lista de entregadores
    useEffect(() => {
        const fetchEntregadores = async () => {
            try {
                const data: Entregador[] = await obterTodosEntregadores();
                setEntregadores(data);
            } catch (err: any) {
                // Trata erro de Autorização (401/403) e força o logout
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    setError('Erro ao carregar entregadores. Verifique se o servidor C# está rodando.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEntregadores();
    }, [navigate]);

    // Funções de Ação
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleNavigateToCadastro = () => {
        // Leva o usuário para a rota do formulário
        navigate('/Admin/CadastrarEntregador');
    };

    if (loading) {
        return <div>Carregando Painel e Lista de Entregadores...</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* SIMULAÇÃO DA BARRA DE NAVEGAÇÃO E KPI's */}
            <header style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '15px 0', 
                borderBottom: '2px solid #eee', 
                marginBottom: '20px' 
            }}>
                <h1 style={{ margin: 0, color: '#333' }}>Painel de Administração | Supervisão</h1>
                
                <nav style={{ display: 'flex', gap: '20px' }}>
                    {/* BOTÃO QUE INICIA O FLUXO DE CADASTRO */}
                    <button 
                        onClick={handleNavigateToCadastro} 
                        style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                        + Cadastrar Entregador
                    </button>
                    
                    <button onClick={handleLogout} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                        Sair
                    </button>
                </nav>
            </header>
            
            {/* ESPAÇO PARA KPIs e Relatórios */}
            <div style={{ border: '1px dashed #ccc', padding: '20px', marginBottom: '30px', backgroundColor: '#f9f9f9' }}>
                <h3>Relatórios e KPIs (Futuro da Supervisão)</h3>
                <p>Aqui você verá gráficos, rotas ativas e o status geral da frota.</p>
            </div>
            
            <hr />

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>ERRO: {error}</p>}
            
            {/* Tabela de Listagem (Base do CRUD Read All) */}
            <h2>Entregadores Ativos</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nome</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Usuário</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>E-mail</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {entregadores.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Nenhum entregador cadastrado.</td>
                        </tr>
                    ) : (
                        entregadores.map((entregador) => (
                            <tr key={entregador.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.nome}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.username}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.telefone}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;