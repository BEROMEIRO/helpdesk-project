// Importar dependências
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar rotas
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');
//const userRoutes = require('./routes/userRoutes'); // (caso tenha também)

// Usar rotas
app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);

//app.use('/users', userRoutes); // (caso tenha)

// Middleware para captura de erros
app.use((err, req, res, next) => {
    console.error('Erro geral:', err);
    res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
});

// Rodar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


