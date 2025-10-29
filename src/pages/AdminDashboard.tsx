// /src/pages/AdminDashboard.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obterTodosEntregadores } from '../services/entregadorService';

// Estrutura simplificada de dados
interface Entregador {
    id: number;
    nome: string;
    username: string;
    email: string;
    telefone: string;
    cpf: string; // Adicionado para exibir o CPF
}

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    
    // Estados para o Dashboard
    const [entregadores, setEntregadores] = useState<Entregador[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userRole, setUserRole] = useState(''); // Para exibir o perfil do usuário logado

    // 1. Efeito de Carregamento (Busca Entregadores e Checa Token)
    useEffect(() => {
        const fetchEntregadores = async () => {
            const token = localStorage.getItem('authToken');
            const role = localStorage.getItem('userRole');

            if (!token || role !== 'Admin') {
                navigate('/'); // Redireciona se não for Admin ou não tiver token
                return;
            }
            setUserRole(role);

            try {
                // Chama a API C# para obter a lista de entregadores
                const data: Entregador[] = await obterTodosEntregadores();
                setEntregadores(data);
            } catch (err: any) {
                // Se o backend rejeitar, forçar logout
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    setError('ERRO: Falha ao carregar a lista. Verifique se o servidor C# está ativo.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEntregadores();
    }, [navigate]);

    // 2. Funções de Navegação e Logout
    const handleLogout = () => {
        localStorage.clear(); // Limpa todas as credenciais
        navigate('/');
    };

    const handleNavigateToCadastro = () => {
        navigate('/Admin/CadastrarEntregador'); // Rota para o formulário de cadastro
    };
    
    const handleNavigateToCriarRota = () => {
        navigate('/Admin/CriarRota'); // NOVA ROTA DE EXPEDIÇÃO
    };

    // 3. Renderização
    if (loading) {
        return <div>Carregando Painel e Lista de Entregadores...</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '5px' }}>Painel do Administrador | Usuário: {userRole}</h1>
            <p style={{ marginBottom: '20px', color: '#555' }}>Visão Operacional e Supervisão</p>

            <button onClick={handleLogout} style={{ float: 'right', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>
                Sair
            </button>
            <hr />

            {error && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>{error}</p>}
            
            {/* Cards de KPI (Futura Supervisão) */}
            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
                <p style={{ fontWeight: 'bold' }}>Relatórios e KPIs (Futuro da Supervisão)</p>
                <p>Aqui você verá gráficos, rotas ativas e o status geral da frota (Tempo Médio Parado, Entregas em Andamento).</p>
            </div>
            
            {/* Seção de Gerenciamento e Botões */}
            <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Gestão de Recursos</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    
                    {/* NOVO BOTÃO: CRIAÇÃO DE ROTA (Expedição) */}
                    <button 
                        onClick={handleNavigateToCriarRota} 
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                    >
                        + Criar Nova Rota (Expedição)
                    </button>
                    
                    {/* BOTÃO CADASTRO DE ENTREGADOR */}
                    <button 
                        onClick={handleNavigateToCadastro} 
                        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
                    >
                        + Cadastrar Entregador
                    </button>
                </div>
            </div>

            {/* Tabela de Listagem de Entregadores */}
            <h3>Entregadores Ativos</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nome</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Usuário</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>E-mail</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>CPF</th> {/* COLUNA CPF */}
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {entregadores.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Nenhum entregador cadastrado.</td>
                        </tr>
                    ) : (
                        entregadores.map((entregador) => (
                            <tr key={entregador.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.nome}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.username}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{entregador.cpf}</td> {/* EXIBE O CPF */}
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