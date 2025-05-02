import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

function Register() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            return alert('As senhas não coincidem.');
        }

        if (!cpfValidator.isValid(documento)) {
            return alert('Documento (CPF) inválido.');
        }

        if (!email.includes('@') || !email.includes('.')) {
            return alert('E-mail inválido.');
        }

        try {
            await api.post('/auth/register', {
                nomeCompleto,
                nomeUsuario,
                documento,
                email,
                senha
            });
            alert('Usuário registrado com sucesso!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Erro ao registrar. Verifique os dados ou tente novamente.');
        }
    };

    return (
        <div className="ticket-container">
            <h2 className="title">Cadastro</h2>
            <h5>Registre-se com seus dados pessoais para usar todos os recursos do site</h5>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nome Completo"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nome de Usuário"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Documento (CPF)"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            <p className="subtitle">
                Já tem login?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">Faça-o agora</Link>
            </p>
        </div>
    );
}

export default Register;
