const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('./models');
const router = express.Router();

// Endpoint de registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await Usuario.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser.id }, 'tu_secreto', { expiresIn: '1h' });

    res.json({ user: newUser, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send('Contraseña inválida');
    }
    const token = jwt.sign({ id: user.id }, 'tu_secreto', { expiresIn: '1h' });
    res.json({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
