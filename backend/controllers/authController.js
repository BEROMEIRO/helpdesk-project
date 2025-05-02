const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar novo usuário
const register = async (req, res) => {
    try {
        const { nomeCompleto, nomeUsuario, documento, email, senha } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { nomeUsuario }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'E-mail ou nome de usuário já está em uso.' });
        }

        const newUser = new User({
            nomeCompleto,
            nomeUsuario,
            documento,
            email,
            senha
        });

        await newUser.save();

        return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (err) {
        console.error('❌ Erro ao registrar (backend):', err.message);
        return res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
    }
};

// Login de usuário
const login = async (req, res) => {
    try {
        const { nomeUsuario, senha } = req.body;

        const user = await User.findOne({ nomeUsuario });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign({ id: user._id }, 'seuSegredoJWT', { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { nomeUsuario } = req.params;
        const user = await User.findOneAndDelete({ nomeUsuario });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar usuário.', error: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
    }
};

// Exportar todas as funções corretamente
module.exports = {
    register,
    login,
    listUsers,
    deleteUser
};

