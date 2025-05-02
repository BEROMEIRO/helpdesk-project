const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nomeCompleto: String,
    nomeUsuario: { type: String, unique: true },
    documento: String,
    email: { type: String, unique: true },
    senha: String
});

// Middleware para criptografar senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);