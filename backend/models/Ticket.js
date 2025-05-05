const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Aberto', 'Em Progresso', 'Fechado', 'Concluído', 'Finalizado com Sucesso', 'Finalizado sem Sucesso'],
        default: 'Aberto'
    },
    comentarios: [
        {
            texto: String,
            data: {
                type: Date,
                default: Date.now
            }
        }
    ],
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
