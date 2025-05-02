const mongoose = require('mongoose');

// Definindo o schema do ticket
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'closed'],
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Criando o modelo
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
