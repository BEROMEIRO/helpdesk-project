import { useEffect, useState } from 'react';
import axios from 'axios';

function DeleteTicket() {
    const [tickets, setTickets] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tickets')
            .then(res => setTickets(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDeleteClick = (id) => {
        setConfirmDeleteId(id);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://localhost:5000/api/tickets/${confirmDeleteId}`)
            .then(() => {
                setTickets(prev => prev.filter(ticket => ticket._id !== confirmDeleteId));
                setConfirmDeleteId(null);
                alert("Chamado deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar chamado.");
                setConfirmDeleteId(null);
            });
    };

    return (
        <div className="delete-container">
            <h2>Deletar Chamado</h2>
            {tickets.map(ticket => (
                <div key={ticket._id} className="ticket-item">
                    <div className="ticket-header">
                        <strong>{ticket.titulo}</strong>
                        <button className="delete-button" onClick={() => handleDeleteClick(ticket._id)}>
                            🗑️
                        </button>
                    </div>

                    {confirmDeleteId === ticket._id && (
                        <div className="confirm-dialog">
                            <p>Tem certeza que deseja deletar?</p>
                            <div className="confirm-buttons">
                                <button className="yes" onClick={handleConfirmDelete}>Sim</button>
                                <button className="no" onClick={() => setConfirmDeleteId(null)}>Não</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default DeleteTicket;
