import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SelectTicketToEdit() {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await api.get("/tickets");
                setTickets(response.data);
            } catch (err) {
                alert("Erro ao buscar chamados.");
                console.error("Erro ao buscar chamados:", err);
            }
        }
        fetchTickets();
    }, []);

    function handleSelect(id) {
        navigate(`/edit/${id}`); // 👈 Redireciona para a rota de edição
    }

    return (
        <div className="main-content">
            <h1>Selecione um Chamado para Editar</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {tickets.map(ticket => (
                    <li
                        key={ticket._id}
                        style={{
                            marginBottom: "20px",
                            padding: "20px",
                            backgroundColor: "#F0FFFF",
                            borderRadius: "8px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                        }}
                    >
                        <strong>{ticket.titulo}</strong><br />
                        <span>{ticket.descricao}</span><br /><br />
                        <button onClick={() => handleSelect(ticket._id)}>
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectTicketToEdit;