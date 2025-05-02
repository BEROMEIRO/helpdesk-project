import { useState } from 'react';
import api from '../services/api';

function CreateTicket() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (!titulo.trim() || !descricao.trim()) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        try {
            await api.post('/tickets', { titulo, descricao });
            alert('Chamado criado com sucesso!');
            setTitulo('');
            setDescricao('');
        } catch (error) {
            alert('Erro ao criar o chamado. Verifique o backend.');
            console.error(error);
        }
    }

    return (
        <div className="ticket-container">
            <h1>Criar Novo Chamado</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                /><br /><br />
                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                /><br /><br />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
}

export default CreateTicket;
