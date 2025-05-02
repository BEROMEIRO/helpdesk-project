const Ticket = require('../models/ticketModel');

// Criar um novo ticket
exports.createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTicket = new Ticket({
            title,
            description
        });

        await newTicket.save();
        res.status(201).json({ message: 'Ticket criado com sucesso', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ticket', error });
    }
};

// Listar todos os tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tickets', error });
    }
};
