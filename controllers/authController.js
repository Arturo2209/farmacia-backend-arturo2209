const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

// Registro
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ message: 'Ya existe ese usuario' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await Usuario.create({ email, password: hashed });
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Middleware para proteger rutas
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};