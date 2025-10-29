// /src/pages/AdminCadastroEntregador.tsx (CÓDIGO COMPLETO)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarEntregador } from '../services/entregadorService';

const AdminCadastroEntregador: React.FC = () => {
    const navigate = useNavigate();
    
    // ESTADO COMPLETO: Inclui o campo 'cpf'
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nome: '',
        email: '',
        telefone: '',
        cpf: '' // CAMPO CPF
    });
    
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            await registrarEntregador(formData);
            setSuccessMessage('Entregador cadastrado com sucesso! Retornando ao dashboard...');
            
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

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '800px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                
                <h3 style={{ gridColumn: 'span 2', borderBottom: '1px dashed #ccc', paddingBottom: '10px', marginTop: '0' }}>Dados de Acesso (Login)</h3>
                <input type="text" name="username" placeholder="Usuário (Login)" value={formData.username} onChange={handleChange} required style={{ padding: '10px' }} />
                <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required style={{ padding: '10px' }} />
                
                <h3 style={{ gridColumn: 'span 2', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>Dados Pessoais</h3>
                
                <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}> {/* Ajustado para 3 colunas */}
                    <input type="text" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required style={{ padding: '10px' }} />
                    <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required style={{ padding: '10px' }} />
                    <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required style={{ padding: '10px' }} />
                    <input 
                        type="text" 
                        name="cpf" 
                        placeholder="CPF (Apenas números)" 
                        value={formData.cpf} 
                        onChange={handleChange} 
                        required 
                        maxLength={11}
                        style={{ padding: '10px' }} 
                    /> 
                    {/* Adicione um campo vazio ou de observação para preencher a coluna se necessário */}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ gridColumn: 'span 2', padding: '15px 20px', backgroundColor: isSubmitting ? '#999' : '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
                    {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
                </button>
            </form>
        </div>
    );
};

export default AdminCadastroEntregador;