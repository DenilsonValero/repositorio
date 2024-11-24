// routes/sessions.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../dao/models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const newUser = new User({ first_name, last_name, email, age, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.verifyPassword(password)) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ message: 'Inicio de sesión exitoso' });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

router.get('/current', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No autenticado' });
    }

    jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        const user = await User.findById(decoded.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
});

module.exports = router;
