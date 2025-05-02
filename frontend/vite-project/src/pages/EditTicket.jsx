import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function EditTicket() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        async function fetchTicket() {
            const response = await api.get(`/tickets`);
            const ticket = response.data.find(t => t._id === id);
            setTitulo(ticket.titulo);
            setDescricao(ticket.descricao);
        }
        fetchTicket();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!titulo.trim() || !descricao.trim()) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        try {
            await api.put(`/tickets/${id}`, { titulo, descricao });
            alert('Chamado atualizado com sucesso!');
            navigate('/tickets');
        } catch (error) {
            alert('Erro ao atualizar o chamado. Verifique o backend.');
            console.error(error);
        }
    }

    return (
        <div className="ticket-container">
            <h1>Editar Chamado</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

export default EditTicket;
