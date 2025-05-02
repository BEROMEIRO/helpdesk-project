import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { nomeUsuario, senha });
            localStorage.setItem('token', response.data.token);
            navigate('/tickets');
        } catch (error) {
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="ticket-container">
            <h2 className="title">Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Nome de Usuário"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <p className="subtitle">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">Cadastre-se</Link>
            </p>
        </div>
    );
}

export default Login;
