// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// criar usuário
router.post('/register', authController.register);

// login
router.post('/login', authController.login);

// listar todos (sem senha)
router.get('/users', authController.listUsers);

// deletar por nomeUsuario
router.delete('/users/:nomeUsuario', authController.deleteUser);

module.exports = router;
