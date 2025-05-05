import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function DeleteTicket() {
    const [tickets, setTickets] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await api.get('/tickets');
                setTickets(response.data);
            } catch (error) {
                console.error('Erro ao buscar tickets:', error);
            }
        }

        fetchTickets();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tickets/${id}`);
            setTickets(prev => prev.filter(ticket => ticket._id !== id));
            alert("Chamado deletado com sucesso!");
        } catch (error) {
            alert("Erro ao deletar chamado.");
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'aberto': return '#28a745';
            case 'fechado': return '#dc3545';
            case 'pendente': return '#ffc107';
            default: return '#6c757d';
        }
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>🗑️ Deletar Chamado</h1>
            </div>

            {tickets.length === 0 ? (
                <p className="empty-text">Nenhum chamado encontrado...</p>
            ) : (
                <div className="card-grid">
                    {tickets.map(ticket => (
                        <div className="ticket-box" key={ticket._id}>
                            {/* Card clicável vai para ViewTicket.jsx */}
                            <Link to={`/view-ticket/${ticket._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h2 className="ticket-title">🧾 {ticket.titulo}</h2>
                                <p className="ticket-description">{ticket.descricao}</p>
                                <p
                                    className="ticket-status"
                                    style={{ backgroundColor: getStatusColor(ticket.status) }}
                                >
                                    {ticket.status.toUpperCase()}
                                </p>
                            </Link>

                            {/* Botão de deletar */}
                            <button
                                className="edit-btn"
                                onClick={() => handleDelete(ticket._id)}
                                style={{ backgroundColor: '#dc3545' }}
                            >
                                🗑️ Deletar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DeleteTicket;
