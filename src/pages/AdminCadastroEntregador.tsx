// /src/pages/AdminCadastroEntregador.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarEntregador } from '../services/entregadorService';

const AdminCadastroEntregador: React.FC = () => {
    const navigate = useNavigate();
    // 1. Estado para capturar os dados do formulário
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nome: '',
        email: '',
        telefone: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Para desabilitar o botão

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        try {
            // 2. Chama a API C# através do Service
            await registrarEntregador(formData);
            setSuccessMessage('Entregador cadastrado com sucesso! Retornando ao dashboard...');
            
            // Limpa o formulário e navega de volta após o sucesso
            setTimeout(() => {
                navigate('/AdminDashboard'); 
            }, 2000);
            
        } catch (err: any) {
            let msg = 'Erro ao cadastrar. Verifique se o Usuário ou E-mail já existe.';
            if (err.response && err.response.data && err.response.data.message) {
                msg = err.response.data.message;
            }
            setError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => navigate('/AdminDashboard');

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Cadastro de Novo Entregador</h2>
            <button onClick={handleBack} style={{ marginBottom: '20px', padding: '10px' }}>
                &larr; Voltar para o Dashboard
            </button>
            <hr style={{ marginBottom: '20px' }} />

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>ERRO: {error}</p>}
            {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>SUCESSO: {successMessage}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '700px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                
                <h3>Dados de Acesso (Login)</h3>
                <input type="text" name="username" placeholder="Usuário (Login)" value={formData.username} onChange={handleChange} required style={{ padding: '10px' }} />
                <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required style={{ padding: '10px' }} />
                
                <h3>Dados Pessoais</h3>
                <input type="text" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required style={{ padding: '10px', gridColumn: 'span 2' }} />
                <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required style={{ padding: '10px' }} />
                <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required style={{ padding: '10px' }} />
                
                <button 
                    type="submit" 
                    disabled={isSubmitting} // Desabilita durante o envio
                    style={{ gridColumn: 'span 2', padding: '15px 20px', backgroundColor: isSubmitting ? '#999' : '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
                    {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
                </button>
            </form>
        </div>
    );
};

export default AdminCadastroEntregador;