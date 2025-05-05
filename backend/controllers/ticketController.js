const Ticket = require('../models/Ticket');

// Listar todos os tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tickets', error });
    }
};

// Criar novo ticket
exports.createTicket = async (req, res) => {
    console.log("📥 Requisição recebida no POST /tickets");
    try {
        const { titulo, descricao } = req.body;

        if (!titulo || !descricao) {
            return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
        }

        const novoTicket = new Ticket({ titulo, descricao, status: 'Aberto' });
        await novoTicket.save();

        res.status(201).json(novoTicket);
    } catch (error) {
        console.error('Erro ao criar ticket:', error); // <-- Adicione isso!
        res.status(500).json({ message: 'Erro ao criar o ticket', error });
    }
};

// Atualizar um ticket
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar ticket', error });
    }
};

// Deletar um ticket
exports.deleteTicket = async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Ticket deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar ticket', error });
    }
};
