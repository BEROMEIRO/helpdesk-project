const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Listar todos os tickets
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo ticket
router.post('/tickets', async (req, res) => {
    const { titulo, descricao } = req.body;
    const ticket = new Ticket({ titulo, descricao, status: 'Aberto' });

    try {
        const novoTicket = await ticket.save();
        res.status(201).json(novoTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um ticket
router.put('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um ticket
router.delete('/tickets/:id', async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ticket deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
