import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statusList = [
    'Aberto',
    'Em andamento',
    'Fechado',
    'Concluído',
    'Finalizado com Sucesso',
    'Finalizado sem Sucesso'
];

function KanbanBoard() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tickets');
            setTickets(response.data);
        } catch (error) {
            console.error('Erro ao buscar tickets:', error);
        }
    };

    const updateStatus = async (ticketId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/tickets/${ticketId}`, { status: newStatus });
            fetchTickets();
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    };

    const addComment = async (ticketId, comment) => {
        try {
            await axios.put(`http://localhost:5000/api/tickets/${ticketId}`, {
                $push: { comentarios: { texto: comment } }
            });
            fetchTickets();
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {statusList.map(status => (
                <div key={status} style={{ flex: 1, border: '1px solid gray', padding: '10px' }}>
                    <h3>{status}</h3>
                    {tickets.filter(ticket => ticket.status === status).map(ticket => (
                        <div key={ticket._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                            <strong>{ticket.titulo}</strong>
                            <p>{ticket.descricao}</p>

                            <select
                                value={ticket.status}
                                onChange={e => updateStatus(ticket._id, e.target.value)}
                            >
                                {statusList.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>

                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    placeholder="Comentário"
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') addComment(ticket._id, e.target.value);
                                    }}
                                />
                            </div>

                            <ul>
                                {ticket.comentarios?.map((c, idx) => (
                                    <li key={idx}>{c.texto}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default KanbanBoard;
