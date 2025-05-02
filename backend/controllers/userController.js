// backend/controllers/userController.js
const User = require('../models/User');

// Buscar todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-senha'); // Não enviar a senha
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
};
