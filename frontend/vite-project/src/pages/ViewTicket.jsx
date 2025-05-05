import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';

function ViewTicket() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.get(`/tickets/${id}`)
            .then(res => {
                setTicket(res.data);
                setComments(res.data.comments || []);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleAddComment = () => {
        const newComment = {
            text: comment,
            date: new Date().toLocaleString(),
        };

        const updatedComments = [...comments, newComment];

        API.put(`/tickets/${id}`, {
            ...ticket,
            comments: updatedComments,
        })
            .then(() => {
                setComments(updatedComments);
                setComment('');
            })
            .catch(err => alert("Erro ao adicionar comentário."));
    };

    if (!ticket) return <p>Carregando chamado...</p>;

    return (
        <div className="view-ticket">
            <h2>{ticket.titulo}</h2>
            <p><strong>Descrição:</strong> {ticket.descricao}</p>

            <hr />

            <h3>Comentários</h3>
            <ul>
                {comments.map((c, index) => (
                    <li key={index}><strong>{c.date}:</strong> {c.text}</li>
                ))}
            </ul>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Digite seu comentário..."
                rows={4}
            />
            <br />
            <button onClick={handleAddComment}>Adicionar Comentário</button>
        </div>
    );
}

export default ViewTicket;
