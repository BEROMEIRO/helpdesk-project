// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/users
router.get('/users', authController.listUsers);

// DELETE /api/auth/delete/:nomeUsuario
router.delete('/delete/:nomeUsuario', authController.deleteUser);

module.exports = router;
