const jwt = require('jsonwebtoken');

// Midleware de verificación de token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send('Se requiere un token para autenticación');
  }

  jwt.verify(token, 'tu_secreto', (err, decoded) => {
    if (err) {
      return res.status(401).send('Token inválido');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
