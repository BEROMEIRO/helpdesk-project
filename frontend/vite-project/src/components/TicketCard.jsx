import { Link } from 'react-router-dom';
import api from '../services/api';

function TicketCard({ ticket, onDelete }) {

    async function handleDelete() {
        if (confirm('Tem certeza que deseja deletar este chamado?')) {
            await api.delete(`/tickets/${ticket._id}`);
            onDelete(ticket._id);
        }
    }

    return (
        <div style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px', borderRadius: '8px' }}>
            <h3>{ticket.titulo}</h3>
            <p>{ticket.descricao}</p>
            <small>Status: {ticket.status}</small>
            <br /><br />
            <Link to={`/edit/${ticket._id}`}>
                <button style={{ marginRight: '10px' }}>Editar</button>
            </Link>
            <button onClick={handleDelete}>Deletar</button>
        </div>
    );
}

export default TicketCard;
