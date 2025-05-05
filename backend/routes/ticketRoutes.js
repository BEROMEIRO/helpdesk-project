const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Listar todos os tickets
router.get('/', ticketController.getAllTickets);

// Criar um novo ticket
router.post('/', ticketController.createTicket);

// Atualizar um ticket
router.put('/:id', ticketController.updateTicket);

// Deletar um ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
