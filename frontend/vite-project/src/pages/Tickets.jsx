import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Tickets() {
    const [tickets, setTickets] = useState([]);

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
                <h1>📋 Meus Chamados</h1>
                <Link to="/create">
                    <button className="fab-button">+ Novo Chamado</button>
                </Link>
            </div>

            {tickets.length === 0 ? (
                <p className="empty-text">Nenhum chamado encontrado...</p>
            ) : (
                <div className="card-grid">
                    {tickets.map(ticket => (
                        <div className="ticket-box" key={ticket._id}>
                            <h2 className="ticket-title">🧾 {ticket.titulo}</h2>

                            <p className="ticket-description">{ticket.descricao}</p>

                            <p
                                className="ticket-status"
                                style={{ backgroundColor: getStatusColor(ticket.status) }}
                            >
                                {ticket.status.toUpperCase()}
                            </p>

                            <Link to={`/edit/${ticket._id}`}>
                                <button className="edit-btn">✏️ Editar</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tickets;
